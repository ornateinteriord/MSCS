import { Button, IconButton } from "@mui/material";
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import { Edit } from "lucide-react";
import { getFormattedDate } from './common';
import { MemberDetails } from "../store/store";


export const getUserDashboardTableColumns = () => [
  {
    selector: (row: any) => row.title,
    style: { fontWeight: "bold" },
  },
  {
    name: "Direct",
    selector: (row: any) => row.direct,
    center: true,
  },
  {
    name: "Indirect",
    selector: (row: any) => row.indirect,
    center: true,
  },
  {
    name: "Total",
    selector: (row: any) => row.total,
    center: true,
  },
];

export const getUsedPackageColumns = (user : MemberDetails) => {
  return [
    {
      name: "Date",
      selector: (row: any) => getFormattedDate(row.date),
      sortable: true,
      width : "10%"
    },
    {
      name: "Member Code",
      selector: (row: any) => `${user.Name} (${row.purchasedby})`,
      sortable: true,
      width : "20%"
    },
    {
      name: "Package Code",
      selector: (row: any) => row.epin_no,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => `₹ ${row.amount.toLocaleString()}` ,
      sortable: true,
    },
    {
      name: "Used For",
      selector: (row: any) => row.used_for,
      sortable: true,
      width : "20%"
    },
    {
      name: "Used Date",
      selector: (row: any) => getFormattedDate(row.used_on),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) =>  row.status.charAt(0).toUpperCase() + row.status.slice(1),
      sortable: true,
    },
  ];
};

export const getUnUsedPackageColumns = (user : MemberDetails) => [
  {
    name: "Date",
    selector: (row: any) => getFormattedDate(row.date),
    sortable: true,
    width : "12%"
  },
  {
    name: "Code",
    selector: (row: any) => `${user.Name} (${row.purchasedby})`,
    sortable: true,
  },
  {
    name: "Package Code",
    selector: (row: any) => row.epin_no,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: any) => `₹ ${row.amount.toLocaleString()}`,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status.charAt(0).toUpperCase() + row.status.slice(1),
    sortable: true,
  },
];

export const getUserPackageHistoryColumns = () => [
  {
    name: "Date",
    selector: (row: any) => getFormattedDate(row.date),
    sortable: true,
  },
  {
    name: "Transfered To",
    selector: (row: any) => row.transfered_to,
    // #TODO: Add username and member id
    sortable: true,
  },
  {
    name: "Qty",
    selector: (row: any) => row.quantity,
    sortable: true,
  },
  {
    name: "Package",
    selector: (row: any) => row.package,
    sortable: true,
  },
];

export const getDirectColumns = () => [
  {
    name: "S No",
    cell: (_: any,index: number) => index + 1,
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) =>`${row.Name} - ${row.Member_id}`,
    sortable: true,
  },
  {
    name: "Mobile No",
    selector: (row: any) => row.mobileno,
    sortable: true,
  },
  {
    name: "DOJ",
    selector: (row: any) => getFormattedDate(row.Date_of_joining),
    sortable: true,
  },
  {
    name: "Sponsor",
    selector: (row: any) => `${row.Sponsor_name} - ${row.Sponsor_code}`,
    sortable: true,
  },
];

export const getLevelBenifitsColumns = () => [
  {
    name: "Date",
    selector: (row: any) => row.date,
    sortable: true,
  },
  {
    name: "Payout Level",
    selector: (row: any) => row.payoutLevel,
    sortable: true,
  },
  {
    name: "Members",
    selector: (row: any) => row.members,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
];

export const getDailyPayoutColumns = () => [
  {
    name: "Date",
    selector: (row: any) => row.date,
    sortable: true,
  },
  {
    name: "Level Earnings",
    selector: (row: any) => row.levelEarnings,
    sortable: true,
  },
  {
    name: "Direct Benefits",
    selector: (row: any) => row.directBenefits,
    sortable: true,
  },
  {
    name: "Gross Earnings",
    selector: (row: any) => row.grossEarnings,
    sortable: true,
  },
];

export const getTransactionColumns = () => [
  {
    name: "Date",
    selector: (row: any) =>getFormattedDate( row.transaction_date),
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: any) => row.description,
    sortable: true,
  },
  {
    name: "Credits",
    selector: (row: any) => `₹ ${row.ew_credit}`,
    sortable: true,
  },
  {
    name: "Debit",
    selector: (row: any) => `₹ ${row.ew_debit}`,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
    cell: (row: any) => (
      <div
        style={{
          color: row.status?.toLowerCase() === "active" ? "#569f35" : "#ff3860",
          padding: "5px 10px",
          borderRadius: "4px",
        }}
      >
        {row.status.charAt(0).toUpperCase()+row.status.slice(1)}
      </div>
    ),
  },
];

export const getWalletColumns = () => [
  {
    name: "Date",
    selector: (row: any) => row.date,
    sortable: true,
  },
  {
    name: "Transaction ID",
    selector: (row: any) => row.transactionId,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row: any) => row.type,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
  },
];

export const getAdminDashboardTableColumns = () => [
  {
    name: "Date",
    selector: (row: any) => row.date,
    center: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.member,
    center: true,
  },
  {
    name: "Package Amount",
    selector: (row: any) => row.packageAmount,
  },
];

export const getMembersColumns = (showEdit : boolean , handleEditClick: (memberId: string) => void) => [
  {
    name: "SNo",
    selector: (row: any) => row.sNo,
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.Member_id,
    sortable: true,
  },
  {
    name: "Approved On",
    selector: (row: any) => getFormattedDate(row.Date_of_joining),
    sortable: true,
  },
  {
    name: "Password",
    selector: (row: any) => row.password,
    sortable: true,
  },
  {
    name: "Sponsor",
    selector: (row: any) => row.Sponsor_name ?? '-',
    sortable: true,
  },
  {
    name: "Package",
    selector: (row: any) => row.spackage,
    sortable: true,
  },
  {
    name: "MobileNo",
    selector: (row: any) => row.mobileno,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
    cell: (row: any) => (
      <div
        style={{
          color: row.status === 'active' ? 'green' : row.status.toLowerCase() === 'pending' ? '#ffd700' : 'red',
          
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </div>
    ),
  },
  {
    name: 'Modify',
    omit : !showEdit,
    cell: (row:any) => (
      <IconButton onClick={()=> handleEditClick(row.Member_id)} style={{ color: '#000', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>
        <Edit />
      </IconButton>
    ),
    
  }
];

export const getSupportTicketColumns = (handleOpenDialog : any) =>  [
  {
    name: 'Member',
    selector: (row: any) => row.reference_id,
    sortable: true,
  },
  {
    name: 'Ticket Date',
    selector: (row: any) => getFormattedDate(row.ticket_date),
    sortable: true,
  },
  {
    name: 'Ticket No',
    selector: (row: any) => row.ticket_no,
    sortable: true,
  },
  
  {
    name: 'Type of ticket',
    selector: (row: any) => row.type_of_ticket,
    sortable: true,
  },
  {
    name: 'Subject',
    selector: (row: any) => row.SUBJECT,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row: any) => row.ticket_status,
    cell: (row: any) => (
      <span
        style={{
          color: row.ticket_status === 'pending' ? '#CC5500' : '#008000',
          padding: '0.5rem',
          borderRadius: '4px',
          
        }}
      >
        {row.ticket_status?.charAt(0).toUpperCase() + row.ticket_status?.slice(1)}
      </span>
    ),
    sortable: true,
  },
  {
    name: 'Action',
    cell: (row: any) => (
      <Button
        variant="contained"
        onClick={() => handleOpenDialog(row)}
        sx={{
          backgroundColor: '#04112f',
          '&:hover': { backgroundColor: '#0a1f4d' }
        }}
      >
        Reply
      </Button>
    ),
  },
];

export const getusedandUnUsedColumns = () => [
  {
    name: "Member Code",
    selector: (row: any) => row.memberCode,
    sortable: true,
  },
  {
    name: "Used Quantity",
    selector: (row: any) => row.usedQuantity,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
  },
];

export const getAdminPackageHistoryColumns = () => [
  {
    name : "Date",
    selector: (row: any) => getFormattedDate(row.date),
    sortable: true,
  },
  {
    name : "Member",
    selector: (row: any) => row.memberCode,
  },
  {
    name : "Quantity",
    selector: (row: any) => row.totalQuantity,
  }

]

export const getMailBoxColumns = (handleOpenDialog : any) => [
  {
    name: 'Ticket Date',
    selector: (row: any) => getFormattedDate(row.ticket_date),
    sortable: true,
  },
  {
    name: 'Ticket No',
    selector: (row: any) => row.ticket_no,
    sortable: true,
    cell: (row: any) => (
      <div
        style={{
          backgroundColor: '#5bc0de',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        {row.ticket_no}
      </div>
    ),
  },
  {
    name: 'Type of ticket',
    selector: (row: any) => row.type_of_ticket,
    sortable: true,
  },
  {
    name: 'Subject',
    selector: (row: any) => row.SUBJECT,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row: any) => row.ticket_status,
    sortable: true,
    cell: (row: any) => (
      <div
        style={{
         color: row.ticket_status?.toLowerCase() === 'pending' ? '#fb741a' : '#569f35',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        {row.ticket_status?.charAt(0).toUpperCase() + row.ticket_status?.slice(1)}
      </div>
    ),
  },
  {
    name: 'Actions',
    cell: (row: any) => (
      <IconButton
        onClick={() => handleOpenDialog(row)}
        size="medium"
        sx={{
          color: '#04112f',
          '&:hover': {
            backgroundColor: 'rgba(4, 17, 47, 0.04)'
          }
        }}
      >
        <VisibilityIcon color='primary' fontSize="medium"/>
      </IconButton>
    ),
    sortable: false,
  },
];

export const getAdminPageTransactionColumns = () => [
  {
    name: "Date",
    selector: (row: any) =>getFormattedDate(row.transaction_date),
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.member_id,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: any) => row.description,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row: any) => row.transaction_type,
    sortable: true,
  },
  {
    name: "EW Credit",
    selector: (row: any) => row.ew_credit,
    sortable: true,
  },
  {
    name: "EW Debit",
    selector: (row: any) => row.ew_debit,
    sortable: true,
  },
];

export const getSMSTransactionColumns = () => [
  {
    name: "Date",
    selector: (row: any) => row.date,
    sortable: true,
  },
  {
    name: "ID",
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.member,
    sortable: true,
  },
  {
    name: "Message Type",
    selector: (row: any) => row.messageType,
    sortable: true,
  },
  {
    name: "Sent To",
    selector: (row: any) => row.sentTo,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
  },
];

export const getNewsColumns = () => [
  {
    name: "From Date",
    selector: (row: any) => getFormattedDate(row.from_date),
    sortable: true,
  },
  {
    name: "To Date",
    selector: (row: any) => getFormattedDate(row.to_date),
    sortable: true,
  },
  {
    name: "Content",
    selector: (row: any) => row.news_details,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    cell: (row: any) => (
      <span
        style={{
          color: row.status === "active" ? "#569f35" : "transparent",
          padding: "0.5rem",
          borderRadius: "4px",
        }}
      >
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </span>
    ),
    sortable: true,
  },
];

export const getHolidaysColumns = () => [
  {
    name: "Date",
    selector: (row: any) => getFormattedDate(row.holiday_date),
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: any) => row.holiday_desc,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    cell: (row: any) => (
      <span
        style={{
          color: row.status === "active" ? "#569f35" : "transparent",
          padding: "0.5rem",
          borderRadius: "4px",
        }}
      >
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </span>
    ),
    sortable: true,
  },
];

export const getRequestColumns = () =>[
  {
    name: "Date",
    selector: (row: any) => getFormattedDate(row.date),
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.Member,
    sortable: true,
  },
  {
    name: "Mobile No.",
    selector: (row: any) =>row.mobileno,
    sortable: true,
  },
  {
    name: "Account No.",
    selector: (row: any) => row.account,
    sortable: true,
  },
  {
    name: "IFSC Code",
    selector: (row: any) => row.ifsc,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    name: "Deduction",
    selector: (row: any) => row.deduction,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row: any) => row.action,
    sortable: true,
  },
]

export const getProccessedColumns = () =>[
  {
    name: "Date",
    selector: (row: any) => getFormattedDate(row.date),
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.Member,
    sortable: true,
  },
  {
    name: "Mobile No.",
    selector: (row: any) =>row.mobileno,
    sortable: true,
  },
  {
    name: "Account No.",
    selector: (row: any) => row.account,
    sortable: true,
  },
  {
    name: "IFSC Code",
    selector: (row: any) => row.ifsc,
    sortable: true,
  },
  {
    name: "Paid Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    name: "Deducted",
    selector: (row: any) => row.deducted,
    sortable: true,
  },
  {
    name: "Paidon",
    selector: (row: any) => row.Paidon,
    sortable: true,
  },
  
]

export const getPayblesColumns = () =>[
  {
    name: "Date",
    selector: (row: any) => getFormattedDate(row.date),
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.Member,
    sortable: true,
  },
  {
    name: "Mobile No.",
    selector: (row: any) =>row.mobileno,
    sortable: true,
  },
  {
    name: "Account No.",
    selector: (row: any) => row.account,
    sortable: true,
  },
  {
    name: "IFSC Code",
    selector: (row: any) => row.ifsc,
    sortable: true,
  },
  {
    name: "Payble Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row: any) => row.action,
    sortable: true,
  },
  
]

export const getCashBackColumns = () =>[
  {
    name: "Date",
    selector: (row: any) => getFormattedDate(row.date),
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.Member,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row: any) => row.action,
    sortable: true,
  },
]

export const getadminLevelBenifitsColumns =()=>[
  {
    name: "Date",
    selector: (row: any) => getFormattedDate(row.date),
    sortable: true,
  },
  {
    name: "Member",
    selector: (row: any) => row.Member,
    sortable: true,
  },
  {
    name: "Daily Benifits Payouts",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  
]



const TABLE_ROW_CUSTOM_STYLE = {
  style: {
    fontFamily: "Bogle-Regular",
    "&:last-child": {
      borderBottom: "1px solid rgba(0,0,0,.12)",
    },
  },
};
export const DASHBOARD_CUTSOM_STYLE = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "Bogle-Bold",
      backgroundColor: "#04112fe3",
      color: "#fff",
      border: "none",
    },
  },
  rows: {
    style: {
      ...TABLE_ROW_CUSTOM_STYLE,
    },
  },
};
