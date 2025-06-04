// src/constants/benchmarks.js
export const SAMPLE_DATASETS = [
    { id: 'ds1', name: 'Dataset A', description: 'Dataset A description: …' },
    { id: 'ds2', name: 'Dataset B', description: 'Dataset B description: …' },
];

export const SAMPLE_ANSATZ = [
    {
        id: 'ans1',
        name: 'Hardware-Efficient Ansatz',
        description: 'Alternating RX/RZ layers suited for hardware.',
        circuit: { qubits: 4, gates: [ /* ... */] },
    },
    {
        id: 'ans2',
        name: 'QAOA Ansatz',
        description: 'Used for approximate optimization problems.',
        circuit: { qubits: 4, gates: [ /* ... */] },
    },
];

export const SAMPLE_BASELINES = [
    {
        id: 'bl1',
        name: 'Identity Baseline',
        description: 'No gates; identity operation.',
        circuit: { qubits: 4, gates: [] },
    },
    {
        id: 'bl2',
        name: 'Single-H Baseline',
        description: 'Hadamard on qubit 0 only.',
        circuit: { qubits: 4, gates: [{ id: 'h0', type: 'H', target: [0], timeStep: 0 }] },
    },
];
