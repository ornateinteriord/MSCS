import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import { useContext, useState } from "react";
import { useUpdatePassword } from "../../../api/Admin";
import { toast } from "react-toastify";
import UserContext from "../../../context/user/userContext";

const UpdatePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user } = useContext(UserContext);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updatePassword = useUpdatePassword();

  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New password and confirm password do not match!");
        return;
      }
      const passwordData ={
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      updatePassword.mutate(passwordData)
    } catch (error) {
      console.error("Failed to update password", error);
    } finally {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  };
  return (
    <>
      <Grid
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ margin: "2rem", mt: 12 }}
      >
        <Typography variant="h4">Account Settings</Typography>
      </Grid>
      <Card sx={{ margin: "2rem", mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: "#04112f",
                color: "#fff",
                "& .MuiSvgIcon-root": { color: "#fff" },
              }}
            >
              Update Password
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "2rem" }}>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <TextField
                  label="Name"
                  name="name"
                  value={user?.username || " "}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your current password"
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
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your current password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon sx={{ color: "#04112f" }} />
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
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your new password"
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
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Confirm your new password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon sx={{ color: "#04112f" }} />
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
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={
                    !formData.oldPassword ||
                    !formData.newPassword ||
                    !formData.confirmPassword
                  }
                  sx={{
                    backgroundColor: "#04112f",
                    alignSelf: "flex-end",
                    "&:hover": {
                      backgroundColor: "#0a1f4d",
                    },
                  }}
                >
                  Update Password
                </Button>
              </form>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdatePassword;
