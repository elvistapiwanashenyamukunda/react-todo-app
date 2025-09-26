import React from "react";
import { Todo } from "../types";

type Props = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (todo: Todo) => void;
  saving?: boolean;
};

export const ToDoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit, saving }) => {
  return (
    <div className="todoItem" style={{
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: 12,
      borderRadius: 8,
      background: "#fff",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        disabled={saving}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <h4 style={{ margin: 0, textDecoration: todo.completed ? "line-through" : undefined }}>{todo.title}</h4>
          <small style={{ color: "#666" }}>{new Date(todo.createdAt).toLocaleString()}</small>
        </div>
        {todo.description && <p style={{ margin: "6px 0 0", color: "#333" }}>{todo.description}</p>}
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button onClick={() => onEdit(todo)} className="linkBtn">Edit</button>
          <button onClick={() => onDelete(todo.id)} className="dangerBtn" disabled={saving}>Delete</button>
        </div>
      </div>
    </div>
  );
};