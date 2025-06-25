import axios from "axios";

import { API_BASE_URL } from "./index";

const BASE_URL = `${API_BASE_URL}/issues`;

export const createIssue = async (issueData) => {
  try {
    const response = await axios.post(BASE_URL, issueData.formData, {
      headers: {
        Authorization: `Bearer ${issueData.token}`,
        "Content-Type": "multipart/form-data",
      },
      transformRequest: () => issueData.formData,
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    console.error("Error creating issue:", error?.response?.data);
    throw error?.response?.data || "Internal Server Error";
  }
};

export const getIssues = async (token) => {
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
    console.error("Error fetching issues:", error);
    throw error?.response?.data || "Internal Server Error";
  }
};

export const getIssuesByUser = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
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
    console.error("Error fetching issues:", error);
    throw error?.response?.data || "Internal Server Error";
  }
};

export const getIssueById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching issue by ID:", error);
    throw error?.response?.data || "Internal Server Error";
  }
};

export const updateIssue = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${data.id}`, data.formData, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    console.error("Error updating issue:", error);
    throw error?.response?.data || "Internal Server Error";
  }
};

export const searchIssues = async (search, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?search=${search}`, {
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
    console.error("Error searching issues:", error);
    throw error?.response?.data || "Internal Server Error";
  }
};

export const deleteIssue = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
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
    console.error("Error deleting issue:", error);
    throw error?.response?.data || "Internal Server Error";
  }
};
