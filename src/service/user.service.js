import axios from "axios";
import { API_BASE_URL } from "./index";

const BASE_URL = `${API_BASE_URL}/users`;

export const getUsers = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    console.error("Error fetching users:", error);
    throw error?.response?.data || "Internal Server Error";
  }
};

export const updateUser = async (data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/update/${data.id}`,
      data.formData,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    console.error("Error updating user:", error?.response?.data);
    throw error?.response?.data;
  }
};
