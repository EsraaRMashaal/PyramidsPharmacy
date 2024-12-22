import api from "./api";

/**
 * Fetches all medications from the backend.
 */

export const fetchMedications = async () => {
  const response = await api.get("/medications/");
  return response.data;
};


/**
 * Fetches all refill requests from the backend.
 */ 
export const fetchRefillRequests = async () => {
  const response = await api.get("/refill-requests/");
  return response.data;
};


/**
 * Submits a refill request to the backend.
 * @param {Object} refillRequestData - The refill request data to submit.
 * @returns {Object} The response data from the backend.
 */
export const submitRefillRequest = async (refillRequestData) => {
  const response = await api.post("/refill-requests/submit_refill_request/", refillRequestData);
  return response.data;
}

// get_statistics

/**
 * Fetches the medication statistics from the backend.
 */
export const fetchMedicationStatistics = async () => {
  const response = await api.get("/refill-requests/get_statistics/");
  return response.data;
}