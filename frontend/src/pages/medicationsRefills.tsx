// React and hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Third-party libraries
import { toast } from "react-toastify";

// Components
import Breadcrumb from "../components/Breadcrumb";
import TableThree from "../components/TableThree";

// Services
import {
  fetchRefillRequests,
  changeRequestStatus,
} from "../services/medications";

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

  const handleChangeStatus = async (id, status) => {
    try {
      await changeRequestStatus({
        request_id: id,
        rejected_reason: status === "Rejected" ? "Rejected by admin" : "",
        status,
      });
      toast.success(`Refill request ${status.toLowerCase()} successfully.`);
      // Refresh data
      const refillRequests = await fetchRefillRequests();
      setData(refillRequests);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Failed to change refill request status. Please try again."
        );
      }
    }
  };

  const columns = [
    { header: "Medication", accessor: "medication_details.name", type: "text" },
    { header: "Quantity", accessor: "quantity", type: "text" },
    { header: "Status", accessor: "status", type: "chip" },
    { header: "Approved", accessor: "approved", type: "boolean" },
    { header: "Requested By", accessor: "requested_by.username", type: "text" },
    { header: "Requested At", accessor: "requested_at", type: "text" },
    {
      header: "Actions",
      accessor: "actions",
      type: "actions",
      Cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {row.status === "Pending" && (
              <>
                <button
                  className="rounded bg-primary text-white px-2 py-1"
                  onClick={() => handleChangeStatus(row.id, "Approved")}
                >
                  Verify
                </button>
                <button
                  className="rounded bg-danger text-white px-2 py-1"
                  onClick={() => handleChangeStatus(row.id, "Rejected")}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        );
      },
    },
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
    { name: "Medications Refills" },
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
