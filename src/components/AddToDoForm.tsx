import React, { useState } from "react";
import { Todo } from "../types";

type Props = {
  onCreate: (payload: Omit<Todo, "id" | "createdAt">) => Promise<void>;
  loading?: boolean;
};

export const AddToDoForm: React.FC<Props> = ({ onCreate, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate({ title: title.trim(), description: description.trim(), completed: false });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="card" onSubmit={submit} style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          disabled={loading}
        />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="submit" disabled={loading || !title.trim()}>
            {loading ? "Adding..." : "Add To-Do"}
          </button>
        </div>
      </div>
    </form>
  );
};