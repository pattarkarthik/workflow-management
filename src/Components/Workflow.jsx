import React, { useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useKeyPress,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function Workflow({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  nodeTypes,
  setNodes,
}) {
  const redoKey = useKeyPress(["Meta+y", "Control+y"]);
  const undoKey = useKeyPress(["Meta+z", "Control+z"]);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    if (nodes.length > 0) {
      setHistory((prevHistory) =>
        prevHistory.length > 0 ? [...prevHistory, nodes] : [nodes]
      );
    }
  }, [nodes]);
  useEffect(() => {
    if (history.length > 0) {
      const changedState = [...history];
      const previousState = changedState.pop();
      setHistory(changedState);
      setNodes(previousState);
    }
  }, [redoKey, undoKey]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      style={{ color: "blue" }}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
}

export default Workflow;
