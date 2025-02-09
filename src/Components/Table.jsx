import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import EditableCell from "./EditableCell";

const columnHelper = createColumnHelper();

function Table({ nodesData, setNodes }) {
  const [data, setData] = useState(nodesData);
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
            handleInputChange={(value) => {
              const currentNode = info.row.original;
              const updatedNode = {
                ...currentNode,
                position: { ...currentNode.position, x: value },
              };
              handleInputChange(updatedNode);
            }}
            errorMessage={"Enter only numbers"}
            type="text"
          />
        );
      },
    }),
    columnHelper.accessor("position.y", {
      header: "Position Y",
      cell: (info) => {
        return (
          <EditableCell
            defaultValue={info.getValue()}
            validationRegex={/^-?\d+(\.\d+)?$/}
            handleInputChange={(value) => {
              const currentNode = info.row.original;
              const updatedNode = {
                ...currentNode,
                position: { ...currentNode.position, y: value },
              };
              handleInputChange(updatedNode);
            }}
            errorMessage={"Enter only numbers"}
            type="text"
          />
        );
      },
    }),

    columnHelper.accessor("type", {
      header: "Type",
    }),
    columnHelper.accessor("deletable", {
      header: "Deletable",
      cell: (info) => {
        return (
          <EditableCell
            checked={info.getValue()}
            validationRegex={/^(true|false)$/}
            handleInputChange={(value) => {
              const currentNode = info.row.original;
              const updatedNode = {
                ...currentNode,
                deletable: value,
                error: "",
              };
              handleInputChange(updatedNode);
            }}
            errorMessage={"Its a Boolean"}
            type="checkbox"
          />
        );
      },
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
  const handleInputChange = (updatedNode) => {
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
                <td key={cell.id} className="border p-2 text-center">
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
