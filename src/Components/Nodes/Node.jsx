import { Handle, Position, useNodeId, useNodes } from "@xyflow/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";

export const Node = ({
  clickedNode,
  onClick,
  deleteHandler,
  handleDataSubmit,
  title,
}) => {
  const sourcePosition = Position.Right;
  const targetPosition = Position.Left;
  const nodeId = useNodeId();
  const nodes = useNodes();
  const node = nodes.find((node) => node.id === nodeId);
  const { type: nodeType, data: nodeData, error } = node;
  const { register, handleSubmit, setValue } = useForm();
  const fields = Object.keys(nodeData).map((key) => ({
    label: key,
    name: key,
    type: key === "Due Date" ? "date" : "text",
  }));

  useEffect(() => {
    fields.forEach((field) => {
      setValue(field.name, nodeData[field.name]);
    });
  }, [nodeData, setValue]);

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
      className={`${
        nodeType === "task"
          ? "bg-blue-400"
          : nodeType === "condition"
          ? "bg-gray-400"
          : "bg-green-400"
      } rounded-md shadow-md flex gap-2 flex-col w-100 ${
        nodeId === clickedNode?.id ? "border-2 border-black" : ""
      }`}
      onClick={handleNodeClick}
    >
      <div className="ml-auto w-full flex justify-between mt-2 font-bold">
        <span className="ml-2 font-bold text-white">{title}</span>
        {error && <span className="text-red-600"> {error}</span>}
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
