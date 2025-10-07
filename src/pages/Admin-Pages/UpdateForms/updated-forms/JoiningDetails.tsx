import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";

interface JoiningDetailsProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const JoiningDetails: React.FC<JoiningDetailsProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <Accordion defaultExpanded sx={{ boxShadow: "none", marginBottom: "20px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
        sx={{
          backgroundColor: "#04112f",
          color: "#fff",
        }}
      >
        Joining Details
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
              label="Sponsor Code"
              name="Sponsor_code"
              value={formData.Sponsor_code}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Sponsor Code"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Position"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Position Name"
              name="positionName"
              value={formData.positionName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Position Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#04112f" }} />
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
            <TextField
              label="Sponsor Name"
              name="Sponsor_name"
              type="email"
              value={formData.Sponsor_name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Sponsor Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#04112f" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Position Id"
              name="positionId"
              value={formData.positionId}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Position Id"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#04112f" }} />
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
