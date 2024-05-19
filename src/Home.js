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
            AI Tracker Fitness Service
          </Text>
          <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} mb={4}>
            <i>
              <b>AI Fitness Tracker</b>
            </i>{" "}
            adalah sebuah <i>service</i> untuk memantau dan menganalisis
            aktivitas fisik pengguna,
            <br />
            Dengan menggunggah data video, <i>AI Fitness Tracker</i> dapat
            memberikan analisis jumlah repetisi yang pengguna lakukan untuk
            membantu mencapai tujuan kebugaran mereka. Pengguna juga dapat
            melihat lagi hasil video mereka di <i>Processed Video</i>.
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
      </Flex>
    </Box>
  );
};

export default Home;
