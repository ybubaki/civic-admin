import axios from "axios";
import { API_BASE_URL } from "./index";

const BASE_URL = `${API_BASE_URL}/auth`;

export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error?.response?.data);
    throw error?.response?.data;
  }
};

export const updateUser = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/update`, data.userData, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error?.response?.data);
    throw error?.response?.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error?.response?.data);
    throw error?.response?.data;
  }
};

export const changePassword = async (data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/change-password`,
      data.passwordData,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error?.response?.data);
    throw error?.response?.data;
  }
};
