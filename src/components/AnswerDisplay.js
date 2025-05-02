import React from 'react';
import { Paper, Typography, Box, Divider, Chip, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SourceIcon from '@mui/icons-material/Source';

const AnswerDisplay = ({ question, answer, loading, sources, questionType, processingTime }) => {
  if (!question && !answer) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      {question && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Question:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {question}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}

      {loading ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1">Processing your question...</Typography>
        </Box>
      ) : (
        answer && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <QuestionAnswerIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Answer</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <ReactMarkdown>{answer}</ReactMarkdown>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              {questionType && (
                <Chip 
                  icon={<CategoryIcon />} 
                  label={`Question Type: ${questionType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`} 
                  variant="outlined" 
                  color="primary" 
                />
              )}
              {processingTime && (
                <Chip 
                  icon={<AccessTimeIcon />} 
                  label={`Processing Time: ${processingTime.toFixed(2)}s`} 
                  variant="outlined" 
                />
              )}
            </Box>

            {sources && sources.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SourceIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>Sources ({sources.length})</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {sources.map((source, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="subtitle2">
                        {source.section_path || source.section_title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Relevance: {(source.score * 100).toFixed(1)}%
                      </Typography>
                      <Typography variant="body2">
                        {source.excerpt}
                      </Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        )
      )}
    </Paper>
  );
};

export default AnswerDisplay;