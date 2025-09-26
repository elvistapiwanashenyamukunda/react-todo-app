import React, { useEffect, useState } from "react";
import { Todo } from "./types";
import { api } from "./api/mockApi";
import { AddToDoForm } from "./components/AddToDoForm";
import { ToDoList } from "./components/ToDoList";
import { EditModal } from "./components/EditModal";
import { Spinner } from "./components/Spinner";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [modalSaving, setModalSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getTodos()
      .then((list) => { if (mounted) setTodos(list); })
      .catch((err) => { if (mounted) setGlobalError(err.message || "Failed to fetch todos"); })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, []);

  const createTodo = async (payload: Omit<Todo, "id" | "createdAt">) => {
    setGlobalError(null);
    setCreating(true);
    try {
      const item = await api.createTodo(payload);
      setTodos((s) => [item, ...s]);
    } catch (err: any) {
      setGlobalError(err.message || "Failed to create todo");
    } finally {
      setCreating(false);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    setGlobalError(null);
    setSavingId(id);
    try {
      const updated = await api.updateTodo(id, { completed });
      setTodos((s) => s.map((t) => (t.id === id ? updated : t)));
    } catch (err: any) {
      setGlobalError(err.message || "Failed to update todo");
    } finally {
      setSavingId(null);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!confirm("Delete this To-Do?")) return;
    setGlobalError(null);
    setSavingId(id);
    try {
      await api.deleteTodo(id);
      setTodos((s) => s.filter((t) => t.id !== id));
    } catch (err: any) {
      setGlobalError(err.message || "Failed to delete todo");
    } finally {
      setSavingId(null);
    }
  };

  const saveEdit = async (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => {
    setGlobalError(null);
    setModalSaving(true);
    try {
      const updated = await api.updateTodo(id, updates);
      setTodos((s) => s.map((t) => (t.id === id ? updated : t)));
    } catch (err: any) {
      setGlobalError(err.message || "Failed to save changes");
      throw err;
    } finally {
      setModalSaving(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>To-Do App (React + TypeScript)</h1>
        <p className="muted">Mock API with simulated latency & errors — demonstrates loading, errors, CRUD.</p>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
        <AddToDoForm onCreate={createTodo} loading={creating} />

        {globalError && <div className="error">{globalError}</div>}

        {loading ? (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Spinner />
            <div>Loading To-Dos…</div>
          </div>
        ) : (
          <ToDoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={(t) => setEditingTodo(t)}
            savingId={savingId}
          />
        )}
      </main>

      <EditModal
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
        onSave={saveEdit}
        saving={modalSaving}
      />

      <footer style={{ textAlign: "center", marginTop: 24, color: "#666" }}>
        <small>Built with React + TypeScript • Mock API</small>
      </footer>
    </div>
  );
}

export default App;