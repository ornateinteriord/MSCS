import DataTable from "react-data-table-component";
import {
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  DASHBOARD_CUTSOM_STYLE,
  getTransactionColumns,
} from "../../../utils/DataTableColumnsProvider";
import { useGetTransactionDetails } from "../../../api/Memeber";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSearch from "../../../hooks/SearchQuery";


const Transaction = () => {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useGetTransactionDetails();

  useEffect(() => {
    if (isError) {
      const err = error as any;

      toast.error(
        err?.response.data.message || "Failed to fetch Transaction details"
      );
    }
  }, [isError, error]);
 
    const { searchQuery, setSearchQuery, filteredData } = useSearch(transactions)

  const noDataComponent = (
    <div style={{ padding: "24px" }}>No data available in table</div>
  );

  return (
    <Card sx={{ margin: "2rem", mt: 10 }}>
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
            List of Transaction
          </AccordionSummary>
          <AccordionDetails>
            <DataTable
              columns={getTransactionColumns()}
              data={filteredData}
              pagination
              customStyles={DASHBOARD_CUTSOM_STYLE}
              paginationPerPage={25}
              paginationRowsPerPageOptions={[25, 50, 100]}
              highlightOnHover
              progressPending={isLoading}
              progressComponent={
                <CircularProgress size={"4rem"} sx={{ color: "#04112F" }} />
              }
              noDataComponent={noDataComponent}
              subHeader
              subHeaderComponent={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    padding: "0.5rem",
                  }}
                >
                  <TextField
                    placeholder="Search"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

export default Transaction;
