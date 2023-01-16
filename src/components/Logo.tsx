import { Flex, Image } from "@chakra-ui/react";
import LogoText from "./LogoText";

type LogoProps = {
  isDark: boolean;
};

const Logo = (props: LogoProps) => {
  const isDark = props.isDark;

  return (
    <Flex
      mt={-1}
      color={isDark ? "gray.800" : "white"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={"3xl"}
      minWidth={120}
    >
      <Flex mr={3} mt={"0.1em"} color={"accent"} fontWeight={800}>
        <Image
          alt={"logo"}
          src={"/img/logo.svg"}
          height={29}
          width={29}
          minHeight={29}
          minWidth={29}
        ></Image>
      </Flex>

      <Flex position={"relative"} mt={1}>
        <LogoText height={30} width={115} color={"#2D3848"} />
      </Flex>
    </Flex>
  );
};

export default Logo;
