import React, { useState, useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Image,
  useToast,
  Flex,
  VStack,
  Select,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import loadingGif from "./assets/loading.gif";

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [exerciseType, setExerciseType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [previewStream, setPreviewStream] = useState(null);
  const videoPreviewRef = useRef(null);
  const streamRef = useRef(null);
  const toast = useToast();
  const [filename, setFilename] = useState("");
  const navigate = useNavigate();

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = null;
      }
    }
  };

  useEffect(() => {
    startVideo();
    return () => stopVideo();
  }, []);

  const handleExerciseChange = (event) => {
    setExerciseType(event.target.value);
  };

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!recordedBlob || !exerciseType) {
      toast({
        title: "Error",
        description: "Please record a video and select an exercise type.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    const newFile = new File([recordedBlob], `${filename}.webm`, {
      type: recordedBlob.type,
    });
    formData.append("file", newFile);
    formData.append("exercise_type", exerciseType);

    try {
      const response = await axios.post(
        "https://trackerfit-423405.as.r.appspot.com/analyze_exercise",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Upload successful",
        description: "Your video has been uploaded and processed successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/output", {
        state: { uploadResponse: response.data, filename },
      });
    } catch (error) {
      toast({
        title: "Error uploading video",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (videoPreviewRef.current && previewStream) {
      videoPreviewRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "md" });

  return (
    <Box
      p={5}
      bgGradient="linear(to-b, #0f0c29, #302b63)"
      color="white"
      minHeight="100vh"
    >
      <Flex justify="flex-end" mb={10} gap={4}>
        <Button
          as={NavLink}
          to="/"
          bgColor="#E94057"
          color="white"
          size={buttonSize}
          _hover={{ bgColor: "#751B6C" }}
        >
          Home
        </Button>
        <Button
          as={NavLink}
          to="/uploadvideo"
          bgColor="#E94057"
          color="white"
          size={buttonSize}
          _hover={{ bgColor: "#751B6C" }}
        >
          Upload Video
        </Button>
        <Button
          as={NavLink}
          to="/processed-videos"
          bgColor="#E94057"
          color="white"
          size={buttonSize}
          _hover={{ bgColor: "#751B6C" }}
        >
          Processed Videos
        </Button>
      </Flex>
      <Flex direction="column" align="center" justify="center">
        <Text
          fontSize={{ base: "xl", md: "2xl", lg: "2xl" }}
          fontWeight="bold"
          mb={6}
          color="white"
        >
          Record Your Exercise Video
        </Text>
        <ReactMediaRecorder
          video
          onStop={(blobUrl, blob) => setRecordedBlob(blob)}
          onRecordingStart={(stream) => setPreviewStream(stream)}
          render={({ startRecording, stopRecording, mediaBlobUrl }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                width={{ base: "60%", md: "80%", lg: "100%" }}
                height="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#000000"
                borderRadius="10px"
                overflow="hidden"
              >
                {!isRecording && mediaBlobUrl ? (
                  <video
                    src={mediaBlobUrl}
                    controls
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  <video
                    ref={videoPreviewRef}
                    autoPlay
                    muted
                    style={{
                      width: "100%",
                    }}
                  />
                )}
              </Box>
              <Flex
                justifyContent="center"
                mt={5}
                wrap="wrap"
                width={{ base: "60%", md: "80%", lg: "100%" }}
                gap={{ base: 4, md: 6, lg: 6 }}
                flexDirection="row"
              >
                <Button
                  onClick={() => {
                    if (!isRecording) {
                      setIsRecording(true);
                      startVideo();
                      startRecording();
                    }
                  }}
                  width="46%"
                  disabled={isRecording}
                  bgColor={isRecording ? "gray.400" : "#E94057"}
                  color="white"
                  size={buttonSize}
                  _hover={
                    isRecording
                      ? { bgColor: "gray.400" }
                      : { bgColor: "#751B6C" }
                  }
                >
                  Start Record
                </Button>
                <Button
                  onClick={() => {
                    if (isRecording) {
                      setIsRecording(false);
                      stopVideo();
                      stopRecording();
                    }
                  }}
                  width="46%"
                  disabled={!isRecording}
                  bgColor={!isRecording ? "gray.400" : "#E94057"}
                  color="white"
                  size={buttonSize}
                  _hover={
                    !isRecording
                      ? { bgColor: "gray.400" }
                      : { bgColor: "#751B6C" }
                  }
                >
                  Stop Record
                </Button>
              </Flex>
              {mediaBlobUrl && !isRecording && (
                <Box width={{ base: "60%", md: "80%", lg: "100%" }}>
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="center" mt={12} width="100%">
                      <Divider />
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        gap={{ base: 4, md: 6, lg: 6 }}
                        width="100%"
                        mt={5}
                      >
                        <FormControl id="filename">
                          <FormLabel>File Name</FormLabel>
                          <Input
                            placeholder="Enter filename"
                            value={filename}
                            onChange={handleFilenameChange}
                            required
                            bg="white"
                            color="black"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormControl id="exerciseType">
                          <FormLabel>Exercise Type</FormLabel>
                          <Select
                            placeholder="Select exercise type"
                            onChange={handleExerciseChange}
                            value={exerciseType}
                            required
                            bg="white"
                            color="black"
                            disabled={isLoading}
                          >
                            <option value="pull-up">Pull-up</option>
                            <option value="push-up">Push-up</option>
                            <option value="sit-up">Sit-up</option>
                            <option value="squat">Squat</option>
                            <option value="walk">Walk</option>
                          </Select>
                        </FormControl>
                      </Flex>
                      <Button
                        type="submit"
                        bgColor="#E94057"
                        color="white"
                        width={{ base: "100%", md: "50%" }}
                        margin="4"
                        _hover={{ bgColor: "#751B6C" }}
                        isLoading={isLoading}
                        size={buttonSize}
                      >
                        Upload
                      </Button>
                    </VStack>
                  </form>
                </Box>
              )}
              {isLoading && (
                <Flex direction="column" align="center" justify="center" mt={4}>
                  <Image
                    src={loadingGif}
                    alt="Loading..."
                    boxSize="150px"
                    width="200"
                    height="200"
                  />
                  <Text mt={2}>
                    <i>It may take a while, please wait :D</i>
                  </Text>
                </Flex>
              )}
            </div>
          )}
        />
      </Flex>
    </Box>
  );
};

export default Record;
