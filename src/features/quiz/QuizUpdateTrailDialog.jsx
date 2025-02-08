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

import { useGetQuizUpdateListByIdQuery } from "../../services/quiz";

import moment from "moment/moment";
import LoadingComponent from "../../components/LoadingComponent";
import BootstrapTooltip from "../../components/BootstrapTooltip";
import { formatDuration } from "../../helper/helper";

const QuizUpdateTrailDialog = ({ open, handleClose, quizId }) => {
  const {
    data: categoryAuditList = {
      actualEntity: {},
      auditLogDTOList: [],
      createdBy: "",
      createdAt: "",
    },
    isLoading,
  } = useGetQuizUpdateListByIdQuery(quizId, {
    skip: !Boolean(quizId),
  });
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
        maxWidth="xl"
      >
        <DialogTitle sx={{ letterSpacing: 1, fontWeight: 600 }}>
          Quiz Update Trail
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table size="small">
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
                      <TableCell>#</TableCell>
                      <TableCell>name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        // "& > *": { borderBottom: "unset" },
                        ".MuiTableCell-root": {
                          fontSize: "1rem",
                          letterSpacing: 1,
                          maxWidth: 170,
                          ".MuiBox-root": {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        },
                      }}
                    >
                      <TableCell />
                      <TableCell>
                        {categoryAuditList.actualEntity?.name ? (
                          <BootstrapTooltip
                            title={
                              <Typography>
                                {categoryAuditList.actualEntity?.name}
                              </Typography>
                            }
                          >
                            <Box>{categoryAuditList.actualEntity?.name}</Box>
                          </BootstrapTooltip>
                        ) : (
                          "--"
                        )}
                      </TableCell>
                      <TableCell>
                        {categoryAuditList.actualEntity?.categoryName ? (
                          <BootstrapTooltip
                            title={
                              <Typography>
                                {categoryAuditList.actualEntity?.categoryName}
                              </Typography>
                            }
                          >
                            <Box>
                              {categoryAuditList.actualEntity?.categoryName}
                            </Box>
                          </BootstrapTooltip>
                        ) : (
                          "--"
                        )}
                      </TableCell>
                      <TableCell>
                        {categoryAuditList.actualEntity?.description ? (
                          <BootstrapTooltip
                            title={
                              <Typography>
                                {categoryAuditList.actualEntity?.description}
                              </Typography>
                            }
                          >
                            <Box>
                              {categoryAuditList.actualEntity?.description}
                            </Box>
                          </BootstrapTooltip>
                        ) : (
                          "--"
                        )}
                      </TableCell>
                      <TableCell>
                        {categoryAuditList.createdBy ? (
                          <BootstrapTooltip
                            title={
                              <Typography>
                                {categoryAuditList.createdBy}
                              </Typography>
                            }
                          >
                            <Box>{categoryAuditList.createdBy}</Box>
                          </BootstrapTooltip>
                        ) : (
                          "--"
                        )}
                      </TableCell>
                      <TableCell>
                        {categoryAuditList.createdAt ? (
                          <BootstrapTooltip
                            title={
                              <Typography>
                                {moment(categoryAuditList.createdAt).format(
                                  "DD/MM/YYYY, hh:mma"
                                )}
                              </Typography>
                            }
                          >
                            <Box>
                              {moment(categoryAuditList.createdAt).format(
                                "DD/MM/YYYY, hh:mma"
                              )}
                            </Box>
                          </BootstrapTooltip>
                        ) : (
                          "--"
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <TableContainer sx={{ maxHeight: 310 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow
                      sx={{
                        ".MuiTableCell-root": {
                          fontSize: "1rem",
                          fontWeight: "bold",
                          letterSpacing: 1,
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      <TableCell>Sl No.</TableCell>
                      <TableCell>Updated Name</TableCell>
                      <TableCell />
                      <TableCell>Updated Category</TableCell>
                      <TableCell>Updated Description</TableCell>
                      <TableCell>Updated By</TableCell>
                      <TableCell>Updated At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Boolean(categoryAuditList.auditLogDTOList.length) ? (
                      categoryAuditList.auditLogDTOList.map((audit, index) => {
                        return (
                          <TableRow
                            key={audit.id}
                            sx={{
                              // "& > *": { borderBottom: "unset" },
                              ".MuiTableCell-root": {
                                fontSize: "1rem",
                                letterSpacing: 1,
                                maxWidth: 170,
                                ".MuiBox-root": {
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                },
                              },
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Chip
                                label="read only"
                                size="small"
                                variant="contained"
                                disabled
                              />
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" gap={1}>
                                <Chip
                                  label={audit.data.attemptableCount}
                                  color="primary"
                                  size="small"
                                />
                                <Chip
                                  label={formatDuration(audit.data.duration)}
                                  color="warning"
                                  size="small"
                                />
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label="read only"
                                size="small"
                                variant="contained"
                                disabled
                              />
                            </TableCell>
                            <TableCell>
                              <BootstrapTooltip
                                title={
                                  <Typography>
                                    {audit.data.description}
                                  </Typography>
                                }
                              >
                                <Box>{audit.data.description}</Box>
                              </BootstrapTooltip>
                            </TableCell>
                            <TableCell>
                              <BootstrapTooltip
                                title={
                                  <Typography>{audit.updatedBy}</Typography>
                                }
                              >
                                <Box>{audit.updatedBy}</Box>
                              </BootstrapTooltip>
                            </TableCell>
                            <TableCell>
                              <BootstrapTooltip
                                title={
                                  <Typography>
                                    {moment(audit.date).format(
                                      "DD/MM/YYYY, hh:mma"
                                    )}
                                  </Typography>
                                }
                              >
                                <Box>
                                  {moment(audit.date).format(
                                    "DD/MM/YYYY, hh:mma"
                                  )}
                                </Box>
                              </BootstrapTooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })
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
                        <TableCell colSpan={7}>
                          {isLoading ? "Fetcing data." : "No record found."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Ok</Button> */}
        </DialogActions>
      </Dialog>
      <LoadingComponent open={isLoading} />
    </React.Fragment>
  );
};

export default QuizUpdateTrailDialog;
