import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Divider,
  Tooltip,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ScienceIcon from '@mui/icons-material/Science';
import MedicationIcon from '@mui/icons-material/Medication';
import EventNoteIcon from '@mui/icons-material/EventNote';

const exampleQuestions = [
    "What are the eligibility requirements?",
    "What procedures will I undergo in this study?",
    "What are the risks and benefits?",
    "How long will the study last?",
    "What is the primary endpoint of this trial?",
    "Can I withdraw from the study?",
    "What happens if I'm taking other medications?",
    "How many visits will I have and when?"
];

const QuestionInput = ({ documents, selectedDocument, setSelectedDocument, onSubmit, loading }) => {
  const [question, setQuestion] = useState('');
  const [localSelectedDoc, setLocalSelectedDoc] = useState('');

  // Sync local state with props when documents or selectedDocument changes
  useEffect(() => {
    if (selectedDocument) {
      setLocalSelectedDoc(selectedDocument);
      console.log("Selected document updated:", selectedDocument);
    } else if (documents && documents.length > 0) {
      // Auto-select first document if none selected
      setLocalSelectedDoc(documents[0].id);
      setSelectedDocument(documents[0].id);
      console.log("Auto-selected first document:", documents[0].id);
    }
  }, [documents, selectedDocument, setSelectedDocument]);

  const handleDocumentChange = (event) => {
    const newDocId = event.target.value;
    console.log("Document selection changed to:", newDocId);
    setLocalSelectedDoc(newDocId);
    setSelectedDocument(newDocId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && localSelectedDoc) {
      console.log("Submitting question with document:", localSelectedDoc);
      onSubmit(question, localSelectedDoc);
    } else {
      console.warn("Cannot submit - question or document not selected");
    }
  };

  const handleExampleClick = (example) => {
    setQuestion(example);
  };

  // Debug info
  console.log("QuestionInput render - Available documents:", documents);
  console.log("QuestionInput render - Selected document state:", selectedDocument);
  console.log("QuestionInput render - Local selected document:", localSelectedDoc);

  return (
    <Box>
      <Typography variant="h6" fontWeight="600" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <MedicationIcon sx={{ mr: 1, color: 'primary.main' }} />
        Protocol Analysis
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="document-select-label">Selected Protocol</InputLabel>
          <Select
            labelId="document-select-label"
            id="document-select"
            value={localSelectedDoc || ''}
            label="Selected Protocol"
            onChange={handleDocumentChange}
            disabled={loading || documents.length === 0}
            sx={{ 
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.12)',
              }
            }}
          >
            {documents.map((doc) => (
              <MenuItem key={doc.id} value={doc.id}>
                {doc.title || 'Unnamed protocol'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Ask a question about the gastroenterology protocol"
          placeholder="e.g., What are the dosing instructions for this IBD trial?"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.12)',
              },
            }
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            disabled={!question.trim() || !localSelectedDoc || loading}
            onClick={handleSubmit}
            sx={{ 
              borderRadius: '8px',
              px: 3,
              py: 1,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </Box>
      </form>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary', fontWeight: 500 }}>
          <HelpOutlineIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
          Example Gastroenterology Protocol Questions
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {exampleQuestions.map((example, index) => (
            <Chip 
              key={index} 
              label={example} 
              onClick={() => handleExampleClick(example)} 
              clickable 
              color="primary" 
              variant="outlined"
              disabled={loading}
              sx={{ 
                borderRadius: '16px',
                '&:hover': {
                  backgroundColor: 'rgba(49, 130, 206, 0.1)',
                }
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 2 }}>
          <Tooltip title="Protocol study types">
            <IconButton size="small" color="primary">
              <ScienceIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            Specialized for IBD, GERD, colorectal screening, and endoscopy protocols
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionInput;