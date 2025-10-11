import { useState, useCallback, useMemo } from "react";

import { useGetAllUserQuery } from "../../services/users";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Chip from "@mui/material/Chip";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import LoadingComponent from "../../components/LoadingComponent";

import { ADMIN } from "../../helper/constants";
import { isSubstringMatch } from "../../helper/helper";

const UserListTable = () => {
  const { data: users = [], isLoading } = useGetAllUserQuery();

  const [filterData, setFilterData] = useState({
    search: "",
  });

  const handleChange = useCallback((name, value) => {
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const searchField = useMemo(
    () => (
      <TextField
        label="Search"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={filterData.search}
        onChange={(e) => handleChange("search", e.target.value)}
        fullWidth
      />
    ),
    [filterData, handleChange]
  );

  const filteredUserList = useMemo(
    () =>
      users.filter(
        (user) =>
          isSubstringMatch(user.firstName, filterData.search) ||
          isSubstringMatch(user.lastName, filterData.search) ||
          isSubstringMatch(user.username, filterData.search) ||
          isSubstringMatch(user.email, filterData.search)
      ),
    [users, filterData.search]
  );

  return (
    <Paper>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            flexDirection: { xs: "column", sm: "row" },
            // mb: { xs: 1 },
          },
        ]}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Users List
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={12} sm={6} md={8} xl={9} />
              <Grid item xs={12} sm={6} md={4} xl={3}>
                {searchField}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Toolbar>
      <Alert severity="info" sx={{ mb: 2 }}>
        <AlertTitle>Privacy Alert</AlertTitle>
        To protect privacy, sensitive informations of other users are hidden.
      </Alert>
      <TableContainer sx={{ maxHeight: 430 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-root": {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  letterSpacing: 1,
                  whiteSpace: "nowrap",
                  // width: "300px",
                },
              }}
            >
              <TableCell>Sl No.</TableCell>
              <TableCell />
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(filteredUserList.length) ? (
              filteredUserList.map((user, index) => {
                return (
                  <TableRow
                    key={user.username}
                    sx={{
                      // "& > *": { borderBottom: "unset" },
                      ".MuiTableCell-root": {
                        fontSize: "1rem",
                        letterSpacing: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 300,
                        backgroundColor: user.isActive
                          ? "transparent"
                          : "var(--clr-in-active)",
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar
                        alt="KBO"
                        src={user.profilePicture}
                        sx={{ width: 35, height: 35 }}
                      />
                    </TableCell>
                    <TableCell>{user.firstName || "--"}</TableCell>
                    <TableCell>{user.lastName || "--"}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email || "--"}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={user.role === ADMIN ? "error" : "primary"}
                        icon={
                          user.role === ADMIN ? (
                            <AdminPanelSettingsIcon />
                          ) : (
                            <PersonIcon />
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow
                sx={{
                  ".MuiTableCell-root": {
                    fontSize: "1.1rem",
                    letterSpacing: 1,
                    textAlign: "center",
                    py: 1.5,
                  },
                }}
              >
                <TableCell colSpan={7}>
                  {isLoading ? "Fetching data." : "No record found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <LoadingComponent open={isLoading} />
    </Paper>
  );
};

export default UserListTable;
