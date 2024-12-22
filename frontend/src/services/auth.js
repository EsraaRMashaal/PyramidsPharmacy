import api from "./api";

/**
 * Logs out the user by removing the token from local storage.
 */
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

/**
 * Checks if the user is authenticated by verifying if a token exists in local storage.
 * @returns {boolean} True if the token exists, false otherwise.
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/**
 * Logs in the user by sending credentials to the backend and storing the received token.
 * @param {Object} credentials - The login credentials (e.g., email and password).
 * @returns {Object} The response data from the backend.
 */
export const login = async (credentials) => {
  logout(); // Clear any existing tokens

  const response = await api.post("/login/", credentials); // Adjust endpoint to match your backend
  const { token } = response.data;
  localStorage.setItem("token", token); // Store the token
  return response.data;
};

/**
 * Registers a new user by sending user data to the backend.
 * @param {Object} userData - The user data to register.
 * @returns {Object} The response data from the backend.
 */
export const register = async (userData) => {
  const response = await api.post("/register/", userData); // Adjust endpoint to match your backend
  return response.data;
}