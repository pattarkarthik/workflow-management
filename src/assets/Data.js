export const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Task" },
    type: "task",
    deletable: true,
    selected: true,
  },
  {
    id: "2",
    position: { x: 150, y: 100 },
    data: { label: "Condition" },
    type: "condition",
    deletable: true,
    selected: false,
  },
  {
    id: "3",
    position: { x: 300, y: 200 },
    data: { label: "Notification" },
    type: "notification",
    deletable: true,
  },
];

export const initialEdges = [
  { id: "e1-2", source: "1", target: "2", deletable: true },
  { id: "e2-3", source: "2", target: "3", deletable: true },
];
export const nodeOptions = [
  { type: "task", label: "Task Node" },
  { type: "condition", label: "Condition Node" },
  { type: "notification", label: "Notification Node" },
];

export const propertyFields = [
  { label: "deletable", type: "checkbox", name: "deletable" },
  { label: "selected", type: "checkbox", name: "selected" },
  { label: "dragging", type: "checkbox", name: "dragging" },
  { label: "positionX", type: "number", name: "position.x" },
  { label: "positionY", type: "number", name: "position.y" },
];
