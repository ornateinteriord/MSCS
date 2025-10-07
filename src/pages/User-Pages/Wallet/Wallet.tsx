import {
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataTable from "react-data-table-component";
import { useMediaQuery } from "@mui/material";
import {
  DASHBOARD_CUTSOM_STYLE,
  getWalletColumns,
} from "../../../utils/DataTableColumnsProvider";

const Wallet = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  // Sample data - replace with actual data
  const transactions = [
    {
      date: "2024-01-15",
      transactionId: "TXN123456",
      type: "Credit",
      amount: "₹5000",
      status: "Completed",
    },
    // Add more transaction data as needed
  ];

  return (
    <Card
      sx={{
        margin: isMobile ? "1rem" : "2rem",
        backgroundColor: "#fff",
        mt: 10,
      }}
    >
      <CardContent sx={{ padding: isMobile ? "12px" : "24px" }}>
        {/* Wallet Balance Section */}
        <Accordion
          defaultExpanded
          sx={{
            boxShadow: "none",
            "&.MuiAccordion-root": {
              backgroundColor: "#fff",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#04112f",
              color: "#fff",
              "& .MuiSvgIcon-root": { color: "#fff" },
              minHeight: isMobile ? "48px" : "64px",
            }}
          >
            Wallet Overview
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Available Balance
                  </Typography>
                  <Typography variant="h4" sx={{ color: "#04112f", mt: 1 }}>
                    ₹10,000
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Income
                  </Typography>
                  <Typography variant="h4" sx={{ color: "#04112f", mt: 1 }}>
                    ₹50,000
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Withdrawal
                  </Typography>
                  <Typography variant="h4" sx={{ color: "#04112f", mt: 1 }}>
                    ₹40,000
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/*   Wallet Details  */}

        <Accordion
          defaultExpanded
          sx={{
            mt: isMobile ? 2 : 4,
            boxShadow: "none",
            "&.MuiAccordion-root": {
              backgroundColor: "#fff",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#04112f",
              color: "#fff",
              "& .MuiSvgIcon-root": { color: "#fff" },
              minHeight: isMobile ? "48px" : "64px",
            }}
          >
            Wallet Details
          </AccordionSummary>
          <AccordionDetails>
            <form
              style={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <TextField
                label="Wallet Balance"
                name="balance"
                fullWidth
                required
                size="medium"
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
              <FormControl fullWidth size="medium">
                <InputLabel>Withdrawal Amount</InputLabel>
                <Select
                  // value={amount}
                  // onChange={(e) => setAmount(e.target.value)}
                  label="Withdrawal Amount"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#04112f" },
                      "&.Mui-focused fieldset": { borderColor: "#04112f" },
                    },
                  }}
                >
                  {[
                    0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
                    5000, 10000,
                  ].map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Deduction (15%)"
                name="amount"
                fullWidth
                required
                size="medium"
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
                label="Net Amount"
                name="amount"
                fullWidth
                required
                size="medium"
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography>1.Deduction of 15%</Typography>
                  <Typography>2.One time withdrawal per day</Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#04112f",
                    alignSelf: "flex-end",
                    "&:hover": {
                      backgroundColor: "#0a1f4d",
                    },
                  }}
                >
                  Claim
                </Button>
              </Box>
            </form>
          </AccordionDetails>
        </Accordion>

        {/* Transaction History Section */}
        <Accordion
          defaultExpanded
          sx={{
            mt: isMobile ? 2 : 4,
            boxShadow: "none",
            "&.MuiAccordion-root": {
              backgroundColor: "#fff",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#04112f",
              color: "#fff",
              "& .MuiSvgIcon-root": { color: "#fff" },
              minHeight: isMobile ? "48px" : "64px",
            }}
          >
            Transaction History
          </AccordionSummary>
          <AccordionDetails>
            <DataTable
              columns={getWalletColumns()}
              data={transactions}
              pagination
              customStyles={DASHBOARD_CUTSOM_STYLE}
              paginationPerPage={isMobile ? 10 : 25}
              paginationRowsPerPageOptions={
                isMobile ? [10, 20, 50] : [25, 50, 100]
              }
              highlightOnHover
              responsive
              subHeader
              subHeaderComponent={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    padding: isMobile ? "0.25rem" : "0.5rem",
                  }}
                >
                  <TextField
                    placeholder="Search"
                    variant="outlined"
                    size="small"
                  />
                </div>
              }
            />
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Wallet;
