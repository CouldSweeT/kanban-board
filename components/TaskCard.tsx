"use client";


import type { TaskCardProps } from "../types";

export default function TaskCard({ text, id, deleteTodo, provided, snapshot }: TaskCardProps) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`p-3 bg-white rounded-lg shadow border shadow-sm mb-3 flex justify-between items-center ${
        snapshot.isDragging ? "opacity-70" : ""
      }`}
    >
      <span>{text}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(id);
        }}
        className="text-red-500 hover:text-red-700 font-bold ml-3"
      >
        ✕
      </button>
    </div>
  );
}
