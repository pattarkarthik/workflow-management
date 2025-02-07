import { Handle, Position } from "@xyflow/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const ConditionNode = ({
  id,
  onClick,
  deleteHandler,
  selectedNodeId,
  data,
}) => {
  const bgColor = "bg-yellow-500";
  const textColor = "text-white";
  const sourcePosition = Position.Bottom;
  const targetPosition = Position.Top;
  const fields = Object.keys(data);

  return (
    <>
      <Handle type="source" position={sourcePosition} />
      <div
        className={`${bgColor} ${textColor} rounded-md shadow-md flex gap-2 flex-col ${
          id === selectedNodeId ? "border-2 border-black" : ""
        }`}
        onClick={(event) => {
          event.stopPropagation();
          onClick(id);
        }}
      >
        <div className="ml-auto w-40 flex justify-between mt-2">
          <span className="ml-2">Condition Node</span>

          <CloseOutlinedIcon
            sx={{ cursor: "pointer", color: "white" }}
            onClick={() => deleteHandler(id)}
          />
        </div>
        <hr />
        <div className="p-2 flex flex-col">
          {fields.map((field) => (
            <div key={field}>
              <span className="text-xs">{field}: </span>
              {data[field]}
            </div>
          ))}
        </div>

        <Handle type="target" position={targetPosition} />
      </div>
    </>
  );
};
