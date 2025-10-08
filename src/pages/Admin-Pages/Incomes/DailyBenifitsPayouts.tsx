import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataTable from "react-data-table-component";
import {
  DASHBOARD_CUTSOM_STYLE,
  getadminLevelBenifitsColumns,
} from "../../../utils/DataTableColumnsProvider";

const DailyBenifitsPayouts = () => {
  const data = [{}];
  const noDataComponent = (
    <div style={{ padding: "24px" }}>No data available in table</div>
  );
  return (
    <>
      <Typography variant="h4" sx={{ margin: "2rem", mt: 10 }}>
        Daily benefits Payouts
      </Typography>
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
                columns={getadminLevelBenifitsColumns()}
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
  );
};

export default DailyBenifitsPayouts;
