import { Handle, Position } from "@xyflow/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const NotificationNode = ({
  id,
  onClick,
  deleteHandler,
  selectedNodeId,
  data,
}) => {
  const bgColor = "bg-green-500";
  const textColor = "text-white";
  const sourcePosition = Position.Right;
  const targetPosition = Position.Left;
  const fields = Object.keys(data);

  return (
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
        <span className="ml-2">Notification Node</span>

        <CloseOutlinedIcon
          sx={{ cursor: "pointer", color: "white" }}
          onClick={() => deleteHandler(id)}
        />
      </div>
      <hr />
      <div className="p-2 flex flex-col">
        {fields.map((field) => (
          <div key={field}>
            <span>{field}: </span>
            {data[field]}
          </div>
        ))}
      </div>

      <Handle type="source" position={sourcePosition} />
      <Handle type="target" position={targetPosition} />
    </div>
  );
};
