import { Task } from "../../task/task.model";

// src/user/user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  gender: 'M' | 'F';
  tasks: Task[];
}
