import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from .env
});

//fetchEventbyID
export const fetchEventById = async (id) => {
  const response = await api.get(`/Events/${id}`);
  return response.data;
}

export const updateEvent = async (eventId, eventData) => {
  const response = await api.put(`/events/${eventId}`, eventData);
  return response.data;
};

// Example: Fetch all users
export const fetchUsers = async () => {
  const response = await api.get("/Users");
  return response.data;
};

// Example: Create a new user
export const createUser = async (userData) => {
  const response = await api.post("/Users", userData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/Users/${userId}`, userData);
  return response.data;
};

export const fetchUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const signup = async (userData) => {
  try {
    const response = await api.post("/Users/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};


export const login = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

export const fetchEvents = async () => {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error.response?.data || error.message);
    throw error;
  }



};

export const fetchEventsByOrganizerId = async (organizerId) => {
  const response = await api.get(`/events/organizer/${organizerId}`);
  return response.data;
};

export const registerForEvent = async (eventId, userId) => {
  const response = await api.post(`/events/${eventId}/attend`, userId, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
};

export const fetchEventAttendees = async (eventId) => {
  const response = await api.get(`/events/${eventId}/attendees`);
  return response.data;
};

export const unregisterFromEvent = async (eventId, userId) => {
  const response = await api.delete(`/events/${eventId}/unregister/${userId}`);
  return response.data; // Expecting { message: "Successfully unregistered from the event." }
};


export const checkAttendance = async (eventId, userId) => {
  const response = await api.get(`/events/${eventId}/check-attendance/${userId}`);
  return response.data.isAttending; // Backend should return { isAttending: true/false }
};

export const fetchAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const fetchAllEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

export const fetchEventAttendee = async (eventId) => {
  const response = await api.get(`/events/${eventId}/attenddees`);
  return response.data;
};

export const removeAttendee = async (eventId, payload) => {
  const response = await api.delete(`/events/${eventId}/attendees/remove`, {
    data: payload,
  });
  return response.data;
};