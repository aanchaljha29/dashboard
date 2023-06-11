import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const FeedFile = () => {
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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "userId", headerName: "User ID", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "completed",
      headerName: "Completed",
      headerAlign: "left",
      align: "left",
      flex: 1,
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="Feed File"
        subtitle="List of Feed Files"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {feedFileData.length > 0 && (
          <DataGrid
            rows={feedFileData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default FeedFile;
