/**
 * @file EliminarSprintModal.js
 * @brief Modal cuando se elimina un sprint
 */

import { useRef } from "react";
import { api } from "../../api";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router";

const EliminarSprint = ({ projectId, spId, isOpen, onClose, setSprints }) => {
  const cancelRef = useRef();
  const history = useHistory();

  const onDeleteSprint = () => {
    api.sprints.deleteSprint({ projectId, spId });
    api.sprints.getSprints(projectId).then(({ data }) => setSprints(data)); //actualizar que se elimino
    onClose(true);
    history.push(`/projects/${projectId}`);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Eliminar Sprint
          </AlertDialogHeader>

          <AlertDialogBody>
            ¿Está seguro que desea Eliminar el Sprint?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onDeleteSprint} ml={3}>
              Eliminar Sprint
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default EliminarSprint;
