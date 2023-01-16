import { Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";

import Appbar from "src/components/Appbar";
import Sidebar from "src/components/Sidebar";

import { useEffect } from "react";
import { useClassroom } from "src/context/classroom";
import MemberType from "src/types/MemberType";

const Classmates = () => {
  const [currentMembers, setCurrentMembers] = useState<MemberType[]>([]);
  const { randomUsers } = useClassroom();

  useEffect(() => {
    fetchClass();
  }, []);

  const fetchClass = () => {
    let localMembers: MemberType[] = [];

    if (randomUsers && randomUsers.length) {
      for (let step = 0; step < 70; step++) {
        let getRandomUser =
          randomUsers[Math.floor(Math.random() * randomUsers.length)];

        let finalMembers: MemberType;

        if (
          getRandomUser &&
          getRandomUser.name &&
          getRandomUser.name.first &&
          getRandomUser.name.last &&
          getRandomUser.picture &&
          getRandomUser.picture.large
        ) {
          let name = getRandomUser.name.first + " " + getRandomUser.name.last;
          let picture = getRandomUser.picture.large;

          finalMembers = {
            name: name,
            picture: picture,
          };

          // Get Unique Members
          if (!(localMembers.filter((e) => e.name === name).length > 0)) {
            localMembers.push(finalMembers);
          }
        }
      }
    }

    setCurrentMembers(localMembers);
  };

  const renderFeed = () => {
    return (
      <SimpleGrid
        columns={{ sm: 2, lg: 4, xl: 4 }}
        spacing="40px"
        pt={6}
        pb={20}
      >
        {currentMembers &&
          currentMembers.map((member, key) => {
            return (
              <Flex
                key={key}
                position={"relative"}
                flexDirection={"column"}
                flex={1}
                borderRadius={10}
                overflow={"hidden"}
              >
                <Flex
                  height={"-moz-max-content"}
                  width={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image
                    alt={member.name}
                    src={member.picture}
                    boxSize="20px 20px"
                    objectFit="cover"
                    bg={"gray.50"}
                    borderRadius={"full"}
                    border={"6px solid rgba(0,0,0,0.05)"}
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
                    <Heading
                      color={"gray.700"}
                      maxWidth={"100%"}
                      fontSize={"1em"}
                    >
                      {member.name}
                    </Heading>
                  </Flex>
                </Flex>
              </Flex>
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
            pt={8}
          >
            <Heading size={"lg"} color={"gray.700"}>
              Classmates
            </Heading>
            <Text fontSize={"sm"} color={"blackAlpha.600"}>
              Meet and network with fellow classmates
            </Text>
            {renderFeed()}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Classmates;
