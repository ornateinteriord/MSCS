import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MuiDatePicker } from "../../../components/common/DateFilterComponent";
import './CashBack.scss'
import DataTable from "react-data-table-component";
import { DASHBOARD_CUTSOM_STYLE, getCashBackColumns } from "../../../utils/DataTableColumnsProvider";
import { useState } from "react";

const CashBack = () => {
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const data = [
    {}
  ]
  const noDataComponent = (
    <div style={{ padding: "24px" }}>No data available in table</div>
  );

  return (
    <>
      <Grid
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="Cashback-container"
        sx={{ margin: "2rem", mt: 12 }}
      >
        <Typography variant="h4">Daily Benefits</Typography>
        <Grid className="Cashback-content">
          <TextField
            size="small"
            placeholder="Member Id"
            className="member-id"
          />
          <MuiDatePicker date={fromDate} setDate={setFromDate} label="From Date" />
          <MuiDatePicker date={toDate} setDate={setToDate} label="To Date" />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7e22ce",
              "&:hover": { backgroundColor: "#7e22ce" },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Card sx={{ margin: "2rem", mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: "#7e22ce",
                color: "#fff",
                "& .MuiSvgIcon-root": { color: "#fff" },
              }}
            >
              List of Daily benefits Payouts
            </AccordionSummary>
            <AccordionDetails>
              <Box
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                  marginBottom: "1rem",
                }}
              >
                <TextField
                  size="small"
                  placeholder="Search..."
                  sx={{ minWidth: 200 }}
                />
              </Box>
              <DataTable
                columns={getCashBackColumns()}
                data={data}
                pagination
                customStyles={DASHBOARD_CUTSOM_STYLE}
                paginationPerPage={25}
                paginationRowsPerPageOptions={[25, 50, 100]}
                highlightOnHover
                noDataComponent={noDataComponent}
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  )
}

export default CashBack