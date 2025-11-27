"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column";
import { useKanban } from "../hooks/useKanban";
import { Status } from "../types/todo";

const columns: { id: Status; title: string }[] = [
  { id: "created", title: "Neu" },
  { id: "in-progress", title: "In Bearbeitung" },
  { id: "review", title: "Überprüfung" },
  { id: "done", title: "Erledigt" },
];

export default function Home() {
  const { items, value, setValue, addTodo, deleteTodo, onDragEnd } = useKanban();

  return (
    <div className="max-w-6xl mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Aufgabenboard</h1>

      {/* Eingabe */}
      <div className="flex gap-2 mb-6">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          placeholder="Neue Aufgabe…"
          className="flex-1 border p-2 rounded-lg"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          Hinzufügen
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-6">
          {columns.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              deleteTodo={deleteTodo}
              items={items
                .filter((t) => t.status === col.id)
                .sort(
                  (a, b) =>
                    items.findIndex((t) => t.id === a.id) -
                    items.findIndex((t) => t.id === b.id)
                )}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
