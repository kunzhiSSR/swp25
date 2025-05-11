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

/** 门库中的一个按钮（支持拖拽和键盘放置触发） */
export default function PaletteGate({
    value,
    label,
    className = '',
    onClick,       // 父组件可能传入的点击事件
    onKeyDown,     // 父组件可能传入的键盘事件
    ...props       // 其他透传属性
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
        window.dispatchEvent(new CustomEvent('keyboard-place', { detail: value }));

    /* 处理点击：先执行父级 onClick，再启动键盘放置 */
    const handleClick = (e) => {
        onClick?.(e);
        startKeyboardPlacing();
    };

    /* 处理键盘：先让父级 onKeyDown 也有机会处理，再启动放置 */
    const handleKeyDown = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onKeyDown?.(e);
            startKeyboardPlacing();
        }
    };

    return (
        <button
            {...props}               // 透传其它 props（aria-label 等）
            onClick={handleClick}    // 用我们封装的 handler
            onKeyDown={handleKeyDown}
            ref={drag}
            className={`
        rounded font-bold text-black focus:outline-none
        focus:ring-2 focus:ring-indigo-500
        ${className}
      `}
            aria-label={`Gate ${label}`}
        >
            {label}
        </button>
    );
}
