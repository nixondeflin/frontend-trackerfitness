import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Text, Flex, Box, AspectRatio } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
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
      <Flex direction="column" align="center" justifyContent="center" w="100%">
        <Box textAlign="justify" mb={{ base: 2, md: 6 }} p={4}>
          <Text
            bgGradient="linear(to-l, #8A2387, #E94057, #F27121)"
            bgClip="text"
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
            mb={4}
            p={1}
          >
            AI Motion Analyzer for Fitness Enthusiasts
          </Text>
          <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
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
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          gap={4}
          mb={16}
        >
          <Button
            as={NavLink}
            to="/recordvideo"
            exact
            activeClassName="active"
            bgColor="#E94057"
            color="white"
            width={{ base: "80%", md: "12rem" }}
            margin="2"
            _hover={{ bgColor: "#751B6C" }}
          >
            Record Video
          </Button>
          <Button
            as={NavLink}
            to="/uploadvideo"
            exact
            activeClassName="active"
            bgColor="#E94057"
            color="white"
            width={{ base: "80%", md: "12rem" }}
            margin="2"
            _hover={{ bgColor: "#751B6C" }}
          >
            Upload Video
          </Button>
          <Button
            as={NavLink}
            to="/processed-videos"
            activeClassName="active"
            bgColor="#E94057"
            color="white"
            width={{ base: "80%", md: "12rem" }}
            margin="2"
            _hover={{ bgColor: "#751B6C" }}
          >
            Processed Videos
          </Button>
        </Flex>
        <Text fontSize={{ base: "xl", md: "3xl", lg: "3xl" }} fontWeight="bold" mb={12}>
          Exercise Tutorial Recommendation
        </Text>   
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={28} px={4} gap={16} justify="center">
          <Card bg="rgba(255, 255, 255, 0.05)" color="white" borderRadius="md" overflow="hidden" boxShadow="0 0 18px 5px rgba(255, 255, 255, 0.3)" p={4}>
            <AspectRatio maxW="560px" ratio={2}>
              <iframe
                title="sit-up"
                src="https://www.youtube.com/embed/onaQ0v_J5uU?si=78HIg-eiiBg32Bke"
                allowFullScreen
              />
            </AspectRatio>
            <CardBody>
            {/* Source : Calisthenicmovement */}
              <Text fontSize={{ base: "sm", md: "md", lg: "md" }} mb = {4}>Here's a tutorial video on how to perform a proper sit-up</Text>
              <Text fontSize={{ base: "sm", md: "md", lg: "md"}} fontStyle="italic">Source : Nuffield Health</Text>
            </CardBody>
          </Card>
          <Card bg="rgba(255, 255, 255, 0.05)" color="white" borderRadius="md" overflow="hidden" boxShadow="0 0 18px 5px rgba(255, 255, 255, 0.3)" p={4}>
            <AspectRatio maxW="560px" ratio={2}>
              <iframe
                title="push-up-1"
                src="https://www.youtube.com/embed/eGo4IYlbE5g?si=yC85C82ahKQNE4Mv"
                allowFullScreen
              />
            </AspectRatio>
            <CardBody>
              <Text fontSize={{ base: "sm", md: "md", lg: "md" }} mb = {4}>Here's a tutorial video on how to perform a proper pull-up</Text>
              <Text fontSize={{ base: "sm", md: "md", lg: "md"}} fontStyle="italic">Source : Calisthenicmovement</Text>
            </CardBody>
          </Card>
          <Card bg="rgba(255, 255, 255, 0.05)" color="white" borderRadius="md" overflow="hidden" boxShadow="0 0 18px 5px rgba(255, 255, 255, 0.3)" p={4}>
            <AspectRatio maxW="560px" ratio={2}>
              <iframe
                title="push-up-2"
                src="https://www.youtube.com/embed/IODxDxX7oi4?si=2JH4ZGHXtKWpmxNI0"
                allowFullScreen
              />
            </AspectRatio>
            <CardBody>
              <Text fontSize={{ base: "sm", md: "md", lg: "md" }} mb = {4}>Here's a tutorial video on how to perform a proper push-up</Text>
              <Text fontSize={{ base: "sm", md: "md", lg: "md"}} fontStyle="italic">Source : Calisthenicmovement</Text>
            </CardBody>
          </Card>
          <Card bg="rgba(255, 255, 255, 0.05)" color="white" borderRadius="md" overflow="hidden" boxShadow="0 0 18px 5px rgba(255, 255, 255, 0.3)" p={4}>
            <AspectRatio maxW="560px" ratio={2}>
              <iframe
                title="walk"
                src="https://www.youtube.com/embed/mlqk1niuiZs?si=RQJdsMtfwnbS5db-"
                allowFullScreen
              />
            </AspectRatio>
            <CardBody>
              <Text fontSize={{ base: "sm", md: "md", lg: "md" }} mb = {4}>Here's a tutorial video on how to perform a proper walk</Text>
              <Text fontSize={{ base: "sm", md: "md", lg: "md"}} fontStyle="italic">Source : The Guardian</Text>
            </CardBody>
          </Card>
          <Card bg="rgba(255, 255, 255, 0.05)" color="white" borderRadius="md" overflow="hidden" boxShadow="0 0 18px 5px rgba(255, 255, 255, 0.3)" p={4}>
            <AspectRatio maxW="560px" ratio={2}>
              <iframe
                title="squat"
                src="https://www.youtube.com/embed/IB_icWRzi4E?si=JR9t0T0oU6U60Xrq"
                allowFullScreen
              />
            </AspectRatio>
            <CardBody>
              <Text fontSize={{ base: "sm", md: "md", lg: "md" }} mb = {4}>Here's a tutorial video on how to perform a proper squat</Text>
              <Text fontSize={{ base: "sm", md: "md", lg: "md"}} fontStyle="italic">Source : Insider Tech</Text>
            </CardBody>
          </Card>
        </SimpleGrid>
        <Box as="footer" py={4} textAlign="center" bg="rgba(0, 0, 0, 0)" color="white">
          <Text fontSize="md" mb = {4}>&copy; 2024 AI Motion Analyzer. All rights reserved.</Text>
          <Text fontSize="md" > Nixon Deflin K | Jessica | Nadine Aliya Putri | Victoria Angelique </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
