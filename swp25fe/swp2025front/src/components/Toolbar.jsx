// import { useCircuit } from '@/contexts/CircuitContext';

// export default function Toolbar() {
//     const { exportCircuit } = useCircuit();   // 从 Context 拿电路 JSON

//     /** 导出电路 → 触发下载 */
//     const handleExport = () => {
//         const blob = new Blob(
//             [JSON.stringify(exportCircuit(), null, 2)],
//             { type: 'application/json' },
//         );
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'circuit.json';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     // Toolbar.jsx
//     const handleBenchmark = async () => {
//         const res = await fetch('http://127.0.0.1:8000/simulate_custom_circuit', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(exportCircuit()),
//         }).catch(err => {
//             alert('无法连接后端：' + err.message);
//             throw err;
//         });

//         if (!res.ok) {
//             const txt = await res.text();
//             alert(`后端错误 ${res.status}:\n${txt}`);
//             return;
//         }
//         const data = await res.json();
//         alert(JSON.stringify(data, null, 2));
//     };


//     return (
//         <div className="flex gap-2 mb-4">
//             <button
//                 onClick={handleExport}
//                 className="px-4 py-2 bg-gray-200 rounded text-sm text-black"
//             >
//                 Export JSON
//             </button>

//             <button
//                 onClick={handleBenchmark}
//                 className="px-4 py-2 bg-gray-200 rounded text-sm ml-2 text-black"
//             >
//                 Run Benchmark
//             </button>
//         </div>
//     );
// }


// import { toPng, toSvg } from 'html-to-image';
// import { useCircuit } from '@/contexts/CircuitContext';

// /* 通用下载 */
// const save = (data, name, mime) => {
//     const href =
//         typeof data === 'string'
//             ? data
//             : URL.createObjectURL(new Blob([data], { type: mime }));
//     const a = document.createElement('a');
//     a.href = href;
//     a.download = name;
//     a.click();
// };

// export default function Toolbar() {
//     const { exportCircuit } = useCircuit();

//     /* ---------- 导出 ---------- */
//     const exportJSON = () =>
//         save(
//             JSON.stringify(exportCircuit(), null, 2),
//             'circuit.json',
//             'application/json'
//         );

//     const exportImage = async type => {
//         const node = document.getElementById('circuit-canvas');
//         if (!node) return alert('Canvas not found');

//         if (type === 'png') {
//             const url = await toPng(node);
//             save(await (await fetch(url)).blob(), 'circuit.png', 'image/png');
//         } else {
//             const url = await toSvg(node);
//             save(url, 'circuit.svg', 'image/svg+xml');
//         }
//     };

//     /* ---------- Benchmark ---------- */
//     const runBenchmark = async () => {
//         try {
//             const r = await fetch(
//                 'http://127.0.0.1:8000/simulate_custom_circuit',
//                 {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(exportCircuit())
//                 }
//             );
//             if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
//             const data = await r.json();
//             alert(JSON.stringify(data, null, 2));
//         } catch (e) {
//             alert('Benchmark failed: ' + e.message);
//         }
//     };

//     /* ---------- 纯样式组件 ---------- */
//     const PrimaryBtn = props => (
//         <button
//             {...props}
//             className="rounded bg-indigo-600 px-5 py-2 font-semibold text-white shadow hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />
//     );

//     const GhostBtn = props => (
//         <button
//             {...props}
//             className="rounded border border-gray-300 bg-white px-5 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
//         />
//     );

//     return (
//         <div className="flex flex-wrap gap-4 p-4 border-b bg-white">
//             <GhostBtn onClick={exportJSON}>Export JSON</GhostBtn>

//             <PrimaryBtn onClick={() => exportImage('png')}>Export PNG</PrimaryBtn>
//             <PrimaryBtn onClick={() => exportImage('svg')}>Export SVG</PrimaryBtn>

//             <PrimaryBtn onClick={runBenchmark}>Run Benchmark</PrimaryBtn>
//         </div>
//     );
// }


import { useRef } from 'react';
import { toPng, toSvg } from 'html-to-image';
import { useCircuit } from '@/contexts/CircuitContext';

/* 下载工具 */
function save(data, name, mime) {
    const href =
        typeof data === 'string'
            ? data
            : URL.createObjectURL(new Blob([data], { type: mime }));
    const a = document.createElement('a');
    a.href = href;
    a.download = name;
    a.click();
}

export default function Toolbar() {
    const fileRef = useRef(null);
    const {
        exportCircuit,
        replaceCircuit         /* ← 用于导入 */
    } = useCircuit();

    /* ---------- 导出 ---------- */
    const exportJSON = () => {
        // 1. 从 Context 里拿到纯 JS 对象
        const data = exportCircuit();
        // 2. Pretty-print 成字符串
        const text = JSON.stringify(data, null, 2);
        // 3. 用 Blob 包装，并给出正确的 MIME type
        const blob = new Blob([text], { type: 'application/json' });
        // 4. 生成临时 URL 并点击下载
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'circuit.json';
        a.click();
        // 5. 释放 URL，防止内存泄露
        URL.revokeObjectURL(url);
    };

    const exportImg = async type => {
        const node = document.getElementById('circuit-canvas');
        if (!node) return alert('Canvas element not found');

        if (type === 'png') {
            const url = await toPng(node);
            save(await (await fetch(url)).blob(), 'circuit.png', 'image/png');
        } else {
            const url = await toSvg(node);
            save(url, 'circuit.svg', 'image/svg+xml');
        }
    };

    /* ---------- 导入 ---------- */
    const handleFile = async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const text = await file.text();
            const obj = JSON.parse(text);

            /* 基础 schema 校验 */
            if (typeof obj.qubits !== 'number' || !Array.isArray(obj.gates))
                throw new Error('Invalid schema: need { qubits:number, gates:[] }');

            replaceCircuit(obj);
        } catch (err) {
            alert('Import failed: ' + err.message);
        } finally {
            e.target.value = ''; // 允许重复导入同一文件
        }
    };

    /* ---------- Benchmark ---------- */
    const runBenchmark = async () => {
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
            alert('Benchmark failed: ' + e.message);
        }
    };

    /* ---------- 样式按钮 ---------- */
    const Btn = ({ children, variant = 'primary', ...rest }) => {
        const style =
            variant === 'ghost'
                ? 'border border-gray-300 text-gray-800 bg-white hover:bg-gray-100'
                : 'bg-indigo-600 text-white hover:bg-indigo-700';
        return (
            <button
                className={`rounded px-5 py-2 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${style}`}
                {...rest}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="flex flex-wrap items-center gap-4 p-4 border-b bg-slate-800">
            {/* 隐藏 file input */}
            <input
                ref={fileRef}
                type="file"
                accept=".json"
                hidden
                onChange={handleFile}
            />

            <Btn variant="ghost" onClick={() => fileRef.current.click()}>
                Import JSON
            </Btn>
            <Btn variant="ghost" onClick={exportJSON}>
                Export JSON
            </Btn>

            <Btn onClick={() => exportImg('png')}>Export PNG</Btn>
            <Btn onClick={() => exportImg('svg')}>Export SVG</Btn>

            <Btn onClick={runBenchmark}>Run Benchmark</Btn>
        </div>
    );
}
