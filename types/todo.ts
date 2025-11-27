export type Status = "created" | "in-progress" | "review" | "done";

export interface Todo {
  id: string;
  text: string;
  status: Status;
}