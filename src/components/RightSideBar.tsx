import {
  Box,
  chakra,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { BsBookHalf, BsHourglassSplit, BsSortUpAlt } from "react-icons/bs";
import { HiAcademicCap, HiBeaker, HiBookOpen } from "react-icons/hi";
import news from "src/database/news";

const RightSideBar = () => {
  return (
    <Flex
      position={"sticky"}
      top={0}
      px={8}
      display={{ sm: "none", md: "none", lg: "none", xl: "flex" }}
      transition={"all 0.3s"}
      overflowY={"auto"}
      flexDirection={"column"}
      width={"100%"}
      maxWidth={390}
      flex={1}
      py={8}
      gap={6}
    >
      <Flex flexDirection={"column"} width={"100%"}>
        <Flex
          borderRadius={20}
          py={6}
          flexDirection={"column"}
          gap={8}
          bg={"primary"}
        >
          <List width={"100%"} spacing={2} fontWeight={1000} fontSize={"sm"}>
            <Heading size="sm" color={"white"} mb={-1} px={4}>
              Dashboard
            </Heading>

            <Flex
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <CircularProgress
                alignSelf={"center"}
                value={62}
                size={"140"}
                color="yellow.500"
                trackColor="whiteAlpha.700"
              >
                <Flex
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CircularProgressLabel>
                    <Flex
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"xs"} textColor={"white"}>
                        Graduation
                      </Text>
                      <Heading size={"lg"} mt={-1} color={"white"}>
                        62%
                      </Heading>
                    </Flex>
                  </CircularProgressLabel>
                </Flex>
              </CircularProgress>
            </Flex>
            <ListItem
              px={2}
              py={2}
              display={"flex"}
              alignItems={"center"}
              color="white"
              mx={4}
              cursor={"pointer"}
              fontWeight={600}
              transition="all 0.2s"
              letterSpacing={1.25}
              fontSize={"0.8em"}
              borderBottom={"1px solid"}
              borderColor={"whiteAlpha.300"}
            >
              <Box mr={2}>
                <BsBookHalf />
              </Box>
              <Text fontWeight={600} color={"whiteAlpha.700"} mr={"auto"}>
                Courses in Progress
              </Text>
              <Flex gap={3} justifyContent={"center"} alignItems={"center"}>
                <Text>2/5</Text>
              </Flex>
            </ListItem>
            <ListItem
              px={2}
              py={2}
              display={"flex"}
              alignItems={"center"}
              color="white"
              mx={4}
              cursor={"pointer"}
              fontWeight={600}
              transition="all 0.2s"
              letterSpacing={1.25}
              fontSize={"0.8em"}
              borderBottom={"1px solid"}
              borderColor={"whiteAlpha.300"}
            >
              <Box mr={2}>
                <BsSortUpAlt />
              </Box>
              <Text fontWeight={600} color={"whiteAlpha.700"} mr={"auto"}>
                Completed Courses
              </Text>
              <Flex gap={3} justifyContent={"center"} alignItems={"center"}>
                <Text>50%</Text>
              </Flex>
            </ListItem>

            <ListItem
              px={2}
              py={2}
              display={"flex"}
              alignItems={"center"}
              color="white"
              mx={4}
              cursor={"pointer"}
              fontWeight={600}
              transition="all 0.2s"
              letterSpacing={1.25}
              fontSize={"0.8em"}
              borderBottom={"1px solid"}
              borderColor={"whiteAlpha.300"}
            >
              <Box mr={2}>
                <BsHourglassSplit />
              </Box>
              <Text fontWeight={600} color={"whiteAlpha.700"} mr={"auto"}>
                Graduation Completion
              </Text>
              <Flex gap={3} justifyContent={"center"} alignItems={"center"}>
                <Text>62%</Text>
              </Flex>
            </ListItem>
          </List>
        </Flex>
      </Flex>

      <Flex flexDirection={"column"} width={"100%"}>
        <Flex
          borderRadius={20}
          py={6}
          px={6}
          flexDirection={"column"}
          gap={5}
          bg={"white"}
          boxShadow={"0 1px 5px 0 rgba(0, 0, 0, 0.09)"}
        >
          <Heading size="sm" color={"gray.800"}>
            What's new?
          </Heading>

          {news &&
            news.map((update, key) => {
              return (
                <Link
                  to={"/news/" + update.id}
                  style={{ textDecoration: "none" }}
                  key={key}
                >
                  <Flex justifyContent={"center"} width={"100%"} gap={4} mb={2}>
                    <Flex
                      borderRadius={14}
                      bg={"gray.100"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      px={8}
                      maxHeight={16}
                      maxWidth={14}
                    >
                      <chakra.span
                        fontSize={"1.4em"}
                        fontWeight={900}
                        color={update.color}
                      >
                        {update.icon === "HiAcademicCap" ? (
                          <HiAcademicCap />
                        ) : update.icon === "HiBeaker" ? (
                          <HiBeaker />
                        ) : (
                          <HiBookOpen />
                        )}
                      </chakra.span>{" "}
                    </Flex>
                    <Box>
                      <Text
                        fontSize={"sm"}
                        fontWeight={"extrabold"}
                        color={"gray.700"}
                      >
                        {update.title}
                      </Text>
                      <Text
                        fontSize={"xs"}
                        fontWeight={300}
                        color={"gray.600"}
                        noOfLines={2}
                      >
                        {update.description}
                      </Text>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightSideBar;
