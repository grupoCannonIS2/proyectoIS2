/**
 * @file loginButton.js
 * @brief Botón de inicio de sesión
 */

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = (props) => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <Button
      className="loginButton"
      onClick={() => loginWithRedirect()}
      borderRadius="4px"
      bg="buttonScale.800"
      color="richBlack"
      _hover={{
        background: "buttonScale.900",
        color: "#f7fff7",
      }}
      isLoading={isLoading}
    >
      {props.title}
    </Button>
  );
};

LoginButton.defaultProps = {
  title: 'Iniciar sesión'
}

export default LoginButton;
