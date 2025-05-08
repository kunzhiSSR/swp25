// src/components/PaletteGate.jsx
import { useDrag } from 'react-dnd';

export const ItemTypes = { GATE: 'GATE' };   // 供外部 import

export default function PaletteGate({ label, value, className = '' }) {
    /* useDrag: 拖动源 */
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.GATE,
        item: { type: value },     // 拖动时携带门类型
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [value]);

    return (
        <button
            ref={dragRef}
            className={`${className} w-full py-2 rounded font-semibold text-white
                  transition-opacity ${isDragging ? 'opacity-40' : 'opacity-100'}`}
        >
            {label}
        </button>
    );
}



// import { useDrag } from 'react-dnd';
// export const ItemTypes = { GATE: 'gate' };

// export default function PaletteGate({ label, value, className }) {
//     const [{ isDragging }, drag] = useDrag(() => ({
//         type: ItemTypes.GATE,
//         item: { type: value },
//         collect: (monitor) => ({ isDragging: monitor.isDragging() }),
//     }), []);

//     return (
//         <button
//             ref={drag}
//             className={`w-full py-2 rounded font-bold text-white ${className}
//                  ${isDragging ? 'opacity-40' : ''}`}
//         >
//             {label}
//         </button>
//     );
// }



