/**
 * @file header.js
 * @brief Header de la página
 */

import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/loginButton/loginButton";
import LogoutButton from "../auth/logoutButton/logoutButton";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();

  return (
    <Box
      className="header"
      pos="fixed"
      as="header"
      top="0"
      zIndex="100"
      bg={
        location.pathname === "/"
          ? "#F7FFF7"
          : location.pathname === "/projects/:id"
          ? "blue"
          : "#F7FFF7"
      }
      left="0"
      right="0"
      boxShadow="md"
      width="full"
      p="5px"
      mb="3rem"
      height="55px"
    >
      {isAuthenticated ? (
        <Flex justifyContent="center">
          <Spacer />
          {location.pathname !== "/" ? (
            <Box>
              <Heading>
                <Link to="/profile">Trellon't</Link>
              </Heading>
            </Box>
          ) : null}
          <Spacer />

          {location.pathname !== "/profile" ? (
            <Box boxSize="40px">
              <Link to="/profile">
                <Image borderRadius="100" src={user.picture} />
              </Link>
            </Box>
          ) : null}
        </Flex>
      ) : (
        <Box mr="auto">
          <LoginButton />
        </Box>
      )}
    </Box>
  );
};

export default Header;
