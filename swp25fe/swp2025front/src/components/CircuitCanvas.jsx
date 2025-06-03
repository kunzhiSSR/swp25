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

export const GRID = 70; // 增加网格大小，使电路图分割更大
const MAX_COLS = 9; // 减少列数，使电路图更短

export default function CircuitCanvas({ onSelectGate }) {
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

        // 通知父组件选择了哪个门
        if (onSelectGate) {
            onSelectGate(g);
        }
    };

    // 处理点击空白区域
    const handleCanvasClick = (e) => {
        // 如果点击的是画布本身（而不是其中的门），则清除工具栏
        if (e.target === e.currentTarget) {
            setToolbar({ gate: null });
            // 清除选中的门
            if (onSelectGate) {
                onSelectGate(null);
            }
        }
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

        // 更新选中的门
        if (onSelectGate) {
            onSelectGate(updated);
        }
    };

    const removeLastControl = gate => {
        if (!gate.control?.length) return;
        const control = [...gate.control];
        control.pop();                    // 移除最后一个
        updateGate(gate.id, { control });

        const updated = { ...gate, control };
        setToolbar(t => ({ ...t, gate: updated }));

        // 更新选中的门
        if (onSelectGate) {
            onSelectGate(updated);
        }
    };

    // 生成时间步标记
    const timeSteps = Array.from({ length: MAX_COLS }, (_, i) => i);

    /* ---------- render ---------- */
    return (
        <div className="flex flex-col h-full min-h-[250px] overflow-hidden">
            {/* 外层灰色圆角实线框，包含ID行和电路图区域 */}
            <div className="border-2 border-gray-400 rounded-lg m-2 overflow-hidden flex flex-col flex-grow">
                {/* 顶部时间步标记 */}
                <div className="flex py-3 px-4 bg-gray-50 border-b border-gray-300">
                    <div className="w-16 mr-1 text-center text-gray-600 text-sm font-medium">ID</div>
                    {timeSteps.map(t => (
                        <div key={t} className="w-20 text-center text-gray-600 text-sm font-medium">
                            t{t}
                        </div>
                    ))}

                </div>

                {/* 主电路区域 */}
                <div
                    ref={setRefs}
                    className="relative flex-1 overflow-auto bg-white p-6"
                    onClick={handleCanvasClick}
                    style={{
                        height: Math.max(circuit.qubits * GRID + 60, 180), // 确保最小高度
                        minHeight: "180px"
                    }}
                >
                    {/* 量子比特标签和轨道 */}
                    {Array.from({ length: circuit.qubits }).map((_, r) => (
                        <div
                            key={r}
                            className="absolute left-0 flex items-center w-full"
                            style={{ top: r * GRID + GRID / 2 }}
                        >
                            <span className="mr-4 select-none text-base font-medium text-gray-600 w-12 text-right">
                                {`q${r}:`}
                            </span>
                            <div className="flex-1 border-t-2 border-gray-400" />
                        </div>
                    ))}

                    {/* Hover 提示 */}
                    {hover && (
                        <div
                            className="pointer-events-none absolute rounded border-2 border-blue-500/50 bg-blue-300/20"
                            style={{
                                left: hover.col * GRID + 50, // 为量子比特标签留出更多空间
                                top: hover.row * GRID,
                                width: GRID,
                                height: GRID,
                            }}
                        />
                    )}

                    {/* Gates */}
                    {circuit.gates.map(g => (
                        <Gate
                            key={g.id}
                            gate={{ ...g, timeStep: g.timeStep + 1 }} // 为量子比特标签偏移timeStep
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
                                // 清除选中的门
                                if (onSelectGate) {
                                    onSelectGate(null);
                                }
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
                        onSave={u => {
                            updateGate(drawer.gate.id, u);
                            // 更新选中的门的参数
                            if (onSelectGate && drawer.gate) {
                                const updatedGate = { ...drawer.gate, ...u };
                                onSelectGate(updatedGate);
                            }
                        }}
                    />
                </div>
            </div>

            {/* 底部提示文本 */}
            <div className="text-center text-sm text-gray-500 p-3 border-t">
                Ziehen Sie Gates aus der Palette und legen Sie sie auf dem Raster ab
            </div>
        </div>
    );
}
