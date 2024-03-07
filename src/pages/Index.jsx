import React, { useState, useEffect } from "react";
import { Box, Button, VStack, Text, useToast } from "@chakra-ui/react";
import { FaHandPointer } from "react-icons/fa";

const Index = () => {
  const [status, setStatus] = useState("waiting"); // waiting, ready, clicked
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const toast = useToast();

  useEffect(() => {
    if (status === "ready") {
      const timer = setTimeout(
        () => {
          setStatus("now");
          setStartTime(Date.now());
        },
        Math.floor(Math.random() * 2000) + 1000,
      ); // Wait for 1-3 seconds randomly
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleButtonClick = () => {
    if (status === "waiting") {
      setStatus("ready");
    } else if (status === "ready") {
      toast({
        title: "Too soon!",
        description: "Wait for the color to change before clicking.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setStatus("waiting");
    } else if (status === "now") {
      setEndTime(Date.now());
      setStatus("clicked");
    }
  };

  const resetGame = () => {
    setStatus("waiting");
    setStartTime(0);
    setEndTime(0);
  };

  let buttonText;
  let buttonColor;

  if (status === "waiting") {
    buttonText = "Click to start";
    buttonColor = "gray";
  } else if (status === "ready") {
    buttonText = "Wait for it...";
    buttonColor = "red";
  } else if (status === "now") {
    buttonText = "Click now!";
    buttonColor = "green";
  } else {
    buttonText = `Your time: ${endTime - startTime}ms! Click to try again`;
    buttonColor = "blue";
  }

  return (
    <VStack minH="100vh" justify="center" align="center" spacing={4}>
      <Text fontSize="xl">Reaction Time Test</Text>
      <Box p={4} bg={buttonColor} rounded="md">
        <Button colorScheme={buttonColor} onClick={handleButtonClick} leftIcon={<FaHandPointer />}>
          {buttonText}
        </Button>
      </Box>
      {status === "clicked" && (
        <Button colorScheme="teal" onClick={resetGame}>
          Try Again
        </Button>
      )}
    </VStack>
  );
};

export default Index;
