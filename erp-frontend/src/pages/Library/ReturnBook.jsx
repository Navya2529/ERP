import { useState } from "react";
import { returnBook } from "../../services/libraryService";

const ReturnBook = () => {

  const [issueId, setIssueId] = useState("");

  const handleReturn = async () => {

    try {

      const res = await returnBook(issueId);

      alert(res.message);

      setIssueId("");

    } catch {
      alert("Return Failed");
    }

  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Return Book
      </h1>

      <div className="bg-white p-6 rounded-xl shadow w-[400px]">

        <input
          type="text"
          placeholder="Issue ID"
          value={issueId}
          onChange={(e) => setIssueId(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleReturn}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Return Book
        </button>

      </div>

    </div>
  );
};

export default ReturnBook;