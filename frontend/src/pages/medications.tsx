// React and hooks
import React, { useEffect, useState } from "react";

// Third-party libraries
import { toast } from "react-toastify";

// Components
import Breadcrumb from "../components/Breadcrumb";
import TableThree from "../components/TableThree";

// Services
import { fetchMedications } from "../services/medications";

const Medications = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medications = await fetchMedications();
        setData(medications);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch medications. Please try again.");
      }
    };

    fetchData();
  }, []);

  const columns = [
    { header: "Name", accessor: "name", type: "text" },
    { header: "Stock", accessor: "stock", type: "chip" },
    {
      header: "Price",
      accessor: "price",
      type: "chip",
      class: "bg-success bg-opacity-10 text-success",
    },
    { header: "Dosage Form", accessor: "dosage_form", type: "text" },
    { header: "Manufacturer", accessor: "manufacturer", type: "text" },
    { header: "Expiry Date", accessor: "expiry_date", type: "text" },
    { header: "Category", accessor: "category", type: "text" },
    {
      header: "Prescription Required",
      accessor: "prescription_required",
      type: "boolean",
    },
  ];

  return (
    <div>
      <TableThree columns={columns} data={data} />
    </div>
  );
};

const Tables = () => {
  const breadcrumbs = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Medications" },
  ];
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex justify-end my-5">
        <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray">
          Add New Medication
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <Medications />
      </div>
    </>
  );
};

export default Tables;
