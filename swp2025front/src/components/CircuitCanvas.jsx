import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";

import { ItemTypes } from "@/components/PaletteGate";
import Gate from "@/components/Gate.jsx";
import GateToolbar from "@/components/GateToolbar.jsx";
import GateParameterDrawer from "@/components/GateEditor/GateParameterDrawer";
import GateDragLayer from "@/components/GateDragLayer.jsx";
import { useCircuit } from "@/contexts/CircuitContext";

const GRID = 40;     // px
const MAX_COLS = 120;

const ROW_COLOR = "bg-slate-400/70";
const COL_COLOR = "bg-sky-400/10";

export default function CircuitCanvas() {
    /* refs */
    const canvasRef = useRef(null);

    /* 电路全局状态 */
    const { circuit, addGate, updateGate, removeGate } = useCircuit();

    /* 选中 gate 与参数抽屉状态 */
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentGate, setCurrentGate] = useState(null);

    /* ---------- drop 区域 ---------- */
    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.GATE,
            collect: (monitor) => ({ isOver: monitor.isOver() }),
            drop: (item, monitor) => {
                const cvs = canvasRef.current;
                const rect = cvs.getBoundingClientRect();
                const { scrollLeft, scrollTop } = cvs;
                const { x, y } = monitor.getClientOffset(); // 屏幕坐标

                const col = Math.floor((x + scrollLeft - rect.left) / GRID);
                const row = Math.floor((y + scrollTop - rect.top) / GRID);

                if (row < 0 || row >= circuit.qubits) return;
                if (col < 0 || col >= MAX_COLS) return;

                addGate({
                    id: nanoid(6),
                    type: item.type,
                    target: [row],
                    timeStep: col,
                    params: ["RX", "RY", "RZ"].includes(item.type) ? [0] : undefined,
                });
            },
        }),
        [circuit.qubits]
    );

    /* 把 dropRef 绑定到画布 */
    useEffect(() => {
        if (canvasRef.current) dropRef(canvasRef.current);
    }, [dropRef]);

    /* 编辑回调 */
    const openDrawer = (g) => {
        setCurrentGate(g);
        setDrawerOpen(true);
    };

    return (
        <div className="relative flex-1 overflow-hidden">
            <GateDragLayer GRID={GRID} />

            {/* ---------- 画布 ---------- */}
            <div
                ref={canvasRef}
                className={`relative h-[520px] overflow-auto bg-white select-none ${isOver ? "ring-2 ring-indigo-400" : ""
                    }`}
            >
                {/* 横线 */}
                {Array.from({ length: circuit.qubits }).map((_, i) => (
                    <div
                        key={`row-${i}`}
                        className={`absolute left-0 right-0 h-[2px] ${ROW_COLOR}`}
                        style={{ top: i * GRID + GRID / 2 }}
                    />
                ))}

                {/* 纵线 */}
                {Array.from({ length: MAX_COLS }).map((_, i) => (
                    <div
                        key={`col-${i}`}
                        className={`absolute top-0 bottom-0 w-px ${COL_COLOR}`}
                        style={{ left: i * GRID }}
                    />
                ))}

                {/* Gates */}
                {circuit.gates.map((g) => (
                    <Gate
                        key={g.id}
                        gate={g}
                        GRID={GRID}
                        onEdit={() => openDrawer(g)}
                    />
                ))}

                {/* 工具条 */}
                <GateToolbar
                    visible={!!currentGate}
                    x={currentGate ? currentGate.timeStep * GRID : 0}
                    y={currentGate ? currentGate.target[0] * GRID : 0}
                    onEdit={() => openDrawer(currentGate)}
                    onDelete={() => {
                        removeGate(currentGate.id);
                        setCurrentGate(null);
                    }}
                />
            </div>

            {/* 参数抽屉 */}
            <GateParameterDrawer
                gate={currentGate}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSave={(θ) => {
                    updateGate(currentGate.id, { params: [θ] });
                    setDrawerOpen(false);
                }}
            />
        </div>
    );
}



// import { useRef, useState } from 'react';
// import { useDrop } from 'react-dnd';
// import Gate from '@/components/Gate.jsx';
// import GateToolbar from '@/components/GateToolbar.jsx';
// import GateParameterDrawer from "@/components/GateEditor/GateParameterDrawer.tsx";
// import GateDragLayer from '@/components/GateDragLayer.jsx';
// import { useCircuit } from '@/contexts/CircuitContext';
// import { nanoid } from 'nanoid';

// const GRID = 48;
// const ROWS = 5;
// const COLS = 60;

// export default function CircuitCanvas() {
//     const { circuit, addGate, removeGate, updateGate } = useCircuit();

//     /* ───────── 选中 / 工具条 ───────── */
//     const [selected, setSelected] = useState(null);          // gate.id
//     const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });

//     /* ───────── 参数抽屉 ───────── */
//     const [drawerGate, setDrawerGate] = useState(null);

//     /* ───────── 画布 ref ───────── */
//     const canvasRef = useRef(null);

//     /* ───────── drag-and-drop ───────── */
//     useDrop(() => ({
//         accept: 'GATE',
//         drop: (item, monitor) => {
//             const canvas = canvasRef.current;
//             const rect = canvas.getBoundingClientRect();
//             const { x, y } = monitor.getSourceClientOffset();

//             const col = Math.floor((x - rect.left + canvas.scrollLeft) / GRID);
//             const row = Math.floor((y - rect.top + canvas.scrollTop) / GRID);

//             addGate({
//                 id: nanoid(6),
//                 type: item.type,
//                 target: [Math.max(0, Math.min(ROWS - 1, row))],
//                 timeStep: Math.max(0, Math.min(COLS - 1, col)),
//                 params: ['RX', 'RY', 'RZ'].includes(item.type) ? [0] : undefined
//             });
//         }
//     }), [addGate]);

//     /* ───────── click 事件 ───────── */
//     const handleGateClick = (g, e) => {
//         e.stopPropagation();
//         setSelected(g.id);
//         setToolbarPos({ x: e.clientX + 8, y: e.clientY + 8 });
//     };

//     const closeAll = () => {
//         setSelected(null);
//         setDrawerGate(null);
//     };

//     /* ───────── 画布 ───────── */
//     return (
//         <div className="flex-1 relative" onClick={closeAll}>
//             <GateDragLayer />

//             {/* ================= 量子线 ================= */}
//             <div
//                 ref={canvasRef}
//                 className="relative w-full h-[400px] overflow-auto bg-white border"
//             >
//                 {/* 横线 */}
//                 {Array.from({ length: ROWS }).map((_, i) => (
//                     <div key={i}
//                         className="absolute left-0 right-0 h-[2px] bg-slate-400/80"
//                         style={{ top: i * GRID + GRID / 2 }}
//                     />
//                 ))}
//                 {/* 纵线 */}
//                 {Array.from({ length: COLS }).map((_, i) => (
//                     <div key={i}
//                         className="absolute top-0 bottom-0 w-px bg-slate-300/60"
//                         style={{ left: i * GRID }}
//                     />
//                 ))}

//                 {/* 已放置 gates */}
//                 {circuit.gates.map(g => (
//                     <Gate
//                         key={g.id}
//                         gate={g}
//                         isSelected={g.id === selected}
//                         onEdit={(e) => handleGateClick(g, e)}
//                     />
//                 ))}
//             </div>

//             {/* 工具条 */}
//             <GateToolbar
//                 visible={!!selected}
//                 x={toolbarPos.x}
//                 y={toolbarPos.y}
//                 onEdit={() => {
//                     const gate = circuit.gates.find((g) => g.id === selected);
//                     if (gate && ['RX', 'RY', 'RZ'].includes(gate.type)) {
//                         setDrawerGate(gate);
//                     }
//                 }}
//                 onDelete={() => {
//                     removeGate(selected);
//                     setSelected(null);
//                 }}
//             />

//             {/* 参数抽屉 */}
//             <GateParameterDrawer
//                 gate={drawerGate}
//                 open={!!drawerGate}
//                 onSave={(θ) => {
//                     updateGate(drawerGate.id, { params: [θ] });
//                     setDrawerGate(null);
//                     setSelected(null);
//                 }}
//                 onClose={() => setDrawerGate(null)}
//             />
//         </div>
//     );
// }



// // src/components/CircuitCanvas.jsx
// import { useState, useRef } from 'react';
// import { useDrop } from 'react-dnd';
// import { ItemTypes } from '@/components/PaletteGate';
// import Gate from '@/components/Gate.jsx';
// import GateParameterDrawer from '@/components/GateEditor/GateParameterDrawer';
// import { useCircuit } from '@/contexts/CircuitContext';
// import { nanoid } from 'nanoid';

// const GRID = 60;                   // 每列、每行像素高度
// const HALF = 14;                   // gate 方块半高 (28px / 2)

// export default function CircuitCanvas() {
//     const { circuit, addGate, updateGate } = useCircuit();

//     /* ① “当前悬停行”   – 用于拖拽时高亮电路线 */
//     const [hoverRow, setHoverRow] = useState(null);

//     /* ② Drawer 状态 */
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [currentGate, setCurrentGate] = useState(null);

//     const canvasRef = useRef(null);

//     // -------- React-DnD Drop 区域 --------
//     const [, dropRef] = useDrop(
//         () => ({
//             accept: ItemTypes.GATE,

//             /** 当光标在画布上移动时触发。用来计算高亮行 */
//             hover: (_item, monitor) => {
//                 const canvas = canvasRef.current;
//                 if (!canvas) return;

//                 const rect = canvas.getBoundingClientRect();
//                 const { y } = monitor.getClientOffset();        // 绝对坐标
//                 const row = Math.floor((y - rect.top) / GRID);
//                 setHoverRow(row >= 0 && row < circuit.qubits ? row : null);
//             },

//             /** 放下 gate 时真正添加到电路 */
//             drop: (item, monitor) => {
//                 const canvas = canvasRef.current;
//                 if (!canvas) return;

//                 const rect = canvas.getBoundingClientRect();
//                 const { x, y } = monitor.getClientOffset();

//                 // 计算列、行索引；并 clamp 在合法范围
//                 const col = Math.max(0, Math.floor((x - rect.left) / GRID));
//                 const row = Math.max(
//                     0,
//                     Math.min(circuit.qubits - 1, Math.floor((y - rect.top) / GRID))
//                 );

//                 addGate({
//                     id: nanoid(6),
//                     type: item.type,
//                     target: [row],
//                     timeStep: col,
//                     params: ['RX', 'RY', 'RZ'].includes(item.type) ? [0] : undefined
//                 });
//             },

//             /** 拖拽结束（无论是否成功 drop）时，去掉高亮 */
//             end: () => setHoverRow(null)
//         }),
//         [circuit.qubits]
//     );

//     /* 打开参数编辑 Drawer */
//     const openDrawer = gate => {
//         setCurrentGate(gate);
//         setDrawerOpen(true);
//     };

//     return (
//         <>
//             {/* ------- 画布 ------- */}
//             <div
//                 id="canvas"
//                 ref={el => {
//                     canvasRef.current = el;
//                     dropRef(el);
//                 }}
//                 className="relative flex-1 h-[400px] overflow-x-auto bg-white select-none"
//                 /* ④ 只让 gate 处于电路线可见区域；多余空白以 overflow-hidden 裁切 */
//                 style={{ overflowY: 'hidden' }}
//             >
//                 {/* 横线（电路线）—— 加粗到 2px，并在拖拽时高亮 */}
//                 {Array.from({ length: circuit.qubits }).map((_, i) => (
//                     <div
//                         key={`row-${i}`}
//                         className={`absolute left-0 right-0 ${hoverRow === i ? 'bg-indigo-500' : 'bg-gray-500/60'
//                             }`}
//                         style={{
//                             height: 2,
//                             top: i * GRID + GRID / 2 - 1 /* 让线垂直居中 */
//                         }}
//                     />
//                 ))}

//                 {/* 纵线 —— 细栅格(1px) 仅作参考 */}
//                 {Array.from({ length: 120 }).map((_, i) => (
//                     <div
//                         key={`col-${i}`}
//                         className="absolute top-0 bottom-0 w-px bg-blue-500/10"
//                         style={{ left: i * GRID }}
//                     />
//                 ))}

//                 {/* 已放置的 Gates */}
//                 {circuit.gates.map(g => (
//                     <div
//                         key={g.id}
//                         className="absolute"
//                         style={{
//                             top: g.target[0] * GRID + GRID / 2 - HALF,
//                             left: g.timeStep * GRID + 8 /* 8px 内边距 */,
//                             zIndex: 10
//                         }}
//                         onClick={() => {
//                             if (['RX', 'RY', 'RZ'].includes(g.type)) openDrawer(g);
//                         }}
//                     >
//                         <Gate gate={g} />
//                     </div>
//                 ))}
//             </div>

//             {/* Gate 参数编辑 Drawer */}
//             <GateParameterDrawer
//                 gate={currentGate}
//                 open={drawerOpen}
//                 onClose={() => setDrawerOpen(false)}
//                 onSave={θ =>
//                     currentGate && updateGate(currentGate.id, { params: [θ] })
//                 }
//             />
//         </>
//     );
// }


// // src/components/CircuitCanvas.jsx
// import { useRef, useState, useMemo } from 'react';
// import { useDrop } from 'react-dnd';
// import { ItemTypes } from '@/components/PaletteGate';
// import Gate from '@/components/Gate';
// import GateToolbar from '@/components/GateToolbar';
// import GateDrawer from '@/components/GateEditor/GateParameterDrawer';
// import { useCircuit } from '@/contexts/CircuitContext';
// import { nanoid } from 'nanoid';

// const GRID = 60;     // 单格像素
// const MAX_COLS = 120;    // 预留列

// export default function CircuitCanvas() {
//     /* ---------- 电路全局状态 ---------- */
//     const { circuit, addGate, updateGate, removeGate } = useCircuit();

//     /* ---------- DOM / 选中状态 ---------- */
//     const canvasRef = useRef(null);
//     const [selectedId, setSelectedId] = useState(null);
//     const selGate = useMemo(
//         () => circuit.gates.find(g => g.id === selectedId),
//         [selectedId, circuit.gates]
//     );
//     const [drawerOpen, setDrawerOpen] = useState(false);

//     /* ---------- React-DND drop ---------- */
//     const [, drop] = useDrop(
//         () => ({
//             accept: ItemTypes.GATE,
//             drop(item, monitor) {
//                 if (!canvasRef.current) return;                // ① ref 现在始终可用
//                 const rect = canvasRef.current.getBoundingClientRect();
//                 const offset = monitor.getClientOffset();
//                 const col = Math.floor((offset.x - rect.left + canvasRef.current.scrollLeft) / GRID);
//                 const row = Math.floor((offset.y - rect.top + canvasRef.current.scrollTop) / GRID);

//                 addGate({
//                     id: nanoid(6),
//                     type: item.type,
//                     target: [row],
//                     timeStep: col,
//                     params: ['RX', 'RY', 'RZ'].includes(item.type) ? [0] : undefined,
//                 });
//             },
//         }),
//         [addGate]
//     );

//     /* ---------- 合并自己的 ref 与 drop-ref ---------- */
//     const setRefs = node => {
//         canvasRef.current = node;
//         drop(node);
//     };

//     /* ---------- 渲染 ---------- */
//     return (
//         <div ref={setRefs}          /* ② 合并后的 ref */
//             className="relative flex-1 overflow-auto bg-white"
//             style={{ minHeight: 400 }}>

//             {/* 横线 */}
//             {Array.from({ length: circuit.qubits }).map((_, i) => (
//                 <div key={`row-${i}`}
//                     className="absolute w-full h-px bg-slate-400/70 pointer-events-none"
//                     style={{ top: i * GRID + GRID / 2 }} />
//             ))}

//             {/* 竖线 */}
//             {Array.from({ length: MAX_COLS }).map((_, i) => (
//                 <div key={`col-${i}`}
//                     className="absolute h-full w-px bg-slate-200 pointer-events-none"
//                     style={{ left: i * GRID }} />
//             ))}

//             {/* Gates */}
//             {circuit.gates.map(g => (
//                 <div key={g.id}
//                     className="absolute"
//                     style={{ top: g.target[0] * GRID + 8, left: g.timeStep * GRID + 8 }}
//                     onClick={() => {
//                         setSelectedId(g.id);
//                         if (['RX', 'RY', 'RZ'].includes(g.type)) setDrawerOpen(true);
//                     }}>
//                     <Gate gate={g} isSelected={g.id === selectedId} />
//                 </div>
//             ))}

//             {/* 工具条 */}
//             {selGate && (
//                 <GateToolbar
//                     gate={selGate}
//                     onDelete={() => { removeGate(selGate.id); setSelectedId(null); }}
//                     onClose={() => setSelectedId(null)}
//                     onOpenDrawer={() => setDrawerOpen(true)}
//                 />
//             )}

//             {/* 参数抽屉 */}
//             <GateDrawer
//                 gate={selGate}
//                 open={drawerOpen}
//                 onClose={() => setDrawerOpen(false)}
//                 onSave={θ => selGate && updateGate(selGate.id, { params: [θ] })}
//                 onDelete={() => { selGate && removeGate(selGate.id); setSelectedId(null); }}
//             />
//         </div>
//     );
// }
