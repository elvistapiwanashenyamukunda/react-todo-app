export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}