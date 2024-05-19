import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
  useBreakpointValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const ProcessedVideosList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list_files/");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "md" });

  return (
    <Box bg="#0f0c29" color="white">
      <Box p={5} color="white" minHeight="100vh">
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
            to="/uploadvideo"
            bgColor="#E94057"
            color="white"
            size={buttonSize}
            _hover={{ bgColor: "#751B6C" }}
          >
            Upload Video
          </Button>
        </Flex>
        <Flex direction="column" align="center" justify="center">
          <Text
            fontSize={{ base: "xl", md: "2xl", lg: "2xl" }}
            fontWeight="bold"
            mb={6}
            color="white"
          >
            Processed Videos
          </Text>
        </Flex>
        <Box
          overflowX="auto"
          m={2}
          bgGradient="linear(to-b, #0f0c29, #302b63)"
          borderRadius={15}
        >
          <Table variant="simple" colorScheme="whiteAlpha" width="100%">
            <Thead>
              <Tr>
                <Th fontSize={{ base: 13, md: 15 }} color="white">
                  Number
                </Th>
                <Th fontSize={{ base: 13, md: 15 }} color="white">
                  File Name
                </Th>
                <Th fontSize={{ base: 13, md: 15 }} color="white">
                  Exercise Type
                </Th>
                <Th fontSize={{ base: 13, md: 15 }} color="white">
                  Repetitions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {videos.map((video, index) => (
                <Tr key={index}>
                  <Td fontSize={{ base: 12, md: 14 }}>{index + 1}</Td>
                  <Td fontSize={{ base: 12, md: 14 }}>
                    <Link
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="white.200"
                    >
                      {video.name}
                    </Link>
                  </Td>
                  <Td fontSize={{ base: 12, md: 14 }}>
                    {video.metadata?.exercise_type}
                  </Td>
                  <Td fontSize={{ base: 12, md: 14 }}>
                    {video.metadata?.reps_count}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default ProcessedVideosList;
