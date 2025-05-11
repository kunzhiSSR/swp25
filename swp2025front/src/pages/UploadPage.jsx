// src/pages/UploadPage.jsx
import React, { useState } from 'react';
import CircuitCanvas from '@/components/CircuitCanvas.jsx'; // 你已有的只读画布
import { useCircuit } from '@/contexts/CircuitContext.jsx';

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
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Quantum Circuit</h2>
      <input type="file" accept=".json" onChange={handleFile} className="mb-4" />
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {/* 只读静态渲染：CircuitCanvas 挂到 Context 里刚才替换后的电路 */}
      <div className="border p-4">
        <CircuitCanvas readOnly={true} />
      </div>
    </div>
  );
}
