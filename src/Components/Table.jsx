import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { produce } from "immer";
import { useNodesState } from "@xyflow/react";
import EditableCell from "./EditableCell";

const columnHelper = createColumnHelper();

function Table({ nodesData, setNodes }) {
  const [data, setData] = useState(nodesData);
  const [error, setError] = useState("");
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),
    columnHelper.accessor("position.x", {
      header: "Position X",
      cell: (info) => {
        return (
          <EditableCell
            defaultValue={info.getValue()}
            validationRegex={/^-?\d+(\.\d+)?$/}
            handleInputChange={(value) => handleInputChange(info, value)}
            errorMessage={"Enter only numbers"}
          />
          // <div className=" relative">
          //   <input
          //     type="text"
          //     className="[all:unset] p-1 text-center"
          //     defaultValue={info.getValue()}
          //     onChange={(e) => {
          //       if (e.target.value.match(/^-?\d+(\.\d+)?$/)) {
          //         handleInputChange(info, e.target.value);
          //         setError("");
          //       } else {
          //         setError("Enter only numbers");
          //       }
          //     }}
          //   />
          //   <span className="absolute mt-5 -ml-45 text-xs text-red-500">
          //     {error}
          //   </span>
          // </div>
        );
      },
    }),
    columnHelper.accessor("position.y", {
      header: "Position Y",
      cell: (info) => {
        const rowIndex = info.row.index;
        return (
          <EditableCell
            defaultValue={info.getValue()}
            validationRegex={/^-?\d+(\.\d+)?$/}
            handleInputChange={(value) => handleInputChange(info, value)}
            errorMessage={"Enter only numbers"}
          />
          // <div className=" relative">
          //   <input
          //     type="text"
          //     className="[all:unset] p-1 text-center "
          //     defaultValue={info.getValue()}
          //     onChange={(e) => {
          //       if (e.target.value.match(/^-?\d+(\.\d+)?$/)) {
          //         handleInputChange(info, e.target.value);
          //         setError("");
          //       } else {
          //         setError("Enter only numbers");
          //       }
          //     }}
          //   />
          //   <span className="absolute mt-5 -ml-45 text-xs text-red-500">
          //     {error}
          //   </span>
          // </div>
        );
      },
    }),

    columnHelper.accessor("type", {
      header: "Type",
    }),
    columnHelper.accessor("deletable", {
      header: "Deletable",
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("selected", {
      header: "Selected",
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("dragging", {
      header: "Dragging",
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    }),
  ];
  useEffect(() => {
    setData(nodesData);
  }, [nodesData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleInputChange = (info, value) => {
    const fieldNameArray = info.column.id.split("_");
    const currentNode = info.row.original;
    const updatedNode = {
      ...currentNode,
      position: {
        ...currentNode.position,
        [fieldNameArray[fieldNameArray.length - 1]]: parseFloat(value),
      },
    };
    setNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
  };

  return (
    <div className="p-4  overflow-auto min-h-full">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-3 align-baseline text-sm min-w-20"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2 text-center ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
