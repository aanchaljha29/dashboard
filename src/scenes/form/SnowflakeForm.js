import React, { useState } from 'react';
import './FormStyles.css';
import {
  Box,
  Button,
} from "@mui/material";

const SnowflakeForm = ({ closeModal, onSubmit }) => {

  const [snowflakeData, setSnowflakeData] = useState({
    warehouseName: '',
    targetTableName: '',
    feedProvider: '',
    stageName: '',
    s3Location: ''
  });

  const handleChange = (event) => {
    setSnowflakeData({ ...snowflakeData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(snowflakeData);
    closeModal(snowflakeData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="header-snowflake">Snowflake</h2>
        <div className="snowflake-form-div">
          <div className="form-mid">
            <input
              className="snowflake-input"
              required
              placeholder="Enter Warehouse Name"
              type="text"
              name="warehouseName"
              value={snowflakeData.warehouseName}
              onChange={handleChange}
            />
            <input
              className="snowflake-input"
              required
              placeholder="Enter Target Table Name"
              type="text"
              name="targetTableName"
              value={snowflakeData.targetTableName}
              onChange={handleChange}
            />
            <input
              className="snowflake-input"
              required
              id="feed-provider"
              placeholder="Enter Feed Provider"
              type="text"
              name="feedProvider"
              value={snowflakeData.feedProvider}
              onChange={handleChange}
            />
            <input
              className="snowflake-input"
              required
              id="stage-name"
              placeholder="Enter Stage Name"
              type="text"
              name="stageName"
              value={snowflakeData.stageName}
              onChange={handleChange}
            />
            <input
              className="snowflake-input"
              required
              id="s3-location"
              placeholder="Enter S3 Location"
              type="text"
              name="s3Location"
              value={snowflakeData.s3Location}
              onChange={handleChange}
            />
          </div>
        </div>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            onClick={() => { }}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </div>
    </form>
  );
};

export default SnowflakeForm;
