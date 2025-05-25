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



// src/components/PaletteGate.jsx
import { useDrag } from 'react-dnd';

export const ItemTypes = { GATE: 'gate' };

/** 门库中的一个按钮（支持拖拽和点击事件） */
export default function PaletteGate({
    value,
    label,
    className = '',
    onClick,       // 父组件传入的点击事件
    ...props       // 其他透传属性
}) {
    /* ───── DnD ───── */
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.GATE,
            item: { type: value },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        [value]
    );

    /* 处理点击：执行父级 onClick */
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            {...props}               // 透传其它 props（aria-label 等）
            onClick={handleClick}    // 用我们封装的 handler
            ref={drag}
            className={`
        font-bold text-white focus:outline-none
        focus:ring-1 focus:ring-white
        transition-opacity ${isDragging ? 'opacity-40' : 'opacity-100'}
        ${className}
      `}
            aria-label={`Gate ${label}`}
            data-type={value}
        >
            {label}
        </button>
    );
}
