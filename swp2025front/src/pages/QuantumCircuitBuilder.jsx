// // src/pages/QuantumCircuitBuilder.jsx
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import GatePalette from '../components/GatePalette';
// import CircuitCanvas from '../components/CircuitCanvas';
// import Toolbar from '../components/Toolbar';
// import { CircuitProvider } from '../contexts/CircuitContext';
// // import PennyLaneCircuit from '@/components/PennyLaneCircuit.jsx';

// export default function QuantumCircuitBuilder() {
//   const handleRun = () => {
//     console.log('Run benchmark…');
//   };
//   function CircuitBuilderPage() {
//     return (
//       <>
//         <h1 className="text-2xl font-bold mb-2">Quantum Circuit</h1>
//         <Toolbar />                     {/* 👈 新 Toolbar */}
//         <div className="flex">
//           <GatePalette />
//           <CircuitCanvas />
//           {/* <PennyLaneCircuit params={[0.8]} /> */}
//         </div>
//       </>
//     );
//   }
//   return (
//     <CircuitProvider>
//       <DndProvider backend={HTML5Backend}>
//         <div className="flex flex-col h-full">
//           <Toolbar onRun={handleRun} />
//           <div className="flex flex-1 overflow-hidden">
//             <GatePalette />
//             <CircuitCanvas />
//           </div>
//         </div>
//       </DndProvider>
//     </CircuitProvider>
//   );
// }


// // src/pages/QuantumCircuitBuilder.jsx
// import React, { useState, useRef, useEffect } from 'react'
// import { useCircuit } from '@/contexts/CircuitContext'
// import GatePalette from '@/components/GatePalette'
// import GateToolbar from '@/components/GateToolbar'
// import '@/index.css'  // 确保你的全局样式也被加载

// export default function QuantumCircuitBuilder() {
//   const { circuit } = useCircuit()
//   const editorRef = useRef(null)
//   const [circuitJson, setCircuitJson] = useState('')

//   // 把 React state 转成 QWC 所需的 JSON
//   useEffect(() => {
//     const json = {
//       qubits: circuit.qubits,
//       gates: circuit.gates.map(g => ({
//         name: g.type.toLowerCase(),
//         target: g.target,
//         timestep: g.timeStep,
//         params: g.params || [],
//         control: g.control || [],
//       })),
//     }
//     setCircuitJson(JSON.stringify(json))
//   }, [circuit])

//   // 示例：监听编辑器内部改动
//   useEffect(() => {
//     const el = editorRef.current
//     if (!el) return
//     const onChange = e => {
//       // e.detail.circuitJson 就是最新的 stringified JSON
//       console.log('Circuit changed →', e.detail.circuitJson)
//     }
//     el.addEventListener('circuit-change', onChange)
//     return () => el.removeEventListener('circuit-change', onChange)
//   }, [])

//   return (
//     <div className="flex h-full">
//       {/* 左侧：工具栏 + GatePalette */}
//       <div className="w-64 border-r bg-gray-50 p-2">
//         <GateToolbar />
//         <GatePalette className="mt-4" />
//       </div>

//       {/* 中间：量子电路编辑器 */}
//       <div className="flex-1 p-4 bg-white overflow-auto">
//         <quantum-circuit-editor
//           ref={editorRef}
//           qubits={circuit.qubits}
//           circuit-json={circuitJson}
//           style={{ width: '100%', height: '600px' }}
//         />
//       </div>

//       {/* 右侧：查看 JSON */}
//       <div className="w-64 border-l bg-gray-50 p-4">
//         <h2 className="font-bold mb-2">Circuit JSON</h2>
//         <pre className="text-xs bg-gray-100 p-2 rounded">{circuitJson}</pre>
//       </div>
//     </div>
//   )
// }


// // src/pages/QuantumCircuitBuilder.jsx
// import React from "react";
// import GatePalette from "@/components/GatePalette";
// import CircuitToolbar from "@/components/Toolbar";
// import CircuitCanvas from "@/components/CircuitCanvas";
// import { useCircuit } from "@/contexts/CircuitContext";

// export default function QuantumCircuitBuilder() {
//   const { circuit } = useCircuit();

//   return (
//     <div className="flex h-full">
//       {/* 左侧：gate 按钮面板 */}
//       <div className="w-1/6 border-r">
//         <GatePalette />
//       </div>

//       {/* 中央：工具栏 + 画布 */}
//       <div className="flex flex-col flex-1">
//         <div className="border-b p-2">
//           <CircuitToolbar />
//         </div>
//         <div className="flex-1 overflow-auto">
//           <CircuitCanvas />
//         </div>
//       </div>

//       {/* 右侧：JSON 展示 */}
//       <div className="w-1/6 border-l p-4 bg-black">
//         <h3 className="font-medium mb-2">Circuit JSON</h3>
//         <pre className="text-xs">{JSON.stringify(circuit, null, 2)}</pre>
//       </div>
//     </div>
//   );
// }


// src/pages/QuantumCircuitBuilder.jsx
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GatePalette from '@/components/GatePalette';
import CircuitToolbar from '@/components/Toolbar';
import CircuitCanvas from '@/components/CircuitCanvas';
import { useCircuit } from '@/contexts/CircuitContext';
import GateDragLayer from '@/components/GateDragLayer.jsx';

export default function QuantumCircuitBuilder() {
  const { circuit } = useCircuit();


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full">
        {/* 左侧 palette */}
        <div className="w-1/6 border-r">
          <GatePalette />
        </div>

        {/* 中部：工具条 + 画布 */}
        <div className="flex flex-col flex-1">
          <div className="border-b p-2">
            <CircuitToolbar />
          </div>
          <CircuitCanvas />
        </div>

        {/* 右侧 JSON */}
        <div className="w-1/6 border-l p-4 overflow-auto">
          <h3 className="font-medium mb-2 text-gray-900">Circuit JSON</h3>
          <pre className="text-xs whitespace-pre-wrap text-gray-900">
            {JSON.stringify(circuit, null, 2)}
          </pre>
        </div>
      </div>

      <div className="flex h-full">
        {/* …左侧 GatePalette / 右侧 CircuitCanvas 等 … */}
        <GateDragLayer />   {/* ⬅︎ 仅需一次，全局拖影 */}
      </div>
    </DndProvider>
  );
}
