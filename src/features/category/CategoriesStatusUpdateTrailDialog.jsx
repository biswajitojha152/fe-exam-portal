import * as React from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useGetCategoriesStatusUpdateListQuery } from "../../services/category";

import moment from "moment/moment";

import LoadingComponent from "../../components/LoadingComponent";
import BootstrapTooltip from "../../components/BootstrapTooltip";

const AffectedEntities = React.memo(({ affectedEntities, isActive }) => {
  const initialLengthToShow = 1;
  const [show, setShow] = React.useState(false);
  const handleSetShow = React.useCallback(() => {
    setShow(true);
  }, []);
  return (
    <Stack direction="row" gap={1} flexWrap="wrap">
      {affectedEntities.slice(0, initialLengthToShow).map((affectedEntity) => {
        return (
          <React.Fragment key={affectedEntity.name}>
            <BootstrapTooltip
              title={<Typography>{affectedEntity.name}</Typography>}
            >
              <Chip
                size="small"
                sx={{ maxWidth: 200 }}
                label={affectedEntity.name}
                // size="small"
                color={isActive ? "success" : "error"}
              />
            </BootstrapTooltip>
          </React.Fragment>
        );
      })}
      {affectedEntities.length > initialLengthToShow &&
        (show ? (
          affectedEntities.slice(initialLengthToShow).map((affectedEntity) => {
            return (
              <React.Fragment key={affectedEntity.name}>
                <BootstrapTooltip
                  title={<Typography>{affectedEntity.name}</Typography>}
                >
                  <Chip
                    size="small"
                    sx={{ maxWidth: 200 }}
                    label={affectedEntity.name}
                    // size="small"
                    color={isActive ? "success" : "error"}
                  />
                </BootstrapTooltip>
              </React.Fragment>
            );
          })
        ) : (
          <Chip
            label={`+${affectedEntities.length - 1} more`}
            clickable
            size="small"
            onClick={handleSetShow}
          />
        ))}
    </Stack>
  );
});

const Row = React.memo(({ statusUpdateTrail, slNo }) => {
  return (
    <TableRow
      sx={{
        // "& > *": { borderBottom: "unset" },
        ".MuiTableCell-root": {
          fontSize: "1rem",
          letterSpacing: 1,
          maxWidth: 300,
          ".MuiBox-root": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        },
      }}
    >
      <TableCell>{slNo}</TableCell>
      <TableCell>
        <BootstrapTooltip
          title={
            <Typography>
              {moment(statusUpdateTrail.updatedAt).format("DD/MM/YYYY, hh:mma")}
            </Typography>
          }
        >
          <Box>
            {moment(statusUpdateTrail.updatedAt).format("DD/MM/YYYY, hh:mma")}
          </Box>
        </BootstrapTooltip>
      </TableCell>
      <TableCell>
        <BootstrapTooltip
          title={<Typography>{statusUpdateTrail.updatedBy}</Typography>}
        >
          <Box>{statusUpdateTrail.updatedBy}</Box>
        </BootstrapTooltip>
      </TableCell>
      <TableCell>
        <AffectedEntities
          affectedEntities={statusUpdateTrail.affectedEntities}
          isActive={statusUpdateTrail.isActive}
        />
      </TableCell>
      <TableCell>{statusUpdateTrail.remark}</TableCell>
    </TableRow>
  );
});

const CategoriesStatusUpdateTrailDialog = ({ open, handleClose }) => {
  const { data: categoriesStatusUpdateTrail = [], isLoading } =
    useGetCategoriesStatusUpdateListQuery(null, { skip: !open });
  const handleTransitionEnter = React.useCallback(() => {}, []);

  const handleTransitionExited = React.useCallback(() => {}, []);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        onTransitionEnter={handleTransitionEnter}
        onTransitionExited={handleTransitionExited}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ letterSpacing: 1, fontWeight: 600 }}>
          Categories Status Update Trail
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ maxHeight: 510 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow
                      sx={{
                        // "& > *": { borderBottom: "unset" },
                        ".MuiTableCell-root": {
                          fontSize: "1rem",
                          fontWeight: "bold",
                          letterSpacing: 1,
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      <TableCell>Sl No.</TableCell>
                      <TableCell>Updated At</TableCell>
                      <TableCell>Updated By</TableCell>
                      <TableCell>Categories Affected</TableCell>
                      <TableCell>Remark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Boolean(categoriesStatusUpdateTrail.length) ? (
                      categoriesStatusUpdateTrail.map(
                        (statusUpdateTrail, index) => {
                          return (
                            <Row
                              key={`${statusUpdateTrail.updatedAt}-${statusUpdateTrail.updatedBy}`}
                              statusUpdateTrail={statusUpdateTrail}
                              slNo={index + 1}
                            />
                          );
                        }
                      )
                    ) : (
                      <TableRow
                        sx={{
                          // "& > *": { borderBottom: "unset" },
                          ".MuiTableCell-root": {
                            fontSize: "1rem",
                            letterSpacing: 1,
                            textAlign: "center",
                            py: 1,
                          },
                        }}
                      >
                        <TableCell colSpan={5}>
                          {isLoading ? "Fetching data." : "No record found."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <LoadingComponent open={isLoading} />
    </React.Fragment>
  );
};

export default CategoriesStatusUpdateTrailDialog;
