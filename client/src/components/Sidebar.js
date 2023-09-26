import { NavLink } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
// import { BsFillRecordCircleFill, BsRecordCircleFill } from "react-icons/bs";
import AlbumIcon from "@mui/icons-material/Album";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { BsMenuUp } from "react-icons/bs";
import { FaMusic } from "react-icons/fa";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <aside>
        <p className="sidebar-title">General</p>
        <Stack spacing={2} mr={2}>
          <ListItemButton
            to="/dashboard"
            component={NavLink}
            sx={{
              color: "#000000",
              bgcolor: "#dddddd",
              "&.MuiListItemButton-root": {
                height: "40px",
                lineHeight: "1.75",
                letterSpacing: "0.02857em",
                textTransform: "uppercase",
                minWidth: "64px",
                padding: "6px 16px",
                borderRadius: "4px",
              },
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontWeight: "500",
              },
              "&:hover": {
                bgcolor: "#ffffff",
              },
              "&.active": {
                bgcolor: "#ffffff",
                color: "#000000",
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
            to="/recordings"
            component={NavLink}
            sx={{
              color: "#000000",
              bgcolor: "#dddddd",
              "&.MuiListItemButton-root": {
                height: "40px",
                lineHeight: "1.75",
                letterSpacing: "0.02857em",
                textTransform: "uppercase",
                minWidth: "64px",
                padding: "6px 16px",
                borderRadius: "4px",
              },
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontWeight: "500",
              },
              "&:hover": {
                bgcolor: "#ffffff",
              },
              "&.active": {
                bgcolor: "#ffffff",
                color: "#000000",
              },
            }}
          >
            <ListItemIcon>
              <AlbumIcon />
            </ListItemIcon>
            <ListItemText primary="Recordings" />
          </ListItemButton>

          <ListItemButton
            to="/performances"
            component={NavLink}
            sx={{
              color: "#000000",
              bgcolor: "#dddddd",
              "&.MuiListItemButton-root": {
                height: "40px",
                lineHeight: "1.75",
                letterSpacing: "0.02857em",
                textTransform: "uppercase",
                minWidth: "64px",
                padding: "6px 16px",
                paddingRight: "5px",
                borderRadius: "4px",
              },
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontWeight: "500",
              },
              "&:hover": {
                bgcolor: "#ffffff",
              },
              "&.active": {
                bgcolor: "#ffffff",
                color: "#000000",
              },
            }}
          >
            <ListItemIcon>
              <FaMusic />
            </ListItemIcon>
            <ListItemText primary="Performances" />
          </ListItemButton>
        </Stack>

        <hr />

        <div>
          <p className="sidebar-title">Admin</p>
          <Stack spacing={2} mr={2}>
            <ListItemButton
              to="/composers"
              component={NavLink}
              sx={{
                color: "#000000",
                bgcolor: "#dddddd",
                "&.MuiListItemButton-root": {
                  height: "40px",
                  lineHeight: "1.75",
                  letterSpacing: "0.02857em",
                  textTransform: "uppercase",
                  minWidth: "64px",
                  padding: "6px 16px",
                  paddingRight: "5px",
                  borderRadius: "4px",
                },
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  fontWeight: "500",
                },
                "&:hover": {
                  bgcolor: "#ffffff",
                },
                "&.active": {
                  bgcolor: "#ffffff",
                  color: "#000000",
                },
              }}
            >
              <ListItemIcon>
                <IoPerson />
              </ListItemIcon>
              <ListItemText primary="Composers" />
            </ListItemButton>

            <ListItemButton
              to="/labels"
              component={NavLink}
              sx={{
                color: "#000000",
                bgcolor: "#dddddd",
                "&.MuiListItemButton-root": {
                  height: "40px",
                  lineHeight: "1.75",
                  letterSpacing: "0.02857em",
                  textTransform: "uppercase",
                  minWidth: "64px",
                  padding: "6px 16px",
                  paddingRight: "5px",
                  borderRadius: "4px",
                },
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  fontWeight: "500",
                },
                "&:hover": {
                  bgcolor: "#ffffff",
                },
                "&.active": {
                  bgcolor: "#ffffff",
                  color: "#000000",
                },
              }}
            >
              <ListItemIcon>
                <BsMenuUp />
              </ListItemIcon>
              <ListItemText primary="Labels" />
            </ListItemButton>

            <ListItemButton
              to="/media"
              component={NavLink}
              sx={{
                color: "#000000",
                bgcolor: "#dddddd",
                "&.MuiListItemButton-root": {
                  height: "40px",
                  lineHeight: "1.75",
                  letterSpacing: "0.02857em",
                  textTransform: "uppercase",
                  minWidth: "64px",
                  padding: "6px 16px",
                  paddingRight: "5px",
                  borderRadius: "4px",
                },
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  fontWeight: "500",
                },
                "&:hover": {
                  bgcolor: "#ffffff",
                },
                "&.active": {
                  bgcolor: "#ffffff",
                  color: "#000000",
                },
              }}
            >
              <ListItemIcon>
                <BsMenuUp />
              </ListItemIcon>
              <ListItemText primary="Media" />
            </ListItemButton>

            <ListItemButton
              to="/categories"
              component={NavLink}
              sx={{
                color: "#000000",
                bgcolor: "#dddddd",
                "&.MuiListItemButton-root": {
                  height: "40px",
                  lineHeight: "1.75",
                  letterSpacing: "0.02857em",
                  textTransform: "uppercase",
                  minWidth: "64px",
                  padding: "6px 16px",
                  paddingRight: "5px",
                  borderRadius: "4px",
                },
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  fontWeight: "500",
                },
                "&:hover": {
                  bgcolor: "#ffffff",
                },
                "&.active": {
                  bgcolor: "#ffffff",
                  color: "#000000",
                },
              }}
            >
              <ListItemIcon>
                <BsMenuUp />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </Stack>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
