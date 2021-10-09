import React, { useEffect, useState } from "react";
//! API del frontend.
import { api } from "../../api";
import { Spinner } from "@chakra-ui/spinner";
import {
  Box,
  Flex,
  HStack,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/button";

import USList from "../../components/userStoryList/userStoryList";
import { mapStateColor } from "../../styles/theme";
import { MdBuild } from "react-icons/md";
import { useHistory } from "react-router-dom";

/**
 * Función que contiene el código de la vista
 * @param { props } param0
 * @returns React Component
 */
export default function Index({ props }) {
  const projectId = props.computedMatch.params.id; //id del proyecto, se extrae del URL
  const [project, setProject] = useState(); //estado del proyecto
  const [userStories, setUserStories] = useState([]); //estado del proyecto

  const history = useHistory();

  //Al cargarse la pagina se busca el proyecto con el id del URL y se lo asigna a projectId
  useEffect(() => {
    api
      .getProjectById(projectId)
      .then(({ data }) => setProject(data))
      .catch((err) => console.log(err));

    api
      .getUserStories(projectId)
      .then(({ data }) => setUserStories(data))
      .catch((err) => console.log(err));
  }, [projectId]);

  console.log("Las us son:");
  console.log(userStories);

  return (
    <Box
      minHeight="100vh"
      minWidth="full"
      bg={mapStateColor(project?.estado)}
      color="#2b2d42"
      d="flex"
      justifyContent="left"
      overflow="auto"
    >
      {project ? ( //si ya se cargo el proyecto se muestra el mismo, si no se muestra la pantalla de carga
        <Box mt="3rem">
          <Box
            pos="fixed"
            top="55px"
            zIndex="100"
            bg={mapStateColor(project.estado) - 40}
            left="0"
            right="0"
            // boxShadow="md"
            width="full"
            pl="3"
            mb="3rem"
          >
            <HStack spacing="24px" fontSize="2xl" p="2">
              <Link to={`/projects/${projectId}`}>
                {/* <Link to="/projects">Projects</Link> */}
                <Text fontWeight="medium">{project.nombre}</Text>
              </Link>
              <Button
                colorScheme="yellow"
                variant="solid"
                // opacity="30%"
                onClick={() => history.push(`/projects/${projectId}/members`)}
              >
                Miembros
              </Button>
              <Button
                colorScheme="yellow"
                variant="solid"
                // opacity="30%"
                onClick={() => history.push(`/projects/${projectId}/roles`)}
              >
                Configurar Roles
              </Button>
              <Button
                leftIcon={<MdBuild />}
                colorScheme="yellow"
                variant="solid"
                // opacity="30%"
                onClick={() => history.push(`/projects/${projectId}/config`)}
              >
                Configurar Proyecto
              </Button>
            </HStack>
          </Box>
          <Box mt="50px">
            <HStack p="5" alignItems="top" float="top">
              <USList
                projectId={projectId}
                setUserStories={setUserStories}
                nombreLista="Pendiente"
                userStories={
                  //Es un array?
                  Array.isArray(userStories)
                    ? //Si es un array, qué elementos pertenecen a esta lista?
                      userStories?.filter((us) => us.estado === 0)
                    : //Si es un solo elemento, pertenece a esta lista?
                    userStories?.estado === 0
                    ? //Si pertenece retorno
                      userStories
                    : //Si no pertenece, null
                      null
                }
              ></USList>
              <USList
                projectId={projectId}
                setUserStories={setUserStories}
                nombreLista="En curso"
                userStories={
                  //Es un array?
                  Array.isArray(userStories)
                    ? //Si es un array, qué elementos pertenecen a esta lista?
                      userStories?.filter((us) => us.estado === 1)
                    : //Si es un solo elemento, pertenece a esta lista?
                    userStories?.estado === 1
                    ? //Si pertenece retorno
                      userStories
                    : //Si no pertenece, null
                      null
                }
              ></USList>
              <USList
                projectId={projectId}
                setUserStories={setUserStories}
                nombreLista="Hecho"
                userStories={
                  //Es un array?
                  Array.isArray(userStories)
                    ? //Si es un array, qué elementos pertenecen a esta lista?
                      userStories?.filter((us) => us.estado === 2)
                    : //Si es un solo elemento, pertenece a esta lista?
                    userStories?.estado === 2
                    ? //Si pertenece retorno
                      userStories
                    : //Si no pertenece, null
                      null
                }
              ></USList>
              <USList
                projectId={projectId}
                setUserStories={setUserStories}
                nombreLista="Backlog"
                userStories={
                  //Es un array?
                  Array.isArray(userStories)
                    ? //Si es un array, qué elementos pertenecen a esta lista?
                      userStories?.filter((us) => us.estado === 4)
                    : //Si es un solo elemento, pertenece a esta lista?
                    userStories?.estado === 4
                    ? //Si pertenece retorno
                      userStories
                    : //Si no pertenece, null
                      null
                }
              >
                <Flex justify="center">
                  <LinkBox
                    to={`/projects/${projectId}/createUS`}
                    pt="2px"
                    pl="2"
                    pr="2"
                    borderRadius="5"
                    m="10px"
                    justify="center"
                    d="flex"
                    _hover={{
                      background: "#F5F4F5",
                      color: "teal.500",
                    }}
                  >
                    <LinkOverlay
                      href={`/projects/${projectId}/createUS`}
                      fontSize="lg"
                    >
                      + agregar nueva tarjeta
                    </LinkOverlay>
                  </LinkBox>
                </Flex>
              </USList>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Flex align="center" ml="auto">
          <Spinner size="xl" />
        </Flex>
      )}
    </Box>
  );
}