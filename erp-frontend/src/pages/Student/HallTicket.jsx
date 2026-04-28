import { useState } from "react";
import { getHallTicket } from "../../services/studentService";

const HallTicket = () => {

  const [studentId, setStudentId] = useState("");
  const [ticket, setTicket] = useState(null);

  const loadTicket = async () => {

    try {

      const res = await getHallTicket(studentId);
      setTicket(res.data);

    } catch {

      alert("Hall ticket not found");

    }

  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Hall Ticket
      </h1>

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e)=>setStudentId(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={loadTicket}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Get Hall Ticket
      </button>

      {ticket && (

        <div className="mt-6 bg-white p-6 rounded-xl shadow">

          <p><b>Name:</b> {ticket.name}</p>
          <p><b>Exam:</b> {ticket.exam}</p>
          <p><b>Seat No:</b> {ticket.seatNumber}</p>
          <p><b>Center:</b> {ticket.center}</p>

        </div>

      )}

    </div>
  );
};

export default HallTicket;