// const GRID = 48;

// /** 单个门 & CNOT / CZ 连线 */
// export default function Gate({ gate, isSelected, onEdit }) {
//     if (!gate) return null;

//     // 兜底，避免拖影时 target/timeStep 为空报错
//     const row = gate.target?.[0] ?? 0;
//     const col = gate.timeStep ?? 0;

//     /* ───────── 单量子比特门 ───────── */
//     if (!gate.control) {
//         return (
//             <div
//                 onClick={onEdit}
//                 className={`absolute px-2 py-1 rounded text-sm font-semibold
//           ${isSelected ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'}
//           cursor-pointer select-none`}
//                 style={{ top: row * GRID + 8, left: col * GRID + 8 }}
//             >
//                 {gate.type}
//             </div>
//         );
//     }

//     /* ───────── 双量子比特门 (CNOT / CZ) ───────── */
//     const topRow = Math.min(gate.control[0], gate.target[0]);
//     const bottomRow = Math.max(gate.control[0], gate.target[0]);

//     return (
//         <>
//             {/* 垂直连线 */}
//             <div
//                 className="absolute w-px bg-indigo-600"
//                 style={{
//                     left: col * GRID + 18,  // 中心对齐
//                     top: topRow * GRID + GRID / 2,
//                     height: (bottomRow - topRow) * GRID
//                 }}
//             />
//             {/* ● 控制位 */}
//             <div
//                 onClick={onEdit}
//                 className="absolute w-3 h-3 rounded-full bg-indigo-600 cursor-pointer"
//                 style={{
//                     top: gate.control[0] * GRID + GRID / 2 - 6,
//                     left: col * GRID + 12
//                 }}
//             />
//             {/* ⊕ 或 ⊙ 目标位 */}
//             <div
//                 onClick={onEdit}
//                 className="absolute flex items-center justify-center
//           w-6 h-6 rounded-full border-2 border-indigo-600 bg-white text-[10px] font-bold
//           cursor-pointer select-none"
//                 style={{
//                     top: gate.target[0] * GRID + GRID / 2 - 12,
//                     left: col * GRID
//                 }}
//             >
//                 {gate.type === 'CNOT' ? '+' : 'Z'}
//             </div>
//         </>
//     );
// }





// const GRID = 40;

// /** 单个 Gate（含多控制线渲染） */
// export default function Gate({ gate, onEdit, onSelect }) {
//     if (!gate) return null;

//     const row = gate.target?.[0] ?? 0;
//     const col = gate.timeStep ?? 0;
//     const left = col * GRID + 8;
//     const top = row * GRID + 8;

//     /* ------- 单量子门 ------- */
//     if (!gate.control) {
//         /* 显示参数（如 Rx(π/2)） */
//         const label =
//             gate.params && gate.params.length
//                 ? `${gate.type}(${formatAngle(gate.params[0])})`
//                 : gate.type;

//         return (
//             <button
//                 onClick={e => {
//                     onSelect?.(gate, e.currentTarget.getBoundingClientRect());
//                     onEdit?.();
//                 }}
//                 className="absolute px-2 py-1 rounded text-white bg-indigo-600 text-sm font-semibold select-none"
//                 style={{ top, left }}
//             >
//                 {label}
//             </button>
//         );
//     }

//     /* ------- 受控 / 多控制门 ------- */
//     const rows = [row, ...gate.control];
//     const topRow = Math.min(...rows);
//     const bottomRow = Math.max(...rows);
//     const centerX = col * GRID + 18;

//     return (
//         <>
//             {/* 连线 */}
//             <div
//                 className="absolute w-px bg-indigo-600"
//                 style={{
//                     left: centerX,
//                     top: topRow * GRID + GRID / 2,
//                     height: (bottomRow - topRow) * GRID
//                 }}
//             />

//             {/* 控制点们 */}
//             {gate.control.map(ctrlRow => (
//                 <div
//                     key={ctrlRow}
//                     onClick={() => onEdit?.()}
//                     className="absolute w-3 h-3 rounded-full bg-indigo-600 cursor-pointer"
//                     style={{
//                         left: centerX - 6,
//                         top: ctrlRow * GRID + GRID / 2 - 6
//                     }}
//                 />
//             ))}

//             {/* 目标 ⊕ / ⊙ */}
//             <div
//                 onClick={e => {
//                     onSelect?.(gate, e.currentTarget.getBoundingClientRect());
//                     onEdit?.();
//                 }}
//                 className="absolute flex items-center justify-center w-6 h-6 rounded-full border-2 border-indigo-600 bg-white text-indigo-700 cursor-pointer select-none"
//                 style={{
//                     left: centerX - 12,
//                     top: row * GRID + GRID / 2 - 12
//                 }}
//             >
//                 {gate.type === 'CZ' ? 'Z' : '+'}
//             </div>
//         </>
//     );
// }

// /* 把 0.523 → π/6 等简单格式化（只展示两位小数 / π） */
// function formatAngle(rad) {
//     const PI = Math.PI;
//     const frac = rad / PI;
//     const out =
//         Math.abs(frac - 0.5) < 1e-3
//             ? 'π/2'
//             : Math.abs(frac - 1) < 1e-3
//                 ? 'π'
//                 : rad.toFixed(2);
//     return out;
// }


// import { GRID } from './CircuitCanvas.jsx';

// export default function Gate({ gate, onEdit, onSelect }) {
//     const row = gate.target[0];
//     const col = gate.timeStep;
//     const left = col * GRID + 8;
//     const top = row * GRID + 8;

//     /* ───── 单量子门 ───── */
//     if (!gate.control) {
//         const label =
//             gate.params?.length ? `${gate.type}(${fmt(gate.params[0])})` : gate.type;

//         return (
//             <button
//                 onClick={e => {
//                     onSelect?.(gate, e.currentTarget.getBoundingClientRect());
//                     onEdit?.();
//                 }}
//                 style={{ left, top }}
//                 className="absolute rounded bg-indigo-600 px-3 py-1 text-sm font-bold text-white"
//             >
//                 {label}
//             </button>
//         );
//     }

//     /* ───── 受控门 ───── */
//     const rows = [row, ...gate.control];
//     const tRow = Math.min(...rows);
//     const bRow = Math.max(...rows);
//     const xCenter = col * GRID + GRID / 2;

//     return (
//         <>
//             {/* 竖线 */}
//             <div
//                 className="absolute bg-indigo-600"
//                 style={{
//                     left: xCenter - 1,
//                     top: tRow * GRID + GRID / 2,
//                     width: 2,
//                     height: (bRow - tRow) * GRID
//                 }}
//             />

//             {/* 控制点 */}
//             {gate.control.map(r => (
//                 <div
//                     key={r}
//                     className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600"
//                     style={{
//                         left: xCenter,
//                         top: r * GRID + GRID / 2,
//                         width: 10,
//                         height: 10
//                     }}
//                 />
//             ))}

//             {/* 目标符号 */}
//             <div
//                 onClick={e => {
//                     onSelect?.(gate, e.currentTarget.getBoundingClientRect());
//                     onEdit?.();
//                 }}
//                 className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-indigo-600 bg-white text-xs font-bold text-indigo-700"
//                 style={{
//                     left: xCenter,
//                     top: row * GRID + GRID / 2,
//                     width: 22,
//                     height: 22
//                 }}
//             >
//                 {gate.type === 'CZ' ? 'Z' : '+'}
//             </div>
//         </>
//     );
// }

// /* π/2、π、或小数保留 2 位 */
// function fmt(r) {
//     const π = Math.PI;
//     const f = r / π;
//     if (Math.abs(f - 0.5) < 1e-3) return 'π/2';
//     if (Math.abs(f - 1) < 1e-3) return 'π';
//     return r.toFixed(2);
// }


import { GRID } from './CircuitCanvas.jsx';

export default function Gate({ gate, onEdit, onSelect }) {
    const row = gate.target[0];
    const col = gate.timeStep;
    const left = col * GRID + 8;
    const top = row * GRID + 8;

    /* ───── 单量子门 ───── */
    if (!gate.control) {
        const label = gate.params?.length
            ? `${gate.type}(${fmt(gate.params[0])})`
            : gate.type;

        return (
            <button
                aria-label={`${gate.type} gate at row ${row}, column ${col}`}
                onClick={e => {
                    onSelect?.(gate, e.currentTarget.getBoundingClientRect());
                    onEdit?.();
                }}
                style={{ left, top }}
                className="absolute rounded bg-indigo-600 px-3 py-1 text-sm font-bold text-white"
            >
                {label}
            </button>
        );
    }

    /* ───── 受控门 ───── */
    const rows = [row, ...(gate.control ?? [])];
    const tRow = Math.min(...rows);
    const bRow = Math.max(...rows);
    const x = col * GRID + GRID / 2;

    return (
        <>
            {/* 竖线 */}
            <div
                className="absolute bg-indigo-600"
                style={{
                    left: x - 1,
                    top: tRow * GRID + GRID / 2,
                    width: 2,
                    height: (bRow - tRow) * GRID
                }}
            />
            {/* 控制点 */}
            {gate.control.map(r => (
                <div
                    key={r}
                    aria-label={`control at row ${r}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600"
                    style={{ left: x, top: r * GRID + GRID / 2, width: 10, height: 10 }}
                />
            ))}
            {/* 目标 */}
            <div
                aria-label={`target of ${gate.type} gate`}
                onClick={e => {
                    onSelect?.(gate, e.currentTarget.getBoundingClientRect());
                    onEdit?.();
                }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-indigo-600 bg-white text-xs font-bold text-indigo-700"
                style={{ left: x, top: row * GRID + GRID / 2, width: 22, height: 22 }}
            >
                {gate.type === 'CZ' ? 'Z' : '+'}
            </div>
        </>
    );
}

function fmt(r) {
    const π = Math.PI;
    const f = r / π;
    if (Math.abs(f - 0.5) < 1e-3) return 'π/2';
    if (Math.abs(f - 1) < 1e-3) return 'π';
    return r.toFixed(2);
}
