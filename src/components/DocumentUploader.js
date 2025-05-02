import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  LinearProgress, 
  Alert, 
  IconButton,
  Divider,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { uploadDocument } from '../api'; // Import our API function

const DocumentUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files are supported');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    setUploading(true);
    setUploadProgress(0);
    setError('');
    
    try {
      console.log("Starting upload process for file:", file.name);
      
      // Tracking upload progress
      const onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
        setUploadProgress(percentCompleted);
      };
      
      const response = await uploadDocument(formData, onUploadProgress);
      console.log("Upload successful:", response);
      
      setSuccess(`Successfully uploaded gastroenterology protocol: ${response.title}`);
      setFile(null);
      
      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess(response);
      }
    } catch (err) {
      console.error("Full upload error:", err);
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        setError(err.response.data?.detail || `Server error: ${err.response.status}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request);
        setError("Could not connect to server. Please check if the backend is running.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", err.message);
        setError(`Error: ${err.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
        <MedicalInformationIcon sx={{ mr: 1, color: 'primary.main' }} />
        Upload Gastroenterology Protocol
      </Typography>
      <Divider sx={{ mb: 3, mt: 1 }} />
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => setError('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => setSuccess('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {success}
        </Alert>
      )}
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        backgroundColor: 'rgba(44, 82, 130, 0.03)',
        border: '1px dashed rgba(44, 82, 130, 0.3)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ 
              mr: 2,
              px: 3,
              py: 1,
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            disabled={uploading}
          >
            Select Protocol PDF
            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={handleFileChange}
            />
          </Button>
          
          {file && (
            <Tooltip title="Selected gastroenterology protocol document">
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <DescriptionIcon sx={{ mr: 1, fontSize: 18, color: 'primary.main' }} />
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </Typography>
            </Tooltip>
          )}
        </Box>
        
        {uploading && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={uploadProgress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'rgba(44, 82, 130, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                }
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              Uploading and processing gastroenterology document: {uploadProgress}%
            </Typography>
          </Box>
        )}
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || uploading}
          sx={{ 
            width: 'fit-content',
            borderRadius: '8px',
            px: 3,
            py: 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Process Protocol
        </Button>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1, fontWeight: 500 }}>
          Supported Protocol Types:
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="IBD and Crohn's Disease Clinical Trials" />
          </ListItem>
          <ListItem disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="GERD and Acid Reflux Studies" />
          </ListItem>
          <ListItem disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Colonoscopy and Endoscopy Procedures" />
          </ListItem>
          <ListItem disableGutters sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Hepatology and Liver Disease Protocols" />
          </ListItem>
        </List>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Upload a gastroenterology protocol document (PDF) to analyze it with our AI system.
        The document will be processed to extract section hierarchies, medication regimens, 
        and procedure details to enable intelligent protocol-based answering.
      </Typography>
    </Box>
  );
};

export default DocumentUploader;