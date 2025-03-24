import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const loginUser = async (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const fetchTasks = async (token, userId) => {
  return axios.get(`${API_URL}/tasks/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (token, userId, taskData) => {
  try {
    const response = await axios.post(
      `${API_URL}/tasks/create`,
      {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority.toUpperCase(),
        deadline: taskData.deadline, // Add deadline if needed
        completed: taskData.completed || false,
        user: { id: userId },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    console.error(
      'Error creating task:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// ✅ Update Task
export const updateTask = async (token, taskId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/tasks/update/${taskId}`,
      {
        title: updatedData.title,
        description: updatedData.description,
        priority: updatedData.priority.toUpperCase(),
        deadline: updatedData.deadline,
        completed: updatedData.completed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    console.error(
      'Error updating task:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// ❌ Delete Task
export const deleteTask = async (token, taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(
      'Error deleting task:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
