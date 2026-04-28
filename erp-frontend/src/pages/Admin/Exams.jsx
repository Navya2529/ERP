

const Exams = () => {

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Exam Registrations
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th>Name</th>
              <th>Department</th>
              <th>Exam Status</th>
            </tr>
          </thead>

          <tbody>

            {students.map(student => (

              <tr key={student.id} className="border-b">

                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.examStatus}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Exams;