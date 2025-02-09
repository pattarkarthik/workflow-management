import React, { useCallback, useState, useMemo, useEffect } from "react";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Node } from "./Components/Nodes/Node";
import Select from "./Components/Select";
import Workflow from "./Components/Workflow";
import { nodeOptions, propertyFields } from "./assets/Data";
import NodeForm from "./Components/NodeForm";
import Table from "./Components/Table";

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

  useEffect(() => {
    if (clickedNode) {
      const updatedNode = nodes.find((node) => node.id === clickedNode.id);
      if (updatedNode) {
        setClickedNode(updatedNode);
      } else {
        setClickedNode(null);
      }
    }
  }, [nodes]);

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
    setNodes((prevNodes) =>
      prevNodes
        .map((node) =>
          node.id === id
            ? node.deletable
              ? null
              : { ...node, error: "Node not Deletable" }
            : node
        )
        .filter(Boolean)
    );
    setClickedNode(null);
  };

  const onNodeClick = (nodeId) => {
    const node = nodes.find((node) => node.id === nodeId);
    setClickedNode(node);
  };

  const addNode = (type) => {
    const newNode = {
      id: `${nodeId}`,
      position: {
        x: Math.floor(Math.random() * 400),
        y: Math.floor(Math.random() * 400),
      },
      data: {
        ...defaultData[type],
      },
      type,
      deletable: true,
      selected: false,
      dragging: false,
      error: "",
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId(nodeId + 1);
  };

  const submitHandler = (formValues, id) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, ...formValues, error: "" } : node
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
      <Node
        {...props}
        clickedNode={clickedNode}
        onClick={() => onNodeClick(props.id)}
        deleteHandler={deleteHandler}
        handleDataSubmit={handleDataSubmit}
        title={"Task Node"}
      />
    ),
    condition: (props) => (
      <Node
        {...props}
        clickedNode={clickedNode}
        onClick={() => onNodeClick(props.id)}
        deleteHandler={deleteHandler}
        handleDataSubmit={handleDataSubmit}
        title={"Condition Node"}
      />
    ),
    notification: (props) => (
      <Node
        {...props}
        clickedNode={clickedNode}
        onClick={() => onNodeClick(props.id)}
        deleteHandler={deleteHandler}
        handleDataSubmit={handleDataSubmit}
        title={"Notification Node"}
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
          setNodes={setNodes}
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
        {clickedNode && nodes.some((node) => node.id === clickedNode.id) ? (
          <NodeForm
            key={"fromApp"}
            clickedNode={clickedNode}
            submitHandler={submitHandler}
            fields={propertyFields}
            setClickedNode={setClickedNode}
          />
        ) : (
          <div className="flex flex-grow flex-col overflow-hidden bg-white p-3  ">
            <Table nodesData={nodes} setNodes={setNodes} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
