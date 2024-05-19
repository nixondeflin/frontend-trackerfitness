import React from "react";
import {
  Box,
  Text,
  Image,
  VStack,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { useLocation, NavLink } from "react-router-dom";

const OutputFile = () => {
  const location = useLocation();
  const { uploadResponse, filename } = location.state;

  const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "md" });
  const gridTemplateColumns = useBreakpointValue({ base: "1fr 1fr", md: "repeat(4, auto)" });
  const gridGap = useBreakpointValue({ base: 2, md: 4 });

  return (
    <Box
      p={5}
      bgGradient="linear(to-b, #0f0c29, #302b63)"
      color="white"
      minHeight="100vh"
    >
      <Grid templateColumns={gridTemplateColumns} gap={gridGap} mb={10} justifyContent="flex-end">
        <GridItem>
          <Button
            as={NavLink}
            to="/"
            bgColor="#E94057"
            color="white"
            size={buttonSize}
            _hover={{ bgColor: "#751B6C" }}
            width="100%"
          >
            Home
          </Button>
        </GridItem>
        <GridItem>
          <Button
            as={NavLink}
            to="/recordvideo"
            bgColor="#E94057"
            color="white"
            size={buttonSize}
            _hover={{ bgColor: "#751B6C" }}
            width="100%"
          >
            Record Video
          </Button>
        </GridItem>
        <GridItem>
          <Button
            as={NavLink}
            to="/uploadvideo"
            bgColor="#E94057"
            color="white"
            size={buttonSize}
            _hover={{ bgColor: "#751B6C" }}
            width="100%"
          >
            Upload Video
          </Button>
        </GridItem>
        <GridItem>
          <Button
            as={NavLink}
            to="/processed-videos"
            bgColor="#E94057"
            color="white"
            size={buttonSize}
            _hover={{ bgColor: "#751B6C" }}
            width="100%"
          >
            Processed Videos
          </Button>
        </GridItem>
      </Grid>
      <Text
        fontSize={{ base: "xl", md: "2xl", lg: "2xl" }}
        fontWeight="bold"
        mb={6}
        color="white"
        textAlign="center"
      >
        Exercise Video Analysis Result
      </Text>
      <Box
        width={{ base: "60%", md: "50%", lg: "30%" }}
        height="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="auto"
      >
        <Image
          src={uploadResponse.output_file}
          alt="GIF"
          borderRadius="10px"
          width="100%"
          height="auto"
        />
      </Box>
      <VStack align="center" mt={6} width={{ base: "60%", md: "50%", lg: "35%" }} mx="auto">
        <FormControl id="fileName" mb={2}>
          <FormLabel>File Name</FormLabel>
          <Input
            type="text"
            value={filename}
            bg="white"
            color="black"
            readOnly
          />
        </FormControl>
        <Flex direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 5, lg: 6 }} width="100%">
          <FormControl id="exerciseTypeResponse" mb={2} flex="1">
            <FormLabel>Exercise Type</FormLabel>
            <Input
              type="text"
              value={uploadResponse.exercise_type}
              bg="white"
              color="black"
              readOnly
            />
          </FormControl>
          <FormControl id="repsCount" mb={2} flex="1">
            <FormLabel>Reps Count</FormLabel>
            <Input
              type="text"
              value={uploadResponse.reps_count || "0"}
              bg="white"
              color="black"
              readOnly
            />
          </FormControl>
        </Flex>
        <FormControl id="outputFile" mb={2}>
          <FormLabel>Output File</FormLabel>
          <Input
            type="text"
            value={uploadResponse.output_file || ""}
            bg="white"
            color="black"
            readOnly
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default OutputFile;
