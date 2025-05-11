
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
import { useState } from 'react';
import PaletteGate from '@/components/PaletteGate.jsx';
import { GATE_DEFS } from '@/constants/gates';

const colors = {
    foundation: 'bg-red-600',
    rotation: 'bg-pink-600',
    entangle: 'bg-blue-600',
};

const GATES = Object.entries(GATE_DEFS).map(([value, def]) => ({
    value,
    label: def.label,
    category: def.category,
    color: colors[def.category] || 'bg-gray-500',
}));

export default function GatePalette({ className = '' }) {
    const [searchKey, setSearchKey] = useState('');
    const [selectedGate, setSelectedGate] = useState(null);

    // Filter gates by search keyword
    const filtered = GATES.filter(g =>
        g.label.toLowerCase().includes(searchKey.toLowerCase())
    );

    // Detailed info for each gate in English
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

    return (
        <div className={`flex flex-col p-4 border-r bg-white ${className}`}>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search gates..."
                className="mb-4 w-full rounded border px-3 py-2 text-sm"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
            />

            {/* Gate Grid */}
            <div className="grid grid-cols-2 gap-3">
                {filtered.map(g => (
                    <PaletteGate
                        key={g.value}
                        value={g.value}
                        label={g.label}
                        className={`
              ${g.color}
              w-full py-3 rounded
              text-lg font-semibold text-center
              ${selectedGate === g.value ? 'ring-2 ring-indigo-500' : ''}
            `}
                        onClick={() =>
                            setSelectedGate(prev => (prev === g.value ? null : g.value))
                        }
                    />
                ))}
            </div>

            {/* Details Panel */}
            <div className="mt-6 p-4 border-t bg-gray-50 min-h-[6rem]">
                {selectedGate && GATE_INFO[selectedGate] ? (
                    <>
                        <h3 className="text-base font-semibold mb-2 text-black">
                            {GATE_INFO[selectedGate].title}
                        </h3>
                        <p className="text-sm mb-3 text-black">
                            {GATE_INFO[selectedGate].description}
                        </p>
                        <div className="text-xs text-black mb-1">
                            <strong>Usage:</strong> {GATE_INFO[selectedGate].usage}
                        </div>
                        <a
                            href={GATE_INFO[selectedGate].reference}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 underline"
                        >
                            More info
                        </a>
                    </>
                ) : (
                    <p className="text-sm text-gray-500">
                        Click a gate on the left to view its details.
                    </p>
                )}
            </div>
        </div>
    );
}
