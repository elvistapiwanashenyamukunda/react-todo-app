import React from "react";
import { Todo } from "../types";
import { ToDoItem } from "./ToDoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (todo: Todo) => void;
  savingId?: string | null;
};

export const ToDoList: React.FC<Props> = ({ todos, onToggle, onDelete, onEdit, savingId }) => {
  if (todos.length === 0) {
    return <div className="card">No To-Dos yet — add your first task.</div>;
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {todos.map((t) => (
        <ToDoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          saving={savingId === t.id}
        />
      ))}
    </div>
  );
};