import { useState } from "react";

const ExamRegister = () => {

  const [examId, setExamId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [hallTicket, setHallTicket] = useState(null);

  /* SUBJECT DATA */

  const examSubjects = {
    1: [
      { code: "CS301", name: "Algorithms" },
      { code: "CS302", name: "Database Systems" },
      { code: "CS303", name: "Computer Networks" }
    ],
    2: [
      { code: "CS401", name: "Machine Learning" },
      { code: "CS402", name: "Cloud Computing" },
      { code: "CS403", name: "Cyber Security" }
    ]
  };

  /* LOAD SUBJECTS */

  const loadSubjects = () => {

    const sub = examSubjects[examId] || [];

    setSubjects(sub);
    setSelectedSubjects([]);
    setHallTicket(null);

  };

  /* TOGGLE SUBJECT */

  const toggleSubject = (subject) => {

    const code = subject.code;

    if (selectedSubjects.includes(code)) {

      setSelectedSubjects(
        selectedSubjects.filter((s) => s !== code)
      );

    } else {

      setSelectedSubjects([...selectedSubjects, code]);

    }

  };

  /* REGISTER EXAM */

  const handleRegister = () => {

    if (selectedSubjects.length === 0) {
      alert("Select at least one subject");
      return;
    }

    const randomTicket =
      "HT-" + Math.floor(100000 + Math.random() * 900000);

    setHallTicket({
      hallTicketNumber: randomTicket,
      examId,
      subjects: selectedSubjects,
      date: new Date().toLocaleDateString()
    });

  };

  /* PRINT */

  const downloadHallTicket = () => {
    window.print();
  };

  return (

    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Exam Registration
      </h1>


      {/* EXAM INPUT */}

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Enter Exam ID"
            value={examId}
            onChange={(e)=>setExamId(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <button
            onClick={loadSubjects}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Load Subjects
          </button>

        </div>

      </div>


      {/* SUBJECT CHECKBOXES */}

      {subjects.length > 0 && (

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4">
            Select Subjects
          </h2>

          <div className="space-y-2">

            {subjects.map((sub)=>(
              <label
                key={sub.code}
                className="flex items-center gap-3 border p-3 rounded hover:bg-gray-50"
              >

                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(sub.code)}
                  onChange={()=>toggleSubject(sub)}
                />

                <span className="font-medium">
                  {sub.code} - {sub.name}
                </span>

              </label>
            ))}

          </div>

          <button
            onClick={handleRegister}
            className="mt-6 bg-indigo-600 text-white px-5 py-2 rounded"
          >
            Register Subjects
          </button>

        </div>

      )}


      {/* HALL TICKET TEMPLATE */}

      {hallTicket && (

        <div className="bg-white p-8 rounded-xl shadow text-center">

          <h2 className="text-xl font-bold mb-6">
            UNIVERSITY EXAM HALL TICKET
          </h2>

          <div className="space-y-2 text-left max-w-md mx-auto">

            <p>
              <b>Hall Ticket No:</b> {hallTicket.hallTicketNumber}
            </p>

            <p>
              <b>Exam ID:</b> {hallTicket.examId}
            </p>

            <p>
              <b>Date Issued:</b> {hallTicket.date}
            </p>

          </div>


          {/* SUBJECT LIST */}

          <div className="mt-6 text-left max-w-md mx-auto">

            <h3 className="font-semibold mb-2">
              Registered Subjects
            </h3>

            <ul className="list-disc ml-6">

              {hallTicket.subjects.map((sub,i)=>(
                <li key={i}>{sub}</li>
              ))}

            </ul>

          </div>

          <button
            onClick={downloadHallTicket}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Hall Ticket
          </button>

        </div>

      )}

    </div>

  );

};

export default ExamRegister;