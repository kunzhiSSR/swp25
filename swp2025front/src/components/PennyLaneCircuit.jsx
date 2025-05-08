// // src/components/PennyLaneCircuit.jsx
// import React, { useEffect, useRef } from 'react';
// import { Circuit } from 'react-quantum-circuit';
// import * as qml from 'pennylane-js';

// export default function PennyLaneCircuit({ params = [0.543] }) {
//     const qasmRef = useRef("");

//     useEffect(() => {
//         // 1) 在浏览器里用 pennylane-js 创建一个 QNode
//         const dev = new qml.device("default.qubit", { wires: 3 });
//         const circuit = new qml.QNode(
//             ({ theta }) => {
//                 qml.Hadamard({ wires: [0] }); å
//                 qml.CNOT({ wires: [0, 1] });
//                 qml.RX({ params: [theta], wires: [2] });
//                 return qml.expval(qml.PauliZ(2));
//             },
//             dev
//         );

//         // 2) 序列化成 OpenQASM
//         //    pennylane-js 里有个 toQASM() —— 如果没有，可以自己手动从 circuit.ops 里生成
//         const qasm = qml.toOpenQASM(circuit);
//         qasmRef.current = qasm;
//     }, [params]);

//     if (!qasmRef.current) {
//         return <div>Loading circuit…</div>;
//     }

//     // 3) 交给 react-quantum-circuit 来渲染
//     return (
//         <div className="p-4 bg-background">
//             <Circuit
//                 qasm={qasmRef.current}
//                 options={{
//                     cellWidth: 40,
//                     cellHeight: 40,
//                     gateColor: "#5C6AC4",
//                 }}
//             />
//         </div>
//     );
// }
