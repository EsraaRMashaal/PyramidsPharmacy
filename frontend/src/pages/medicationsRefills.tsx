// React and hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Third-party libraries
import { toast } from "react-toastify";

// Components
import Breadcrumb from "../components/Breadcrumb";
import TableThree from "../components/TableThree";

// Services
import { fetchRefillRequests } from "../services/medications";

const MedicationsRefills = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const refillRequests = await fetchRefillRequests();
        setData(refillRequests);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch refill requests. Please try again.");
      }
    };

    fetchData();
  }, []);

  const columns = [
    { header: "Medication", accessor: "medication_details.name", type: "text" },
    { header: "Quantity", accessor: "quantity", type: "text" },
    { header: "Status", accessor: "status", type: "chip" },
    { header: "Requested By", accessor: "requested_by.username", type: "text" },
    { header: "Requested At", accessor: "requested_at", type: "text" },
    { header: "Approved", accessor: "approved", type: "boolean" },
  ];

  return (
    <div>
      <TableThree columns={columns} data={data} />
    </div>
  );
};

const Tables = () => {
  const navigate = useNavigate();
  const breadcrumbs = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Medications Refills"},
  ];

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex justify-end my-5">
        <button
          className="flex justify-center rounded bg-primary p-3 font-medium text-gray"
          onClick={() => navigate("/medications-refills-request")}
        >
          Add New Refill Request
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <MedicationsRefills />
      </div>
    </>
  );
};

export default Tables;
