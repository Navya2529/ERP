

const Library = () => {

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Borrowed Books
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th>Book</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {books.map(book => (

              <tr key={book.id} className="border-b">
                <td>{book.bookName}</td>
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