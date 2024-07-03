import axios from 'axios';
import React from 'react';

const fetchProtectedData = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('No JWT token found');

    const response = await axios.get('https://your-api-endpoint', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Protected data:', response.data);
  } catch (error) {
    console.error('Error fetching protected data:', error);
  }
};

export default fetchProtectedData;
