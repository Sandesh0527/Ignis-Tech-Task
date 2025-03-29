import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getListings = async (searchParams = {}) => {
  try {
    const response = await axios.get(`${API_URL}/listings/search/`, { params: searchParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

export const getListing = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/listings/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching listing details:', error);
    throw error;
  }
};