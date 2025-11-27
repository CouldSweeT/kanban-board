import type { DndProvided, DndSnapshot } from "../dnd";

export interface TaskCardProps {
  id: string;
  text: string;
  deleteTodo: (id: string) => void;
  provided: DndProvided;
  snapshot: DndSnapshot;
}
