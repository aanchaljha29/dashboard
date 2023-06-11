import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";
import axios from "axios";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [feedFileData, setFeedFileData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setFeedFileData(response.data);
      return response.data;
    } catch (error) {
      console.log("Unable to make connection to backend, encountered error:");
      console.log(error);
      return [];
    }
  }

  const completedTasks = feedFileData.filter((item) => item.completed).length;
  const nonCompletedTasks = feedFileData.filter((item) => !item.completed).length;

  // Prepare data for the bar graph
  const barGraphData = [
    { status: "Completed", value: completedTasks },
    { status: "Non-Completed", value: nonCompletedTasks },
  ];

  return (
    <ResponsiveBar
    data={barGraphData}
    keys={["value"]}
    indexBy="status"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    colors={{ scheme: "nivo" }}
    theme={{
      // added
      axis: {
        domain: {
          line: {
            stroke: colors.grey[100],
          },
        },
        legend: {
          text: {
            fill: colors.grey[100],
          },
        },
        ticks: {
          line: {
            stroke: colors.grey[100],
            strokeWidth: 1,
          },
          text: {
            fill: colors.grey[100],
          },
        },
      },
      legends: {
        text: {
          fill: colors.grey[100],
        },
      },
    }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Status",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Count",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    enableLabel={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
  />
    // return (
    // <ResponsiveBar
    //   data={barGraphData}
    //   theme={{
    //     // added
    //     axis: {
    //       domain: {
    //         line: {
    //           stroke: colors.grey[100],
    //         },
    //       },
    //       legend: {
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //       ticks: {
    //         line: {
    //           stroke: colors.grey[100],
    //           strokeWidth: 1,
    //         },
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //     },
    //     legends: {
    //       text: {
    //         fill: colors.grey[100],
    //       },
    //     },
    //   }}
    //   keys={["userId", "id", "title", "completed"]}
    //   indexBy="id"
    //   margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    //   padding={0.3}
    //   valueScale={{ type: "linear" }}
    //   indexScale={{ type: "band", round: true }}
    //   colors={{ scheme: "nivo" }}
    //   defs={[
    //     {
    //       id: "dots",
    //       type: "patternDots",
    //       background: "inherit",
    //       color: "#38bcb2",
    //       size: 4,
    //       padding: 1,
    //       stagger: true,
    //     },
    //     {
    //       id: "lines",
    //       type: "patternLines",
    //       background: "inherit",
    //       color: "#eed312",
    //       rotation: -45,
    //       lineWidth: 6,
    //       spacing: 10,
    //     },
    //   ]}
    //   borderColor={{
    //     from: "color",
    //     modifiers: [["darker", "1.6"]],
    //   }}
    //   axisTop={null}
    //   axisRight={null}
    //   axisBottom={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: isDashboard ? undefined : "country", // changed
    //     legendPosition: "middle",
    //     legendOffset: 32,
    //   }}
    //   axisLeft={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: isDashboard ? undefined : "food", // changed
    //     legendPosition: "middle",
    //     legendOffset: -40,
    //   }}
    //   enableLabel={false}
    //   labelSkipWidth={12}
    //   labelSkipHeight={12}
    //   labelTextColor={{
    //     from: "color",
    //     modifiers: [["darker", 1.6]],
    //   }}
    //   legends={[
    //     {
    //       dataFrom: "keys",
    //       anchor: "bottom-right",
    //       direction: "column",
    //       justify: false,
    //       translateX: 120,
    //       translateY: 0,
    //       itemsSpacing: 2,
    //       itemWidth: 100,
    //       itemHeight: 20,
    //       itemDirection: "left-to-right",
    //       itemOpacity: 0.85,
    //       symbolSize: 20,
    //       effects: [
    //         {
    //           on: "hover",
    //           style: {
    //             itemOpacity: 1,
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    //   role="application"
    //   barAriaLabel={function (e) {
    //     return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    //   }}
    // />
  );
};

export default BarChart;
