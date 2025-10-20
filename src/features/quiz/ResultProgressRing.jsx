import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { PASSED, FAILED } from "../../helper/constants";
const ResultProgressRing = ({
  percentage = 0,
  status = FAILED,
  size = 140,
  thickness = 12,
}) => {
  const theme = useTheme();
  const [offset, setOffset] = useState(0);

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const color =
    status === PASSED ? theme.palette.success.main : theme.palette.error.main;

  useEffect(() => {
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);
  }, [setOffset, percentage, circumference]);

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          fontWeight: 600,
          color: color,
          userSelect: "none",
        }}
      >
        {percentage}%
      </Typography>
    </Box>
  );
};

export default ResultProgressRing;
