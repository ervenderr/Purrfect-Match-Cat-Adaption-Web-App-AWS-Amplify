import React from "react";
import { Line } from "@ant-design/charts";

const ReportChart = () => {
  const data = [
    { month: "Jan", cats: 10 },
    { month: "Feb", cats: 8 },
    { month: "Mar", cats: 12 },
    { month: "Apr", cats: 6 },
    { month: "May", cats: 9 },
    { month: "Jun", cats: 11 },
    { month: "Jul", cats: 7 },
    { month: "Aug", cats: 5 },
    { month: "Sepr", cats: 10 },
    { month: "Oct", cats: 13 },
    { month: "Nov", cats: 9 },
    { month: "Dec", cats: 11 },
  ];

  const config = {
    data,
    xField: "month",
    yField: "cats",
    smooth: true, // Enable smooth line
    lineStyle: {
      lineWidth: 2,
      stroke: "#1890ff", // Line color
    },
    point: {
      shape: "circle",
      size: 4,
      style: {
        fill: "#1890ff", // Point color
        stroke: "#fff",
        lineWidth: 1,
      },
    },
    xAxis: {
      title: {
        text: "Month",
      },
    },
    yAxis: {
      title: {
        text: "Number of Cats",
      },
    },
    meta: {
      month: { alias: "Month" },
      cats: { alias: "Number of Cats" },
    },
    width: 760,
  };

  return <Line {...config} />;
};

export default ReportChart;
