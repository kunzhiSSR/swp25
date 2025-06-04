import { GRID } from './CircuitCanvas.jsx';
import Gate from './Gate.jsx';

export default function PreviewCanvas({ circuit }) {
    if (!circuit) return null;

    return (
        <div
            className="relative border rounded bg-white"
            style={{ height: circuit.qubits * GRID + GRID, minWidth: 300 }}
        >
            {/* 量子线 */}
            {Array.from({ length: circuit.qubits }).map((_, r) => (
                <div
                    key={r}
                    className="absolute left-0 flex items-center w-full"
                    style={{ top: r * GRID + GRID / 2 }}
                >
                    <div style={{ flex: 1, borderTop: '1px solid #bdbdbd' }} />
                </div>
            ))}

            {/* Gate（只读） */}
            {circuit.gates.map(g => (
                <Gate key={g.id} gate={g} readOnly />
            ))}
        </div>
    );
}
