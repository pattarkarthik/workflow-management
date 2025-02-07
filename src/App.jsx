import React, { useCallback, useState, useMemo } from "react";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TaskNode } from "./Components/Nodes/TaskNode";
import { ConditionNode } from "./Components/Nodes/ConditionNode";
import { NotificationNode } from "./Components/Nodes/NotificationNode";
import Select from "./Components/Select";
import Workflow from "./Components/Workflow";
import { nodeOptions, propertyFields } from "./assets/Data";
import NodeForm from "./Components/NodeForm";

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(4);
  const [clickedNode, setClickedNode] = useState(null);

  const defaultData = useMemo(
    () => ({
      task: { "Task Name": "", Asignee: "", "Due Date": "" },
      condition: {
        "Condition Name": "",
        Status: "",
        Remarks: "",
      },
      notification: { Message: "", "Alert Type": "", "Scheduled On": "" },
    }),
    []
  );

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        return addEdge(params, eds);
      }),
    [setEdges]
  );

  const deleteHandler = (id) => {
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.filter((node) => node.id !== id);
      return updatedNodes;
    });
    setClickedNode(null);
  };
  const addNode = (type) => {
    const newNode = {
      id: `${nodeId}`,
      position: { x: 0, y: 0 },
      data: {
        ...defaultData[type],
      },
      type,
      deletable: true,
      selected: false,
      dragging: false,
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId(nodeId + 1);
  };

  const onNodeClick = (nodeId) => {
    const node = nodes.find((node) => node.id === nodeId);
    setClickedNode(node);
  };

  const submitHandler = (formValues, id) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, ...formValues } : node
      )
    );
  };
  const handleDataSubmit = (data, id) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === id ? { ...node, data: data } : node))
    );
  };
  const nodeTypes = {
    task: (props) => (
      <TaskNode
        {...props}
        clickedNode={clickedNode}
        onClick={() => onNodeClick(props.id)}
        deleteHandler={deleteHandler}
        handleDataSubmit={handleDataSubmit}
      />
    ),
    condition: (props) => (
      <TaskNode
        {...props}
        selectedNodeId={clickedNode}
        onClick={() => onNodeClick(props.id)}
        deleteHandler={deleteHandler}
        handleDataSubmit={handleDataSubmit}
      />
    ),
    notification: (props) => (
      <NotificationNode
        {...props}
        selectedNodeId={selectedNodeId}
        onClick={() => onNodeClick(props.id)}
        deleteHandler={deleteHandler}
        handleDataSubmit={handleDataSubmit}
      />
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 min-h-screen">
      <div
        className="md:col-span-6 bg-gray-200 p-4 flex items-center justify-center"
        onClick={(event) => {
          event.preventDefault();
          setClickedNode(null);
        }}
      >
        <Workflow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        />
      </div>

      <div className="md:col-span-6 bg-gray-300 p-4 pt-0 flex flex-col h-full">
        <div className="relative flex-none h-[10%] flex items-center box-border ">
          <Select
            label="Add Node"
            options={nodeOptions}
            onChange={(type) => addNode(type)}
          />
        </div>
        {clickedNode ? (
          <NodeForm
            key={"fromApp"}
            clickedNode={clickedNode}
            submitHandler={submitHandler}
            fields={propertyFields}
          />
        ) : (
          <div className="flex flex-grow flex-col overflow-hidden bg-white p-3">
            All Nodes
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
