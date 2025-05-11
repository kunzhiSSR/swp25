
// import { GRID } from './CircuitCanvas.jsx';

// export default function Gate({ gate, onEdit, onSelect }) {
//     const row = gate.target[0];
//     const col = gate.timeStep;
//     const left = col * GRID + 8;
//     const top = row * GRID + 8;

//     /* ───── 单量子门 ───── */
//     if (!gate.control) {
//         const label = gate.params?.length
//             ? `${gate.type}(${fmt(gate.params[0])})`
//             : gate.type;

//         return (
//             <button
//                 aria-label={`${gate.type} gate at row ${row}, column ${col}`}
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
//     const rows = [row, ...(gate.control ?? [])];
//     const tRow = Math.min(...rows);
//     const bRow = Math.max(...rows);
//     const x = col * GRID + GRID / 2;

//     return (
//         <>
//             {/* 竖线 */}
//             <div
//                 className="absolute bg-indigo-600"
//                 style={{
//                     left: x - 1,
//                     top: tRow * GRID + GRID / 2,
//                     width: 2,
//                     height: (bRow - tRow) * GRID
//                 }}
//             />
//             {/* 控制点 */}
//             {gate.control.map(r => (
//                 <div
//                     key={r}
//                     aria-label={`control at row ${r}`}
//                     className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600"
//                     style={{ left: x, top: r * GRID + GRID / 2, width: 10, height: 10 }}
//                 />
//             ))}
//             {/* 目标 */}
//             <div
//                 aria-label={`target of ${gate.type} gate`}
//                 onClick={e => {
//                     onSelect?.(gate, e.currentTarget.getBoundingClientRect());
//                     onEdit?.();
//                 }}
//                 className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-indigo-600 bg-white text-xs font-bold text-indigo-700"
//                 style={{ left: x, top: row * GRID + GRID / 2, width: 22, height: 22 }}
//             >
//                 {gate.type === 'CZ' ? 'Z' : '+'}
//             </div>
//         </>
//     );
// }

// function fmt(r) {
//     const π = Math.PI;
//     const f = r / π;
//     if (Math.abs(f - 0.5) < 1e-3) return 'π/2';
//     if (Math.abs(f - 1) < 1e-3) return 'π';
//     return r.toFixed(2);
// }


// // src/components/Gate.jsx
// import { memo, useRef } from 'react';
// import { GRID } from '@/components/CircuitCanvas.jsx';

// function Gate({ gate, onSelect, onEdit, readOnly = false }) {
//     const ref = useRef(null);

//     const handleClick = e => {
//         if (readOnly) return;
//         e.stopPropagation();
//         const rect = ref.current?.getBoundingClientRect();
//         onSelect?.(gate, rect);
//     };

//     const handleDouble = e => {
//         if (readOnly) return;
//         e.stopPropagation();
//         onEdit?.(gate);
//     };

//     const style = {
//         left: gate.timeStep * GRID + 8,
//         top: gate.target[0] * GRID + 8,
//     };

//     const wires = (gate.control ?? []).map(r => (
//         <div
//             key={r}
//             className="absolute left-1/2 -translate-x-1/2 border-l border-indigo-700"
//             style={{
//                 top: Math.min(r, gate.target[0]) * GRID + GRID / 2,
//                 height: Math.abs(r - gate.target[0]) * GRID,
//             }}
//         />
//     ));

//     const label =
//         gate.params?.length ? `${gate.type}(${gate.params[0]})` : gate.type;

//     return (
//         <div
//             ref={ref}
//             role="button"
//             onClick={handleClick}
//             onDoubleClick={handleDouble}
//             /* 下面这行用模板字符串直接拼接 Tailwind 类 */
//             className={`absolute z-10 w-8 h-6 rounded bg-indigo-600
//                   flex items-center justify-center text-xs font-bold text-white
//                   select-none cursor-pointer`}
//             style={style}
//             aria-label={`Gate ${gate.type}`}
//         >
//             {label}
//             {wires}
//         </div>
//     );
// }

// export default memo(Gate);


// import { memo, useRef } from 'react';
// import { GRID } from '@/components/CircuitCanvas.jsx';

// function Gate({ gate, onSelect, onEdit, readOnly = false }) {
//     const ref = useRef(null);

//     const handleClick = e => {
//         if (readOnly) return;
//         e.stopPropagation();
//         const rect = ref.current?.getBoundingClientRect();
//         onSelect?.(gate, rect);
//     };

//     const handleDouble = e => {
//         if (readOnly) return;
//         e.stopPropagation();
//         onEdit?.(gate);
//     };

//     /* 位置 */
//     const style = {
//         left: gate.timeStep * GRID + 4,
//         top: gate.target[0] * GRID + GRID / 2 - 16,          // 垂直居中
//     };

//     const wires = (gate.control ?? []).map(r => (
//         <div
//             key={r}
//             className="absolute left-1/2 -translate-x-1/2 border-l border-indigo-700"
//             style={{
//                 top: Math.min(r, gate.target[0]) * GRID + GRID / 2,
//                 height: Math.abs(r - gate.target[0]) * GRID,
//             }}
//         />
//     ));

//     const label = gate.params?.length
//         ? `${gate.type}(${gate.params[0]})`
//         : gate.type;

//     return (
//         <div
//             ref={ref}
//             role="button"
//             onClick={handleClick}
//             onDoubleClick={handleDouble}
//             className={`absolute z-10 w-24 h-8 rounded bg-indigo-600
//                   flex items-center justify-center text-sm font-bold text-white
//                   select-none cursor-pointer`}
//             style={style}
//             aria-label={`Gate ${gate.type}`}
//         >
//             {label}
//             {wires}
//         </div>
//     );
// }

// export default memo(Gate);

console.debug('Gate component v2025-05-11 loaded');

// src/components/Gate.jsx
import { memo, useRef } from 'react';
import { GRID } from './CircuitCanvas.jsx';

const DOT_SIZE = 8;   // 控制点
const PLUS_SIZE = 28;  // 目标圆直径
const LINE_WIDTH = 2;   // 竖线粗细

function Gate({ gate, onSelect, onEdit, readOnly = false }) {
    const ref = useRef(null);

    /* 统一点选 & 双击逻辑 */
    const click = e => {
        if (readOnly) return;
        e.stopPropagation();
        const rect = ref.current?.getBoundingClientRect();
        onSelect?.(gate, rect);
    };
    const dbl = e => {
        if (readOnly) return;
        e.stopPropagation();
        onEdit?.(gate);
    };

    /* ─── 受控门（CNOT / CZ / …） ─── */
    if (gate.control?.length) {
        const [targetRow] = gate.target;
        const x = gate.timeStep * GRID + GRID / 2;

        const minRow = Math.min(...gate.control, targetRow);
        const maxRow = Math.max(...gate.control, targetRow);

        /* 控制点渲染 */
        const controls = gate.control.map(r => (
            <div
                key={r}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600"
                style={{
                    left: x,
                    top: r * GRID + GRID / 2,
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                }}
                onClick={click}
                onDoubleClick={dbl}
                ref={r === gate.control[0] ? ref : null}
            />
        ));

        /* 目标：CNOT → 实心蓝圆 + 白色＋； CZ → 空心圆 + Z */
        const target =
            gate.type === 'CNOT' ? (
                <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600
                     flex items-center justify-center text-white font-bold select-none
                     cursor-pointer"
                    style={{
                        left: x,
                        top: targetRow * GRID + GRID / 2,
                        width: PLUS_SIZE,
                        height: PLUS_SIZE,
                    }}
                    onClick={click}
                    onDoubleClick={dbl}
                    ref={ref}
                >
                    +
                </div>
            ) : (
                <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-600
                     flex items-center justify-center text-indigo-700 font-bold select-none cursor-pointer"
                    style={{
                        left: x,
                        top: targetRow * GRID + GRID / 2,
                        width: PLUS_SIZE,
                        height: PLUS_SIZE,
                        background: '#fff',
                    }}
                    onClick={click}
                    onDoubleClick={dbl}
                    ref={ref}
                >
                    {gate.type === 'CZ' ? 'Z' : '+'}
                </div>
            );

        return (
            <>
                {/* 竖线 */}
                <div
                    className="absolute bg-indigo-600"
                    style={{
                        left: x - LINE_WIDTH / 2,
                        top: minRow * GRID + GRID / 2,
                        width: LINE_WIDTH,
                        height: (maxRow - minRow) * GRID,
                    }}
                />
                {controls}
                {target}
            </>
        );
    }

    /* ─── 单量子门 ─── */
    const label =
        gate.params?.length ? `${gate.type}(${gate.params[0]})` : gate.type;

    const rectStyle = {
        left: gate.timeStep * GRID + 4,
        top: gate.target[0] * GRID + GRID / 2 - 16,
    };

    return (
        <div
            ref={ref}
            role="button"
            onClick={click}
            onDoubleClick={dbl}
            className="absolute z-10 w-24 h-8 rounded bg-indigo-600
                 flex items-center justify-center text-sm font-bold text-white
                 select-none cursor-pointer"
            style={rectStyle}
            aria-label={`Gate ${gate.type}`}
        >
            {label}
        </div>
    );
}

export default memo(Gate);
