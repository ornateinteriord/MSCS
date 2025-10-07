import {
  ChevronDown,
  Lock,
  LogOutIcon,
  MenuIcon,
  Settings,
  User,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import "./navbar.scss";
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import TokenService from "../../api/token/tokenService";
import { deepOrange } from "@mui/material/colors";
import { useContext, useState } from "react";
import UserContext from "../../context/user/userContext";
import { getFormattedName } from "../../utils/common";

const Navbar = ({
  toggelSideBar,
  shouldHide,
}: {
  toggelSideBar: () => void;
  shouldHide: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, userRole } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useContext(UserContext);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    TokenService.removeToken();
    window.dispatchEvent(new Event("storage"));
    setAnchorEl(null);
  };
  const isHomePage = location.pathname === "/";
  const isAdmin = userRole === "ADMIN";

  return (
    <>
      <AppBar
        position="fixed"
        className="navbar"
        style={{
          background: "linear-gradient(170deg, #0f172a 43%, #071337 70%)",
        }}
      >
        <Toolbar className="navbar-toolbar">
          {!shouldHide && (
            <IconButton onClick={() => toggelSideBar()}>
              <MenuIcon color="white" />
            </IconButton>
          )}
          <Typography
            variant="h4"
            className="navbar-title"
            style={{ marginLeft: "12px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            MSCS
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            {isLoggedIn ? (
              <div className="admin-panel-container">
                {!isHomePage && isAdmin && (
                  <div className="admin-panel-content" onClick={handleMenuOpen}>
                    <Avatar
                      className="user-avatar"
                      alt="User Avatar"
                      sx={{ width: 40, height: 40, background: deepOrange[500] }}
                    >
                      {user?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body1" sx={{ color: "white" }}>
                      Admin Portal
                    </Typography>
                    <ChevronDown
                      color="white"
                      size={22}
                      style={{
                        transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                )}

                {isHomePage ? (
                  <Button variant="ghost" style={{ marginRight: "8px" }} onClick={() => navigate(`/${userRole?.toLowerCase()}/dashboard`)}>
                    Go to Dashboard
                  </Button>
                ) : (
                  !isAdmin && (
                    <Button
                      className="logout-btn"
                      variant="ghost"
                      style={{ marginRight: "8px", fontSize: "50px" }}
                      onClick={handleLogout}
                    >
                      <LogOutIcon />
                    </Button>
                  )
                )}
              </div>
            ) : (
              <Button variant="secondary" style={{ marginRight: "8px" }} onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </div>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            className: Boolean(anchorEl) ? "custom-menu open" : "custom-menu",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 0",
            }}
          >
            <Avatar
              alt="Admin"
              sx={{
                width: 64,
                height: 64,
                marginBottom: "8px",
                background: deepOrange[500],
              }}
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : ""}

            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {getFormattedName(user?.username)}
            </Typography>
          </div>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <User size={18} style={{ marginRight: "8px" }} />
            My Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/admin/update-password");
              setAnchorEl(null);
            }}
          >
            <Settings size={18} style={{ marginRight: "8px" }} />
            Account Settings
          </MenuItem>

          <Divider />
          <div className="admin-panel-menuitems">
            <MenuItem onClick={handleMenuClose} sx={{ display: "flex" }}>
              <Lock
                size={17}
                style={{ marginRight: "4px", color: "#007bff" }}
              />
              Lock
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ display: "flex" }}>
              <LogOutIcon
                size={18}
                style={{ marginRight: "4px", color: "red" }}
              />
              Logout
            </MenuItem>
          </div>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navbar;
