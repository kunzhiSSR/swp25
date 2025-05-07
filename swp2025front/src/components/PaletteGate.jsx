// src/components/PaletteGate.jsx
import { useDrag } from 'react-dnd';
export const ItemTypes = { GATE: 'gate' };

export default function PaletteGate({ label }) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.GATE,
        item: { type: label },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }), [label]);

    return (
        <div
            ref={dragRef}
            className={`w-28 py-2 text-center rounded ${isDragging ? 'opacity-40' : 'bg-gray-200'}`}
        >
            {label}
        </div>
    );
}
