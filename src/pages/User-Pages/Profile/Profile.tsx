import React, { useState, useEffect, useContext } from "react";
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
  Button,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import UserContext from "../../../context/user/userContext";
import { useUpdateMember } from "../../../api/Memeber";
import { LoadingComponent } from "../../../App";
import axios from "axios";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);
  // Initialize state once user data is available
  const [formData, setFormData] = useState({
    Name: "",
    gender: "",
    email: "",
    mobileno: "",
    profile_image: null as string | null,
    profile_image_name:"" , 
  });
  const [loading, setLoading] = useState(false);

  // Update state when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        Name: user.Name ?? "",
        gender: user.gender ?? "",
        email: user.email ?? "",
        mobileno: user.mobileno ?? "",
        profile_image: user.profile_image,
        profile_image_name: "", 
      });
    }
  }, [user]);

  const updateMember = useUpdateMember();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if(!file) return;
    setLoading(true)
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    try {
      const uploadedImg = await axios.post(import.meta.env.VITE_CLOUDINARY_BASE_URL, data)
    setFormData((prevData) => ({
      ...prevData,
      profile_image: uploadedImg.data.secure_url,
      profile_image_name: uploadedImg.data.display_name
    }));
    } catch (error) {
      console.error("Upload failed:", error);
    }finally{
      setLoading(false)
    }
    
  };

  const handleSubmit = () => {
    updateMember.mutate(formData);
  };

  return (
    <Card
      sx={{
        margin: "2rem",
        mt: 10,
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <CardContent>
        <Accordion defaultExpanded sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#04112f",
              color: "#fff",
            }}
          >
            Basic Details
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "2rem" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
                    control={<Radio sx={{ "&.Mui-checked": { color: "#04112f" } }} />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio sx={{ "&.Mui-checked": { color: "#04112f" } }} />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
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
              
             
              
              <FormControl>
                <FormLabel sx={{ color: "#04112f" }}>Profile Image</FormLabel>
                <Button variant="outlined" component="label" disabled={loading}>
                  Choose File
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                <span>{formData.profile_image ? formData.profile_image_name: "No file chosen"}</span>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={updateMember.isPending}
                sx={{
                  backgroundColor: "#04112f",
                  alignSelf: "flex-end",
                  "&:hover": { backgroundColor: "#0a1f4d" },
                }}
              >
                Update
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      {(updateMember.isPending || loading)&& <LoadingComponent />}
    </Card>
  );
};

export default Profile;
