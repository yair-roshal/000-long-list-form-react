import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            backgroundColor: '#3270ae',
            color: '#fff',
            boxShadow: '0 0 1rem rgba(0, 0, 0, 0.2)',
          }}
        >
          <Button component={RouterLink} to="/" color="inherit">
            Statistics
          </Button>
          <Button component={RouterLink} to="/users" color="inherit">
            Users
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
