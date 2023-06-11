import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Modal from "react-modal";
import React, { useState } from "react";
import FeedFileForm from "./FeedFileForm";
import SnowflakeForm from "./SnowflakeForm";
import "./FormStyles.css";

Modal.setAppElement("#root");

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [fileName, setFileName] = useState("");
  const [sourceType, setSourceType] = useState("1");
  const [destinationType, setDestinationType] = useState("2");
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [dataTransferInfo, setDataTransferInfo] = useState({
    description: "",
    businessGroup: "",
    supportEmailGroup: "",
    primaryContactEmail: "",
  });
  const [sourceFormData, setSourceFormData] = useState("");
  const [destinationFormData, setDestinationFormData] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

  const handleChange = (event) => {
    setDataTransferInfo({
      ...dataTransferInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log({
    //   sourceType: sourceType,
    //   sourceFormData: sourceFormData,
    //   destinationType: destinationType,
    //   destinationFormData: destinationFormData,
    //   dataTransferData: dataTransferInfo
    // });
    // setFileName('');
    // setSourceType('');
    // setDestinationType('');
    // setDataTransferInfo({
    //   description: '',
    //   businessGroup: '',
    //   supportEmailGroup: '',
    //   primaryContactEmail: ''
    // });
  };

  const handleTypeChange = (event, isSource) => {
    const selectedType = event.target.value;
    if (isSource) {
      setSourceType(selectedType);
      setShowSourceModal(selectedType !== "");
    } else {
      setDestinationType(selectedType);
      setShowDestinationModal(selectedType !== "");
    }
    const selectedValue = event.target.value;
    setShowPopup(selectedValue !== "");
  };

  const closeSourceModal = (formData) => {
    if (formData === undefined) {
      setSourceType("1");
    }
    setShowSourceModal(false);
    console.log(showSourceModal);
  };

  const closeDestinationModal = (snowflake) => {
    if (snowflake === undefined) {
      setDestinationType("2");
    }
    setShowDestinationModal(false);
  };

  const handleFormSubmit1 = (formData, isSourceModal) => {
    if (isSourceModal) {
      if (formData) {
        setSourceType(sourceType);
        setSourceFormData(formData);
        console.log("Source form data:", formData);
      } else {
        setSourceType("1");
      }
    } else {
      setDestinationFormData(formData);
      console.log("Destination Form Data:", formData);
    }
  };

  const dropdownOptions = [
    { value: "feed-file", label: "Feed File" },
    { value: "snowflake", label: "Snowflake" },
  ];

  const renderForm = (selectedValue, closeModal, onSubmit) => {
    if (selectedValue !== "") {
      const selectedOption = dropdownOptions.find(
        (option) => option.value === selectedValue
      );
      if (selectedOption) {
        const Component =
          selectedOption.value === "feed-file" ? FeedFileForm : SnowflakeForm;
        return <Component closeModal={closeModal} onSubmit={onSubmit} />;
      }
    }
    return null;
  };

  return (
    <Box m="20px">
      <Header title="ADD A FEED FILE" subtitle="Data Transfer Information" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Business Group"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.businessGroup}
                name="businessGroup"
                error={!!touched.businessGroup && !!errors.businessGroup}
                helperText={touched.businessGroup && errors.businessGroup}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Support Email Group"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.supportEmailGroup}
                name="supportEmailGroup"
                error={
                  !!touched.supportEmailGroup && !!errors.supportEmailGroup
                }
                helperText={
                  touched.supportEmailGroup && errors.supportEmailGroup
                }
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Primary Contact Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.primaryContactEmail}
                name="primaryContactEmail"
                error={
                  !!touched.primaryContactEmail && !!errors.primaryContactEmail
                }
                helperText={
                  touched.primaryContactEmail && errors.primaryContactEmail
                }
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              mt="50px"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="File Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.FeedFileForm}
                name="feedFileName"
                error={!!touched.feedFileName && !!errors.feedFileName}
                helperText={touched.feedFileName && errors.feedFileName}
                sx={{ gridColumn: "span 4" }}
              />
              <Select
                fullWidth
                variant="filled"
                value={sourceType}
                onChange={(event) => handleTypeChange(event, true)}
                InputLabel="Source Type"
                sx={{ gridColumn: "span 4" }}
                defaultValue="1"
              >
                <MenuItem value="1">Select Source Type</MenuItem>
                {dropdownOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Dialog
                open={showSourceModal}
                onClose={() => closeSourceModal()}
                maxWidth="sm"
                fullWidth
                sx={{
                  "& .MuiDialog-paper": {
                    minWidth: "50%",
                    height: "60%",
                  },
                }}
              >
                <DialogContent>
                  {renderForm(sourceType, closeSourceModal, (formData) =>
                    handleFormSubmit1(formData, true)
                  )}
                </DialogContent>
                <DialogActions></DialogActions>
              </Dialog>
              <Select
                fullWidth
                variant="filled"
                value={destinationType}
                onChange={(event) => handleTypeChange(event, false)}
                InputLabel="Primary Contact Email"
                sx={{ gridColumn: "span 4" }}
                defaultValue="2"
              >
                <MenuItem value="2">Select Destination Type</MenuItem>
                {dropdownOptions.map(
                  (option) =>
                    option.value !== sourceType && (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    )
                )}
              </Select>
              <Dialog
                open={showDestinationModal}
                onClose={() => closeDestinationModal()}
                maxWidth="sm"
                fullWidth
                sx={{
                  "& .MuiDialog-paper": {
                    minWidth: "50%",
                    height: "60%",
                  },
                }}
              >
                <DialogContent>
                  {renderForm(
                    destinationType,
                    closeDestinationModal,
                    (formData) => handleFormSubmit1(formData, true)
                  )}
                </DialogContent>
                <DialogActions></DialogActions>
              </Dialog>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  description: yup.string().required("required"),
  businessGroup: yup.string().required("required"),
  supportEmailGroup: yup.string().email("invalid email").required("required"),
  primaryContactEmail: yup.string().email("invalid email").required("required"),
  feedFileName: yup.string().required("required"),
  sourceType: yup.string().required("required"),
  destinationType: yup.string().required("required"),
});

const initialValues = {
  description: "",
  businessGroup: "",
  supportEmailGroup: "",
  primaryContactEmail: "",
  feedFileName: "",
  sourceType: "",
  destinationType: "",
};

export default Form;
