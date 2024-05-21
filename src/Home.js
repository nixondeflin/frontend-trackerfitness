import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import backgroundImage from "./assets/bgweb.png";

const Home = () => {
  return (
    <Box
      minHeight="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      display="flex"
      p={10}
    >
      <Flex direction="column" align="center" justifyContent="center">
        <Box textAlign="center" mb={{ base: 8, md: 16 }} p={4}>
          <Text
            bgGradient="linear(to-l, #8A2387, #E94057, #F27121)"
            bgClip="text"
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
            mb={4}
            p={4}
          >
            AI Motion Analyzer for Fitness Enthusiasts
          </Text>
          <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} textAlign="justify">
            <b>
              Welcome to AI Motion Analyzer, the ultimate digital companion for
              fitness enthusiasts!
            </b>
            <br />
            AI Fitness Analyzer is a website designed to enhance your fitness
            journey through the power of Artificial Intelligence (AI). Our
            website offers innovative services to help you monitor, analyze, and
            improve your physical activities, ensuring you to achieve your
            fitness goals. With our intuitive video recording feature, you can
            effortlessly capture your exercise sessions, whether you're
            performing walk, squat, sit-up, pull-up, and even push-up. You can
            also select and upload your exercise videos directly from your
            device. Our advanced AI algorithms will analyze your exercise
            videos, counting the number of accurate movements, to help you
            refine your technique and maximize the effectiveness of your
            workouts. Access your analyzed exercise videos with processed video
            feature, which stores all your analyzed videos, so you can monitor
            your progress. Let's start your fitness journey by recording and
            analyzing your workouts! Take the first step towards achieving your
            fitness goals with the support of our technology.
          </Text>
        </Box>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="center"
          gap={4}
        >
          <Button
            bgColor="#E94057"
            color="white"
            width={{ base: "80%", md: "12rem" }}
            margin="2"
            _hover={{ bgColor: "#751B6C" }}
          >
            <NavLink to="/recordvideo" exact="true" activeClassName="active">
              Record Video
            </NavLink>
          </Button>
          <Button
            bgColor="#E94057"
            color="white"
            width={{ base: "80%", md: "12rem" }}
            margin="2"
            _hover={{ bgColor: "#751B6C" }}
          >
            <NavLink to="/uploadvideo" exact="true" activeClassName="active">
              Upload Video
            </NavLink>
          </Button>
          <Button
            bgColor="#E94057"
            color="white"
            width={{ base: "80%", md: "12rem" }}
            margin="2"
            _hover={{ bgColor: "#751B6C" }}
          >
            <NavLink to="/processed-videos" activeClassName="active">
              Processed Videos
            </NavLink>
          </Button>
        </Flex>
        <Text mt={4} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" textAlign="center">
          Gerakan 1
        </Text>
        <Box mt={4} display="flex" justifyContent="center" width="100%">
          <Box maxW="560px" width="100%">
            <iframe
              title="naruto"
              src="https://www.youtube.com/embed/QhBnZ6NPOY0"
              allowFullScreen
              style={{ width: "100%", height: "315px" }}
            />
          </Box>
        </Box>
        <Box mt={8} p={4} borderWidth="1px" borderRadius="lg" width="100%" maxWidth="560px" textAlign="center">
          <Text fontSize={{ base: "md", md: "lg" }}>
            Penjelasan Video
          </Text>
        </Box>
        <Text mt={4} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" textAlign="center">
          Gerakan 2
        </Text>
        <Box mt={4} display="flex" justifyContent="center" width="100%">
          <Box maxW="560px" width="100%">
            <iframe
              title="naruto"
              src="https://www.youtube.com/embed/QhBnZ6NPOY0"
              allowFullScreen
              style={{ width: "100%", height: "315px" }}
            />
          </Box>
        </Box>
        <Box mt={8} p={4} borderWidth="1px" borderRadius="lg" width="100%" maxWidth="560px" textAlign="center">
          <Text fontSize={{ base: "md", md: "lg" }}>
            Penjelasan Video
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
