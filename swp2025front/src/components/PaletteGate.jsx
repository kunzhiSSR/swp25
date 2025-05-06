// src/components/PaletteGate.jsx
import { useDrag } from 'react-dnd';

export const ItemTypes = { GATE: 'gate' };

export default function PaletteGate({ label }) {
    /* useDrag 返回 [ collectedProps, dragRef ] */
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.GATE,
        item: { type: label },          // 拖拽时携带的数据（门类型）
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [label]);

    return (
        <div
            ref={dragRef}
            className={`bg-gray-200 rounded px-2 py-1 text-center cursor-move select-none
                  ${isDragging ? 'opacity-50' : ''}`}
        >
            {label}
        </div>
    );
}
