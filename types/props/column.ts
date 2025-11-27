import type { Todo, Status } from "../todo";

export interface ColumnProps {
  id: Status;
  title: string;
  items: Todo[];
  deleteTodo: (id: string) => void;
}
