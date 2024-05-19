import React, { useState } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import loadingGif from "./assets/loading.gif"; // Correct path to the GIF

const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [exerciseType, setExerciseType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleExerciseTypeChange = (event) => {
    setExerciseType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !exerciseType) {
      toast({
        title: "Error",
        description: "Please select a file and exercise type.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
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
      console.log("Upload successful, response:", response.data);
      toast({
        title: "Upload successful",
        description: "Your video has been uploaded and processed successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      const filename = getFormattedFilename(selectedFile.name);

      navigate("/output", {
        state: { uploadResponse: response.data, filename },
      });

    } catch (error) {
      console.error("Error uploading video:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        toast({
          title: "Error uploading video",
          description: error.response.statusText,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (error.request) {
        console.error("Request data:", error.request);
        toast({
          title: "Error uploading video",
          description: "No response received from server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Error message:", error.message);
        toast({
          title: "Error uploading video",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedFilename = (name) => {
    return name ? name.replace(/\.mp4$/, "") : "";
  };

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
          to="/recordvideo"
          bgColor="#E94057"
          color="white"
          size={buttonSize}
          _hover={{ bgColor: "#751B6C" }}
        >
          Record Video
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
          Upload Exercise Video
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="center" mx="auto">
            <FormControl id="file" width={{ base: "90%", md: "100%" }}>
              <FormLabel>Video File</FormLabel>
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                required
                bg="white"
                color="black"
                alignContent="center"
                disabled={isLoading}
              />
            </FormControl>
            <FormControl id="exerciseType" width={{ base: "90%", md: "100%" }}>
              <FormLabel>Exercise Type</FormLabel>
              <Select
                placeholder="Select exercise type"
                onChange={handleExerciseTypeChange}
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
            <Button
              type="submit"
              bgColor="#E94057"
              color="white"
              width="50%"
              margin="4"
              _hover={{ bgColor: "#751B6C" }}
              isLoading={isLoading}
              size={buttonSize}
            >
              Upload
            </Button>
          </VStack>
        </form>
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
      </Flex>
    </Box>
  );
};

export default UploadVideo;
