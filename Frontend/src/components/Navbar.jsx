
import React from "react"
import { Button, Text } from "@chakra-ui/react"
import { Container, Flex, HStack, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaPlusSquare } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";





const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return <Container maxW={"1140px"} px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{ base: "column", sm: "row" }}
        >

            <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
            >
                <Link to={"/"}>Product Store 🛒</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <FaPlusSquare fontSize={20} />

                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <FaMoon /> : <MdSunny size={"20"} />}

                </Button>
            </HStack>




        </Flex>
    </Container>


}

export default Navbar