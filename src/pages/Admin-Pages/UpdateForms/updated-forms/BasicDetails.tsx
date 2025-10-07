import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MuiDatePicker } from "../../../../components/common/DateFilterComponent";

interface BasicDetailsProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleRadioChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
}

export  const  BasicDetails: React.FC<BasicDetailsProps> = ({
  formData,
  handleInputChange,
  handleRadioChange,
}) => {
 const handleDateChange = (formattedDate: string) => {
  handleInputChange({
    target: {
      name: "dob",
      value: formattedDate,
    },
  } as React.ChangeEvent<HTMLInputElement>);
};

  return (
    <Accordion defaultExpanded sx={{ boxShadow: "none", marginBottom: "20px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
        sx={{
          backgroundColor: "#04112f",
          color: "#fff",
        }}
      >
        Basic Details
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "2rem" }}>
        <div className="basic-details-accordion">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            <TextField
              label="Name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="FatherName"
              name="Father_name"
              value={formData.Father_name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your father name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              multiline
              minRows={2}
              variant="outlined"
              placeholder="Enter your address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your State"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your city"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your pincode"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            <FormControl>
              <FormLabel sx={{ color: "#04112f" }}>
                <WcIcon sx={{ color: "#04112f" }} />
                Gender
              </FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="Male"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#04112f" } }} />
                  }
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#04112f" } }} />
                  }
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <div>
              <MuiDatePicker
                date={formData.dob}
                setDate={handleDateChange}
                label="Date of Birth"
              />
            </div>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Mobile No"
              name="mobileno"
              type="tel"
              value={formData.mobileno}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your mobile number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your mobile number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Transaction Password"
              name="transaction_pass"
              type="password"
              value={formData.transaction_pass}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your mobile number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
