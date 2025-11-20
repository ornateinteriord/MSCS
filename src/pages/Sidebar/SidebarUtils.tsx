
import { ClipboardCheck } from "lucide-react";
import { SideBarMenuItemType } from "../../store/store";
import {
  DashboardIcon,
  AccountCircleIcon,
  GroupIcon,
  MonetizationOnIcon,
  ShowChartIcon,
  CreditCardIcon,
  MailOutlineIcon,
  PersonIcon,
  VerifiedUserIcon,
  LockIcon,
  PeopleIcon,
  AccountTreeIcon,
  PersonAddIcon,
  TrendingUpIcon,
  PaymentsIcon,
} from "../Icons";

export const UserSideBarMenuItems: SideBarMenuItemType[] = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/user/dashboard",
    isExpandable: false,
  },
  {
    name: "Account Info",
    icon: <AccountCircleIcon />,
    isExpandable: true,
    subItems: [
      { name: "Profile", path: "/user/account/profile", icon: <PersonIcon /> },
      { name: "KYC", path: "/user/account/kyc", icon: <VerifiedUserIcon /> },
      {
        name: "Change Password",
        path: "/user/account/change-password",
        icon: <LockIcon />,
      },
    ],
  },
  {
    name: "Team",
    icon: <GroupIcon />,
    isExpandable: true,
    subItems: [
      { name: "Direct", path: "/user/team/direct", icon: <PeopleIcon /> },
      { name: "Team", path: "/user/team", icon: <GroupIcon /> },
      { name: "Tree", path: "/user/team/tree", icon: <AccountTreeIcon /> },
      {
        name: "New Register",
        path: "/user/team/new-register",
        icon: <PersonAddIcon />,
      },
    ],
  },
  {
    name: "Earnings",
    icon: <MonetizationOnIcon />,
    isExpandable: true,
    subItems: [
      {
        name: "Level Benefits",
        path: "/user/earnings/level-benefits",
        icon: <TrendingUpIcon />,
      },
      {
        name: "Daily Payout",
        path: "/user/earnings/daily-payout",
        icon: <PaymentsIcon />,
      },
    ],
  },
 {
    name: "Transactions",
    icon: <ShowChartIcon />,
    isExpandable: true,
    subItems: [
      {
        name: "Wallet",
        path: "/user/transactions",
        icon: <CreditCardIcon />,
      },
      {
        name: "Loan",
        path: "/user/loantransactions",
        icon: <AccountCircleIcon />,
      },
    ],
  },
  {
    name: "Wallet Balance",
    icon: <CreditCardIcon />,
    path: "/user/wallet",
    isExpandable: false,
  },
  {
    name: "Mail Box",
    icon: <MailOutlineIcon />,
    path: "/user/mailbox",
    isExpandable: false,
  },
];

export const AdminSideBarMenuItems: SideBarMenuItemType[] = [
  {
    name: "Home",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
    isExpandable: false,
  },

  {
    name: "Plans",
    icon: <ClipboardCheck />,
    isExpandable: false,
    path: "/admin/plans"
  },

  {
    name: "Team",
    icon: <GroupIcon />,
    isExpandable: false,
    path: "/admin/team",
  },

  {
    name: "Loan",
    icon: <CreditCardIcon />,
    isExpandable: true,
    subItems: [
      { name: "Self Loan", path: "/admin/loan/self", icon: <CreditCardIcon /> },
      { name: "Advised Loan", path: "/admin/loan/advised", icon: <CreditCardIcon /> },
    ],
  },

  {
    name: "Payout",
    icon: <PaymentsIcon />,
    isExpandable: true,
    subItems: [
      { name: "Payout Report", path: "/admin/payout/report", icon: <PaymentsIcon /> },
    ],
  },

  {
    name: "Plan Recovery",
    icon: <TrendingUpIcon />,
    isExpandable: true,
    subItems: [
      { name: "Plan Recovery", path: "/admin/plan/recovery", icon: <TrendingUpIcon /> },
      { name: "Plan Recovery Report", path: "/admin/plan/recovery-report", icon: <ShowChartIcon /> },
    ],
  },

  {
    name: "Loan Recovery",
    icon: <MonetizationOnIcon />,
    isExpandable: true,
    subItems: [
      { name: "Loan Recovery", path: "/admin/loan/recovery", icon: <MonetizationOnIcon /> },
      { name: "Loan Recovery Report", path: "/admin/loan/recovery-report", icon: <ShowChartIcon /> },
    ],
  },
];
