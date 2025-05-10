// import React, { useRef, useState, useEffect } from "react";
// import { useDrop } from "react-dnd";
// import { nanoid } from "nanoid";

// import { ItemTypes } from "@/components/PaletteGate";
// import Gate from "@/components/Gate.jsx";
// import GateToolbar from "@/components/GateToolbar.jsx";
// import GateParameterDrawer from "@/components/GateEditor/GateParameterDrawer";
// import GateDragLayer from "@/components/GateDragLayer.jsx";
// import { useCircuit } from "@/contexts/CircuitContext";

// const GRID = 40;     // px
// const MAX_COLS = 120;

// const ROW_COLOR = "bg-slate-400/70";
// const COL_COLOR = "bg-sky-400/10";

// export default function CircuitCanvas() {
//     /* refs */
//     const canvasRef = useRef(null);

//     /* 电路全局状态 */
//     const { circuit, addGate, updateGate, removeGate } = useCircuit();

//     /* 选中 gate 与参数抽屉状态 */
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [currentGate, setCurrentGate] = useState(null);

//     /* ---------- drop 区域 ---------- */
//     const [{ isOver }, dropRef] = useDrop(
//         () => ({
//             accept: ItemTypes.GATE,
//             collect: (monitor) => ({ isOver: monitor.isOver() }),
//             drop: (item, monitor) => {
//                 const cvs = canvasRef.current;
//                 const rect = cvs.getBoundingClientRect();
//                 const { scrollLeft, scrollTop } = cvs;
//                 const { x, y } = monitor.getClientOffset(); // 屏幕坐标

//                 const col = Math.floor((x + scrollLeft - rect.left) / GRID);
//                 const row = Math.floor((y + scrollTop - rect.top) / GRID);

//                 if (row < 0 || row >= circuit.qubits) return;
//                 if (col < 0 || col >= MAX_COLS) return;

//                 addGate({
//                     id: nanoid(6),
//                     type: item.type,
//                     target: [row],
//                     timeStep: col,
//                     params: ["RX", "RY", "RZ"].includes(item.type) ? [0] : undefined,
//                 });
//             },
//         }),
//         [circuit.qubits]
//     );

//     /* 把 dropRef 绑定到画布 */
//     useEffect(() => {
//         if (canvasRef.current) dropRef(canvasRef.current);
//     }, [dropRef]);

//     /* 编辑回调 */
//     const openDrawer = (g) => {
//         setCurrentGate(g);
//         setDrawerOpen(true);
//     };

//     return (
//         <div className="relative flex-1 overflow-hidden">
//             <GateDragLayer GRID={GRID} />

//             {/* ---------- 画布 ---------- */}
//             <div
//                 ref={canvasRef}
//                 className={`relative h-[520px] overflow-auto bg-white select-none ${isOver ? "ring-2 ring-indigo-400" : ""
//                     }`}
//             >
//                 {/* 横线 */}
//                 {Array.from({ length: circuit.qubits }).map((_, i) => (
//                     <div
//                         key={`row-${i}`}
//                         className={`absolute left-0 right-0 h-[2px] ${ROW_COLOR}`}
//                         style={{ top: i * GRID + GRID / 2 }}
//                     />
//                 ))}

//                 {/* 纵线 */}
//                 {Array.from({ length: MAX_COLS }).map((_, i) => (
//                     <div
//                         key={`col-${i}`}
//                         className={`absolute top-0 bottom-0 w-px ${COL_COLOR}`}
//                         style={{ left: i * GRID }}
//                     />
//                 ))}

//                 {/* Gates */}
//                 {circuit.gates.map((g) => (
//                     <Gate
//                         key={g.id}
//                         gate={g}
//                         GRID={GRID}
//                         onEdit={() => openDrawer(g)}
//                     />
//                 ))}

//                 {/* 工具条 */}
//                 <GateToolbar
//                     visible={!!currentGate}
//                     x={currentGate ? currentGate.timeStep * GRID : 0}
//                     y={currentGate ? currentGate.target[0] * GRID : 0}
//                     onEdit={() => openDrawer(currentGate)}
//                     onDelete={() => {
//                         removeGate(currentGate.id);
//                         setCurrentGate(null);
//                     }}
//                 />
//             </div>

//             {/* 参数抽屉 */}
//             <GateParameterDrawer
//                 gate={currentGate}
//                 open={drawerOpen}
//                 onClose={() => setDrawerOpen(false)}
//                 onSave={(θ) => {
//                     updateGate(currentGate.id, { params: [θ] });
//                     setDrawerOpen(false);
//                 }}
//             />
//         </div>
//     );
// }



// import GateParameterDrawer from "@/components/GateEditor/GateParameterDrawer";

// import { useRef, useState } from 'react';
// import { useDrop } from 'react-dnd';
// import { nanoid } from 'nanoid';

// import Gate from '@/components/Gate.jsx';
// import GateActions from '@/components/GateActions.jsx';

// import { ItemTypes } from '@/components/PaletteGate';
// import { useCircuit } from '@/contexts/CircuitContext';
// import { GATE_DEFS, PARAM_GATES } from '@/constants/gates';

// export const GRID = 56;
// const MAX_COLS = 120;

// export default function CircuitCanvas() {
//     const cvsRef = useRef(null);
//     const { circuit, addGate, updateGate, removeGate } = useCircuit();

//     const [hover, setHover] = useState(null);
//     const [drawer, setDrawer] = useState({ open: false, gate: null });
//     const [toolbar, setToolbar] = useState({ gate: null, x: 0, y: 0 });

//     /* ──────── drop / hover ──────── */
//     const [, dropRef] = useDrop(
//         () => ({
//             accept: ItemTypes.GATE,
//             hover: (_, monitor) => {
//                 const pt = monitor.getClientOffset();
//                 if (!pt) return;
//                 const { row, col } = pointToCoord(pt);
//                 setHover({ row, col });
//             },
//             drop: (item, monitor) => {
//                 const pt = monitor.getClientOffset();
//                 if (!pt) return;
//                 const { row, col } = pointToCoord(pt);
//                 if (row < 0 || row >= circuit.qubits || col < 0 || col >= MAX_COLS)
//                     return;

//                 const def = GATE_DEFS[item.type];
//                 const params = def.params.length
//                     ? def.params.map(p => p.default ?? 0)
//                     : undefined;
//                 const control = def.requiresControl
//                     ? [row > 0 ? row - 1 : row + 1]
//                     : undefined;

//                 addGate({
//                     id: nanoid(6),
//                     type: item.type,
//                     target: [row],
//                     control,
//                     params,
//                     timeStep: col
//                 });
//                 setHover(null);
//             },
//             collect: monitor => {
//                 if (!monitor.isOver()) setHover(null);
//             }
//         }),
//         [circuit.qubits]
//     );

//     /* ⚠️ 改动：统一回调 ref，把 DOM 节点同时交给 useRef 与 dropRef */
//     const setRefs = node => {
//         cvsRef.current = node;
//         dropRef(node);
//     };

//     const pointToCoord = ({ x, y }) => {
//         const rect = cvsRef.current.getBoundingClientRect();
//         const { scrollLeft, scrollTop } = cvsRef.current;
//         const col = Math.floor((x + scrollLeft - rect.left) / GRID);
//         const row = Math.floor((y + scrollTop - rect.top) / GRID);
//         return { row, col };
//     };

//     const openDrawer = gate =>
//         PARAM_GATES.includes(gate.type) &&
//         setDrawer({ open: true, gate });

//     const selectGate = (gate, domRect) =>
//         setToolbar({
//             gate,
//             x: domRect.left + domRect.width / 2 - 50,
//             y: domRect.top - 40 + window.scrollY
//         });

//     /* ──────── render ──────── */
//     return (
//         <div ref={setRefs} className="relative flex-1 overflow-auto bg-white">
//             {/* 量子线 */}
//             {[...Array(circuit.qubits)].map((_, r) => (
//                 <div
//                     key={r}
//                     className="absolute w-full border-t-2 border-gray-400"
//                     style={{ top: r * GRID + GRID / 2 }}
//                 />
//             ))}

//             {/* 悬停高亮 */}
//             {hover && (
//                 <div
//                     className="pointer-events-none absolute rounded border-2 border-indigo-500 bg-indigo-300/20"
//                     style={{
//                         left: hover.col * GRID,
//                         top: hover.row * GRID,
//                         width: GRID,
//                         height: GRID
//                     }}
//                 />
//             )}

//             {/* gates */}
//             {circuit.gates.map(g => (
//                 <Gate
//                     key={g.id}
//                     gate={g}
//                     onEdit={() => openDrawer(g)}
//                     onSelect={selectGate}
//                     grid={GRID}
//                 />
//             ))}

//             {/* 工具条 */}
//             {toolbar.gate && (
//                 <GateActions
//                     x={toolbar.x}
//                     y={toolbar.y}
//                     gate={toolbar.gate}
//                     onEdit={() => openDrawer(toolbar.gate)}
//                     onDelete={() => {
//                         removeGate(toolbar.gate.id);
//                         setToolbar({ gate: null });
//                     }}
//                     onAddCtrlAbove={() =>
//                         updateGate(toolbar.gate.id, {
//                             control: Array.from(
//                                 new Set([...(toolbar.gate.control ?? []),
//                                 toolbar.gate.target[0] - 1])
//                             )
//                         })}
//                     onAddCtrlBelow={() =>
//                         updateGate(toolbar.gate.id, {
//                             control: Array.from(
//                                 new Set([...(toolbar.gate.control ?? []),
//                                 toolbar.gate.target[0] + 1])
//                             )
//                         })}
//                     onRemoveCtrl={row =>
//                         updateGate(toolbar.gate.id, {
//                             control:
//                                 (toolbar.gate.control ?? []).filter(r => r !== row) || undefined
//                         })}
//                 />
//             )}

//             {/* 抽屉 */}
//             <GateParameterDrawer
//                 gate={drawer.gate}
//                 open={drawer.open}
//                 onClose={() => setDrawer({ ...drawer, open: false })}
//                 onSave={u => updateGate(drawer.gate.id, u)}
//             />
//         </div>
//     );
// }


import { useRef, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';

import Gate from '@/components/Gate.jsx';
import GateActions from '@/components/GateActions.jsx';
import GateParameterDrawer from "@/components/GateEditor/GateParameterDrawer";
import { ItemTypes } from '@/components/PaletteGate';
import { useCircuit } from '@/contexts/CircuitContext';
import { GATE_DEFS, PARAM_GATES } from '@/constants/gates';

export const GRID = 56;
const MAX_COLS = 120;

export default function CircuitCanvas() {
    const cvsRef = useRef(null);
    const { circuit, addGate, updateGate, removeGate } = useCircuit();

    const [hover, setHover] = useState(null);              // DnD 高亮
    const [kbdPlace, setKbdPlace] = useState(null);              // {type,row,col}|null
    const [drawer, setDrawer] = useState({ open: false, gate: null });
    const [toolbar, setToolbar] = useState({ gate: null, x: 0, y: 0 });

    /* ────────── Drag & Drop ────────── */
    const [, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.GATE,
            hover: (_, monitor) => {
                const pt = monitor.getClientOffset();
                if (!pt) return;
                setHover(pointToCoord(pt));
            },
            drop: (item, monitor) => {
                const pt = monitor.getClientOffset();
                if (!pt) return;
                addGateAt(item.type, pointToCoord(pt));
                setHover(null);
            },
            collect: m => {
                if (!m.isOver()) setHover(null);
            }
        }),
        [circuit.qubits]
    );

    /* 回调 ref：同时给 useRef & DnD */
    const setRefs = node => {
        cvsRef.current = node;
        dropRef(node);
    };

    const pointToCoord = ({ x, y }) => {
        const rect = cvsRef.current.getBoundingClientRect();
        const { scrollLeft, scrollTop } = cvsRef.current;
        return {
            col: Math.floor((x + scrollLeft - rect.left) / GRID),
            row: Math.floor((y + scrollTop - rect.top) / GRID)
        };
    };

    const addGateAt = (type, { row, col }) => {
        if (row < 0 || row >= circuit.qubits || col < 0 || col >= MAX_COLS) return;
        const def = GATE_DEFS[type];
        const params = def.params.length ? def.params.map(p => p.default ?? 0) : undefined;
        const control = def.requiresControl ? [row > 0 ? row - 1 : row + 1] : undefined;
        addGate({
            id: nanoid(6),
            type,
            target: [row],
            control,
            params,
            timeStep: col
        });
    };

    /* ────────── 全局事件：键盘放置入口 ────────── */
    useEffect(() => {
        const handler = e => setKbdPlace({ type: e.detail, row: 0, col: 0 });
        window.addEventListener('keyboard-place', handler);
        return () => window.removeEventListener('keyboard-place', handler);
    }, []);

    /* ────────── 键盘监听 ────────── */
    useEffect(() => {
        const onKey = e => {
            /* ---------- 键盘放置模式 ---------- */
            if (kbdPlace) {
                let { row, col, type } = kbdPlace;
                switch (e.key) {
                    case 'ArrowUp': row--; break;
                    case 'ArrowDown': row++; break;
                    case 'ArrowLeft': col--; break;
                    case 'ArrowRight': col++; break;
                    case 'Enter':
                    case ' ': addGateAt(type, { row, col }); setKbdPlace(null); break;
                    case 'Escape': setKbdPlace(null); break;
                    default: return;
                }
                e.preventDefault();
                row = Math.max(0, Math.min(circuit.qubits - 1, row));
                col = Math.max(0, Math.min(MAX_COLS - 1, col));
                setKbdPlace({ type, row, col });
                return;
            }

            /* ---------- 已选中 Gate 快捷 ---------- */
            if (toolbar.gate) {
                const g = toolbar.gate;
                switch (e.key) {
                    case 'Delete':
                    case 'Backspace':
                        removeGate(g.id); setToolbar({ gate: null }); break;
                    case 'ArrowUp':
                        updateGate(g.id, { target: [Math.max(0, g.target[0] - 1)] }); break;
                    case 'ArrowDown':
                        updateGate(g.id, { target: [Math.min(circuit.qubits - 1, g.target[0] + 1)] }); break;
                    case 'ArrowLeft':
                        updateGate(g.id, { timeStep: Math.max(0, g.timeStep - 1) }); break;
                    case 'ArrowRight':
                        updateGate(g.id, { timeStep: g.timeStep + 1 }); break;
                    default: return;
                }
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [kbdPlace, toolbar.gate, circuit.qubits]);

    /* ────────── UI 事件 ────────── */
    const openDrawer = g =>
        PARAM_GATES.includes(g.type) && setDrawer({ open: true, gate: g });

    const selectGate = (g, rect) =>
        setToolbar({
            gate: g,
            x: rect.left + rect.width / 2 - 50,
            y: rect.top - 40 + window.scrollY
        });

    /* ────────── render ────────── */
    return (
        <div
            id="circuit-canvas"
            ref={setRefs}
            className="relative flex-1 overflow-auto bg-white"
            aria-label="Quantum circuit editor canvas"
        >
            {/* 量子线 */}
            {[...Array(circuit.qubits)].map((_, r) => (
                <div
                    key={r}
                    className="absolute w-full border-t-2 border-gray-400"
                    style={{ top: r * GRID + GRID / 2 }}
                />
            ))}

            {/* Hover / 键盘高亮 */}
            {(hover || kbdPlace) && (
                <div
                    className="pointer-events-none absolute rounded border-2 border-indigo-00 bg-indigo-300/20"
                    style={{
                        left: (hover?.col ?? kbdPlace.col) * GRID,
                        top: (hover?.row ?? kbdPlace.row) * GRID,
                        width: GRID,
                        height: GRID
                    }}
                />
            )}

            {/* Gates */}
            {circuit.gates.map(g => (
                <Gate
                    key={g.id}
                    gate={g}
                    onEdit={() => openDrawer(g)}
                    onSelect={selectGate}
                />
            ))}

            {/* 工具条 */}
            {toolbar.gate && (
                <GateActions
                    x={toolbar.x}
                    y={toolbar.y}
                    gate={toolbar.gate}
                    onEdit={() => openDrawer(toolbar.gate)}
                    onDelete={() => {
                        removeGate(toolbar.gate.id);
                        setToolbar({ gate: null });
                    }}
                    onAddCtrlAbove={() =>
                        updateGate(toolbar.gate.id, {
                            control: Array.from(new Set([...(toolbar.gate.control ?? []), toolbar.gate.target[0] - 1]))
                        })}
                    onAddCtrlBelow={() =>
                        updateGate(toolbar.gate.id, {
                            control: Array.from(new Set([...(toolbar.gate.control ?? []), toolbar.gate.target[0] + 1]))
                        })}
                    onRemoveCtrl={row =>
                        updateGate(toolbar.gate.id, {
                            control: (toolbar.gate.control ?? []).filter(r => r !== row) || undefined
                        })}
                />
            )}

            {/* 抽屉 */}
            <GateParameterDrawer
                gate={drawer.gate}
                open={drawer.open}
                onClose={() => setDrawer({ ...drawer, open: false })}
                onSave={u => updateGate(drawer.gate.id, u)}
            />
        </div>
    );
}
