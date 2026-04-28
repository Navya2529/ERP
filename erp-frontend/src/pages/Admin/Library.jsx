

const Library = () => {

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Library Records
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th>Book</th>
              <th>Student</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {books.map(book => (

              <tr key={book.id} className="border-b">

                <td>{book.bookName}</td>
                <td>{book.student}</td>
                <td>{book.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Library;