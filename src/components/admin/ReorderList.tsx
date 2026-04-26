import type { ReactNode } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Modifier } from '@dnd-kit/core';

const restrictToVerticalAxis: Modifier = ({ transform }) => ({
  ...transform,
  x: 0,
});
import type { AdminEntry } from '../../types';
import { useReorderEntries } from '../../hooks/useEntries';

interface ReorderListProps {
  entries: AdminEntry[];
  children: ReactNode;
}

export default function ReorderList({ entries, children }: ReorderListProps) {
  const reorderMutation = useReorderEntries();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = entries.findIndex((e) => e.id === active.id);
    const newIndex = entries.findIndex((e) => e.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...entries];
    const moved = reordered.splice(oldIndex, 1)[0];
    if (!moved) return;
    reordered.splice(newIndex, 0, moved);

    const orders = reordered.map((entry, index) => ({
      id: entry.id,
      sort_order: index,
    }));

    reorderMutation.mutate(orders);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={entries.map((e) => e.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </SortableContext>
    </DndContext>
  );
}
