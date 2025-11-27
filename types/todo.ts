export type Status = "created" | "in-progress" | "review" | "done";

export type Todo = {
  id: string;
  text: string;
  status: Status;
};
