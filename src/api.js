import axios from 'axios';

// Create an axios instance with base URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Empty for production as it's served from the same origin
  : 'http://localhost:8000'; // Explicit in development

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Document APIs
export const fetchDocuments = async () => {
  try {
    const response = await api.get('/documents');
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const uploadDocument = async (formData) => {
  try {
    const response = await api.post('/upload-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    // Log more detailed error information
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const submitQuestion = async (question, documentId) => {
  try {
    const response = await api.post('/answer', {
      question,
      document_id: documentId
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting question:', error);
    throw error;
  }
};

export default api;