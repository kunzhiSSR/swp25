// // src/components/Gate.jsx

// /**
//  * 单个 Gate 方块
//  * props:
//  *   gate   { id, type, ... }
//  *   onEdit (id) => void   // 点击回调（用于参数门弹窗）
//  */
// export default function Gate({ gate, onEdit }) {
//     if (!gate) return null;
//     console.log('Gate render', gate.id, gate.type);
//     const handleClick = () => {
//         // 只有可编辑门才触发回调；其余门点击忽略
//         if (['RX', 'RY', 'RZ'].includes(gate.type) && onEdit) {
//             onEdit(gate.id);
//         }
//     };

//     return (
//         <div
//             data-id={gate.id}                // 方便调试
//             onClick={handleClick}
//             className="px-2 py-1 bg-indigo-600 text-white rounded text-sm cursor-pointer select-none"
//         >
//             {gate.type}
//         </div>
//     );
// }





// src/components/Gate.jsx
export default function Gate({ gate, onEdit, isSelected }) {
    const GRID = 60;
    const base = 'absolute select-none';
    const style = {
        top: gate.target[0] * GRID + 8,
        left: gate.timeStep * GRID + 8,
    };

    // 单量子比特门
    if (!gate.control) {
        return (
            <div
                className={`${base} px-2 py-1 rounded text-sm cursor-pointer
                    ${isSelected ? 'bg-amber-500' : 'bg-indigo-600 text-white'}`}
                style={style}
                onClick={onEdit}
            >
                {gate.type}
            </div>
        );
    }

    /* -------- 多量子比特门 (CNOT / CZ) -------- */
    const topRow = Math.min(gate.control[0], gate.target[0]);
    const bottomRow = Math.max(gate.control[0], gate.target[0]);
    const lineHeight = (bottomRow - topRow) * GRID;

    return (
        <>
            {/* 垂直连线 */}
            <div
                className="absolute w-px bg-indigo-600"
                style={{
                    left: style.left + 12,          // 12px 让圆/cross 居中
                    top: topRow * GRID + GRID / 2,
                    height: lineHeight,
                }}
            />

            {/* 控制 ● */}
            <div
                className={`${base} w-3 h-3 rounded-full bg-indigo-600 cursor-pointer`}
                style={{
                    top: gate.control[0] * GRID + GRID / 2 - 6,
                    left: style.left + 6,
                }}
                onClick={onEdit}
            />

            {/* 目标 ⊕ 或 ⊙ */}
            <div
                className={`${base} flex items-center justify-center
                    w-6 h-6 text-[10px] font-bold border-2 border-indigo-600
                    rounded-full cursor-pointer bg-white`}
                style={{
                    top: gate.target[0] * GRID + GRID / 2 - 12,
                    left: style.left,
                }}
                onClick={onEdit}
            >
                {gate.type === 'CNOT' ? '+' : 'Z'}
            </div>
        </>
    );
}





// // src/components/Gate.jsx
// const GRID = 60;

// /**
//  * Gate 组件
//  *
//  * props
//  * -----
//  * gate        { id, type, target, timeStep, control?, params? }
//  * onEdit()    点击回调（父组件可弹 θ 参数框或高亮）
//  * isSelected  布尔：当前门是否被选中
//  */
// export default function Gate({ gate, onEdit, isSelected }) {
//     if (!gate) return null;

//     /* ---------- 单量子比特门 ---------- */
//     if (!gate.control) {
//         return (
//             <div
//                 className={`absolute px-2 py-1 rounded text-sm cursor-pointer select-none
//                     ${isSelected ? 'bg-amber-500' : 'bg-indigo-600 text-white'}`}
//                 style={{
//                     top: gate.target[0] * GRID + 8,
//                     left: gate.timeStep * GRID + 8,
//                 }}
//                 onClick={onEdit}
//             >
//                 {gate.type}
//             </div>
//         );
//     }

//     /* ---------- 多量子比特门（CNOT / CZ） ---------- */
//     const topRow = Math.min(gate.control[0], gate.target[0]);
//     const bottomRow = Math.max(gate.control[0], gate.target[0]);
//     const lineH = (bottomRow - topRow) * GRID;
//     const color = isSelected ? 'amber-500' : 'indigo-600';
//     const bgLineCls = `bg-${color}`;
//     const borderCls = `border-${color}`;
//     const fullColor = `bg-${color} border-${color}`; // 用于圆 & 符号

//     return (
//         <>
//             {/* 垂直连线（不拦截拖拽） */}
//             <div
//                 className={`absolute w-px ${bgLineCls} pointer-events-none`}
//                 style={{
//                     left: gate.timeStep * GRID + 18,
//                     top: topRow * GRID + GRID / 2,
//                     height: lineH,
//                 }}
//             />

//             {/* 控制 ● */}
//             <div
//                 className={`absolute w-3 h-3 rounded-full cursor-pointer ${fullColor}`}
//                 style={{
//                     top: gate.control[0] * GRID + GRID / 2 - 6,
//                     left: gate.timeStep * GRID + 12,
//                 }}
//                 onClick={onEdit}
//             />

//             {/* 目标 ⊕（CNOT）或 ⊙（CZ） */}
//             <div
//                 className={`absolute flex items-center justify-center
//                     w-6 h-6 rounded-full bg-white text-[10px] font-bold
//                     cursor-pointer border-2 ${borderCls}`}
//                 style={{
//                     top: gate.target[0] * GRID + GRID / 2 - 12,
//                     left: gate.timeStep * GRID,
//                 }}
//                 onClick={onEdit}
//             >
//                 {gate.type === 'CNOT' ? '+' : 'Z'}
//             </div>
//         </>
//     );
// }
