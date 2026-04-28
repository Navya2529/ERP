import API from "../api/axios";

export const registerExam = (data) =>
  API.post("/exam/register", data);

export const getHallTicket = (studentId) =>
  API.get(`/exam/hallticket/${studentId}`);