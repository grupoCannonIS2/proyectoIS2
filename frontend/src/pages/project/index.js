import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Heading, Flex } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

export default function Index({ props }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState({}); //estado del proyecto

  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then((project) => setProject(project))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      minHeight="100vh"
      width="full"
      bg={"#F5F4F5"}
      color="#2b2d42"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        pos="fixed"
        top="50px"
        zIndex="100"
        bg={"#F7FFF7"}
        left="0"
        right="0"
        // boxShadow="md"
        width="full"
        p="5px"
        mb="3rem"
      >
        <Flex justifyContent="left">
          <Box>hola</Box>

          <Box></Box>

          <Box>
            {/* <Link to="/projects">Projects</Link> */}
            <Heading>ID proyecto</Heading>
          </Box>
        </Flex>
      </Box>
      {project ? ( //si ya se cargo el proyecto se muestra el mismo, si no se muestra la pantalla de carga
        <Box width="180px" borderWidth="5px" bg="#E2E8F0" height="50%">
          <Heading>{project.nombre}</Heading>
          <Heading>
            <Link to={`${projectId}/members`}>Miembros</Link>
          </Heading>
        </Box>
      ) : (
        <Spinner size="xl" />
      )}
      <Flex
        w="xs"
        height="200px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        fontSize="3xl"
        fontWeight="bold"
        bg="white"
        justifyContent="center"
        alignItems="center"
      >
        <Link to="/createProject/">Crear Proyecto</Link>
      </Flex>
    </Box>
  );
}
