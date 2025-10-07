import { Suspense, lazy, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";

import Members, {
  ActiveMembers,
  InActiveMembers,
  PendingMembers,
} from "./pages/Admin-Pages/Members/Members";
import {
  GeneratePackages,
  PackageHistory,
  PackageRequests,
  UnusedPackages,
  UsedPackages,
} from "./pages/Admin-Pages/Packages/Packages";
import Tree from "./pages/User-Pages/Team/Tree";
import Team from "./pages/User-Pages/Team/Team";
import ProtectedRoute from "./routeProtecter/RouteProtecter";
import useAuth from "./hooks/use-auth";
import PublicRoute from "./routeProtecter/PublicRoutes";
import UserProvider from "./context/user/userContextProvider";
import MembersUpdateForm from "./pages/Admin-Pages/UpdateForms";



// public pages
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const RecoverPassword = lazy(()=>import("./pages/Auth/RecoverPassword"))
const ResetPassword = lazy(()=>import("./pages/Auth/ResetPassword"))
const Navbar = lazy(() => import("./pages/Navbar/Navbar"));
const Sidebar = lazy(() => import("./pages/Sidebar/Sidebar"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));

// admin pages
const UpdatePassword = lazy(()=>import("./pages/Admin-Pages/admin-panel/UpdatePassword"));
const AdminDashboard = lazy(
  () => import("./pages/Admin-Pages/AdminDashboard/Dashboard")
);
const AdminCashBack = lazy(
  () => import("./pages/Admin-Pages/Incomes/CashBack")
);
const AdminDailyBenifitsPayouts = lazy(
  () => import("./pages/Admin-Pages/Incomes/DailyBenifitsPayouts")
);
const AdminLevelBenifits = lazy(
  () => import("./pages/Admin-Pages/Incomes/LevelBenifits")
);
const AdminPayout = lazy(() => import("./pages/Admin-Pages/Payout/Payout"));

const AdminTransactions = lazy(
  () => import("./pages/Admin-Pages/Transactions/Transactions")
);
const AdminSMSTransactions = lazy(
  () => import("./pages/Admin-Pages/Transactions/SMS-Transactions")
);
const AdminSupportTickets = lazy(
  () => import("./pages/Admin-Pages/SupportTicket/SupportTickets")
);
const AdminNews = lazy(() => import("./pages/Admin-Pages/News/News"));
const AdminHolidays = lazy(
  () => import("./pages/Admin-Pages/Holidays/Holidays")
);

// user pages
const UserDashboard = lazy(
  () => import("./pages/User-Pages/UserDashboard/Dashboard")
);
const UserPackageHistory = lazy(
  () => import("./pages/User-Pages/Packages/PackageHistory")
);
const UserTransaction = lazy(
  () => import("./pages/User-Pages/Transaction/Transaction")
);
const UserMailBox = lazy(() => import("./pages/User-Pages/MailBox/MailBox"));
const UserProfile = lazy(() => import("./pages/User-Pages/Profile/Profile"));
const UserKYC = lazy(() => import("./pages/User-Pages/KYC/KYC"));
const UserChangePassword = lazy(
  () => import("./pages/User-Pages/Change-Password/ChangePassword")
);
const UserActivate = lazy(() => import("./pages/User-Pages/Activate/Activate"));
const UserNewResgister = lazy(
  () => import("./pages/User-Pages/Team/NewResgister")
);
const UserUsedPackage = lazy(
  () => import("./pages/User-Pages/Packages/UsedPackage")
);
const UserUnUsedPackage = lazy(
  () => import("./pages/User-Pages/Packages/UnUsedPackage")
);
const UserTransferPackage = lazy(
  () => import("./pages/User-Pages/Packages/TransferPackage")
);
const UserDirect = lazy(() => import("./pages/User-Pages/Team/Direct"));
const UserLevelBenifits = lazy(
  () => import("./pages/User-Pages/Earnings/LeveBenifits")
);
const UserDailyPayout = lazy(
  () => import("./pages/User-Pages/Earnings/DailyPayout")
);
const UserWallet = lazy(() => import("./pages/User-Pages/Wallet/Wallet"));

export const LoadingComponent = () => {
  return (
    <Dialog open={true}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

const ShouldHideSidebarComponent = () => {
  const location = useLocation();
  const publicPaths = ["/", "/login", "/register","/recover-password","/reset-password"];
  return publicPaths.includes(location.pathname);
};

function App() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  const toggelSideBar = () => {
    setIsOpen(!isOpen);
  };

  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <ToastContainer           
          toastClassName="bg-white shadow-lg rounded-lg p-4"
          className="text-sm text-gray-800"
          style={{ width: 'auto', minWidth: '25rem' }} />
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <RoutesProvider
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggelSideBar={toggelSideBar}
              />
          </Suspense>
        </Router>
      </QueryClientProvider>
    </UserProvider>
  );
}

const RoutesProvider = ({
  isOpen,
  setIsOpen,
  toggelSideBar,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggelSideBar: () => void;
}) => {
  const shouldHide = ShouldHideSidebarComponent();
  const {userRole} = useAuth()

  return (
    <>
      <Navbar toggelSideBar={toggelSideBar} shouldHide={shouldHide} />
      <div
        style={{
          display: "flex",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        {!shouldHide && (
          <Sidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          role={userRole}
        />
        )}
        <div
          style={{
            flex: 1,
            marginLeft: !shouldHide && isOpen ? "250px" : "0",
            transition: "margin-left 0.3s ease-in-out",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Routes>
            {/* public routes */}
            <Route index element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path="/reset-password" element={<ResetPassword/>} />
            </Route>
            {/* admin routes */}

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin/update-password" element={<UpdatePassword/>}/>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />{" "}
              {/* admin member routes */}
              <Route path="/admin/members" element={<Members />} />
              
              <Route
                path="/admin/members/pending"
                element={<PendingMembers />}
              />
              <Route path="/admin/members/active" element={<ActiveMembers />} />
              <Route
                path="/admin/members/inactive"
                element={<InActiveMembers />}
              />
              {/* admin package routes */}
              <Route
                path="/admin/package/generate"
                element={<GeneratePackages />}
              />
              <Route
                path="/admin/package/requests"
                element={<PackageRequests />}
              />
              <Route path="/admin/package/used" element={<UsedPackages />} />
              <Route
                path="/admin/package/unused"
                element={<UnusedPackages />}
              />
              <Route
                path="/admin/package/history"
                element={<PackageHistory />}
              />
              {/* admin income routes */}
              <Route
                path="/admin/income/cashback"
                element={<AdminCashBack />}
              />
              <Route
                path="/admin/income/level-benefits"
                element={<AdminLevelBenifits />}
              />
              <Route
                path="/admin/income/daily-payouts"
                element={<AdminDailyBenifitsPayouts />}
              />
              <Route path="/admin/payout" element={<AdminPayout />} />

              {/* admin transaction routes */}
              <Route
                path="/admin/transactions"
                element={<AdminTransactions />}
              />
              <Route
                path="/admin/transactions/sms"
                element={<AdminSMSTransactions />}
              />
              <Route
                path="/admin/support-tickets"
                element={<AdminSupportTickets />}
              />
              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/holidays" element={<AdminHolidays />} />
              <Route path="/admin/members/:memberId" element={<MembersUpdateForm />} />
            </Route>

            {/* user routes */}

            <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} /> 
              {/* user account routes */}
              <Route path="/user/account/profile" element={<UserProfile />} />
              <Route path="/user/account/kyc" element={<UserKYC />} />
              <Route
                path="/user/account/change-password"
                element={<UserChangePassword />}
              />
              <Route path="/user/activate" element={<UserActivate />} />
              {/* package routes */}
              <Route path="/user/package/used" element={<UserUsedPackage />} />
              <Route
                path="/user/package/unused"
                element={<UserUnUsedPackage />}
              />
              <Route
                path="/user/package/transfer"
                element={<UserTransferPackage />}
              />
              <Route
                path="/user/package/history"
                element={<UserPackageHistory />}
              />
              {/* team routes */}
              <Route path="/user/team/tree" element={<Tree />} />
              <Route path="/user/team" element={<Team />} />
              <Route
                path="/user/team/new-register"
                element={<UserNewResgister />}
              />
              <Route path="/user/team/direct" element={<UserDirect />} />
              {/* earnings routes */}
              <Route
                path="/user/earnings/level-benefits"
                element={<UserLevelBenifits />}
              />
              <Route
                path="/user/earnings/daily-payout"
                element={<UserDailyPayout />}
              />
              <Route path="/user/transactions" element={<UserTransaction />} />
              <Route path="/user/mailbox" element={<UserMailBox />} />
              <Route path="/user/wallet" element={<UserWallet />} />
            </Route>
            {/* not found route */}
            <Route
              element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}
            >
             <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}>
              <Route path="*" element={<NotFound />} />
            </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
