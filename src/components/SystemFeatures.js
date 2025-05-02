import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Chip } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import MedicationIcon from '@mui/icons-material/Medication';
import BiotechIcon from '@mui/icons-material/Biotech';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TableChartIcon from '@mui/icons-material/TableChart';
import SearchIcon from '@mui/icons-material/Search';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const SystemFeatures = () => {
  const features = [
    {
      icon: <BiotechIcon color="primary" />,
      name: "GI Protocol Structure Analysis",
      description: "Specialized parsing of endoscopy and intervention sections"
    },
    {
      icon: <MedicationIcon color="primary" />,
      name: "Treatment Regimen Extraction",
      description: "Identifying medication dosing and schedules for GI treatments"
    },
    {
      icon: <ScienceIcon color="primary" />,
      name: "Clinical Assessment Context",
      description: "Understanding endoscopic scoring systems and evaluations"
    },
    {
      icon: <HealthAndSafetyIcon color="primary" />,
      name: "Adverse Event Analysis",
      description: "Identifying GI-specific side effects and monitoring procedures"
    },
    {
      icon: <TableChartIcon color="primary" />,
      name: "Procedure Schedule Processing",
      description: "Special handling for endoscopy and colonoscopy schedules"
    },
    {
      icon: <MonitorHeartIcon color="primary" />,
      name: "Patient Safety Tracking",
      description: "Understanding exclusion criteria for high-risk GI patients"
    }
  ];

  const specializations = [
    "IBD Protocols", "GERD Studies", "Colonoscopy Trials", "Endoscopy Procedures", 
    "GI Oncology", "Hepatology", "Motility Studies"
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <MedicalInformationIcon sx={{ mr: 1.5, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight="600">Gastroenterology AI Features</Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      <List disablePadding>
        {features.map((feature, index) => (
          <ListItem key={index} disableGutters sx={{ pb: 1.5, pt: 1.5 }}>
            <ListItemIcon>
              {feature.icon}
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="subtitle2" fontWeight="500">{feature.name}</Typography>}
              secondary={
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {feature.description}
                </Typography>
              }
              disableTypography
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 2, fontWeight: 500 }}>
          <SearchIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} /> 
          Specializations
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {specializations.map((spec, index) => (
            <Chip 
              key={index} 
              label={spec} 
              size="small"
              color="primary"
              sx={{ 
                backgroundColor: 'rgba(44, 82, 130, 0.1)', 
                color: 'primary.main',
                fontWeight: 500,
                '& .MuiChip-label': { px: 1.5 }
              }}
            />
          ))}
        </Box>
      </Box>
      
      <Box sx={{ 
        mt: 3, 
        p: 2.5, 
        bgcolor: 'rgba(44, 82, 130, 0.05)', 
        borderRadius: 2,
        border: '1px dashed rgba(44, 82, 130, 0.3)'
      }}>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: 500 }}>
          <UploadFileIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} /> 
          Upload GI Protocol
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload your gastroenterology trial protocol for AI-powered analysis and intelligent answering of clinical questions.
        </Typography>
      </Box>
    </Box>
  );
};

export default SystemFeatures;