import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableVideoItem } from "./SortableVideoItem";
import { SortableAudioItem } from "./SortableAudioItem";
import { SortablePhotoItem } from "./SortablePhotoItem";

export const SortableList = ({
  items,
  itemType,
  handlers
}) => {
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: isSortingEnabled
        ? undefined
        : { distance: Infinity },
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      handlers.handleOrderChange((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <div className="mt-4 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold text-white">
            {itemType === "videos" ? "Existing Videos:" : itemType === "audios" ? "Existing Audios:" : "Existing Photos:"}
          </h2>
          {!isSortingEnabled ? (
            <button
              onClick={() => setIsSortingEnabled(true)}
              className="px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded-md"
            >
              Sort
            </button>
          ) : (
            <div>
              <button
                className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded-md mr-2"
                onClick={() => setIsSortingEnabled(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md"
                onClick={() => {
                  handlers.saveOrder();
                  setIsSortingEnabled(false);
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <ul className="grid md:grid-cols-2 grid:cols-1 gap-4 mb-4">
              {items.map((item, index) => {
                if (itemType === "videos") {
                  return (
                    <SortableVideoItem
                      key={item.id}
                      id={item.id}
                      video={item}
                      {...handlers}
                    />
                  );
                } else if (itemType === "audios") {
                  return (
                    <SortableAudioItem
                      key={item.id}
                      id={item.id}
                      clip={item}
                      {...handlers}
                    />
                  );
                } else if (itemType === "photos") {
                  return (
                    <SortablePhotoItem
                      key={item.id}
                      id={item.id}
                      photo={item}
                      {...handlers}
                    />
                  );
                }
                return null;
              })}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};
