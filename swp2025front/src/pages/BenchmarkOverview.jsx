// src/pages/BenchmarkOverview.jsx
import React, { useState } from 'react';
import CircuitCanvas from '@/components/CircuitCanvas.jsx';
import { SAMPLE_DATASETS, SAMPLE_ANSATZ, SAMPLE_BASELINES } from '@/constants/benchmarks';

export default function BenchmarkOverview() {
  const [dataset, setDataset] = useState(SAMPLE_DATASETS[0]);
  const [ansatz, setAnsatz] = useState(SAMPLE_ANSATZ[0]);
  const [baseline, setBaseline] = useState(SAMPLE_BASELINES[0]);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Benchmark Overview</h2>

      {/* 选择数据集 */}
      <div>
        <label className="font-medium">Dataset:</label>
        <select
          className="ml-2 border px-2 py-1"
          value={dataset.id}
          onChange={e => setDataset(SAMPLE_DATASETS.find(d => d.id === e.target.value))}
        >
          {SAMPLE_DATASETS.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <p className="mt-1 text-gray-700">{dataset.description}</p>
      </div>

      {/* 选择 Ansätze */}
      <div>
        <label className="font-medium">Ansatz:</label>
        <select
          className="ml-2 border px-2 py-1"
          value={ansatz.id}
          onChange={e => setAnsatz(SAMPLE_ANSATZ.find(a => a.id === e.target.value))}
        >
          {SAMPLE_ANSATZ.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        <p className="mt-1 text-gray-700">{ansatz.description}</p>
        <div className="mt-2 border p-2">
          {/* 复用静态画布，渲染该 ansatz 的电路结构 */}
          <CircuitCanvas initialCircuit={ansatz.circuit} readOnly />
        </div>
      </div>

      {/* 选择 Baseline */}
      <div>
        <label className="font-medium">Baseline:</label>
        <select
          className="ml-2 border px-2 py-1"
          value={baseline.id}
          onChange={e => setBaseline(SAMPLE_BASELINES.find(b => b.id === e.target.value))}
        >
          {SAMPLE_BASELINES.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <p className="mt-1 text-gray-700">{baseline.description}</p>
        <div className="mt-2 border p-2">
          <CircuitCanvas initialCircuit={baseline.circuit} readOnly />
        </div>
      </div>
    </div>
  );
}
