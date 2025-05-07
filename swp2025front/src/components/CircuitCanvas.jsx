// src/components/CircuitCanvas.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import { useCircuit } from '@/contexts/CircuitContext';
import { ItemTypes } from '@/components/PaletteGate';
import Gate from '@/components/Gate.jsx';
import GateToolbar from '@/components/GateToolbar.jsx';
import GateParameterDrawer from '@/components/GateEditor/GateParameterDrawer';

const GRID = 100;  // 每格 100px
const LABEL_W = 64;   // 左侧标签宽度
const MAX_COLS = 120;  // 最多 120 列

export default function CircuitCanvas() {
    const { circuit, addGate, updateGate, removeGate } = useCircuit();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentGate, setCurrentGate] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);
    const contentRef = useRef(null);

    // clamp 帮手
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const [, dropRef] = useDrop({
        accept: ItemTypes.GATE,

        // hover 时只算 row，用来高亮
        hover(_, monitor) {
            const node = contentRef.current;
            if (!node) return;
            const rect = node.getBoundingClientRect();
            const { scrollTop } = node;
            const off = monitor.getClientOffset();
            if (!off) return;

            const yInside = off.y - rect.top + scrollTop;
            // 这个公式同时做 半格偏移 + 四舍五入
            const row = clamp(
                Math.round(yInside / GRID - 0.5),
                0,
                circuit.qubits - 1
            );
            setHoveredRow(row);
        },

        // drop 时真正放置
        drop(item, monitor) {
            const node = contentRef.current;
            if (!node) return;
            const rect = node.getBoundingClientRect();
            const { scrollLeft, scrollTop } = node;
            const off = monitor.getClientOffset();
            if (!off) return;

            // col 用四舍五入  
            const xInside = off.x - rect.left + scrollLeft;
            const col = clamp(Math.round(xInside / GRID), 0, MAX_COLS - 1);

            // row 用新公式
            const yInside = off.y - rect.top + scrollTop;
            const row = clamp(Math.round(yInside / GRID - 0.5), 0, circuit.qubits - 1);

            addGate({
                id: nanoid(6),
                type: item.type,
                target: [row],
                timeStep: col,
                params: ['RX', 'RY', 'RZ'].includes(item.type) ? [0] : undefined,
            });
            setHoveredRow(null);
        }
    }, [circuit.qubits]);

    // 合并 ref
    const setContentRef = n => {
        contentRef.current = n;
        dropRef(n);
    };

    // Delete 键删除
    useEffect(() => {
        const onKey = e => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
                removeGate(selectedId);
                setSelectedId(null);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedId, removeGate]);

    const openDrawer = gate => {
        setCurrentGate(gate);
        setDrawerOpen(true);
    };

    return (
        <>
            <div className="flex h-[800px] bg-white">
                {/* 左侧 q 标签 */}
                <div className="w-[64px] flex flex-col bg-gray-50 border-r border-gray-200">
                    {Array.from({ length: circuit.qubits }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[100px] flex items-center justify-center text-sm font-medium text-gray-700 select-none"
                        >
                            q[{i}]
                        </div>
                    ))}
                </div>

                {/* 外层包装：padding + border */}
                <div className="flex-1 p-4 border-l border-gray-200 overflow-hidden">
                    {/* 内层画布：无 padding/border */}
                    <div
                        ref={setContentRef}
                        className="relative overflow-auto"
                        style={{ minWidth: GRID * MAX_COLS, height: '100%' }}
                    >
                        {/* 量子线 (高亮行用蓝色) */}
                        {Array.from({ length: circuit.qubits }).map((_, i) => (
                            <div
                                key={i}
                                className={
                                    `absolute left-0 right-0 h-[2px] pointer-events-none ` +
                                    (i === hoveredRow ? 'bg-blue-400' : 'bg-gray-500')
                                }
                                style={{ top: i * GRID + GRID / 2 }}
                            />
                        ))}

                        {/* 辅助竖线 */}
                        {Array.from({ length: MAX_COLS }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-px bg-gray-100 pointer-events-none"
                                style={{ left: i * GRID, top: 0, bottom: 0 }}
                            />
                        ))}

                        {/* 渲染 Gates */}
                        {circuit.gates.map(g => {
                            const x = g.timeStep * GRID + 10;
                            const y = g.target[0] * GRID + 10;
                            return (
                                <React.Fragment key={g.id}>
                                    <div
                                        className="absolute"
                                        style={{ left: x, top: y }}
                                        onClick={() => {
                                            setSelectedId(g.id);
                                            if (['RX', 'RY', 'RZ'].includes(g.type)) openDrawer(g);
                                        }}
                                    >
                                        <Gate
                                            gate={g}
                                            isSelected={g.id === selectedId}
                                            onEdit={() => openDrawer(g)}
                                            className="px-3 py-2 text-base shadow-md"
                                        />
                                    </div>
                                    {selectedId === g.id && (
                                        <GateToolbar
                                            x={x + GRID + 8}
                                            y={y - 4}
                                            onEdit={() => openDrawer(g)}
                                            onInfo={() => alert(`Gate info: ${g.type}`)}
                                            onCut={() => removeGate(g.id)}
                                            onCopy={() => { }}
                                            onDelete={() => {
                                                removeGate(g.id);
                                                setSelectedId(null);
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 参数编辑抽屉 */}
            <GateParameterDrawer
                gate={currentGate}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSave={θ => currentGate && updateGate(currentGate.id, { params: [θ] })}
            />
        </>
    );
}
