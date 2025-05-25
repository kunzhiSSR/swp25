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
import { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Code, Play, Save, Edit } from 'lucide-react';

import GatePalette from '@/components/GatePalette';
import CircuitCanvas from '@/components/CircuitCanvas';
import GateDragLayer from '@/components/GateDragLayer';
import { useCircuit } from '@/contexts/CircuitContext';
import { GATE_DEFS } from '@/constants/gates';

// 定义门的属性信息（简化版）
const GATE_INFO = {
  H: {
    name: 'Hadamard Gate',
    description: 'Creates quantum superposition. Transforms |0⟩ to |+⟩ and |1⟩ to |-⟩',
    matrix: '1/√2 * [[1, 1], [1, -1]]'
  },
  X: {
    name: 'Pauli-X Gate',
    description: 'Quantum bit flip gate, similar to classical NOT gate',
    matrix: '[[0, 1], [1, 0]]'
  },
  Y: {
    name: 'Pauli-Y Gate',
    description: 'Rotation around Y-axis by π',
    matrix: '[[0, -i], [i, 0]]'
  },
  Z: {
    name: 'Pauli-Z Gate',
    description: 'Phase flip gate, transforms |1⟩ to -|1⟩',
    matrix: '[[1, 0], [0, -1]]'
  },
  RX: {
    name: 'RX Gate',
    description: 'Rotation around X-axis by angle θ',
    matrix: '[[cos(θ/2), -isin(θ/2)], [-isin(θ/2), cos(θ/2)]]',
    params: [{ name: 'θ', default: 0 }]
  },
  RY: {
    name: 'RY Gate',
    description: 'Rotation around Y-axis by angle θ',
    matrix: '[[cos(θ/2), -sin(θ/2)], [sin(θ/2), cos(θ/2)]]',
    params: [{ name: 'θ', default: 0 }]
  },
  RZ: {
    name: 'RZ Gate',
    description: 'Rotation around Z-axis by angle θ',
    matrix: '[[e^(-iθ/2), 0], [0, e^(iθ/2)]]',
    params: [{ name: 'θ', default: 0 }]
  },
  CNOT: {
    name: 'Controlled-NOT Gate',
    description: 'Flips the target qubit if the control qubit is 1',
    matrix: '[[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]]'
  },
  CZ: {
    name: 'Controlled-Z Gate',
    description: 'Applies Z gate to target qubit if control qubit is 1',
    matrix: '[[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, -1]]'
  },
  SWAP: {
    name: 'SWAP Gate',
    description: 'Exchanges the states of two qubits',
    matrix: '[[1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 1]]'
  }
};

// Gate Properties 组件
const GateProperties = ({ selectedGate, updateGateParam }) => {
  if (!selectedGate) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center p-4 text-gray-500 text-sm">
        <p>Wählen Sie ein Gate aus um dessen Eigenschaften zu bearbeiten</p>
      </div>
    );
  }

  const gateInfo = GATE_INFO[selectedGate.type] || {};
  const hasParams = selectedGate.params && selectedGate.params.length > 0 && gateInfo.params;

  return (
    <div className="p-3">
      <h3 className="font-medium text-gray-800 mb-2">{gateInfo.name || selectedGate.type}</h3>

      {gateInfo.description && (
        <p className="text-xs text-gray-600 mb-3">{gateInfo.description}</p>
      )}

      {selectedGate.target && (
        <div className="mb-2 text-xs text-gray-700">
          <span className="font-medium">Target Qubits:</span> {selectedGate.target.join(', ')}
        </div>
      )}

      {selectedGate.control && (
        <div className="mb-3 text-xs text-gray-700">
          <span className="font-medium">Control Qubits:</span> {selectedGate.control.join(', ')}
        </div>
      )}

      {hasParams && (
        <div className="mt-3 border-t border-gray-300 pt-3">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Parameters:</h4>
          {gateInfo.params.map((param, idx) => (
            <div key={idx} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{param.name}</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="6.28"
                  step="0.01"
                  value={selectedGate.params[idx] || 0}
                  onChange={(e) => updateGateParam(idx, parseFloat(e.target.value))}
                  className="flex-1 mr-3 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="number"
                  min="0"
                  max="6.28"
                  step="0.01"
                  value={selectedGate.params[idx] || 0}
                  onChange={(e) => updateGateParam(idx, parseFloat(e.target.value))}
                  className="w-20 border-2 border-gray-400 rounded px-2 py-1 text-sm font-medium text-gray-800 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function QuantumCircuitBuilder() {
  const { exportCircuit, updateGate } = useCircuit();
  const [encodingName, setEncodingName] = useState('Amplitude Encoding');
  const [qubits, setQubits] = useState('4 Qubits');
  const [selectedGate, setSelectedGate] = useState(null);
  const canvasRef = useRef(null);

  // 更新门参数的函数
  const updateGateParam = (paramIndex, value) => {
    if (!selectedGate || !selectedGate.params) return;

    const newParams = [...selectedGate.params];
    newParams[paramIndex] = value;

    updateGate(selectedGate.id, { params: newParams });
    setSelectedGate({ ...selectedGate, params: newParams });
  };

  // 处理电路图上门的点击事件
  const handleGateSelect = (gate) => {
    setSelectedGate(gate);
  };

  // JSON显示函数
  const showJSON = () => {
    alert(JSON.stringify(exportCircuit(), null, 2));
  };

  // 模拟函数
  const simulateCircuit = async () => {
    try {
      const r = await fetch('http://127.0.0.1:8000/simulate_custom_circuit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exportCircuit())
      });
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      const data = await r.json();
      alert(JSON.stringify(data, null, 2));
    } catch (e) {
      alert('Simulation failed: ' + e.message);
    }
  };

  // 保存函数
  const saveCircuit = () => {
    const blob = new Blob([JSON.stringify(exportCircuit(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circuit.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full">
        {/* 顶部标题和按钮区 - 调整样式与侧边栏一致 */}
        <div className="flex justify-between items-center p-1 mb-7 bg-white shadow-sm border-b border-gray-300 h-2">
          <h1 className="text-lg font-bold text-gray-800">Visual Circuit Designer</h1>
          <div className="flex space-x-2">
            <button
              onClick={showJSON}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              <Code size={16} />
              <span>JSON</span>
            </button>
            <button
              onClick={simulateCircuit}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              <Play size={16} />
              <span>Simulieren</span>
            </button>
            <button
              onClick={saveCircuit}
              className="flex items-center gap-2 bg-gray-800 text-white rounded px-3 py-1 text-sm font-medium hover:bg-gray-700"
            >
              <Save size={16} />
              <span>Speichern</span>
            </button>
          </div>
        </div>

        {/* 主要内容区 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 左侧面板：电路信息、门库、属性面板 */}
          <div className="w-[320px] flex flex-col mr-2 space-y-2 h-full overflow-auto">
            {/* 电路信息 - 调整大小更匹配图片 */}
            <div className="border-2 border-black p-3 rounded-md bg-white overflow-auto h-[250px]" style={{ resize: 'vertical', minHeight: '150px' }}>
              <h3 className="text-sm font-bold mb-2 text-gray-800">Circuit Info</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Encoding Name</label>
                  <input
                    type="text"
                    value={encodingName}
                    onChange={(e) => setEncodingName(e.target.value)}
                    className="w-full border rounded-md px-2 py-1 text-sm text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Anzahl Qubits</label>
                  <select
                    value={qubits}
                    onChange={(e) => setQubits(e.target.value)}
                    className="w-full border rounded-md px-2 py-1 text-sm appearance-none bg-white text-gray-800"
                  >
                    <option>4 Qubits</option>
                    <option>5 Qubits</option>
                    <option>6 Qubits</option>
                    <option>7 Qubits</option>
                    <option>8 Qubits</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 门库 - 彻底解决重叠问题 */}
            <div className="border-2 border-black p-3 rounded-md bg-white h-[670px] relative" style={{ minHeight: '400px' }}>
              <h3 className="text-sm font-bold mb-2 text-gray-800">Gate Palette</h3>

              {/* 可滚动的门容器，增加padding-bottom确保底部不会被文本遮挡 */}
              <div className="overflow-auto h-[530px] pb-6">
                <GatePalette className="h-full" />
              </div>

              {/* 固定在底部的文本 */}
              <div className="absolute bottom-2 left-0 right-0 text-xs text-gray-500 text-center bg-white border-t border-gray-100 pt-1">
                Drag & Drop Gates auf den Circuit
              </div>
            </div>

            {/* 门属性 - 调整大小更匹配图片 */}
            <div className="border-2 border-black p-3 rounded-md bg-white overflow-auto h-[280px]" style={{ resize: 'vertical', minHeight: '180px' }}>
              <h3 className="text-sm font-bold mb-2 text-gray-800">Gate Properties</h3>
              <GateProperties selectedGate={selectedGate} updateGateParam={updateGateParam} />
            </div>
          </div>

          {/* 右侧：电路设计区 */}
          <div className="flex-1 flex flex-col">
            {/* 电路区域 - 整个区域可调整大小 */}
            <div className="border-2 border-black rounded-md flex-1 flex flex-col overflow-hidden resize" style={{ resize: 'both', minWidth: '750px', minHeight: '400px' }}>
              {/* 标题区域 */}
              <div className="p-3 border-b flex items-center bg-gray-50">
                <Edit className="w-5 h-5 mr-2 text-gray-700" />
                <h2 className="text-lg font-medium text-gray-800">Circuit Designer</h2>
              </div>

              {/* 电路画布区域 */}
              <div className="flex-1 bg-white overflow-auto" ref={canvasRef}>
                <div
                  id="circuit-canvas"
                  className="h-full w-full"
                >
                  <CircuitCanvas onSelectGate={handleGateSelect} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 拖拽层 */}
      <GateDragLayer />
    </DndProvider>
  );
}
