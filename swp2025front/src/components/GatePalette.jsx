import PaletteGate from '@/components/PaletteGate.jsx';
const GATES = ['H', 'X', 'Y', 'Z', 'RX', 'RY', 'RZ', 'CNOT', 'CZ'];



export default function GatePalette() {
    return (
        <div className="space-y-2 p-2 border-r w-32">
            {GATES.map((g) => <PaletteGate key={g} label={g} />)}
        </div>
    );
}
