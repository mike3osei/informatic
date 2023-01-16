import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiLogOut, FiSearch, FiUser } from "react-icons/fi";
import { Link as ReachLink } from "react-router-dom";
import Logo from "src/components/Logo";
import courses from "src/database/courses";

const Appbar = () => {
  const [currentCourses, setCurrentCourses] = useState(courses);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fuzzySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Full text search
    let filteredSearch = e.target.value;
    // Utilize Regex to filter text
    let buf = ".*" + filteredSearch.replace(/(.)/g, "$1.*").toLowerCase();
    let reg = new RegExp(buf);

    // Return filtered
    let searchResult = courses.filter(function (course) {
      return (
        reg.test(course.title.toLowerCase()) ||
        reg.test(course.description.toLowerCase())
      );
    });

    if (searchResult && searchResult.length) {
      setCurrentCourses(searchResult);
    }
  };

  return (
    <Flex
      position="sticky"
      flexDirection={"row"}
      top={0}
      zIndex={10}
      w={"100%"}
      px={10}
      py={4}
      boxShadow={"0 1px 5px 0 rgba(0, 0, 0, 0.065)"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Link as={ReachLink} to="/" style={{ textDecoration: "none" }}>
        <Logo isDark={true} />
      </Link>

      <InputGroup
        cursor="pointer"
        flexGrow={1}
        mx={8}
        display={{ sm: "none", md: "flex" }}
        onClick={onOpen}
      >
        <InputLeftElement ml={1} pointerEvents="none" color="gray.500">
          <FiSearch />
        </InputLeftElement>

        <Input
          variant="filled"
          justifyContent="flex-start"
          size="xs"
          fontSize={"0.85em"}
          py={"1.35em"}
          borderRadius={"lg"}
          color={"gray.400"}
          bg={"#F0F0F0"}
          _hover={{
            bg: "#f5f5f5",
          }}
          fontWeight={"700"}
          as={Button}
        >
          Search Courses
        </Input>
      </InputGroup>

      <Flex
        flexDirection={"row"}
        marginLeft={"auto"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"2xl"}
        gap={3}
      >
        <Flex
          flexDirection={"row"}
          marginLeft={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"2xl"}
          width={170}
          gap={3}
        >
          <Menu>
            <MenuButton>
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Flex flexDirection={"column"} textAlign={"right"} mr={4}>
                  <Text
                    fontWeight={600}
                    color={"blackAlpha.500"}
                    fontSize={"xs"}
                  >
                    Welcome
                  </Text>
                  <Text
                    mt={-0.5}
                    fontSize={"sm"}
                    color={"gray.700"}
                    fontWeight={"bold"}
                  >
                    Michael Osei
                  </Text>
                </Flex>

                <Avatar
                  name="Michael Osei"
                  src="/img/me.jpeg"
                  size={"md"}
                  bg="accent"
                />
              </Flex>
            </MenuButton>
            <MenuList
              borderRadius={"2xl"}
              shadow={"2xl"}
              border={"none"}
              overflow={"hidden"}
            >
              <Flex flexDirection={"row"} px={4} py={3}>
                <Avatar
                  name="Michael Osei"
                  src="/img/me.jpeg"
                  bg="accent"
                  size={"md"}
                />
                <Flex flexDirection={"column"} justifyContent={"center"} px={4}>
                  <Heading size={"xs"}>Michael Osei</Heading>
                  <Text fontSize={"xs"} color={"gray.600"}>
                    mike3osei@gmail.com
                  </Text>
                </Flex>
              </Flex>
              <hr></hr>
              <MenuItem fontSize={"sm"} fontWeight={500} py={2} px={5}>
                <Box mr={4}>
                  <FiUser />
                </Box>{" "}
                Support
              </MenuItem>
              <MenuItem fontSize={"sm"} fontWeight={500} py={2} px={5}>
                <Box mr={4}>
                  <FiLogOut />
                </Box>{" "}
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxHeight={"80vh"} overflowY={"auto"}>
          <ModalBody>
            <InputGroup flexGrow={1} onClick={onOpen} size={"lg"} mb={6}>
              <InputLeftElement ml={1} color="gray.500" pointerEvents="none">
                <FiSearch />
              </InputLeftElement>

              <Input
                py={"0.75em"}
                _hover={{
                  bg: "white",
                }}
                type="search"
                onChange={(searchInput) => fuzzySearch(searchInput)}
                placeholder="Search"
                color={"gray.700"}
                fontWeight={"700"}
                variant="flushed"
              ></Input>
            </InputGroup>

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
                    <ReachLink
                      to={"/course/" + course.id}
                      style={{ textDecoration: "none" }}
                      key={key}
                    >
                      <Flex
                        position={"relative"}
                        flexDirection={"row"}
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
                        <Flex
                          position={"relative"}
                          flexDirection={"column"}
                          flex={1}
                        >
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
                        </Flex>
                      </Flex>
                    </ReachLink>
                  );
                })}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Appbar;
