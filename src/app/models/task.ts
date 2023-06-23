import { Priority } from "./priority";

export interface Task {
  id: string;
  title: string;
  details: string;
  priority: Priority
  completed: boolean;
}
