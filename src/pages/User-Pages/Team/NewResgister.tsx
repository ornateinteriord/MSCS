import React, { useContext, useState } from 'react';
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
  FormHelperText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WcIcon from '@mui/icons-material/Wc';
import LockIcon from '@mui/icons-material/Lock';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UserContext from '../../../context/user/userContext';
import { useSignupMutation } from '../../../api/Auth';
import { LoadingComponent } from '../../../App';
import { toast } from 'react-toastify';

const NewResgister: React.FC = () => {
  const {user} = useContext(UserContext)
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [genderError, setGenderError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const { mutate, isPending } = useSignupMutation();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.gender) {
      setGenderError(true);
      return;
    }
    if (formData.password && formData.password.length <= 5) {
      setErrorMessage("Password must be at least 6 characters*");
      return;
    }
    try {
      mutate({ 
        Sponsor_code: user.Member_id, 
        Sponsor_name: user.Name,
        ...formData 
      }, {
        onSuccess: (response) => {
          if (response.success) {
            toast.success(
              <div>
                <div>Registration Successful!</div>
                <div style={{ marginTop: '8px', fontSize: '14px' }}>
                  <strong>Email:</strong> {response.user.email}<br/>
                  <strong>Password:</strong> {formData.password}<br/>
                </div>
              </div>,
              {
                autoClose: 10000,
                closeButton: true,
              }
            );
          }
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Registration failed");
        }
      });

    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      // Don't clear form immediately, wait for success
    }
  };

  return (
    <Card sx={{ margin: '2rem', mt: 10, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <CardContent>
        {/* First Accordion - Joining Details */}
        <Accordion 
          defaultExpanded
          sx={{
            boxShadow: 'none',
            '&.MuiAccordion-root': {
              backgroundColor: '#fff'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#7e22ce',
              color: '#fff',
              '& .MuiSvgIcon-root': { color: '#fff' }
            }}
          >
            Joining Details
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '2rem' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <TextField
                label="Sponsor Code"
                name="sponsorCode"
                value={user?.Member_id}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />
              <TextField
                label="Sponsor Name"
                name="sponsorName"
                value={user?.Name}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />
            </form>
          </AccordionDetails>
        </Accordion>

        {/* Second Accordion - New Member Details */}
        <Accordion 
          defaultExpanded
          sx={{
            mt: 2,
            boxShadow: 'none',
            '&.MuiAccordion-root': {
              backgroundColor: '#fff'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#7e22ce',
              color: '#fff',
              '& .MuiSvgIcon-root': { color: '#fff' }
            }}
          >
            New Member Details
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '2rem' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <TextField
                label="Name"
                name="Name"
                value={formData.Name || ''}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Enter your name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />
              <FormControl error={!!genderError}>
                <FormLabel sx={{ color: '#7e22ce', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <WcIcon sx={{ color: '#7e22ce' }} />
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel 
                    value="Male" 
                    control={<Radio sx={{
                      '&.Mui-checked': {
                        color: '#7e22ce',
                      }
                    }}/>} 
                    label="Male" 
                  />
                  <FormControlLabel 
                    value="Female" 
                    control={<Radio sx={{
                      '&.Mui-checked': {
                        color: '#7e22ce',
                      }
                    }}/>} 
                    label="Female" 
                  />
                </RadioGroup>
              </FormControl>
              {genderError && (
                <FormHelperText sx={{color:"#d32f2f",marginTop:"-20px"}}>Please select your gender*</FormHelperText>
              )}
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />
              <TextField
                label="Mobile"
                name="mobileno"
                type="tel"
                value={formData.mobileno || ''}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Enter your mobile number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />
              <TextField
                label="Pin Code"
                name="pincode"
                value={formData.pincode || ''}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Enter your pin code"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password || ''}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Enter your password"
                error={!!errorMessage} 
                helperText={errorMessage} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />
            </form>
          </AccordionDetails>
        </Accordion>

        {/* Register Button */}
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending}
          sx={{
            backgroundColor: '#7e22ce',
            margin: '1rem',
            float: 'right',
            '&:hover': {
              backgroundColor: '#581c87'
            },
            '&:disabled': {
              backgroundColor: '#cccccc'
            }
          }}
        >
          {isPending ? 'Registering...' : 'Register'}
        </Button>
      </CardContent>
      {isPending && <LoadingComponent/>}
    </Card>
  );
};

export default NewResgister;