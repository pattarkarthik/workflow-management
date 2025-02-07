import { Handle, Position, useNodeId, useNodesData } from "@xyflow/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useCallback, useEffect } from "react";
import NodeForm from "../NodeForm";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";

export const TaskNode = ({
  clickedNode,
  onClick,
  deleteHandler,
  handleDataSubmit,
}) => {
  const sourcePosition = Position.Right;
  const targetPosition = Position.Left;
  const nodeId = useNodeId();
  const nodeData = useNodesData(nodeId).data;
  const { register, handleSubmit, setValue } = useForm();
  const fields = Object.keys(nodeData).map((key) => ({
    label: key,
    name: key,
    type: key === "Due Date" ? "date" : "text",
  }));

  const handleNodeClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (clickedNode === null || clickedNode?.id !== nodeId) {
        onClick(nodeId);
      }
    },
    [onClick]
  );
  const onSubmit = (data) => handleDataSubmit(data, nodeId);

  return (
    <div
      className={`bg-blue-500 rounded-md shadow-md flex gap-2 flex-col ${
        nodeId === clickedNode?.id ? "border-2 border-black" : ""
      }`}
      onClick={handleNodeClick}
    >
      <div className="ml-auto w-full flex justify-between mt-2 font-bold">
        <span className="ml-2 font-bold text-white">Task Node</span>
        <CloseOutlinedIcon
          sx={{ cursor: "pointer", color: "white" }}
          onClick={() => deleteHandler(nodeId)}
        />
      </div>
      <hr />
      <div className="p-2 flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          {fields.map((field) => (
            <Input
              key={field.label}
              label={field.label}
              type={field.type}
              name={field.name}
              value={nodeData[field.label]}
              register={register}
            />
          ))}
          <Button label="Save" type="submit" />
        </form>
      </div>
      <Handle type="source" position={sourcePosition} />
      <Handle type="target" position={targetPosition} />
    </div>
  );
};
