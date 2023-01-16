import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Appbar from "src/components/Appbar";
import Sidebar from "src/components/Sidebar";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClassroom } from "src/context/classroom";
import discussions from "src/database/discussions";
import news from "src/database/news";
import DiscussionType from "src/types/DiscussionType";
import NewsType from "src/types/NewsType";

const News = () => {
  const params = useParams();
  const newsId = params.id;
  const [currentNews, setCurrentNews] = useState<NewsType>();
  const { randomUsers } = useClassroom();
  const [currentDiscussions, setCurrentDiscussions] = useState<
    DiscussionType[]
  >([]);

  useEffect(() => {
    const currentNews = news.filter((course) => course.id === Number(newsId));

    if (currentNews && currentNews.length) {
      const localNews = currentNews[0];
      setCurrentNews(localNews);

      fetchDiscussions();
    }
  }, [newsId]);

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
            py={14}
            px={{ sm: 10, md: 20, lg: 24, xl: 32 }}
          >
            <Flex flexDirection={"column"} textAlign={"left"}>
              <Flex alignItems={"center"} mb={3}>
                <Avatar
                  size={"sm"}
                  name={"Michael Osei"}
                  src="/img/proTwo.jpeg"
                />
                <Box ml="3">
                  <Text fontWeight="bold">
                    Michael Osei
                    <Badge ml="2" colorScheme="green">
                      Associate
                    </Badge>
                  </Text>
                </Box>
              </Flex>

              <Heading size={"xl"} mb={2} color={"blackAlpha.800"}>
                {currentNews?.title}
              </Heading>
              <Text fontSize={"md"} color={"blackAlpha.800"}>
                {currentNews?.description}
              </Text>
              <Divider my={6} />

              <Flex flexDirection={"column"} gap={6} pb={10} width={"100%"}>
                {currentNews?.blog &&
                  currentNews.blog.map((blog, key) => {
                    return (
                      <Text fontSize={"md"} color={"blackAlpha.800"}>
                        {blog}
                      </Text>
                    );
                  })}
              </Flex>
              <Divider my={3} />

              <Heading fontSize={"1em"} mb={2} mt={2} color={"gray.600"}>
                Comments
              </Heading>

              <Flex
                flexDirection={"column"}
                width={"100%"}
                gap={7}
                py={6}
                pb={20}
              >
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
    </Flex>
  );
};

export default News;
