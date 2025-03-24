import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button onClick={handleLogout} color="inherit" startIcon={<LogoutIcon />}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


// import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// const Navbar = ({ toggleSidebar }) => {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         {/* Sidebar Toggle Button */}
//         <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
//           <MenuIcon />
//         </IconButton>

//         {/* App Title */}
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Task Manager
//         </Typography>

//         {/* Logout Button */}
//         <Button color="inherit">Logout</Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
