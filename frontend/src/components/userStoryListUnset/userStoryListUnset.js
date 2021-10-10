import React, { useState } from "react";

import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  toast,
  Grid,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { api } from "../../api";
import EstimarUsModal from "../../components/EstimarUsModal/EstimarUsModal";
const USList = ({
  projectId,
  setUserStories,
  userStories,
  nombreLista,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEstimarModal, setShowEstimarModal] = useState(false);
  const onClose = () => setIsOpen(false);
  const onDelete = (id) => {
    console.log(id);
    eliminarUS(id);
    setIsOpen(false);
  };
  const cancelRef = React.useRef();

  const eliminarUS = async (id) => {
    console.log(id);
    await api.eliminarUS(projectId, id);
    api.getUserStories(projectId).then(({ data }) => setUserStories(data));
  };

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const onCloseModal = () => setIsOpenModal(false);

  const initialRef = React.useRef();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [focusedUS, setFocusedUS] = useState();

  async function onSubmit(values) {
    //funcion que define el comportamiento al confirmar el form
    await api
      .editUS({ ...values, projectId, usId: focusedUS?.id })
      .then((res) => {
        if (res.id) {
          toast({
            description: "US cambiada.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            description: "US no pudo ser cambiada.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => console.log(err));
    api.getUserStories(projectId).then(({ data }) => setUserStories(data));
    setIsOpenModal(false);
  }

  return (
    <Box
      minHeight="100px"
      maxHeight="80%"
      borderWidth="1px"
      borderRadius="lg"
      fontSize="sm"
      bg={"#F5F4F5"}
      justifyContent="center"
    >
      <Flex justify="center">
        <Heading fontSize="2xl">{nombreLista}</Heading>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)">
        {userStories
          ? userStories.map((us) => {
              return (
                <Box
                  borderRadius="8"
                  p="2"
                  m="2"
                  key={us.id}
                  bg="white"
                  boxShadow="md"
                  w="xs"
                >
                  <Text fontSize="20px" fontWeight="semibold">
                    {us.nombre}
                  </Text>
                  <Text fontSize="15px">{us.contenido}</Text>
                  <Box mt="2">
                    <Text>{`Estimación SM: ${
                      us.estimacionSM || "Sin estimar"
                    }`}</Text>
                    <Text>{`Estimación Dev: ${
                      us.estimacionesDev || "Sin estimar"
                    }`}</Text>
                  </Box>
                  <Flex>
                    <Button
                      onClick={() => {
                        setIsOpenModal(true);
                        setFocusedUS(us);
                      }}
                      mt="2"
                    >
                      <EditIcon color="black.500" />
                    </Button>
                    <Button
                      onClick={() => {
                        setFocusedUS(us);
                        setShowEstimarModal(true);
                      }}
                      mt="2"
                    >
                      Estimar
                    </Button>
                    {focusedUS && (
                      <EstimarUsModal
                        projectId={projectId}
                        US={focusedUS}
                        rolUsuario={"SM"}
                        isOpen={showEstimarModal}
                        onClose={() => {
                          setShowEstimarModal(false);

                          api
                            .getUserStories(projectId)
                            .then(({ data }) => setUserStories(data));
                        }}
                      />
                    )}

                    <Modal
                      initialFocusRef={initialRef}
                      isOpen={isOpenModal}
                      onClose={onCloseModal}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Editar US</ModalHeader>

                        <ModalCloseButton />
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <ModalBody pb={6}>
                            <FormControl isInvalid={errors.name}>
                              <FormLabel htmlFor="name">Nombre US</FormLabel>
                              <Input
                                id="name"
                                ref={initialRef}
                                defaultValue={us.nombre}
                                {...register("usName", {
                                  required: "This is required",
                                  minLength: {
                                    value: 4,
                                    message: "Minimum length should be 4",
                                  },
                                })}
                              />
                              <FormErrorMessage>
                                {errors.name && errors.name.message}
                              </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.description} mt={4}>
                              <FormLabel htmlFor="description" mt={4}>
                                Descripción
                              </FormLabel>
                              <Input
                                id="description"
                                defaultValue={us.contenido}
                                {...register("description", {
                                  required: "This is required",
                                  minLength: {
                                    value: 4,
                                    message: "Minimum length should be 4",
                                  },
                                })}
                              />
                              <FormErrorMessage>
                                {errors.description &&
                                  errors.description.message}
                              </FormErrorMessage>
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              mr={4}
                              colorScheme="blue"
                              isLoading={isSubmitting}
                              type="submit"
                            >
                              Guardar
                            </Button>
                            <Button onClick={onCloseModal}>Cancelar</Button>
                          </ModalFooter>
                        </form>
                      </ModalContent>
                    </Modal>

                    <Button
                      onClick={() => setIsOpen(true)}
                      mt="2"
                      ml="auto"
                      bg="red.500"
                      _hover={{
                        background: "red.600",
                        color: "teal.500",
                      }}
                      _active={{
                        background: "red.600",
                      }}
                    >
                      <DeleteIcon color={"#F5F4F5"} />
                    </Button>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Eliminar US
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            ¿Está seguro que desea eliminar a esta US?
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancelar
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => onDelete(us.id)}
                              ml={3}
                            >
                              Eliminar
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Flex>
                </Box>
              );
            })
          : null}
      </Grid>

      {children}
    </Box>
  );
};

export default USList;
