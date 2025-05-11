
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import GatePalette from '@/components/GatePalette';
// import CircuitToolbar from '@/components/Toolbar';
// import CircuitCanvas from '@/components/CircuitCanvas';
// import { useCircuit } from '@/contexts/CircuitContext';
// import GateDragLayer from '@/components/GateDragLayer.jsx';

// export default function QuantumCircuitBuilder() {
//   const { circuit } = useCircuit();


//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex h-full">
//         {/* 左侧 palette */}
//         <div className="w-1/6 border-r">
//           <GatePalette />
//         </div>

//         {/* 中部：工具条 + 画布 */}
//         <div className="flex flex-col flex-1">
//           <div className="border-b p-2">
//             <CircuitToolbar />
//           </div>
//           <CircuitCanvas />
//         </div>

//         {/* 右侧 JSON */}
//         <div className="w-1/6 border-l p-4 overflow-auto">
//           <h3 className="font-medium mb-2 text-gray-900">Circuit JSON</h3>
//           <pre className="text-xs whitespace-pre-wrap text-gray-900">
//             {JSON.stringify(circuit, null, 2)}
//           </pre>
//         </div>
//       </div>

//       <div className="flex h-full">
//         {/* …左侧 GatePalette / 右侧 CircuitCanvas 等 … */}
//         <GateDragLayer />   {/* ⬅︎ 仅需一次，全局拖影 */}
//       </div>
//     </DndProvider>
//   );
// }


// // src/pages/QuantumCircuitBuilder.jsx
// import { useState } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// import GatePalette from '@/components/GatePalette';
// import CircuitToolbar from '@/components/Toolbar';
// import CircuitCanvas from '@/components/CircuitCanvas';
// import GateDragLayer from '@/components/GateDragLayer';
// import { useCircuit } from '@/contexts/CircuitContext';
// import PreviewCanvas from '@/components/PreviewCanvas';
// import {
//   SAMPLE_DATASETS,
//   SAMPLE_ANSATZ,
//   SAMPLE_BASELINES,
// } from '@/constants/benchmarks';

// export default function QuantumCircuitBuilder() {
//   const { circuit } = useCircuit();

//   const [dataset, setDataset] = useState(SAMPLE_DATASETS[0]);
//   const [ansatz, setAnsatz] = useState(SAMPLE_ANSATZ[0]);
//   const [baseline, setBaseline] = useState(SAMPLE_BASELINES[0]);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex h-full">
//         {/* 左侧门库 */}
//         <div className="w-1/6 border-r bg-white">
//           <GatePalette />
//         </div>

//         {/* 中部编辑区 */}
//         <div className="flex flex-col flex-1 bg-white">
//           {/* 工具条 */}
//           <div className="border-b p-2">
//             <CircuitToolbar />
//           </div>

//           {/* 画布 (务必 relative) */}
//           <div
//             id="circuit-canvas"           /* ★ 供导出 PNG/SVG 使用 */
//             className="relative flex-1 overflow-auto"
//           >
//             <CircuitCanvas />
//           </div>

//           {/* Benchmark Overview */}
//           <div className="border-t bg-gray-50 p-4">
//             <h3 className="text-lg font-semibold mb-4 text-black">
//               Benchmark Overview
//             </h3>

//             {/* Dataset */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-black">
//                 Dataset
//               </label>
//               <select
//                 className="mt-1 w-full border rounded px-2 py-1 text-sm"
//                 value={dataset.id}
//                 onChange={e =>
//                   setDataset(SAMPLE_DATASETS.find(d => d.id === e.target.value))
//                 }
//               >
//                 {SAMPLE_DATASETS.map(d => (
//                   <option key={d.id} value={d.id}>{d.name}</option>
//                 ))}
//               </select>
//               <p className="mt-1 text-xs text-black">{dataset.description}</p>
//             </div>

//             {/* Ansatz */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-black">
//                 Ansatz
//               </label>
//               <select
//                 className="mt-1 w-full border rounded px-2 py-1 text-sm"
//                 value={ansatz.id}
//                 onChange={e =>
//                   setAnsatz(SAMPLE_ANSATZ.find(a => a.id === e.target.value))
//                 }
//               >
//                 {SAMPLE_ANSATZ.map(a => (
//                   <option key={a.id} value={a.id}>{a.name}</option>
//                 ))}
//               </select>
//               <p className="mt-1 text-xs text-black">{ansatz.description}</p>
//             </div>

//             {/* Baseline */}
//             <div>
//               <label className="block text-sm font-medium text-black">
//                 Baseline
//               </label>
//               <select
//                 className="mt-1 w-full border rounded px-2 py-1 text-sm"
//                 value={baseline.id}
//                 onChange={e =>
//                   setBaseline(SAMPLE_BASELINES.find(b => b.id === e.target.value))
//                 }
//               >
//                 {SAMPLE_BASELINES.map(b => (
//                   <option key={b.id} value={b.id}>{b.name}</option>
//                 ))}
//               </select>
//               <p className="mt-1 text-xs text-black">{baseline.description}</p>
//             </div>
//           </div>
//         </div>

//         {/* 右侧 JSON */}
//         <div className="w-1/6 border-l p-4 overflow-auto bg-white">
//           <h3 className="text-sm font-medium mb-2 text-black">Circuit JSON</h3>
//           <pre className="text-xs whitespace-pre-wrap text-black">
//             {JSON.stringify(circuit, null, 2)}
//           </pre>
//         </div>
//       </div>

//       {/* 自定义拖拽预览图层 */}
//       <GateDragLayer />
//     </DndProvider>
//   );
// }
// src/pages/QuantumCircuitBuilder.jsx
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import GatePalette from '@/components/GatePalette';
import CircuitToolbar from '@/components/Toolbar';
import CircuitCanvas from '@/components/CircuitCanvas';
import GateDragLayer from '@/components/GateDragLayer';
import { useCircuit } from '@/contexts/CircuitContext';

import {
  SAMPLE_DATASETS,
  SAMPLE_ANSATZ,
  SAMPLE_BASELINES,
} from '@/constants/benchmarks';

export default function QuantumCircuitBuilder() {
  const { circuit } = useCircuit();

  const [dataset, setDataset] = useState(SAMPLE_DATASETS[0]);
  const [ansatz, setAnsatz] = useState(SAMPLE_ANSATZ[0]);
  const [baseline, setBaseline] = useState(SAMPLE_BASELINES[0]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full">
        {/* ───── 左侧门库 ───── */}
        <div className="w-1/6 border-r bg-white">
          <GatePalette />
        </div>

        {/* ───── 中部 ───── */}
        <div className="flex flex-col flex-1 bg-white">
          {/* 工具条 */}
          <div className="border-b p-2">
            <CircuitToolbar />
          </div>

          {/* 主画布（relative 供 gate 定位） */}
          <div id="circuit-canvas" className="relative flex-1 overflow-auto">
            <CircuitCanvas />
          </div>

          {/* ★ 分割横线（2px 灰） */}
          <div className="border-t-2 border-gray-300" />

          {/* Benchmark Overview */}
          <div className="bg-gray-50 p-4">
            <h3 className="text-lg font-semibold mb-4 text-black">
              Benchmark Overview
            </h3>

            {/* Dataset */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Dataset</label>
              <select
                className="mt-1 w-full border rounded px-2 py-1 text-sm"
                value={dataset.id}
                onChange={e =>
                  setDataset(SAMPLE_DATASETS.find(d => d.id === e.target.value))
                }
              >
                {SAMPLE_DATASETS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-black">{dataset.description}</p>
            </div>

            {/* Ansatz */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Ansatz</label>
              <select
                className="mt-1 w-full border rounded px-2 py-1 text-sm"
                value={ansatz.id}
                onChange={e =>
                  setAnsatz(SAMPLE_ANSATZ.find(a => a.id === e.target.value))
                }
              >
                {SAMPLE_ANSATZ.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-black">{ansatz.description}</p>
            </div>

            {/* Baseline */}
            <div>
              <label className="block text-sm font-medium text-black">Baseline</label>
              <select
                className="mt-1 w-full border rounded px-2 py-1 text-sm"
                value={baseline.id}
                onChange={e =>
                  setBaseline(SAMPLE_BASELINES.find(b => b.id === e.target.value))
                }
              >
                {SAMPLE_BASELINES.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-black">{baseline.description}</p>
            </div>
          </div>
        </div>

        {/* ───── 右侧 JSON ───── */}
        <div className="w-1/6 border-l p-4 overflow-auto bg-white">
          <h3 className="text-sm font-medium mb-2 text-black">Circuit JSON</h3>
          <pre className="text-xs whitespace-pre-wrap text-black">
            {JSON.stringify(circuit, null, 2)}
          </pre>
        </div>
      </div>

      {/* 拖拽自定义预览层 */}
      <GateDragLayer />
    </DndProvider>
  );
}
