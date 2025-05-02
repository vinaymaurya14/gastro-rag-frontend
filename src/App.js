import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, CircularProgress, CssBaseline, createTheme, ThemeProvider, Paper } from '@mui/material';
import { fetchDocuments, submitQuestion } from './api'; // Import from our new API file

import Header from './components/Header';
import QuestionInput from './components/QuestionInput';
import AnswerDisplay from './components/AnswerDisplay';
import SystemFeatures from './components/SystemFeatures';
import DocumentUploader from './components/DocumentUploader';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c5282', // Deeper blue, medical feel
    },
    secondary: {
      main: '#3182ce',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
    },
    error: {
      main: '#e53e3e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [loading, setLoading] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [sources, setSources] = useState([]);
  const [processingTime, setProcessingTime] = useState(0);
  const [error, setError] = useState('');

  // Load documents on mount
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setDocumentLoading(true);
        console.log("Fetching documents...");
        const response = await fetchDocuments();
        console.log("Documents response:", response);
        
        setDocuments(response.documents || []);
        
        // Select the first document if available
        if (response.documents && response.documents.length > 0) {
          setSelectedDocument(response.documents[0].id);
        }
        setError('');
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load documents');
      } finally {
        setDocumentLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleQuestionSubmit = async (questionText, documentId) => {
    setQuestion(questionText);
    setAnswer('');
    setSources([]);
    setQuestionType('');
    setProcessingTime(0);
    setLoading(true);
    setError('');

    try {
      const response = await submitQuestion(questionText, documentId);
      
      setAnswer(response.answer);
      setQuestionType(response.question_type);
      setSources(response.sources);
      setProcessingTime(response.processing_time);
    } catch (err) {
      console.error('Error processing question:', err);
      if (err.response) {
        setError(`Error: ${err.response.data?.detail || err.response.status}`);
      } else if (err.request) {
        setError('Could not connect to server');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (documentData) => {
    console.log("Upload successful, processing response:", documentData);
    
    // Ensure the document has the expected id property
    const processedDocument = {
      id: documentData.document_id || documentData.id,  // Handle both possible field names
      title: documentData.title || 'Unnamed Document',
      sections: documentData.sections || 0,
      chunks: documentData.chunks || 0,
      vectors: documentData.vectors || 0
    };
    
    console.log("Processed document object:", processedDocument);
    
    // Update the documents array with the new document
    setDocuments(prevDocs => {
      // Check if document already exists, update it if it does
      const exists = prevDocs.some(doc => doc.id === processedDocument.id);
      if (exists) {
        return prevDocs.map(doc => 
          doc.id === processedDocument.id ? processedDocument : doc
        );
      } else {
        // Otherwise add as new document
        return [...prevDocs, processedDocument];
      }
    });
    
    // Set the selected document ID
    const documentId = processedDocument.id;
    console.log("Setting selected document to:", documentId);
    setSelectedDocument(documentId);
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {documentLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    mb: 3, 
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  {documents.length === 0 ? (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        No Documents Available
                      </Typography>
                      <Typography variant="body1">
                        Please upload a gastroenterology protocol document to get started.
                      </Typography>
                      {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                          {error}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <QuestionInput 
                      documents={documents}
                      selectedDocument={selectedDocument}
                      setSelectedDocument={setSelectedDocument}
                      onSubmit={handleQuestionSubmit}
                      loading={loading}
                    />
                  )}
                  
                  {error && !documentLoading && (
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <Typography color="error">{error}</Typography>
                    </Box>
                  )}
                </Paper>
                
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    mb: 3,
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <AnswerDisplay 
                    question={question}
                    answer={answer}
                    loading={loading}
                    sources={sources}
                    questionType={questionType}
                    processingTime={processingTime}
                  />
                </Paper>
                
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <DocumentUploader onUploadSuccess={handleUploadSuccess} />
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <SystemFeatures />
                </Paper>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;