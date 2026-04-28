import { useState } from "react";
import { issueBook } from "../../services/libraryService";

const IssueBook = () => {

  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");

  const handleIssue = async () => {

    try {

      await issueBook({
        studentId,
        bookId
      });

      alert("Book Issued Successfully");

      setStudentId("");
      setBookId("");

    } catch {
      alert("Issue Failed");
    }

  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Issue Book
      </h1>

      <div className="bg-white p-6 rounded-xl shadow w-[400px]">

        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input
          type="text"
          placeholder="Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleIssue}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          Issue Book
        </button>

      </div>

    </div>
  );
};

export default IssueBook;