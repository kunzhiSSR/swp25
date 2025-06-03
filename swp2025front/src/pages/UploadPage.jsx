// src/pages/UploadPage.jsx
import React, { useState } from 'react';
import CircuitCanvas from '@/components/CircuitCanvas.jsx'; // 你已有的只读画布
import { useCircuit } from '@/contexts/CircuitContext.jsx';
import { FiUploadCloud } from 'react-icons/fi';

export default function UploadPage() {
  const { replaceCircuit } = useCircuit();
  const [error, setError] = useState(null);

  const handleFile = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const obj = JSON.parse(text);
      if (typeof obj.qubits !== 'number' || !Array.isArray(obj.gates))
        throw new Error('Invalid format');
      replaceCircuit(obj);   // 写入 Context
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-row bg-gray-70 py-1 px-0 mx-auto overflow-x-hidden overflow-y-hidden w-[1600px] h-[2100px]">
      {/* 左侧上传卡片 */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200 w-[450px] h-[1050px]">
        <h2 className="text-2xl font-bold text-black text-center mb-2">Encoding hochladen</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center mb-4 bg-gray-50 w-[400px] h-[250px]">
          <FiUploadCloud className="text-2xl text-gray-400 mb-2" />
          <div className=" text-smfont-medium text-gray-900 ">Quantum Encoding hochladen</div>
          <label className="inline-block">
            <input type="file" accept=".json" onChange={handleFile} className="hidden" />
            <span className="inline-block px-9 py-2 p-2 bg-black text-white rounded-md cursor-pointer font-semibold text-base transition hover:bg-gray-800">
              Datei auswählen
            </span>
          </label>œ
          <div className="text-xs text-gray-500 mb-4 text-center">
            Ziehen Sie Ihre JSON-Datei hierher oder klicken Sie zum Auswählen
          </div>
        </div>
        {/* 错误提示 */}
        {error && <div className="text-red-600 text-center mb-2 font-medium">{error}</div>}
        {/* 格式说明代码块 */}
        <pre className="bg-gray-100 rounded-md p-4 text-xs text-gray-700 overflow-x-auto border border-gray-200 w-[400px] h-[650px]">
          {`{
  "qubits": 4,
  "gates": [
    { "type": "H", "target": [0] },
    { "type": "X", "target": [1] },
    { "type": "CNOT", "control": [1], "target": [2] }
  ]
}`}
        </pre>
      </div>
      {/* 右侧电路图卡片 */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200 flex-1 min-w-0 w-[650px] h-[1050px] ml-8">
        <h3 className="text-lg font-semibold text-black mb-4">Schaltkreis-Visualisierung</h3>
        <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 h-full overflow-auto">
          <CircuitCanvas readOnly={true} />
        </div>
      </div>
    </div>
  );
}
