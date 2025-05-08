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

    // Toolbar.jsx
    const handleBenchmark = async () => {
        const res = await fetch('http://127.0.0.1:8000/simulate_custom_circuit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exportCircuit()),
        }).catch(err => {
            alert('无法连接后端：' + err.message);
            throw err;
        });

        if (!res.ok) {
            const txt = await res.text();
            alert(`后端错误 ${res.status}:\n${txt}`);
            return;
        }
        const data = await res.json();
        alert(JSON.stringify(data, null, 2));
    };


    return (
        <div className="flex gap-2 mb-4">
            <button
                onClick={handleExport}
                className="px-4 py-2 bg-gray-200 rounded text-sm text-black"
            >
                Export JSON
            </button>

            <button
                onClick={handleBenchmark}
                className="px-4 py-2 bg-gray-200 rounded text-sm ml-2 text-black"
            >
                Run Benchmark
            </button>
        </div>
    );
}
