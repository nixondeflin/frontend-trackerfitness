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
} from "@chakra-ui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import loadingGif from "./assets/loading.gif";

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [exerciseType, setExerciseType] = useState("");
  const [uploadResponse, setUploadResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [previewStream, setPreviewStream] = useState(null);
  const videoPreviewRef = useRef(null);
  const streamRef = useRef(null);
  const toast = useToast();
  const [filename, setFilename] = useState("");

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
        "http://127.0.0.1:8000/analyze_exercise",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadResponse(response.data);
      toast({
        title: "Upload successful",
        description: "Your video has been uploaded and processed successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
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

  return (
    <Box
      p={4}
      height="200vh"
      bgGradient="linear(to-b, #0f0c29, #302b63)"
      color="white"
    >
      <Flex justify="flex-start" mb={4}>
        <Button
          as={NavLink}
          to="/"
          bgColor="#E94057"
          color="white"
          width="10rem"
          margin="4"
          _hover={{ bgColor: "#751B6C" }}
        >
          Home
        </Button>
      </Flex>
      <Flex direction="column" align="center" justify="center">
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="white">
          Record Your Exercise Video
        </Text>
        <ReactMediaRecorder
          video
          onStop={(blobUrl, blob) => setRecordedBlob(blob)}
          onRecordingStart={(stream) => setPreviewStream(stream)}
          render={({ startRecording, stopRecording, mediaBlobUrl }) => (
            <div className="recorder-controls">
              <div className="video-container">
                {!isRecording && mediaBlobUrl ? (
                  <video
                    src={mediaBlobUrl}
                    controls
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <video
                    className="video-preview"
                    ref={videoPreviewRef}
                    autoPlay
                    muted
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
              <Flex justifyContent="center" mt={4}>
                <Button
                  onClick={() => {
                    if (!isRecording) {
                      setIsRecording(true);
                      startVideo();
                      startRecording();
                    }
                  }}
                  disabled={isRecording}
                  bgColor={isRecording ? "gray.500" : "#E94057"}
                  color="white"
                  width="10rem"
                  margin="4"
                  _hover={
                    isRecording
                      ? { bgColor: "gray.500" }
                      : { bgColor: "#751B6C" }
                  }
                >
                  Start Recording
                </Button>
                <Button
                  onClick={() => {
                    if (isRecording) {
                      setIsRecording(false);
                      stopVideo();
                      stopRecording();
                    }
                  }}
                  disabled={!isRecording}
                  bgColor={!isRecording ? "gray.500" : "#E94057"}
                  color="white"
                  width="10rem"
                  margin="4"
                  _hover={
                    !isRecording
                      ? { bgColor: "gray.500" }
                      : { bgColor: "#751B6C" }
                  }
                >
                  Stop Recording
                </Button>
              </Flex>
              {mediaBlobUrl && (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="center" mt={4}>
                    <Flex direction="row" gap={10} width="500px">
                      <FormControl id="filename">
                        <FormLabel>File Name</FormLabel>
                        <Input
                          placeholder="Enter filename"
                          value={filename}
                          onChange={handleFilenameChange}
                          required
                          bg="white"
                          color="black"
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
                      width="500px"
                      margin="4"
                      _hover={{ bgColor: "#751B6C" }}
                      isLoading={isLoading}
                    >
                      Upload
                    </Button>
                  </VStack>
                </form>
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

      {uploadResponse && (
        <Box mt={8} textAlign="center">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Output File
          </Text>
          <Image
            src={uploadResponse.output_file}
            alt="GIF"
            maxW="500px"
            mx="auto"
          />
          <VStack spacing={4} align="center" mt={4}>
            <Flex direction="column" align="center" justify="center">
              <FormControl id="fileName" mb={5}>
                <FormLabel>File Name</FormLabel>
                <Input
                  type="text"
                  value={filename}
                  bg="white"
                  color="black"
                  readOnly
                />
              </FormControl>
              <FormControl id="exerciseTypeResponse" mb={5}>
                <FormLabel>Exercise Type</FormLabel>
                <Input
                  type="text"
                  value={uploadResponse.exercise_type}
                  bg="white"
                  color="black"
                  readOnly
                />
              </FormControl>
              <FormControl id="repsCount" mb={5}>
                <FormLabel>Reps Count</FormLabel>
                <Input
                  type="text"
                  value={uploadResponse.reps_count || "0"}
                  bg="white"
                  color="black"
                  readOnly
                />
              </FormControl>
              <FormControl id="outputFile" mb={5}>
                <FormLabel>Output File</FormLabel>
                <Input
                  type="text"
                  value={uploadResponse.output_file || ""}
                  bg="white"
                  color="black"
                  readOnly
                />
              </FormControl>
            </Flex>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Record;
