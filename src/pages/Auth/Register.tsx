import {  useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  InputAdornment,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import "./Register.scss";
import { useGetSponserRef, useSignupMutation } from "../../api/Auth";
import { LoadingComponent } from "../../App";


const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const refCode = searchParams.get("ref") || ""
  const [tempSponsorCode, setTempSponsorCode] = useState(refCode); 
  const [formData, setFormData] = useState<Record<string, string>>({
    Sponsor_code:refCode,
    Sponsor_name: "",
    gender: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [genderError, setGenderError] = useState(false);
  const { data: sponsorData,isLoading,isError,error,refetch } = useGetSponserRef(formData.Sponsor_code);


  useEffect(() => {
    if (sponsorData) {
      setFormData((prev) => ({
        ...prev,
        Sponsor_name: sponsorData.name || "", 
      }));
     
    }
  }, [sponsorData]);
  

  const sponsorError = isError && error instanceof Error ? error.message : "";


  const handleSponsorCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSponsorCode(e.target.value); 
  };

  const handleSponsorCodeBlur = () => {
    if (tempSponsorCode !== formData.Sponsor_code) { 
      setFormData((prev) => ({
        ...prev,
        Sponsor_code: tempSponsorCode, 
      }));
      
    }
  };
  useEffect(() => {
    if (formData.Sponsor_code) {
      refetch(); 
    }
  }, [formData.Sponsor_code]);
  

  
 
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setErrorMessage(""); 
  };


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
    setGenderError(false);
  };

  const { mutate, isPending } = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.gender) {
      setGenderError(true);
      return;
    }
    if (formData.password.length <= 5) {
      setErrorMessage("Password must be atleast 6 character*");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      mutate(formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "66px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: "100%",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <CardContent sx={{ padding: "2rem" }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#04112f", mb: 3, textAlign: "center" }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#04112f", marginBottom: "15px", width: "50%" }}
            >
              Referal details
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              className="reg-textfield-container"
            >
              <Box className="textfield-content">
                <TextField
                  required
                  name="Sponsor_code"
                  label="Sponsor Code"
                  placeholder="Sponsor code"
                  value={tempSponsorCode}
                  onChange={handleSponsorCodeChange}
                  onBlur={handleSponsorCodeBlur}
                  error={(tempSponsorCode.length > 0 && tempSponsorCode.length < 5) || !!sponsorError} 
                  helperText={  tempSponsorCode.length > 0 && tempSponsorCode.length < 5
                    ? "Sponsor code must be at least 5 characters."
                    : sponsorError} 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#04112f" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#04112f",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />

                <TextField
                  required
                  name="Sponsor_name"
                  label="Sponsor Name"
                  placeholder="Sponsor Name"
                  value={formData.Sponsor_name}
                  onChange={handleChange}
                
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#04112f" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#04112f",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />
              </Box>
              <Box className="textfield-content">
                <TextField
                  required
                  id="Name"
                  label="Full Name"
                  name="Name"
                  autoComplete="Name"
                  autoFocus
                  placeholder="Enter your full name"
                  value={formData.Name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#04112f" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#04112f",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#04112f" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#04112f",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#04112f" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#04112f",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errorMessage} 
                  helperText={errorMessage} 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#04112f" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#04112f",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  label="Mobile Number"
                  name="mobileno"
                  type="tel"
                  autoComplete="mobileno"
                  autoFocus
                  placeholder="Enter your number"
                  value={formData.mobileno}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "#04112f" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#04112f",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  label="Pin Code"
                  name="pincode"
                  autoComplete="pincode"
                  placeholder="Enter your pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#04112f" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#04112f",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />
                <FormControl
                  error={!!genderError}
                  className="form-control"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <FormLabel className="form-label" sx={{ color: "#04112f !important" }}>
                    <WcIcon sx={{ color: "#04112f " }} />
                    Gender:
                  </FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={formData.gender}
                    onChange={handleRadioChange}
                    className="radio-grp"
                  >
                    <FormControlLabel
                      value="Male"
                      className="form-control-label"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#04112f" } }} />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      className="form-control-label"
                      value="Female"
                      control={
                        <Radio sx={{ "&.Mui-checked": { color: "#04112f" } }} />
                      }
                      label="Female"
                    />
                  </RadioGroup>
                 
                </FormControl> 
                {genderError && (
                   <FormHelperText sx={{color:"#d32f2f",marginTop:"-20px"}}>  Please select your gender*</FormHelperText>
                  )}
                   <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        sx={{ color: "#04112f" }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "#04112f" }}>
                        I accept the Terms and Conditions
                      </Typography>
                    }
                    className="FormControlLabel"
                  />
                <Box className="btn-container">
                  <Button
                    type="submit"
                    variant="contained"
                    className="signup-btn"
                    disabled={!isChecked || isPending}
                    sx={{
                      backgroundColor: "#04112f",
                      marginRight: "130px",
                      "&:hover": {
                        backgroundColor: "#0a1f4d",
                      },
                    }}
                  >
                    Register
                  </Button>
                </Box>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
              Have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#04112f",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
              <Link to="/recover-password" 
              style={{
                  color: "#04112f",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}>
                Recover Password
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {(isLoading || isPending) && <LoadingComponent />}

    </Container>
  );
};

export default Register;
