import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { GET_USERS } from "../../views/users/list/Users";

const REMOVE_USER = gql`
  mutation RemoveUser($id: Float!) {
    removeUser(id: $id)
  }
`;

type TDialogHandler = () => void;

interface IRemoveUserDialog {
  id: number;
  name: string;
  isDialogOpen: boolean;
  handleDialogClose: TDialogHandler;
}

const RemoveUserDialog: React.FC<IRemoveUserDialog> = ({
  id,
  name,
  isDialogOpen,
  handleDialogClose,
}) => {
  const [removeUser, { loading }] = useMutation(REMOVE_USER, {
    onCompleted: (data) => {
      if (data?.removeUser) handleDialogClose();
    },
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleRemoveUser = () => removeUser({ variables: { id } });

  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Usuwanie użytkownika</DialogTitle>
      <DialogContent>
        Czy na pewno chcesz usunąć użytkownika "{name}" ?
      </DialogContent>
      <DialogActions>
        {!loading ? (
          <Button onClick={handleRemoveUser}>OK</Button>
        ) : (
          <CircularProgress />
        )}
        <Button disabled={loading} onClick={handleDialogClose}>
          Anuluj
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveUserDialog;
