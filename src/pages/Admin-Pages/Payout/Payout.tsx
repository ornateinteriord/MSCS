import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./Payout.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataTable from "react-data-table-component";
import { DASHBOARD_CUTSOM_STYLE, getPayblesColumns, getProccessedColumns, getRequestColumns } from "../../../utils/DataTableColumnsProvider";


interface PayoutTableProps{
  data:any[];
  columns:any;
  tabTitle:any[];
}

const Payout = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_e: any, newValue: any) => {
    setValue(newValue);
  };
  const renderContent = () => {
    switch (value) {
      case 0:
        return <Requests tabTitle={"Requests"}/>;
      case 1:
        return <Proccessed tabTitle={"Proccessed"}/>;
      case 2:
        return <Paybles  tabTitle={"Paybles"}/>;
    }
  };
  return (
    <>
      <Typography variant="h4" sx={{ margin: "2rem", mt: 10 }}>
       Payouts
      </Typography>
      <Card sx={{ margin: "2rem", mt: 2 }}>
        <CardContent>
          <Box className="tabs-list">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              className="tabs"
            >
              <Tab className="tab-list-1" label="Requests" />
              <Tab className="tab-list-2" label="Proccessed" />
              <Tab className="tab-list-3" label="Payables" />
            </Tabs>
            <Box className="tab-content">{renderContent()}</Box>
          </Box>
        
        </CardContent>
      </Card>
    </>
  );
};

export default Payout;

const PayoutTable= ({data,columns,tabTitle}:PayoutTableProps)=>{
  return(
    <Accordion defaultExpanded>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{
        mt: 2,
        backgroundColor: "#04112f",
        color: "#fff",
        "& .MuiSvgIcon-root": { color: "#fff" },
      }}
    >
      {tabTitle}
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
        columns={columns}
        data={data}
        pagination
        customStyles={DASHBOARD_CUTSOM_STYLE}
        paginationPerPage={25}
        paginationRowsPerPageOptions={[25, 50, 100]}
        highlightOnHover
        noDataComponent={<div>No data available</div>}
      />
    </AccordionDetails>
  </Accordion>
  )
}

export const Requests = ({ tabTitle }: { tabTitle:any})=>{

  const Data = [
    {
     date: "2024-03-01",
     Member: "John Doe",
     mobileno: "9876543210",
     account: "1234567890",
     ifsc: "HDFC0001234",
     amount: "$100",
     deduction: "$5",
     status: "Pending",
     action: "Approve",
 }
 ]
  return (
    <PayoutTable
    data={Data}
    columns={getRequestColumns()}
    tabTitle={tabTitle} 
    />
  )
}

export const  Proccessed =({ tabTitle }: { tabTitle:any})=>{
  const Data = [
    {
     date: "2024-03-01",
     Member: "John Doe",
     mobileno: "9876543210",
     account: "1234567890",
     ifsc: "HDFC0001234",
     amount: "$100",
     deducted: "$5",
     Paidon: "Pending",
    
 }
 ]
  return (
    <PayoutTable
    data={Data}
    columns={getProccessedColumns()}
    tabTitle={tabTitle} 
    />
  )
}
export const  Paybles =({ tabTitle }: { tabTitle:any})=>{
  const Data = [
    {
     date: "2024-03-01",
     Member: "John Doe",
     mobileno: "9876543210",
     account: "1234567890",
     ifsc: "HDFC0001234",
     amount: "$100",
     action: "Approve",
 }
 ]
  return (
    <PayoutTable
    data={Data}
    columns={getPayblesColumns()}
    tabTitle={tabTitle} 
    />
  )
}