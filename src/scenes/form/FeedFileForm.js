import React, { useState } from 'react';
import './FormStyles.css';
import {
  Box,
  Button,
} from "@mui/material";


const FeedFileForm = ({ closeModal, onSubmit }) => {

  const [feedFileData, setFeedFileData] = useState({
    headerIndicator: '',
    trailerIndicator: '',
    firstRunIndicator: ''
  });

  const handleChange = (event) => {
    setFeedFileData({ ...feedFileData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(feedFileData);
    closeModal(feedFileData);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="header-feed-file">Feed File Information</h2>
        <div className="feed-form-div">
          <div className="form-mid">
            <select
              name="headerIndicator"
              value={feedFileData.headerIndicator}
              className="form-dropdown"
              onChange={handleChange}
            >
              <option value="">Select Header Indicator</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="form-mid">
            <select
              name="trailerIndicator"
              value={feedFileData.trailerIndicator}
              className="form-dropdown"
              onChange={handleChange}
            >
              <option value="">Select Trailer Indicator</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="form-mid">
            <select
              name="firstRunIndicator"
              value={feedFileData.firstRunIndicator}
              className="form-dropdown"
              onChange={handleChange}
              required
            >
              <option value="">Select First Run Indicator</option>
              <option value="first-run">First Run</option>
              <option value="delta-load">Delta Load</option>
            </select>
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
      </div>
    </form>
  );
};

export default FeedFileForm;
