const GRID = 48;

/** 单个门 & CNOT / CZ 连线 */
export default function Gate({ gate, isSelected, onEdit }) {
    if (!gate) return null;

    // 兜底，避免拖影时 target/timeStep 为空报错
    const row = gate.target?.[0] ?? 0;
    const col = gate.timeStep ?? 0;

    /* ───────── 单量子比特门 ───────── */
    if (!gate.control) {
        return (
            <div
                onClick={onEdit}
                className={`absolute px-2 py-1 rounded text-sm font-semibold
          ${isSelected ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'}
          cursor-pointer select-none`}
                style={{ top: row * GRID + 8, left: col * GRID + 8 }}
            >
                {gate.type}
            </div>
        );
    }

    /* ───────── 双量子比特门 (CNOT / CZ) ───────── */
    const topRow = Math.min(gate.control[0], gate.target[0]);
    const bottomRow = Math.max(gate.control[0], gate.target[0]);

    return (
        <>
            {/* 垂直连线 */}
            <div
                className="absolute w-px bg-indigo-600"
                style={{
                    left: col * GRID + 18,  // 中心对齐
                    top: topRow * GRID + GRID / 2,
                    height: (bottomRow - topRow) * GRID
                }}
            />
            {/* ● 控制位 */}
            <div
                onClick={onEdit}
                className="absolute w-3 h-3 rounded-full bg-indigo-600 cursor-pointer"
                style={{
                    top: gate.control[0] * GRID + GRID / 2 - 6,
                    left: col * GRID + 12
                }}
            />
            {/* ⊕ 或 ⊙ 目标位 */}
            <div
                onClick={onEdit}
                className="absolute flex items-center justify-center
          w-6 h-6 rounded-full border-2 border-indigo-600 bg-white text-[10px] font-bold
          cursor-pointer select-none"
                style={{
                    top: gate.target[0] * GRID + GRID / 2 - 12,
                    left: col * GRID
                }}
            >
                {gate.type === 'CNOT' ? '+' : 'Z'}
            </div>
        </>
    );
}



// import React from "react";

// export default function Gate({ gate, onEdit, onDelete }) {
//     const GRID = 60;
//     const base = "absolute select-none";
//     const style = {
//         top: gate.target[0] * GRID + 8,
//         left: gate.timeStep * GRID + 8,
//     };

//     // 单比特门
//     if (!gate.control) {
//         return (
//             <div
//                 data-id={gate.id}
//                 onClick={onEdit}
//                 className={`${base} px-2 py-1 rounded text-sm cursor-pointer bg-indigo-600 text-white`}
//                 style={style}
//             >
//                 {gate.type}
//             </div>
//         );
//     }

//     // CNOT / CZ
//     const topRow = Math.min(gate.control[0], gate.target[0]);
//     const bottomRow = Math.max(gate.control[0], gate.target[0]);
//     const height = (bottomRow - topRow) * GRID;

//     return (
//         <>
//             {/* 垂直线 */}
//             <div
//                 className="absolute w-px bg-indigo-600"
//                 style={{
//                     left: style.left + 12,
//                     top: topRow * GRID + GRID / 2,
//                     height,
//                 }}
//             />

//             {/* 控制点 ● */}
//             <div
//                 className={`${base} w-3 h-3 rounded-full bg-indigo-600 cursor-pointer`}
//                 style={{
//                     top: gate.control[0] * GRID + GRID / 2 - 6,
//                     left: style.left + 6,
//                 }}
//                 onClick={onEdit}
//             />

//             {/* 目标 ⊕/⊙ */}
//             <div
//                 className={`${base} flex items-center justify-center
//                     w-6 h-6 text-[10px] font-bold border-2 border-indigo-600
//                     rounded-full cursor-pointer bg-white`}
//                 style={{
//                     top: gate.target[0] * GRID + GRID / 2 - 12,
//                     left: style.left,
//                 }}
//                 onClick={onEdit}
//             >
//                 {gate.type === "CNOT" ? "+" : "Z"}
//             </div>

//             {/* 右上角删除图标 */}
//             <button
//                 onClick={onDelete}
//                 className="absolute text-xs text-red-500"
//                 style={{
//                     top: gate.target[0] * GRID,
//                     left: style.left + 20,
//                 }}
//             >
//                 ×
//             </button>
//         </>
//     );
// }
