import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const ProcessedVideosList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/list_files/');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'md' });

  return (
    <Box
      p={4}
      minHeight="100vh"
      bg="#0f0c29"
      color="white"
    >
      <Box display="flex" justifyContent="space-between" mb={4} flexWrap="wrap">
        <Button
          as={NavLink}
          to="/"
          bgColor="#E94057"
          color="white"
          size={buttonSize}
          margin="4"
          _hover={{ bgColor: '#751B6C' }}
        >
          Home
        </Button>
      </Box>
      <Heading as="h1" size="xl" mb={10} color="white" textAlign="center">
        Processed Videos List
      </Heading>
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="whiteAlpha" width="100%">
          <Thead>
            <Tr>
              <Th fontSize={18} color="white">Number</Th>
              <Th fontSize={18} color="white">File Name</Th>
              <Th fontSize={18} color="white">Exercise Type</Th>
              <Th fontSize={18} color="white">Repetitions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {videos.map((video, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  <Link href={video.url} target="_blank" rel="noopener noreferrer" color="white.200">
                    {video.name}
                  </Link>
                </Td>
                <Td>{video.metadata?.exercise_type}</Td>
                <Td>{video.metadata?.reps_count}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ProcessedVideosList;