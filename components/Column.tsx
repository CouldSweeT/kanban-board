"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Todo } from "../types/todo";

interface Props {
  title: string;
  id: string;
  items: Todo[];
  deleteTodo: (id: string) => void;
}

export default function Column({ title, id, items, deleteTodo }: Props) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg min-h-[500px]">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[300px]"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <TaskCard
                    id={item.id}
                    text={item.text}
                    deleteTodo={deleteTodo}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
