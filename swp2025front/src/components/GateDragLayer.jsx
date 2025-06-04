// src/components/GateDragLayer.jsx
import { useDragLayer } from 'react-dnd';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 1000,
    left: 0,
    top: 0,
    transform: 'translate(-50%, -50%)',
    opacity: 0.7
};

export default function GateDragLayer() {
    const { item, itemType, isDragging, currentOffset } = useDragLayer(
        (monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            isDragging: monitor.isDragging(),
            currentOffset: monitor.getSourceClientOffset()
        })
    );

    if (!isDragging || !currentOffset || itemType !== 'GATE') return null;

    return (
        <div
            style={{
                ...layerStyles,
                transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
            }}
        >
            <div className="px-2 py-1 rounded text-sm font-semibold bg-indigo-600 text-white">
                {item.type}
            </div>
        </div>
    );
}
