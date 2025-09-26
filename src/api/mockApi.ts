import { Todo } from "../types";

const SIMULATED_DELAY = 500; // ms
const FAILURE_RATE = 0.06; // 6% chance to fail each call (tweakable)

let _store: Todo[] = [
  {
    id: "1",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and coffee",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Read chapter 4",
    description: "Finish the IPSAS chapter for dissertation",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

const maybeFail = <T>(resolve: () => T): Promise<T> =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        rej(new Error("Network error: simulated failure. Try again."));
      } else {
        res(resolve());
      }
    }, SIMULATED_DELAY + Math.random() * 600);
  });

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const api = {
  getTodos: async (): Promise<Todo[]> => maybeFail(() => [..._store].sort((a,b)=> +new Date(b.createdAt) - +new Date(a.createdAt))),
  createTodo: async (payload: Omit<Todo, "id" | "createdAt">): Promise<Todo> =>
    maybeFail(() => {
      const item: Todo = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...payload,
      };
      _store = [item, ..._store];
      return item;
    }),
  updateTodo: async (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>): Promise<Todo> =>
    maybeFail(() => {
      const idx = _store.findIndex((t) => t.id === id);
      if (idx === -1) throw new Error("Todo not found");
      const updated = { ..._store[idx], ...updates };
      _store[idx] = updated;
      return updated;
    }),
  deleteTodo: async (id: string): Promise<{ id: string }> =>
    maybeFail(() => {
      const idx = _store.findIndex((t) => t.id === id);
      if (idx === -1) throw new Error("Todo not found");
      _store = _store.filter((t) => t.id !== id);
      return { id };
    }),
};