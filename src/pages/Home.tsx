import {
  Flex,
  Heading,
  Image,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import courses from "src/database/courses";

import { Link } from "react-router-dom";
import Appbar from "src/components/Appbar";
import RightSideBar from "src/components/RightSideBar";
import Sidebar from "src/components/Sidebar";

const Home = () => {
  const [currentCourses, setCurrentCourses] = useState(courses);
  const [tabStatus, setTabStatus] = useState("all");

  const updateFeed = (index: number) => {
    if (index === 0) {
      setTabStatus("all");
      setCurrentCourses(courses);
    } else if (index === 1) {
      const newStatus = "current";
      const updatedCourses = courses.filter(
        (course) => course.status === newStatus
      );
      setCurrentCourses(updatedCourses);
      setTabStatus(newStatus);
    } else if (index === 2) {
      const newStatus = "previous";
      const updatedCourses = courses.filter(
        (course) => course.status === newStatus
      );
      setCurrentCourses(updatedCourses);
      setTabStatus(newStatus);
    } else if (index === 3) {
      const newStatus = "future";
      const updatedCourses = courses.filter(
        (course) => course.status === newStatus
      );
      setCurrentCourses(updatedCourses);
      setTabStatus(newStatus);
    }
  };

  const renderFeed = () => {
    return (
      <Flex
        flexDirection={"column"}
        width={"100%"}
        pt={3}
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
                  border={"1px solid rgba(0, 0, 0, 0.05)"}
                  _hover={{
                    shadow: "md",
                  }}
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
            <Text fontSize={"sm"} color={"blackAlpha.600"}>
              Welcome
            </Text>
            <Heading size={"lg"} color={"gray.700"}>
              Courses
            </Heading>

            <Tabs
              mt={4}
              onChange={(index) => updateFeed(index)}
              colorScheme="red"
              borderColor={"blackAlpha.100"}
            >
              <TabList>
                <Tab
                  fontSize={"sm"}
                  color={"blackAlpha.500"}
                  _selected={{ color: "primary", borderColor: "primary" }}
                  _hover={{ color: "red.500" }}
                  fontWeight={800}
                >
                  All
                </Tab>
                <Tab
                  fontSize={"sm"}
                  color={"blackAlpha.500"}
                  _hover={{ color: "red.500" }}
                  _selected={{ color: "primary", borderColor: "primary" }}
                  fontWeight={800}
                >
                  Current
                </Tab>
                <Tab
                  fontSize={"sm"}
                  color={"blackAlpha.500"}
                  _hover={{ color: "red.500" }}
                  _selected={{ color: "primary", borderColor: "primary" }}
                  fontWeight={800}
                >
                  Previous
                </Tab>

                <Tab
                  fontSize={"sm"}
                  color={"blackAlpha.500"}
                  _hover={{ color: "red.500" }}
                  _selected={{ color: "primary", borderColor: "primary" }}
                  fontWeight={800}
                >
                  Upcoming
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0}>{renderFeed()}</TabPanel>
                <TabPanel px={0}>{renderFeed()}</TabPanel>
                <TabPanel px={0}>{renderFeed()}</TabPanel>
                <TabPanel px={0}>{renderFeed()}</TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>

          <RightSideBar />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
