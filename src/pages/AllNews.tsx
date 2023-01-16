import { chakra, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import news from "src/database/news";

import { Link } from "react-router-dom";
import Appbar from "src/components/Appbar";
import Sidebar from "src/components/Sidebar";

import { HiAcademicCap, HiBeaker, HiBookOpen } from "react-icons/hi";

const AllNews = () => {
  const renderFeed = () => {
    return (
      <SimpleGrid
        columns={{ sm: 1, lg: 2, xl: 3 }}
        spacing="40px"
        pt={6}
        pb={20}
      >
        {news &&
          news.map((update, key) => {
            return (
              <Link
                to={"/news/" + update.id}
                style={{ textDecoration: "none" }}
                key={key}
              >
                <Flex
                  position={"relative"}
                  flexDirection={"column"}
                  _hover={{
                    shadow: "md",
                  }}
                  border={"1px solid rgba(0, 0, 0, 0.05)"}
                  flex={1}
                  borderRadius={10}
                  overflow={"hidden"}
                >
                  <Flex
                    height={"-moz-max-content"}
                    width={"100%"}
                    bg={"gray.50"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mr={4}
                    py={10}
                  >
                    <chakra.span
                      fontSize={"3em"}
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
                      <Heading
                        color={"black"}
                        maxWidth={"70%"}
                        fontSize={"1.3em"}
                      >
                        {update.title}
                      </Heading>
                      <Text
                        color={"blackAlpha.600"}
                        mt={2}
                        fontSize={"sm"}
                        mb={1}
                      >
                        {update.description}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Link>
            );
          })}
      </SimpleGrid>
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
            pt={8}
          >
            <Heading size={"lg"} color={"gray.700"}>
              News
            </Heading>
            <Text fontSize={"sm"} color={"blackAlpha.600"}>
              Updates & learnings from across the institute
            </Text>
            {renderFeed()}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AllNews;
