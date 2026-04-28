import { useEffect, useState } from "react";
import { getIssuedBooks, returnBook } from "../../services/libraryService";

const IssuedBooks = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {

      const data = await getIssuedBooks();
      setBooks(data || []);

    } catch (error) {

      console.error(error);
      alert("Failed to fetch issued books");

    }
  };

  const handleReturn = async (issueId) => {

    try {

      await returnBook(issueId);

      alert("Book returned successfully");

      /* refresh table */
      fetchIssuedBooks();

    } catch (error) {

      console.error(error);
      alert("Return failed");

    }

  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Issued Books
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Issue ID</th>
              <th className="py-2">Student ID</th>
              <th className="py-2">Book</th>
              <th className="py-2">Issue Date</th>
              <th className="py-2">Due Date</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>

          <tbody>

            {books.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No issued books found
                </td>
              </tr>
            )}

            {books.map((book, index) => {

              const issueDate = book.issueDate
                ? new Date(book.issueDate).toLocaleDateString()
                : "-";

              const dueDate = book.dueDate
                ? new Date(book.dueDate).toLocaleDateString()
                : "-";

              return (

                <tr
                  key={book.issueId || book.id || index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-2">{book.issueId || book.id}</td>

                  <td>{book.studentId}</td>

                  <td>{book.bookTitle}</td>

                  <td>{issueDate}</td>

                  <td>{dueDate}</td>

                  <td>

                    <button
                      onClick={() => handleReturn(book.issueId || book.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Return
                    </button>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );

};

export default IssuedBooks;