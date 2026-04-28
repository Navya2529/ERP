import { useEffect, useState } from "react";
import { getFeesStats } from "../../services/dashboardService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AccountantDashboard = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const res = await getFeesStats();
      setData(res);

    } catch (error) {

      console.error("Dashboard load failed", error);

    }

  };

  if (!data) return <p>Loading dashboard...</p>;

  const transactions = data.transactions || [];

  const totalTransactions = transactions.length;
  const totalFees = data.totalCollected;

  const paidStudents = [
    ...new Set(transactions.map(t => t.student_id))
  ].length;

  const averagePayment =
    totalTransactions > 0
      ? Math.round(totalFees / totalTransactions)
      : 0;

  /* DAILY COLLECTION */

  const dailyMap = {};

  transactions.forEach(t => {

    const date = t.payment_date;

    if (!dailyMap[date]) dailyMap[date] = 0;

    dailyMap[date] += Number(t.amount);

  });

  const revenueChart = {
    labels: Object.keys(dailyMap),
    datasets: [
      {
        label: "Daily Collection",
        data: Object.values(dailyMap),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.15)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  /* STUDENT PAYMENTS */

  const studentMap = {};

  transactions.forEach(t => {

    if (!studentMap[t.student_id]) studentMap[t.student_id] = 0;

    studentMap[t.student_id] += Number(t.amount);

  });

  const studentChart = {
    labels: Object.keys(studentMap).map(id => `Student ${id}`),
    datasets: [
      {
        label: "Payments",
        data: Object.values(studentMap),
        backgroundColor: "#4F46E5"
      }
    ]
  };

  const paymentShare = {
    labels: ["Total Fees"],
    datasets: [
      {
        data: [totalFees],
        backgroundColor: ["#22C55E"]
      }
    ]
  };

  /* CHART OPTIONS */

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <h1 className="text-2xl font-bold">
        Finance Analytics Dashboard
      </h1>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Transactions</p>
          <h2 className="text-2xl font-bold mt-1">
            {totalTransactions}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Fees Collected</p>
          <h2 className="text-2xl font-bold text-green-600 mt-1">
            ₹ {totalFees}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Students Paid</p>
          <h2 className="text-2xl font-bold text-indigo-600 mt-1">
            {paidStudents}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Average Payment</p>
          <h2 className="text-2xl font-bold text-purple-600 mt-1">
            ₹ {averagePayment}
          </h2>
        </div>

      </div>

      {/* CHARTS */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 text-sm">
            Daily Revenue Trend
          </h2>

          <div className="h-[260px]">
            <Line data={revenueChart} options={chartOptions} />
          </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 text-sm">
            Student Payments
          </h2>

          <div className="h-[260px]">
            <Bar data={studentChart} options={chartOptions} />
          </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
          <h2 className="font-semibold mb-4 text-sm">
            Revenue Distribution
          </h2>

          <div className="h-[260px] flex justify-center">
            <Doughnut data={paymentShare} options={chartOptions} />
          </div>

        </div>

      </div>

      {/* RECENT TRANSACTIONS */}

      <div className="bg-white rounded-xl shadow">

        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">
            Recent Transactions
          </h2>
        </div>

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="px-6 py-3 text-left">Fee ID</th>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {transactions.slice(-6).map(t => (

              <tr key={t.fee_id} className="border-b">

                <td className="px-6 py-3">{t.fee_id}</td>
                <td className="px-6 py-3">{t.student_id}</td>
                <td className="px-6 py-3 font-semibold">
                  ₹ {t.amount}
                </td>
                <td className="px-6 py-3">{t.payment_date}</td>

                <td className="px-6 py-3 text-green-600 font-medium">
                  {t.payment_status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AccountantDashboard;