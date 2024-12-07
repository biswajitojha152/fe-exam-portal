import React from "react";
import { Paper, Toolbar, Typography } from "@mui/material";

import Chart from "react-apexcharts";

const ChartComponent = ({ attemptsDTO }) => {
  const options = React.useMemo(
    () => ({
      labels: ["Passed Attempts", "Failed Attempts"],
      colors: ["#51A037", "#ED1C24"],
      chart: {
        events: {
          dataPointSelection: (e, chartContext, config) => {
            e.target.attributes.selected.value = "false";
          },
        },
      },
      dataLabels: {
        style: {
          fontSize: 16,
        },
      },
      legend: {
        position: "top",
        fontSize: 16,
        labels: {
          // colors: ["#222", "#222"],
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: 65,
            labels: {
              show: true,
              value: {
                show: true,
                // color: "#222",
                fontSize: 40,
                fontWeight: "bold",
                offsetY: 30,
              },
              total: {
                show: true,
                label: "Total Attempts",
                // color: theme.palette.common.black,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
          },
        },
      },
    }),
    []
  );
  const series = React.useMemo(
    () => [attemptsDTO.passedAttempts, attemptsDTO.failedAttempts],
    [attemptsDTO]
  );
  return (
    <Paper
      sx={{
        height: "100%",
      }}
    >
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            mb: { xs: 1 },
          },
        ]}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Quiz Attempt Summary
        </Typography>
      </Toolbar>
      <Chart options={options} series={series} type="donut" height={400} />
    </Paper>
  );
};

export default ChartComponent;
