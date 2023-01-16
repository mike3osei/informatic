import { Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BsBell,
  BsGear,
  BsJournalBookmarkFill,
  BsNewspaper,
  BsPeople,
} from "react-icons/bs";
import { MdBubbleChart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(-1);

  const sideMenu = [
    {
      id: 0,
      name: "Home",
      icon: <ListIcon ml={-4} mr={3} as={MdBubbleChart} fontSize={"2xl"} />,
      destination: "/",
    },
    {
      id: 1,
      name: "News",
      icon: <ListIcon ml={-4} mr={3} as={BsNewspaper} fontSize={"xl"} />,
      destination: "/news",
    },
    {
      id: 2,
      name: "Courses",
      icon: (
        <ListIcon ml={-4} mr={3} as={BsJournalBookmarkFill} fontSize={"xl"} />
      ),
      destination: "/courses",
    },
    {
      id: 3,
      name: "Classmates",
      icon: <ListIcon ml={-4} mr={3} as={BsPeople} fontSize={"xl"} />,
      destination: "/classmates",
    },
    {
      id: 4,
      name: "Notifications",
      icon: <ListIcon ml={-4} mr={3} as={BsBell} fontSize={"xl"} />,
      destination: "/",
    },
    {
      id: 5,
      name: "Settings",
      icon: <ListIcon ml={-4} mr={3} as={BsGear} fontSize={"xl"} />,
      destination: "/",
    },
  ];

  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    if (pathName.includes("course")) {
      setCurrentMenuIndex(2);
    } else if (pathName.includes("news")) {
      setCurrentMenuIndex(1);
    } else if (pathName.includes("classmates")) {
      setCurrentMenuIndex(3);
    } else {
      setCurrentMenuIndex(0);
    }
  }, [pathName]);

  return (
    <Flex
      position={"sticky"}
      top={0}
      display={{ sm: "none", md: "flex", lg: "flex" }}
      flex={1}
      minWidth={"280px"}
      bg={"#f5f5f5"}
      borderColor={"blackAlpha.200"}
      maxWidth={270}
      flexDirection={"column"}
    >
      <List width={"100%"} pr={5} mt={8} fontWeight={1000} fontSize={"sm"}>
        {sideMenu &&
          sideMenu.map((menuItem, key) => {
            return (
              <Link to={menuItem.destination} key={key}>
                <ListItem
                  mb={3}
                  px={8}
                  py={3}
                  display={"flex"}
                  alignItems={"center"}
                  color={
                    currentMenuIndex === menuItem.id ? "white" : "gray.500"
                  }
                  borderRadius={"full"}
                  mx={4}
                  backgroundColor={
                    currentMenuIndex === menuItem.id ? "primary" : "transparent"
                  }
                  cursor={"pointer"}
                  fontWeight={600}
                  _hover={{
                    color:
                      currentMenuIndex === menuItem.id ? "white" : "primary",
                    backgroundColor:
                      currentMenuIndex === menuItem.id
                        ? "red.600"
                        : "transparent",
                  }}
                  transition="all 0.2s"
                  letterSpacing={1.25}
                  fontSize={"0.8em"}
                >
                  {menuItem.icon}

                  <Text fontWeight={600} fontSize={"1.1em"}>
                    {menuItem.name}
                  </Text>
                </ListItem>
              </Link>
            );
          })}
      </List>
    </Flex>
  );
};

export default Sidebar;
