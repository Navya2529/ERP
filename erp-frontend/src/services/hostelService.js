import API from "../api/axios";

export const allocateHostel = (data) =>
  API.post("/hostel/allocate", data);

export const getHostelOccupancy = () =>
  API.get("/hostel/occupancy");