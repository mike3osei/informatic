import { Flex, Heading, Image, Progress, Text } from "@chakra-ui/react";
import { useState } from "react";
import courses from "src/database/courses";

import { Link } from "react-router-dom";
import Appbar from "src/components/Appbar";
import Sidebar from "src/components/Sidebar";

const AllCourses = () => {
  const [currentCourses, setCurrentCourses] = useState(courses);

  const renderFeed = () => {
    return (
      <Flex
        flexDirection={"column"}
        width={"100%"}
        pt={6}
        pb={14}
        gap={7}
        borderRadius={10}
      >
        {currentCourses &&
          currentCourses.map((course, key) => {
            return (
              <Link
                to={"/course/" + course.id}
                style={{ textDecoration: "none" }}
                key={key}
              >
                <Flex
                  position={"relative"}
                  flexDirection={"row"}
                  _hover={{
                    shadow: "md",
                  }}
                  border={"1px solid rgba(0, 0, 0, 0.05)"}
                  flex={1}
                  width={"100%"}
                  borderRadius={10}
                  overflow={"hidden"}
                >
                  <Flex
                    height={"-moz-max-content"}
                    width={150}
                    bg={course.imageBg}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mr={4}
                  >
                    <Image
                      alt={course.title}
                      opacity={0.9}
                      src={course.image}
                      boxSize="130px"
                      objectFit="contain"
                    ></Image>
                  </Flex>
                  <Flex position={"relative"} flexDirection={"column"} flex={1}>
                    <Flex
                      zIndex={3}
                      px={6}
                      pt={6}
                      pb={8}
                      flexDirection={"column"}
                      justifyContent={"left"}
                      textAlign={"left"}
                    >
                      <Text
                        color={"blackAlpha.600"}
                        mt={2}
                        fontSize={"sm"}
                        fontWeight={"bold"}
                        mb={1}
                      >
                        {course.studentType}
                      </Text>
                      <Heading
                        color={"black"}
                        maxWidth={"70%"}
                        fontSize={"1.3em"}
                      >
                        {course.title}
                      </Heading>
                      <Text
                        color={"blackAlpha.600"}
                        mt={2}
                        fontSize={"sm"}
                        mb={1}
                      >
                        {course.description}
                      </Text>
                    </Flex>

                    <Progress
                      borderRadius={"full"}
                      colorScheme={"red"}
                      size="xs"
                      mb={4}
                      mx={6}
                      zIndex={3}
                      value={course.progress}
                    />
                  </Flex>
                </Flex>
              </Link>
            );
          })}
      </Flex>
    );
  };

  return (
    <Flex flexDirection={"column"} height={"100vh"} textAlign={"left"}>
      <Appbar />

      <Flex
        flexDirection={"row"}
        width={"100%"}
        flex={1}
        position={"relative"}
        overflow={"hidden"}
      >
        <Flex flexDirection={"row"} flex={1} height={"100%"} overflowY={"auto"}>
          <Sidebar />
          <Flex
            transition="all 0.8s"
            px={{ sm: 10, md: 20, lg: 24 }}
            flexDirection={"column"}
            width={"100%"}
            flex={1.25}
            py={8}
          >
            <Heading size={"lg"} color={"gray.700"}>
              Courses
            </Heading>
            <Text fontSize={"sm"} color={"blackAlpha.600"}>
              Expand your mind and keep up with our latest courses
            </Text>
            {renderFeed()}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AllCourses;
