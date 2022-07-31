import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserTableRow from "../../../components/table/UserTableRow";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      admins {
        id
        email
        password
        type
        adminProfile {
          login
        }
        charts {
          stepNumber
          createdAt
        }
      }
      users {
        id
        email
        password
        type
        userProfile {
          firstName
          lastName
        }
        charts {
          stepNumber
          createdAt
        }
      }
    }
  }
`;

const Users: React.FC = () => {
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USERS);
  const { admins = [], users = [] } = { ...data?.getUsers };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleAddUser = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateAdmin = () =>
    navigate({
      pathname: "/user/create",
      search: `?${createSearchParams({ type: "ADMIN" })}`,
    });

  const handleCreateUser = () =>
    navigate({
      pathname: "/user/create",
      search: `?${createSearchParams({ type: "USER" })}`,
    });

  const allUsers = admins
    .concat(users)
    .map((user: any) =>
      Object.fromEntries(
        Object.entries(user).map(([key, value]) =>
          ["adminProfile", "userProfile"].includes(key)
            ? ["profile", value]
            : [key, value]
        )
      )
    );

  return loading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={10}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ padding: 5 }}>
      <Typography align="center" variant="h4">
        Lista użytkowników
      </Typography>
      <Box style={{ height: 20 }} />
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          onClick={handleAddUser}
        >
          Dodaj
        </Button>
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleCreateAdmin}>Dodaj Admina</MenuItem>
          <MenuItem onClick={handleCreateUser}>Dodaj Usera</MenuItem>
        </Menu>
      </Box>
      <Box style={{ height: 20 }} />
      {allUsers.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ backgroundColor: "#f8f9fa" }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography variant="subtitle1">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Typ konta</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1">Akcja</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((props: any, index: React.Key) => (
                <UserTableRow key={index} {...props} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" variant="h6">
          Brak użytkowników
        </Typography>
      )}
    </Box>
  );
};

export default Users;
