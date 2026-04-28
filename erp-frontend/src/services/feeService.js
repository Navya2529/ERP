import API from "../api/axios";

export const payFee = (data) => API.post("/fees/pay", data);

export const getFeeStatus = (studentId) =>
  API.get(`/fees/status/${studentId}`);