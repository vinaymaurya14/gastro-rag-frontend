import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      color="primary" 
      elevation={0} 
      sx={{ 
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        background: 'linear-gradient(90deg, #2c5282 0%, #3182ce 100%)'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <MedicalServicesIcon sx={{ mr: 2, fontSize: 32 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="div" fontWeight="bold">
            GastroProtocol AI Assistant
          </Typography>
          <Typography variant="subtitle2" color="inherit" sx={{ opacity: 0.9 }}>
            Advanced retrieval-augmented generation for gastroenterology clinical trials
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<HealthAndSafetyIcon />}
          sx={{ 
            ml: 2, 
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            }
          }}
        >
          Medical Reference
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;