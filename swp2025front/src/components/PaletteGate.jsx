// // src/components/PaletteGate.jsx
// import { useDrag } from 'react-dnd';

// export const ItemTypes = { GATE: 'GATE' };   // 供外部 import

// export default function PaletteGate({ label, value, className = '' }) {
//     /* useDrag: 拖动源 */
//     const [{ isDragging }, dragRef] = useDrag(() => ({
//         type: ItemTypes.GATE,
//         item: { type: value },     // 拖动时携带门类型
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging()
//         })
//     }), [value]);

//     return (
//         <button
//             ref={dragRef}
//             className={`${className} w-full py-2 rounded font-semibold text-white
//                   transition-opacity ${isDragging ? 'opacity-40' : 'opacity-100'}`}
//         >
//             {label}
//         </button>
//     );
// }



import { useDrag } from 'react-dnd';

export const ItemTypes = { GATE: 'gate' };

/** 门库中的一个按钮（支持拖拽和键盘放置触发） */
export default function PaletteGate({
    value,          // gate type, e.g. "H"
    label,          // text shown on button
    className = ''
}) {
    /* ───── DnD ───── */
    const [, drag] = useDrag(
        () => ({
            type: ItemTypes.GATE,
            item: { type: value }
        }),
        [value]
    );

    /* 进入“键盘放置”模式：派发全局事件 */
    const startKeyboardPlacing = () =>
        window.dispatchEvent(new CustomEvent('keyboard-place ', { detail: value }));

    return (
        <button
            ref={drag}
            className={`rounded font-bold text-black focus:outline-none focus:ring-2 focus:ring-indigo-500  ${className}`}
            aria-label={`Gate ${label}`}
            onClick={startKeyboardPlacing}
            onKeyDown={e => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    startKeyboardPlacing();
                }
            }}
        >
            {label}
        </button>
    );
}
