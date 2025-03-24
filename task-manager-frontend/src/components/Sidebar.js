import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleSidebar}>
      <List sx={{ width: 250 }}>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
