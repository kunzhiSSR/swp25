// src/components/GatePalette.jsx
import { useState } from 'react';
import PaletteGate from '@/components/PaletteGate.jsx';

// 定义所有 Gate 及其分类
const GATES = [
    { label: 'H', value: 'H', category: 'foundation' },
    { label: 'X', value: 'X', category: 'foundation' },
    { label: 'Y', value: 'Y', category: 'foundation' },
    { label: 'Z', value: 'Z', category: 'foundation' },

    { label: 'RX', value: 'RX', category: 'rotation' },
    { label: 'RY', value: 'RY', category: 'rotation' },
    { label: 'RZ', value: 'RZ', category: 'rotation' },

    { label: 'CNOT', value: 'CNOT', category: 'entangle' },
    { label: 'CZ', value: 'CZ', category: 'entangle' },
];

// 不同分类对应的 Tailwind 颜色
const CATEGORY_CLASSES = {
    foundation: 'bg-red-600',
    rotation: 'bg-pink-600',
    entangle: 'bg-blue-600',
};

export default function GatePalette({ className = '' }) {
    const [search, setSearch] = useState('');

    // 根据搜索框过滤 gates
    const filtered = GATES.filter((g) =>
        g.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={`flex flex-col p-2 border-r ${className}`}>
            {/* 搜索框 */}
            <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-2 px-2 py-1 rounded border focus:outline-none focus:ring focus:border-blue-300"
            />

            {/* Gate 按钮网格 */}
            <div className="grid grid-cols-2 gap-2 overflow-y-auto background">
                {filtered.map((g) => (
                    <PaletteGate
                        key={g.value}
                        label={g.label}
                        value={g.value}
                        className={`${CATEGORY_CLASSES[g.category]} rounded-lg`}
                    />
                ))}
            </div>
        </div>
    );
}




