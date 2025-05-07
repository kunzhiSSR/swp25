





// // src/components/CircuitCanvas.jsx
// import { useDrop } from 'react-dnd';
// import { ItemTypes } from '@/components/PaletteGate';
// import { useCircuit } from '@/contexts/CircuitContext';
// import { nanoid } from 'nanoid';

// const GRID = 60;

// export default function CircuitCanvas() {
//     const { circuit, addGate } = useCircuit();

//     /* 把整个画布设为 Drop 区域 */
//     const [, dropRef] = useDrop(() => ({
//         accept: ItemTypes.GATE,
//         drop: (item, monitor) => {
//             const canvas = document.getElementById('canvas');
//             const rect = canvas.getBoundingClientRect();
//             const offset = monitor.getClientOffset();          // 屏幕坐标
//             const col = Math.floor((offset.x - rect.left) / GRID);
//             const row = Math.floor((offset.y - rect.top) / GRID);

//             addGate({
//                 id: nanoid(6),
//                 type: item.type,
//                 target: [row],
//                 timeStep: col,
//                 params: ['RX', 'RY', 'RZ'].includes(item.type) ? [0] : undefined,
//             });
//         },
//     }), []);

//     return (
//         <div
//             id="canvas"
//             ref={dropRef}
//             className="relative flex-1 h-[400px] overflow-x-auto bg-white"
//         >
//             {/* 横线 */}
//             {Array.from({ length: circuit.qubits }).map((_, i) => (
//                 <div key={i} className="absolute left-0 right-0 h-px bg-gray-300"
//                     style={{ top: i * GRID + GRID / 2 }} />
//             ))}

//             {/* 纵线 */}
//             {Array.from({ length: 120 }).map((_, i) => (
//                 <div key={i} className="absolute top-0 bottom-0 w-px bg-gray-200"
//                     style={{ left: i * GRID }} />
//             ))}

//             {/* 渲染已放置门 */}
//             {circuit.gates.map((g) => (
//                 <div
//                     key={g.id}
//                     className="absolute px-2 py-1 bg-indigo-600 text-white rounded text-sm cursor-pointer"
//                     style={{
//                         top: g.target[0] * GRID + 8,
//                         left: g.timeStep * GRID + 8,
//                     }}
//                 >
//                     {g.type}
//                 </div>
//             ))}
//         </div>
//     );
// }




// src/components/CircuitCanvas.jsx
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/components/PaletteGate';
import Gate from '@/components/Gate.jsx';
import GateParameterDrawer from '@/components/GateEditor/GateParameterDrawer';
import { useCircuit } from '@/contexts/CircuitContext';
import { nanoid } from 'nanoid';

const GRID = 60; // 每个网格 60px

export default function CircuitCanvas() {
    /** 电路全局状态 */
    const { circuit, addGate, updateGate } = useCircuit();

    /** Drawer 状态 */
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentGate, setCurrentGate] = useState(null);

    /** 打开参数编辑抽屉 */
    const openDrawer = (gate) => {
        setCurrentGate(gate);
        setDrawerOpen(true);
    };

    /* Drop 区域 */
    const [, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.GATE,
            drop: (item, monitor) => {
                const canvas = document.getElementById('canvas');
                const rect = canvas.getBoundingClientRect();
                const offset = monitor.getClientOffset();
                const col = Math.floor((offset.x - rect.left) / GRID);
                const row = Math.floor((offset.y - rect.top) / GRID);

                addGate({
                    id: nanoid(6),
                    type: item.type,
                    target: [row],
                    timeStep: col,
                    params: ['RX', 'RY', 'RZ'].includes(item.type) ? [0] : undefined,
                });
            },
        }),
        [],
    );

    return (
        <>
            {/* 画布 */}
            <div
                id="canvas"
                ref={dropRef}
                className="relative flex-1 h-[400px] overflow-x-auto bg-white"
            >
                {/* 横线 */}
                {Array.from({ length: circuit.qubits }).map((_, i) => (
                    <div
                        key={`row-${i}`}
                        className="absolute left-0 right-0 h-px bg-gray-300"
                        style={{ top: i * GRID + GRID / 2 }}
                    />
                ))}

                {/* 纵线（120 列可根据需要增减） */}
                {Array.from({ length: 120 }).map((_, i) => (
                    <div
                        key={`col-${i}`}
                        className="absolute top-0 bottom-0 w-px bg-gray-200"
                        style={{ left: i * GRID }}
                    />
                ))}

                {/* 已放置门 */}
                {circuit.gates.map((g) => (
                    <div
                        key={g.id}
                        className="absolute"
                        style={{ top: g.target[0] * GRID + 8, left: g.timeStep * GRID + 8 }}
                        onClick={() => {
                            if (['RX', 'RY', 'RZ'].includes(g.type)) openDrawer(g);
                        }}
                    >
                        <Gate gate={g} />
                    </div>
                ))}
            </div>

            {/* 参数编辑抽屉 */}
            <GateParameterDrawer
                gate={currentGate}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSave={(θ) =>
                    currentGate && updateGate(currentGate.id, { params: [θ] })
                }
            />
        </>
    );
}





// // src/components/CircuitCanvas.jsx
// import { useState, useEffect } from 'react';   // ⭐ 新增 useEffect
// import { useDrop } from 'react-dnd';
// import { ItemTypes } from '@/components/PaletteGate';
// import Gate from '@/components/Gate.jsx';
// import GateParameterDrawer from '@/components/GateEditor/GateParameterDrawer';
// import { useCircuit } from '@/contexts/CircuitContext';
// import { nanoid } from 'nanoid';

// const GRID = 60; // 每个网格 60px

// export default function CircuitCanvas() {
//     /** 电路全局状态 */
//     const { circuit, addGate, updateGate, removeGate } = useCircuit();

//     /** Drawer 状态 */
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [currentGate, setCurrentGate] = useState(null);

//     /** ⭐ 选中状态 */
//     const [selectedId, setSelectedId] = useState(null);

//     /** 打开参数编辑抽屉 */
//     const openDrawer = (gate) => {
//         setCurrentGate(gate);
//         setDrawerOpen(true);
//     };

//     /* Drop 区域 */
//     useDrop(
//         () => ({
//             accept: ItemTypes.GATE,
//             drop: (item, monitor) => {
//                 const rect = document
//                     .getElementById('canvas')
//                     .getBoundingClientRect();
//                 const offset = monitor.getClientOffset();
//                 const col = Math.floor((offset.x - rect.left) / GRID);
//                 const row = Math.floor((offset.y - rect.top) / GRID);

//                 addGate({
//                     id: nanoid(6),
//                     type: item.type,
//                     target: [row],
//                     timeStep: col,
//                     params: ['RX', 'RY', 'RZ'].includes(item.type) ? [0] : undefined,
//                 });
//             },
//         }),
//         [],
//     );

//     /* ⭐ 键盘 Delete 删除选中门 */
//     useEffect(() => {
//         const handleKey = (e) => {
//             if (!selectedId) return;
//             if (e.key === 'Delete' || e.key === 'Backspace') {
//                 removeGate(selectedId);
//                 setSelectedId(null);
//             }
//         };
//         window.addEventListener('keydown', handleKey);
//         return () => window.removeEventListener('keydown', handleKey);
//     }, [selectedId]);

//     return (
//         <>
//             {/* 画布 */}
//             <div
//                 id="canvas"
//                 className="relative flex-1 h-[400px] overflow-x-auto bg-white"
//             >
//                 {/* 横线 */}
//                 {Array.from({ length: circuit.qubits }).map((_, i) => (
//                     <div
//                         key={`row-${i}`}
//                         className="absolute left-0 right-0 h-px bg-gray-300"
//                         style={{ top: i * GRID + GRID / 2 }}
//                     />
//                 ))}

//                 {/* 纵线（淡灰虚线） */}
//                 {Array.from({ length: 120 }).map((_, i) => (
//                     <div
//                         key={`col-${i}`}
//                         className="absolute top-0 bottom-0 w-px border-r border-dashed border-gray-200 opacity-40"
//                         style={{ left: i * GRID }}
//                     />
//                 ))}

//                 {/* 已放置门 */}
//                 {circuit.gates.map((g) => (
//                     <div
//                         key={g.id}
//                         className="absolute"
//                         style={{ top: g.target[0] * GRID + 8, left: g.timeStep * GRID + 8 }}
//                         onClick={() => {
//                             setSelectedId(g.id);                 // ⭐ 记录选中
//                             if (['RX', 'RY', 'RZ'].includes(g.type)) openDrawer(g);
//                         }}
//                     >
//                         <Gate gate={g} isSelected={g.id === selectedId} />  {/* ⭐ 传 isSelected */}
//                     </div>
//                 ))}
//             </div>

//             {/* 参数编辑抽屉 */}
//             <GateParameterDrawer
//                 gate={currentGate}
//                 open={drawerOpen}
//                 onClose={() => setDrawerOpen(false)}
//                 onSave={(θ) =>
//                     currentGate && updateGate(currentGate.id, { params: [θ] })
//                 }
//             />
//         </>
//     );
// }
