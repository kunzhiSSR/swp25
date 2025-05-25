// import { useState } from 'react';
// import PaletteGate from '@/components/PaletteGate.jsx';
// import { GATE_DEFS } from '@/constants/gates';

// const colors = {
//     foundation: 'bg-red-600',
//     rotation: 'bg-pink-600',
//     entangle: 'bg-blue-600'
// };

// const GATES = Object.entries(GATE_DEFS).map(([v, def]) => ({
//     value: v,
//     label: def.label,
//     category: def.category,
//     color: colors[def.category]
// }));

// export default function GatePalette({ className = '' }) {
//     const [kw, setKw] = useState('');

//     const list = GATES.filter(g =>
//         g.label.toLowerCase().includes(kw.toLowerCase())
//     );

//     return (
//         <div className={`p-4 border-r ${className}`}>
//             {/* 搜索框 */}
//             <input
//                 type="text"
//                 placeholder="Search…"
//                 value={kw}
//                 onChange={e => setKw(e.target.value)}
//                 className="mb-4 w-full rounded border px-3 py-1 text-sm"
//             />

//             {/* 两列网格 */}
//             <div className="grid grid-cols-2 gap-3">
//                 {list.map(g => (
//                     <PaletteGate
//                         key={g.value}
//                         value={g.value}
//                         label={g.label}
//                         className={`${g.color} w-full py-3`}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// src/components/GatePalette.jsx
import { useState, useRef, useEffect } from 'react';
import PaletteGate from '@/components/PaletteGate.jsx';
import { GATE_DEFS } from '@/constants/gates';

// 修改量子门的颜色映射，使用与图片一致的颜色
const gateColors = {
    H: 'bg-blue-500',
    X: 'bg-red-500',
    Y: 'bg-orange-500',
    Z: 'bg-purple-500',
    RX: 'bg-green-500',
    RY: 'bg-teal-500',
    RZ: 'bg-blue-600',
    CNOT: 'bg-indigo-500',
    CZ: 'bg-purple-600',
    SWAP: 'bg-pink-500'
};

// 悬浮提示组件
const GateInfoTooltip = ({ gate, onClose }) => {
    if (!gate) return null;

    // 每个门的详细信息
    const GATE_INFO = {
        H: {
            title: 'Hadamard Gate (H)',
            description: 'Creates a superposition: H|0> = (|0> + |1>)/√2, H|1> = (|0> - |1>)/√2.',
            usage: 'OpenQASM: h q[0];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.HGate.html'
        },
        X: {
            title: 'Pauli-X Gate (X)',
            description: 'Flips the qubit state: X|0> = |1>, X|1> = |0>.',
            usage: 'OpenQASM: x q[0];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.XGate.html'
        },
        Y: {
            title: 'Pauli-Y Gate (Y)',
            description: 'Applies a π rotation around the Y-axis.',
            usage: 'OpenQASM: y q[0];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.YGate.html'
        },
        Z: {
            title: 'Pauli-Z Gate (Z)',
            description: 'Applies a π rotation around the Z-axis.',
            usage: 'OpenQASM: z q[0];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.ZGate.html'
        },
        RX: {
            title: 'RX Gate',
            description: 'Rotates the qubit around the X-axis by angle θ.',
            usage: 'OpenQASM: rx(theta) q[0];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.RXGate.html'
        },
        RY: {
            title: 'RY Gate',
            description: 'Rotates the qubit around the Y-axis by angle θ.',
            usage: 'OpenQASM: ry(theta) q[0];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.RYGate.html'
        },
        RZ: {
            title: 'RZ Gate',
            description: 'Rotates the qubit around the Z-axis by angle θ.',
            usage: 'OpenQASM: rz(theta) q[0];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.RZGate.html'
        },
        CNOT: {
            title: 'Controlled-NOT Gate (CNOT)',
            description: 'Flips the target qubit if the control qubit is in state |1>.',
            usage: 'OpenQASM: cx q[0],q[1];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.CXGate.html'
        },
        CZ: {
            title: 'Controlled-Z Gate (CZ)',
            description: 'Applies Z to the target qubit if the control qubit is |1>.',
            usage: 'OpenQASM: cz q[0],q[1];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.CZGate.html'
        },
        SWAP: {
            title: 'SWAP Gate',
            description: 'Exchanges the states of two qubits.',
            usage: 'OpenQASM: swap q[0],q[1];',
            reference: 'https://qiskit.org/documentation/stubs/qiskit.circuit.library.SwapGate.html'
        },
    };

    const info = GATE_INFO[gate];
    if (!info) return null;

    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-lg p-3 z-50 w-64">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-semibold text-black">{info.title}</h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none text-lg leading-none"
                >
                    ×
                </button>
            </div>
            <p className="text-sm mb-3 text-black">{info.description}</p>
            <div className="text-xs text-black mb-1">
                <strong>Usage:</strong> {info.usage}
            </div>
            <a
                href={info.reference}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 underline"
            >
                More info
            </a>
        </div>
    );
};

export default function GatePalette({ className = '' }) {
    const [selectedGate, setSelectedGate] = useState(null);
    const containerRef = useRef(null);

    // 处理点击门事件
    const handleGateClick = (e) => {
        const gate = e.currentTarget.dataset.type;
        if (!gate) return;

        // 如果点击了当前选中的门，则取消选择
        if (selectedGate === gate) {
            setSelectedGate(null);
        } else {
            setSelectedGate(gate);
        }
    };

    // 点击其他区域关闭悬浮窗
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectedGate &&
                containerRef.current &&
                !event.target.closest('.gate-info-tooltip') &&
                !event.target.closest('[data-type]')) {
                setSelectedGate(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedGate]);

    // 从GATE_DEFS获取所有门
    const gates = Object.entries(GATE_DEFS).map(([value, def]) => ({
        value,
        label: def.label
    }));

    return (
        <div className={`flex flex-col p-2 relative ${className}`} ref={containerRef}>
            {/* 门网格 - 使用grid布局 */}
            <div className="grid grid-cols-2 gap-4">
                {gates.map(gate => (
                    <div key={gate.value} className="flex flex-col items-center">
                        {/* 每个门的容器 - 添加白色背景和边框 */}
                        <div className="w-full bg-white border border-gray-200 rounded-md p-2 flex flex-col items-center">
                            <PaletteGate
                                value={gate.value}
                                label={gate.value}
                                className={`${gateColors[gate.value]} w-12 h-12 flex items-center justify-center rounded-md shadow-sm text-white`}
                                onClick={handleGateClick}
                            />
                            {/* 门的名称标签 */}
                            <div className="mt-1 text-xs text-gray-700">{gate.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 中央悬浮窗 - 使用绝对定位并覆盖整个区域 */}
            {selectedGate && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-5 z-50 gate-info-tooltip">
                    <GateInfoTooltip
                        gate={selectedGate}
                        onClose={() => setSelectedGate(null)}
                    />
                </div>
            )}
        </div>
    );
}
