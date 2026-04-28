import API from "../api/axios";

/* ISSUE BOOK */
export const issueBook = async (data) => {
  const res = await API.post("/library/issue", data);
  return res.data;
};

/* RETURN BOOK */
export const returnBook = async (id) => {
  const res = await API.put(`/library/return/${id}`);
  return res.data;
};

/* GET ISSUED BOOKS */
export const getIssuedBooks = async () => {
  const res = await API.get("/library/issued");
  return res.data;
};