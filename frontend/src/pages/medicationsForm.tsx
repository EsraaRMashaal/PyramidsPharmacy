import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { submitMedication } from "../services/medications";

// Components
import Breadcrumb from "../components/Breadcrumb";
import CheckboxOne from "../components/Checkbox";

const DOSAGE_FORMS = [
  "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Ointment", "Gel", "Drops", "Inhaler", "Suppository", "Patch", "Solution", "Suspension", "Spray", "Lotion", "Lozenge", "Powder", "Granules", "Mouthwash", "Shampoo", "Gargle", "Enema", "Mouth Paint", "Ear Drops", "Nasal Drops", "Eye Drops", "Eye Ointment", "Eye Gel", "Ear Spray", "Ear Gel", "Ear Ointment"
];

const MEDICATION_CATEGORIES = [
  "Antibiotics", "Antipyretics", "Analgesics", "Antimalarials", "Antacids", "Antihistamines", "Antifungals", "Antivirals", "Antitussives", "Expectorants", "Laxatives", "Antidiarrheals", "Antispasmodics", "Antiemetics", "Antihypertensives", "Anticoagulants", "Anticonvulsants", "Antidepressants", "Antipsychotics", "Antidiabetics"
];

const AddMedicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 0,
    price: "",
    dosage_form: "",
    manufacturer: "",
    expiry_date: "",
    category: "",
    prescription_required: false,
  });

  const navigate = useNavigate();

  const breadcrumbs = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Medications", link: "/medications" },
    { name: "Add Medication" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitMedication(formData);
      toast.success("Medication added successfully.");
      navigate("/medications");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add medication. Please try again.");
    }
  };

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add New Medication
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Stock <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Price <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Dosage Form <span className="text-meta-1">*</span>
                    </label>
                    <select
                      name="dosage_form"
                      value={formData.dosage_form}
                      onChange={handleChange}
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select dosage form</option>
                      {DOSAGE_FORMS.map((form) => (
                        <option key={form} value={form}>
                          {form}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="expiry_date"
                      value={formData.expiry_date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Category <span className="text-meta-1">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select category</option>
                      {MEDICATION_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2 flex items-center mt-6">
                    <CheckboxOne
                      label="Prescription Required"
                      checked={formData.prescription_required}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          prescription_required: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:bg-form-input"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray">
                    Add Medication
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

export default AddMedicationForm;