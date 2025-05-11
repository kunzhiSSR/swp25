
// // src/components/CircuitCanvas.jsx
// import { useRef, useState, useEffect } from 'react';
// import { useDrop } from 'react-dnd';
// import { nanoid } from 'nanoid';

// import Gate from '@/components/Gate.jsx';
// import GateActions from '@/components/GateActions.jsx';
// import GateParameterDrawer from '@/components/GateEditor/GateParameterDrawer';
// import { ItemTypes } from '@/components/PaletteGate';
// import { useCircuit } from '@/contexts/CircuitContext';
// import { GATE_DEFS, PARAM_GATES } from '@/constants/gates';

// export const GRID = 56;
// const MAX_COLS = 120;

// export default function CircuitCanvas() {
//     const cvsRef = useRef(null);
//     const {
//         circuit,
//         addGate,
//         updateGate,
//         removeGate,
//     } = useCircuit();

//     /* ---------- DnD ---------- */
//     const [hover, setHover] = useState(null);

//     const [, dropRef] = useDrop(
//         () => ({
//             accept: ItemTypes.GATE,
//             hover: (_, monitor) => {
//                 const pt = monitor.getClientOffset();
//                 if (!pt) return;
//                 setHover(pointToCoord(pt));
//             },
//             drop: (item, monitor) => {
//                 const pt = monitor.getClientOffset();
//                 if (!pt) return;
//                 addGateAt(item.type, pointToCoord(pt));
//                 setHover(null);
//             },
//             collect: m => {
//                 if (!m.isOver()) setHover(null);
//             },
//         }),
//         [circuit.qubits]
//     );

//     const setRefs = node => {
//         cvsRef.current = node;
//         dropRef(node);
//     };

//     const pointToCoord = ({ x, y }) => {
//         const rect = cvsRef.current.getBoundingClientRect();
//         const { scrollLeft, scrollTop } = cvsRef.current;
//         return {
//             col: Math.floor((x + scrollLeft - rect.left) / GRID),
//             row: Math.floor((y + scrollTop - rect.top) / GRID),
//         };
//     };

//     /* ---------- 新增：拖放时自动给受控门加 control ---------- */
//     const addGateAt = (type, { row, col }) => {
//         if (row < 0 || row >= circuit.qubits || col < 0 || col >= MAX_COLS) return;

//         const def = GATE_DEFS[type];
//         const params = def.params?.map(p => p.default ?? 0);

//         // 默认给 CNOT / CZ / SWAP 等受控门加一个控制行
//         const needsCtrl = ['CNOT', 'CZ', 'SWAP'].includes(type);
//         const control = needsCtrl ? [row === 0 ? 1 : row - 1] : undefined;

//         addGate({
//             id: nanoid(6),
//             type,
//             target: [row],
//             control,
//             params,
//             timeStep: col,
//         });
//     };

//     /* ---------- 工具条 & 参数抽屉 ---------- */
//     const [toolbar, setToolbar] = useState({ gate: null, x: 0, y: 0 });
//     const [drawer, setDrawer] = useState({ open: false, gate: null });

//     const openDrawer = g =>
//         PARAM_GATES.includes(g.type) && setDrawer({ open: true, gate: g });

//     const selectGate = (g, rect) => {
//         const cvsRect = cvsRef.current.getBoundingClientRect();
//         setToolbar({
//             gate: g,
//             x: rect.left - cvsRect.left + rect.width / 2 - 50,
//             y: rect.top - cvsRect.top - 40,
//         });
//     };

//     /* ---------- 渲染 ---------- */
//     return (
//         <div
//             ref={setRefs}
//             className="relative flex-1 overflow-auto bg-white"
//             style={{ height: circuit.qubits * GRID + GRID }}
//         >
//             {/* 横线 + 标签 */}
//             {Array.from({ length: circuit.qubits }).map((_, r) => (
//                 <div
//                     key={r}
//                     className="absolute left-0 flex items-center w-full"
//                     style={{ top: r * GRID + GRID / 2 }}
//                 >
//                     <span className="mr-2 select-none text-sm font-medium text-gray-800">{`q[${r}]`}</span>
//                     <div className="flex-1 border-t-2 border-gray-600" />
//                 </div>
//             ))}

//             {/* Hover 高亮 */}
//             {hover && (
//                 <div
//                     className="pointer-events-none absolute rounded border-2 border-indigo-500/50 bg-indigo-300/20"
//                     style={{
//                         left: hover.col * GRID,
//                         top: hover.row * GRID,
//                         width: GRID,
//                         height: GRID,
//                     }}
//                 />
//             )}

//             {/* Gates */}
//             {circuit.gates.map(g => (
//                 <Gate
//                     key={g.id}
//                     gate={g}
//                     onEdit={openDrawer}
//                     onSelect={selectGate}
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
//                 />
//             )}

//             {/* 参数抽屉 */}
//             <GateParameterDrawer
//                 gate={drawer.gate}
//                 open={drawer.open}
//                 onClose={() => setDrawer({ ...drawer, open: false })}
//                 onSave={u => updateGate(drawer.gate.id, u)}
//             />
//         </div>
//     );
// }


// src/components/CircuitCanvas.jsx
import { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';

import Gate from '@/components/Gate.jsx';
import GateActions from '@/components/GateActions.jsx';
import GateParameterDrawer from '@/components/GateEditor/GateParameterDrawer';

import { ItemTypes } from '@/components/PaletteGate';
import { useCircuit } from '@/contexts/CircuitContext';
import { GATE_DEFS, PARAM_GATES } from '@/constants/gates';

export const GRID = 56;
const MAX_COLS = 120;

export default function CircuitCanvas() {
    const cvsRef = useRef(null);
    const { circuit, addGate, updateGate, removeGate } = useCircuit();

    /* ---------- DnD ---------- */
    const [hover, setHover] = useState(null);

    const [, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.GATE,
            hover: (_, monitor) => {
                const pt = monitor.getClientOffset();
                if (pt) setHover(pointToCoord(pt));
            },
            drop: (item, monitor) => {
                const pt = monitor.getClientOffset();
                if (pt) addGateAt(item.type, pointToCoord(pt));
                setHover(null);
            },
            collect: m => { if (!m.isOver()) setHover(null); },
        }),
        [circuit.qubits]
    );

    const setRefs = node => { cvsRef.current = node; dropRef(node); };

    const pointToCoord = ({ x, y }) => {
        const rect = cvsRef.current.getBoundingClientRect();
        const { scrollLeft, scrollTop } = cvsRef.current;
        return {
            col: Math.floor((x + scrollLeft - rect.left) / GRID),
            row: Math.floor((y + scrollTop - rect.top) / GRID),
        };
    };

    /* ---------- 拖放时自动给受控门加 control ---------- */
    const addGateAt = (type, { row, col }) => {
        if (row < 0 || row >= circuit.qubits || col < 0 || col >= MAX_COLS) return;

        const params = GATE_DEFS[type].params?.map(p => p.default ?? 0);
        const needsCtl = ['CNOT', 'CZ', 'SWAP'].includes(type);
        const control = needsCtl ? [row === 0 ? 1 : row - 1] : undefined;

        addGate({
            id: nanoid(6),
            type,
            target: [row],
            control,
            params,
            timeStep: col,
        });
    };

    /* ---------- Gate 工具条 & 抽屉 ---------- */
    const [toolbar, setToolbar] = useState({ gate: null, x: 0, y: 0 });
    const [drawer, setDrawer] = useState({ open: false, gate: null });

    const openDrawer = g =>
        PARAM_GATES.includes(g.type) && setDrawer({ open: true, gate: g });

    const selectGate = (g, rect) => {
        const cvsRect = cvsRef.current.getBoundingClientRect();
        setToolbar({
            gate: g,
            x: rect.left - cvsRect.left + rect.width / 2 - 50,
            y: rect.top - cvsRect.top - 40,
        });
    };

    /* ---------- 增 / 删控制行 ---------- */
    const addControlRow = (gate, dir) => {
        const tgt = gate.target[0];
        const newRow = dir === 'above' ? tgt - 1 : tgt + 1;
        if (newRow < 0 || newRow >= circuit.qubits) return;        // 越界
        if (newRow === tgt) return;
        if (gate.control?.includes(newRow)) return;                // 已存在

        const updated = {
            ...gate,
            control: [...(gate.control ?? []), newRow].sort((a, b) => a - b),
        };
        updateGate(gate.id, { control: updated.control });
        setToolbar(t => ({ ...t, gate: updated }));
    };

    const removeLastControl = gate => {
        if (!gate.control?.length) return;
        const control = [...gate.control];
        control.pop();                    // 移除最后一个
        updateGate(gate.id, { control });
        setToolbar(t => ({ ...t, gate: { ...gate, control } }));
    };

    /* ---------- render ---------- */
    return (
        <div
            ref={setRefs}
            className="relative flex-1 overflow-auto bg-white"
            style={{ height: circuit.qubits * GRID + GRID }}
        >
            {/* 量子线 + 行标 */}
            {Array.from({ length: circuit.qubits }).map((_, r) => (
                <div
                    key={r}
                    className="absolute left-0 flex items-center w-full"
                    style={{ top: r * GRID + GRID / 2 }}
                >
                    <span className="mr-2 select-none text-sm font-medium text-gray-800">
                        {`q[${r}]`}
                    </span>
                    <div className="flex-1 border-t-2 border-gray-600" />
                </div>
            ))}

            {/* Hover 提示 */}
            {hover && (
                <div
                    className="pointer-events-none absolute rounded border-2 border-indigo-500/50 bg-indigo-300/20"
                    style={{
                        left: hover.col * GRID,
                        top: hover.row * GRID,
                        width: GRID,
                        height: GRID,
                    }}
                />
            )}

            {/* Gates */}
            {circuit.gates.map(g => (
                <Gate key={g.id} gate={g} onEdit={openDrawer} onSelect={selectGate} />
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
                    onAddCtrlAbove={() => addControlRow(toolbar.gate, 'above')}
                    onAddCtrlBelow={() => addControlRow(toolbar.gate, 'below')}
                    onRemoveCtrl={() => removeLastControl(toolbar.gate)}
                />
            )}

            {/* 参数抽屉 */}
            <GateParameterDrawer
                gate={drawer.gate}
                open={drawer.open}
                onClose={() => setDrawer({ ...drawer, open: false })}
                onSave={u => updateGate(drawer.gate.id, u)}
            />
        </div>
    );
}
