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
import { useReorderEntries } from '../../hooks/useEntries';

interface Reorderable {
  id: number;
  sort_order: number;
}

interface ReorderListProps<T extends Reorderable> {
  entries: T[];
  children: ReactNode;
  onReorder?: (orders: { id: number; sort_order: number }[]) => void;
}

export default function ReorderList<T extends Reorderable>({ entries, children, onReorder }: ReorderListProps<T>) {
  const reorderEntriesMutation = useReorderEntries();

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

    if (onReorder) {
      onReorder(orders);
    } else {
      reorderEntriesMutation.mutate(orders);
    }
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
