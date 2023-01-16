import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import Appbar from "src/components/Appbar";
import Sidebar from "src/components/Sidebar";

import { useEffect } from "react";
import { HiAcademicCap, HiCalendar } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useClassroom } from "src/context/classroom";
import courses from "src/database/courses";
import discussions from "src/database/discussions";
import CourseType from "src/types/CourseType";
import DiscussionType from "src/types/DiscussionType";

const Course = () => {
  const params = useParams();
  const courseId = params.id;
  const { randomUsers } = useClassroom();

  const [currentCourse, setCurrentCourse] = useState<CourseType>();
  const [currentDiscussions, setCurrentDiscussions] = useState<
    DiscussionType[]
  >([]);
  const [currentInputVal, setCurrentInputVal] = useState("");

  useEffect(() => {
    const currentCourses = courses.filter(
      (course) => course.id === Number(courseId)
    );

    if (currentCourses && currentCourses.length) {
      const localCourse = currentCourses[0];
      setCurrentCourse(localCourse);
    }
    fetchDiscussions();
  }, [courseId]);

  const fetchDiscussions = () => {
    let localDiscussions: DiscussionType[] = [];

    if (randomUsers && randomUsers.length) {
      for (let step = 0; step < 5; step++) {
        let randomPost =
          discussions[Math.floor(Math.random() * discussions.length)];
        let getRandomUser =
          randomUsers[Math.floor(Math.random() * randomUsers.length)];

        let finalPost: DiscussionType;

        if (
          getRandomUser &&
          getRandomUser.name &&
          getRandomUser.name.first &&
          getRandomUser.name.last &&
          getRandomUser.picture &&
          getRandomUser.picture.medium
        ) {
          let name = getRandomUser.name.first + " " + getRandomUser.name.last;
          let picture = getRandomUser.picture.medium;

          finalPost = {
            name: name,
            picture: picture,
            content: randomPost,
          };

          localDiscussions.push(finalPost);
        }
      }
    }

    setCurrentDiscussions(localDiscussions);
  };

  const capitalizeFirstLetter = (inputStr: string) => {
    return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
  };

  const sendAction = () => {
    if (currentInputVal.length) {
      let finalPost = {
        name: "Michael Osei",
        picture: "/img/proTwo.jpeg",
        content: currentInputVal,
      };

      currentDiscussions.unshift(finalPost);
      setCurrentInputVal("");
    }
  };

  return (
    <Flex flexDirection={"column"} bg={"white"} height={"100vh"}>
      <Appbar />

      <Flex
        bg={"white"}
        flexDirection="row"
        width={"100%"}
        flex={1}
        position={"relative"}
        overflow={"hidden"}
      >
        <Flex
          flexDirection={{ sm: "column", md: "row", lg: "row", xl: "row" }}
          flex={1}
          height={"100%"}
          overflowY={"auto"}
        >
          <Sidebar />
          <Flex
            transition="all 0.8s"
            flexDirection={"column"}
            width={"100%"}
            flex={1.25}
            pb={8}
            borderRight={{
              sm: "none",
              md: "1px solid #F2F2F2",
              lg: "1px solid #F2F2F2",
              xl: "1px solid #F2F2F2",
            }}
          >
            <Flex
              position={"relative"}
              height={"35vh"}
              width={"100%"}
              bg={currentCourse?.imageBg}
              borderBottomRightRadius={32}
              overflow={"hidden"}
            >
              <Image
                alt={currentCourse?.title}
                opacity={0.9}
                src={currentCourse?.image}
                boxSize="100%"
                objectFit="cover"
              ></Image>
              <Box
                position={"absolute"}
                bgGradient="linear(to-b, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))"
                top={0}
                left={0}
                height={"100%"}
                width={"100%"}
              ></Box>

              <Box position={"absolute"} bottom={5} right={5}>
                <CircularProgress
                  value={currentCourse?.progress}
                  size="45px"
                  color="red.500"
                >
                  <CircularProgressLabel color={"white"} fontWeight={"bold"}>
                    {currentCourse?.progress + "%"}
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>

              <Flex
                flexDirection={"column"}
                textAlign={"left"}
                position={"absolute"}
                bottom={5}
                left={8}
              >
                <Text
                  fontWeight={"bold"}
                  fontSize={"sm"}
                  color={"whiteAlpha.800"}
                >
                  {currentCourse?.studentType}
                </Text>
                <Heading size={"lg"} color={"white"}>
                  {currentCourse?.title}
                </Heading>
              </Flex>
            </Flex>

            <Flex
              textAlign={"left"}
              flexDirection={"column"}
              px={{ sm: 5, md: 10, lg: 10 }}
              py={6}
              gap={4}
            >
              <Flex flexDirection={"column"} width={"100%"}>
                <Text
                  fontWeight={"bold"}
                  fontSize={"sm"}
                  mb={1}
                  color={"gray.500"}
                >
                  Professor
                </Text>
                <Flex>
                  <Avatar name={"Michael Osei"} src="/img/proTwo.jpeg" />
                  <Box ml="3">
                    <Text fontWeight="bold">
                      Michael Osei
                      <Badge ml="2" colorScheme="green">
                        Associate
                      </Badge>
                    </Text>
                    <Text fontSize="sm">Bioinformatic Department</Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex flexDirection={"column"} width={"100%"}>
                <Text
                  fontWeight={"bold"}
                  fontSize={"sm"}
                  mb={1}
                  color={"gray.500"}
                >
                  Course Description
                </Text>
                <Text fontSize={"md"} color={"blackAlpha.800"}>
                  {currentCourse?.description}
                </Text>
              </Flex>
              <Flex flexDirection={"column"} width={"100%"} gap={2}>
                <Text
                  fontWeight={"bold"}
                  fontSize={"sm"}
                  mb={1}
                  color={"gray.500"}
                >
                  Actions
                </Text>
                <Button
                  leftIcon={<HiAcademicCap />}
                  borderRadius={"full"}
                  colorScheme={"red"}
                  fontSize={"0.9em"}
                  py={6}
                >
                  {currentCourse?.status
                    ? capitalizeFirstLetter(currentCourse!.status)
                    : ""}
                </Button>
                <Button
                  leftIcon={<HiCalendar />}
                  borderRadius={"full"}
                  colorScheme={"blackAlpha"}
                  fontSize={"0.9em"}
                  py={6}
                >
                  Schedule Appointment
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            flex={1.5}
            px={{ sm: 6, md: 10, lg: 10 }}
            py={5}
            flexDirection={"column"}
            textAlign={"left"}
          >
            <Text fontSize={"sm"} color={"blackAlpha.600"}>
              Classroom
            </Text>
            <Heading fontSize={"1.4em"} color={"gray.600"}>
              Discussion
            </Heading>

            <Flex width={"100%"} flexDirection={"column"} my={4}>
              <Textarea
                placeholder="Share with the class"
                value={currentInputVal}
                borderBottomRadius={0}
                fontSize={"sm"}
                bg={"#F7FAFB"}
                border={"none"}
                onChange={(e) => setCurrentInputVal(e.target.value)}
              />
              <Button
                color={"gray.500"}
                fontSize={"0.85em"}
                borderTopRadius={0}
                onClick={() => sendAction()}
                isDisabled={!(currentInputVal.length > 0)}
                rightIcon={<IoMdSend />}
              >
                Send Message
              </Button>
            </Flex>

            <Flex flexDirection={"column"} width={"100%"} gap={7} py={6}>
              {currentDiscussions &&
                currentDiscussions.map((discussion, key) => {
                  return (
                    <Flex flexDirection={"column"} width={"100%"} key={key}>
                      <Flex width={"100%"}>
                        <Avatar
                          name={discussion.name}
                          src={discussion.picture}
                        />
                        <Box ml="3">
                          <Text fontWeight="bold">{discussion.name}</Text>
                          <Text fontSize="sm">{discussion.content}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  );
                })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Course;
