// React and hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Third-party libraries
import { toast } from "react-toastify";

// Components
import Breadcrumb from "../components/Breadcrumb";

// Services
import { fetchMedications, submitRefillRequest } from "../services/medications";

import medicationsIcon from "../assets/icons/supplement-bottle-2.png";


const AddMedicationsRefillsRequest = () => {
  const [medications, setMedications] = useState([]);
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Medications Refills", link: "/medications-refills" },
    { name: "New Request" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medications = await fetchMedications();
        setMedications(medications);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch medications. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const medication = data.get("medication") as string;
    const quantity = data.get("quantity") as string;
    const formData = {
      medication: medication ? parseInt(medication) : null,
      quantity: quantity ? parseInt(quantity) : null,
      notes: data.get("notes"),
    };

    try {
      await submitRefillRequest(formData);
      toast.success("Refill request submitted successfully.");
      navigate("/medications-refills");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit refill request. Please try again.");
    }
  };

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add New Medications Refills Request
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Medication <span className="text-meta-1">*</span>
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <img src={medicationsIcon} alt="medications" className="h-7 w-7" />
                      </span>
                      <select
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        required
                        id="medication"
                        name="medication"
                      >
                        <option value="">Select medication</option>
                        {medications.map((medication) => (
                          <option key={medication.id} value={medication.id}>
                            {medication.name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill="#637381"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Quantity <span className="text-meta-1">*</span>
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={6}
                    placeholder="Type your notes"
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray">
                    Request Refill
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMedicationsRefillsRequest;
