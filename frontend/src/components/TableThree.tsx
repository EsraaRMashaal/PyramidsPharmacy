import React from "react";

interface Column {
  header: string;
  accessor: string;
  type?: "text" | "chip" | "boolean"; // Add more types as needed
  class?: string; // Custom class for the column
}

interface TableThreeProps {
  columns: Column[];
  data: any[];
}

// Utility function to get nested property value
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const TableThree: React.FC<TableThreeProps> = ({ columns, data }) => {
  const renderCellContent = (
    type: string | undefined,
    value: any,
    columnClass?: string
  ) => {
    switch (type) {
      case "chip":
        const chipClass = columnClass || "bg-warning bg-opacity-10 text-warning";
        return (
          <p className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${chipClass}`}>
            {value}
          </p>
        );
      case "boolean":
        return (
          <p className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${value ? "bg-success bg-opacity-10 text-success" : "bg-danger bg-opacity-10 text-danger"}`}>
            {value ? "Yes" : "No"}
          </p>
        );
      case "text":
      default:
        return <p>{value}</p>;
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className={`min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark`}
                  >
                    {renderCellContent(column.type, getNestedValue(row, column.accessor), column.class)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;