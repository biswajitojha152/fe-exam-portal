import React from "react";
import {
  Paper,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Chip,
  Stack,
  Typography,
  Toolbar,
  TextField,
  Grid,
  InputAdornment,
  Box,
  IconButton,
  Checkbox,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import TimelineIcon from "@mui/icons-material/Timeline";

import { Link as RouterLink } from "react-router-dom";

import { setCategoryFilter } from "../quiz/quizSlice";

import { useDispatch } from "react-redux";

import {
  useGetAllCategoryQuery,
  useUpdateCategoriesStatusMutation,
} from "../../services/category";

import BootstrapTooltip from "../../components/BootstrapTooltip";
import LoadingComponent from "../../components/LoadingComponent";
import SnackAlert from "../../components/SnackAlert";
import CategoryUpdateTrailDialog from "./CategoryUpdateTrailDiralog";

const Row = React.memo(
  ({
    index,
    category,
    handleSetCategoryFilter,
    handleSetCategoryToUpdate,
    handleRowClick,
    isSelected,
    handleOpenCategoryUpdateTrailDialog,
  }) => {
    const dataCells = React.useMemo(
      () => (
        <React.Fragment>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            <Link
              underline="hover"
              component={RouterLink}
              to={`/quiz`}
              onClick={() => handleSetCategoryFilter(category)}
            >
              {category.name}
            </Link>
          </TableCell>
          <TableCell>
            <BootstrapTooltip
              title={<Typography>{category.description}</Typography>}
            >
              <Box
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {category.description}
              </Box>
            </BootstrapTooltip>
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={2}>
              <Chip
                label={category.categoryQuizCountDTO.totalQuizCount}
                variant="outlined"
                color="info"
              />
              <Chip
                label={category.categoryQuizCountDTO.activeQuizCount}
                color="success"
                variant="outlined"
              />
              <Chip
                label={category.categoryQuizCountDTO.inActiveQuizCount}
                color="error"
                variant="outlined"
              />
            </Stack>
          </TableCell>
          <TableCell>
            <BootstrapTooltip title="Update Category">
              <IconButton onClick={() => handleSetCategoryToUpdate(category)}>
                <DriveFileRenameOutlineIcon color="info" />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="Category update trail">
              <IconButton
                onClick={() => handleOpenCategoryUpdateTrailDialog(category.id)}
              >
                <TimelineIcon color="warning" />
              </IconButton>
            </BootstrapTooltip>
          </TableCell>
        </React.Fragment>
      ),
      [
        handleSetCategoryFilter,
        category,
        handleSetCategoryToUpdate,
        index,
        handleOpenCategoryUpdateTrailDialog,
      ]
    );
    return (
      <TableRow
        sx={{
          // "& > *": { borderBottom: "unset" },
          ".MuiTableCell-root": {
            fontSize: "1rem",
            letterSpacing: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 300,
            backgroundColor: category.isActive
              ? "transparent"
              : "rgba(255, 204, 203, 0.3)",
          },
        }}
      >
        <TableCell>
          <Checkbox
            checked={isSelected}
            onChange={(e) => handleRowClick(e.target.checked, category.id)}
          />
        </TableCell>
        {dataCells}
      </TableRow>
    );
  }
);

const CategoryListTable = ({ handleSetCategoryToUpdate }) => {
  const dispatch = useDispatch();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [selected, setSelected] = React.useState([]);
  const [filterData, setFilterData] = React.useState({
    search: "",
  });
  const [categoryUpdateTrailDialog, setCategoryUpdateTrailDialog] =
    React.useState(null);
  const [updateCategoriesStatus, updateCategoriesStatusRes] =
    useUpdateCategoriesStatusMutation();
  const { data: categoryList = [], isLoading } = useGetAllCategoryQuery();

  const filteredCategoryList = React.useMemo(
    () =>
      categoryList.filter(
        (category) =>
          new RegExp(filterData.search, "i").test(category.name) ||
          new RegExp(filterData.search, "i").test(category.description)
      ),
    [categoryList, filterData.search]
  );

  const handleRowClick = React.useCallback((checked, selectedId) => {
    if (checked === true) {
      setSelected((prevData) => [...prevData, selectedId]);
    } else if (checked === false) {
      setSelected((prevData) => [
        ...prevData.filter((id) => id !== selectedId),
      ]);
    }
  }, []);

  const handleSelectAllClick = React.useCallback(
    (checked) => {
      if (
        checked &&
        selected.length > 0 &&
        selected.length < filteredCategoryList.length
      ) {
        setSelected([]);
      } else if (checked) {
        setSelected(filteredCategoryList.map((category) => category.id));
      } else if (checked === false) {
        setSelected([]);
      }
    },
    [filteredCategoryList, selected]
  );

  const handleChange = React.useCallback((e) => {
    setFilterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSetCategoryFilter = React.useCallback(
    (category) => {
      dispatch(
        setCategoryFilter({
          category,
          categoryInputVal: category.name,
        })
      );
    },
    [dispatch]
  );

  const handleUpdateCategoryStatus = React.useCallback(
    (isActive) => {
      updateCategoriesStatus({
        ids: selected,
        isActive: isActive,
      })
        .unwrap()
        .then((res) => {
          setSnack({
            open: true,
            message: res.message,
            severity: "success",
          });
          setSelected([]);
        })
        .catch((err) => {
          setSnack({
            open: true,
            message: err.data?.message || err.data,
            severity: "error",
          });
        });
    },
    [updateCategoriesStatus, selected]
  );

  // const isSelected = React.useCallback(
  //   (id) => {
  //     return selected.indexOf(id) !== -1;
  //   },
  //   [selected]
  // );

  const isActiveButton = React.useMemo(
    () =>
      Boolean(selected.length) &&
      selected.every(
        (categoryId) =>
          filteredCategoryList.find((category) => category.id === categoryId)
            ?.isActive === false
      ),
    [selected, filteredCategoryList]
  );

  const isInActiveButton = React.useMemo(
    () =>
      Boolean(selected.length) &&
      selected.every(
        (categoryId) =>
          filteredCategoryList.find((category) => category.id === categoryId)
            ?.isActive === true
      ),
    [selected, filteredCategoryList]
  );

  const searchField = React.useMemo(
    () => (
      <TextField
        label="Search"
        name="search"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={filterData.search}
        onChange={handleChange}
        fullWidth
      />
    ),
    [filterData, handleChange]
  );

  const handleOpenCategoryUpdateTrailDialog = React.useCallback(
    (categoryId) => {
      setCategoryUpdateTrailDialog(categoryId);
    },
    []
  );

  React.useEffect(() => {
    setSelected((prevData) =>
      prevData.filter((id) =>
        filteredCategoryList.map((category) => category.id).includes(id)
      )
    );
  }, [filteredCategoryList]);

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Category List
          </Typography>
          <IconButton
          // onClick={() => handleOpenCategoryUpdateTrailDialog(category.id)}
          >
            <TimelineIcon color="warning" />
          </IconButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6} sm={1} md={5} xl={7} />
            <Grid item xs={6} sm={5} md={3} xl={2}>
              {isActiveButton && (
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  sx={{
                    display: "block",
                    width: "100%",
                    whiteSpace: "nowrap",
                    textTransform: "none",
                    fontSize: 16,
                    py: 0.75,
                  }}
                  onClick={() => handleUpdateCategoryStatus(true)}
                >
                  Set As Active
                </Button>
              )}
              {isInActiveButton && (
                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  sx={{
                    display: "block",
                    width: "100%",
                    whiteSpace: "nowrap",
                    textTransform: "none",
                    fontSize: 16,
                    py: 0.75,
                  }}
                  onClick={() => handleUpdateCategoryStatus(false)}
                >
                  Set As InActive
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
              {searchField}
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
      {Boolean(selected.length) && (
        <Typography
          sx={{
            pl: 2,
            pr: 1,
          }}
        >
          {`${selected.length} row${selected.length > 1 ? "s" : ""} selected`}
        </Typography>
      )}
      <TableContainer
        sx={{
          maxHeight: Boolean(selected.length) ? 500 : 512,
        }}
      >
        <Table stickyHeader>
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
              <TableCell>
                <Checkbox
                  onChange={(e) => handleSelectAllClick(e.target.checked)}
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < filteredCategoryList.length
                  }
                  checked={
                    Boolean(filteredCategoryList.length) &&
                    selected.length === filteredCategoryList.length
                  }
                  disabled={!Boolean(filteredCategoryList.length)}
                />
              </TableCell>
              <TableCell>Sl No.</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>
                Total Quizzes
                <Typography variant="body2">
                  Total | Active | InActive
                </Typography>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(filteredCategoryList.length) ? (
              filteredCategoryList.map((category, index) => {
                return (
                  <Row
                    key={category.id}
                    index={index}
                    category={category}
                    handleSetCategoryFilter={handleSetCategoryFilter}
                    handleSetCategoryToUpdate={handleSetCategoryToUpdate}
                    handleRowClick={handleRowClick}
                    // isSelected={isSelected(category.id)}
                    isSelected={selected.includes(category.id)}
                    handleOpenCategoryUpdateTrailDialog={
                      handleOpenCategoryUpdateTrailDialog
                    }
                  />
                );
              })
            ) : (
              <TableRow
                sx={{
                  ".MuiTableCell-root": {
                    fontSize: "1.1rem",
                    letterSpacing: 1,
                    textAlign: "center",
                    py: 2,
                  },
                }}
              >
                <TableCell colSpan={6}>No record found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CategoryUpdateTrailDialog
        open={Boolean(categoryUpdateTrailDialog)}
        categoryId={categoryUpdateTrailDialog}
        handleClose={() => setCategoryUpdateTrailDialog(null)}
        key={categoryUpdateTrailDialog}
      />
      <LoadingComponent
        open={isLoading || updateCategoriesStatusRes.isLoading}
      />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </Paper>
  );
};

export default React.memo(CategoryListTable);
