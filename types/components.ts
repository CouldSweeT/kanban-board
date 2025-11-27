import type { Todo, Status } from "./todo";
import type { DndProvided, DndSnapshot } from "./dnd";

// Props для карточки задачи
export interface TaskCardProps {
  id: string;
  text: string;
  deleteTodo: (id: string) => void;
  provided: DndProvided;
  snapshot: DndSnapshot;
}

// Props для колонки
export interface ColumnProps {
  id: Status;
  title: string;
  items: Todo[];
  deleteTodo: (id: string) => void;
}
