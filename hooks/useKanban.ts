"use client";

import { useState, useEffect } from "react";
import type { Todo, Status, DndDropResult } from "../types";


export function useKanban() {
  const [items, setItems] = useState<Todo[]>([]);
  const [value, setValue] = useState("");

  // Laden
  useEffect(() => {
    const saved = localStorage.getItem("aufgaben-kanban");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Speichern
  useEffect(() => {
    localStorage.setItem("aufgaben-kanban", JSON.stringify(items));
  }, [items]);

  const addTodo = () => {
    if (!value.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: value.trim(),
      status: "created",
    };

    setItems((prev) => [...prev, newTodo]);
    setValue("");
  };

  const deleteTodo = (id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  const onDragEnd = (result: DndDropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId as Status;
    const destColumn = destination.droppableId as Status;

    // Aufgabe zwischen Spalten verschieben
    if (sourceColumn !== destColumn) {
      setItems((prev) => {
        const moved = prev.find((t) => t.id === draggableId)!;
        const without = prev.filter((t) => t.id !== draggableId);

        return [...without, { ...moved, status: destColumn }];
      });
      return;
    }

    // Sortieren in gleicher Spalte
    setItems((prev) => {
      const newItems = [...prev];

      const columnTasks = newItems.filter((t) => t.status === sourceColumn);

      const oldIndex = columnTasks.findIndex((t) => t.id === draggableId);
      const newIndex = destination.index;

      const orderedIds = columnTasks.map((t) => t.id);

      const [removedId] = orderedIds.splice(oldIndex, 1);
      orderedIds.splice(newIndex, 0, removedId);

      let pointer = 0;
      const rebuilt = newItems.map((t) => {
        if (t.status !== sourceColumn) return t;

        const id = orderedIds[pointer];
        pointer++;

        return { ...newItems.find((x) => x.id === id)! };
      });

      return rebuilt;
    });
  };

  return {
    items,
    value,
    setValue,
    addTodo,
    deleteTodo,
    onDragEnd,
  };
}
