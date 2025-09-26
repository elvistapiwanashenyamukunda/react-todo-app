import React, { useState, useEffect } from "react";
import { Todo } from "../types";

type Props = {
  todo?: Todo | null;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => Promise<void>;
  saving?: boolean;
};

export const EditModal: React.FC<Props> = ({ todo, onClose, onSave, saving }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [todo]);

  if (!todo) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(todo.id, { title: title.trim(), description: description.trim(), completed: todo.completed });
    onClose();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h3>Edit To-Do</h3>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} required disabled={saving} />
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} disabled={saving} />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" disabled={saving || !title.trim()}>{saving ? "Saving..." : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};