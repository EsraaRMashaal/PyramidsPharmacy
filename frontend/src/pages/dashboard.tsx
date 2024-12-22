// React and hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Third-party libraries
import { toast } from "react-toastify";

// Services
import { fetchMedicationStatistics } from "../services/medications";

// Components
import StatisticCard from "../components/StatisticCard.tsx";
import BarChart from "../components/charts/BarChart.tsx";
import PieChart from "../components/charts/PieChart.tsx";
import DonutChart from "../components/charts/DonutChart.tsx";

// Define the interface for medication statistics
interface MedicationStatistics {
  medication_count: number;
  refill_count: number;
  pending_refill_count: number;
  approved_refill_count: number;
  rejected_refill_count: number;
  refill_statistics: {
    medication__name: string;
    total_refills: number;
  }[];
  total_requests_by_status: {
    status: string;
    total_requests: number;
  }[];
  total_requests_by_user: {
    requested_by__username: string;
    total_requests: number;
  }[];
}

const Dashboard = () => {
  const [medicationStatistics, setMedicationStatistics] =
    useState<MedicationStatistics | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicationStatistics = await fetchMedicationStatistics();
        setMedicationStatistics(medicationStatistics);
        console.log(medicationStatistics);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch refill requests. Please try again.");
      }
    };

    fetchData();
  }, []);

  const barStatisticCard = medicationStatistics
    ? [
        {
          name: "Total Refills",
          data: medicationStatistics.refill_statistics.map(
            (stat) => stat.total_refills
          ),
        },
      ]
    : [];

  const barCategories = medicationStatistics
    ? medicationStatistics.refill_statistics.map(
        (stat) => stat.medication__name
      )
    : [];

  const pieStatisticCard = medicationStatistics
    ? medicationStatistics.total_requests_by_status.map(
        (stat) => stat.total_requests
      )
    : [];
  const pieCategories = medicationStatistics
    ? medicationStatistics.total_requests_by_status.map((stat) => stat.status)
    : [];

const donutStatisticCard = medicationStatistics ? medicationStatistics.total_requests_by_user.map(stat => stat.total_requests) : [];
const donutCategories = medicationStatistics ? medicationStatistics.total_requests_by_user.map(stat => stat.requested_by__username) : [];

  const filterationOptions = [
    { name: "All", value: "all" },
    { name: "Pending", value: "pending" },
    { name: "Approved", value: "approved" },
    { name: "Rejected", value: "rejected" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {medicationStatistics && (
          <>
            <StatisticCard
              cardTitle="All Medications"
              totalCount={medicationStatistics.medication_count.toString()}
              iconPath="src/assets/icons/pills.png"
            />
            <StatisticCard
              cardTitle="Pending Request"
              totalCount={medicationStatistics.pending_refill_count.toString()}
              iconPath="src/assets/icons/first-aid-kit.png"
            />
            <StatisticCard
              cardTitle="Approved Requests"
              totalCount={medicationStatistics.approved_refill_count.toString()}
              iconPath="src/assets/icons/check.png"
            />
            <StatisticCard
              cardTitle="Rejected Requests"
              totalCount={medicationStatistics.rejected_refill_count.toString()}
              iconPath="src/assets/icons/cross.png"
            />
          </>
        )}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {barStatisticCard && (
          <BarChart
            series={barStatisticCard}
            categories={barCategories}
            filterationOptions={filterationOptions}
            title="Refill Statistics"
          />
        )}

        {pieStatisticCard && (
          <PieChart
            series={pieStatisticCard}
            labels={pieCategories}
            title="Total Requests by Status"
          />
        )}

        {donutStatisticCard && (
          <DonutChart
            series={donutStatisticCard}
            labels={donutCategories}
            title="Total Requests by User"
          />
        )}

        {/* <ChartOne />
        <BarChart />
        <ChartThree />
        <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">{/* <TableOne /> */}</div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default Dashboard;
