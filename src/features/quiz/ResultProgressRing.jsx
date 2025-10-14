import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const ResultProgressRing = ({
  percentage = 0,
  status = "fail",
  size = 140,
  thickness = 12,
}) => {
  const [offset, setOffset] = useState(0);

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const color = status === "pass" ? "#2e7d32" : "#d32f2f";

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
      {/* SVG Circle */}
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={thickness}
          fill="none"
        />
        {/* Progress circle */}
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

      {/* Centered percentage text */}
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
