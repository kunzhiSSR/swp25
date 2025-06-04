import { create } from 'zustand';

export interface Gate {
    id: string;
    type: string;
    target: number[];
    control?: number;
    params?: number[];
    from_input?: boolean;
    timeStep: number;
}

interface CircuitState {
    circuit: { qubits: number; gates: Gate[] };
    updateGate: (id: string, updates: Partial<Gate>) => void;
}

export const useCircuitStore = create<CircuitState>((set) => ({
    circuit: { qubits: 5, gates: [] },
    updateGate: (id, updates) =>
        set((state) => ({
            circuit: {
                ...state.circuit,
                gates: state.circuit.gates.map((g) =>
                    g.id === id ? { ...g, ...updates } : g
                ),
            },
        })),
}));
