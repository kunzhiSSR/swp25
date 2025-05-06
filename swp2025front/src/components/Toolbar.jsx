import { useCircuit } from '@/contexts/CircuitContext';

export default function Toolbar() {
    const { exportCircuit } = useCircuit();   // 从 Context 拿电路 JSON

    /** 导出电路 → 触发下载 */
    const handleExport = () => {
        const blob = new Blob(
            [JSON.stringify(exportCircuit(), null, 2)],
            { type: 'application/json' },
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'circuit.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    /** 调后端 /simulate_custom_circuit 并把结果打印/提示 */
    const handleBenchmark = async () => {
        const res = await fetch('http://localhost:8000/simulate_custom_circuit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exportCircuit()),
        });
        const data = await res.json();
        alert(`Accuracy: ${data.accuracy}\nDepth: ${data.depth}\nTime: ${data.simulation_time}s`);
    };

    return (
        <div className="flex gap-2 mb-4">
            <button
                onClick={handleExport}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
                Export JSON
            </button>

            <button
                onClick={handleBenchmark}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
                Run Benchmark
            </button>
        </div>
    );
}
