import api from "./api";

/**
 * Fetches all medications from the backend.
 */

export const fetchMedications = async () => {
  const response = await api.get("/medications/");
  return response.data;
};


/**
 * Submits a medication to the backend.
 * @param {Object} medicationData - The medication data to submit.
 * @returns {Object} The response data from the backend.
 */
export const submitMedication = async (medicationData) => {
  const response = await api.post("/medications/", medicationData);
  return response.data;
}


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

/**
 * Changes the status of a refill request.
 * PATCH /refill-requests/change_request_status/
 * @param {Object} requestData - The request data to submit.
 * @returns {Object} The response data from the backend.
 */
export const changeRequestStatus = async (requestData) => {
  const response = await api.patch("/refill-requests/change_request_status/", requestData);
  return response.data;
}