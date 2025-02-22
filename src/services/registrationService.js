// src/services/registrationService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const submitRegistration = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/registration/initiate`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const verifyPaymentStatus = async (registrationId, paymentId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/registration/verify-payment`,
      {
        params: { registrationId, paymentId }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Payment verification failed');
  }
};