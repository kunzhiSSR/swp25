

// import { useState } from 'react';
// import PaletteGate from '@/components/PaletteGate.jsx';
// import { GATE_DEFS } from '@/constants/gates';

// const colors = {
//     foundation: 'bg-red-600',
//     rotation: 'bg-pink-600',
//     entangle: 'bg-blue-600'
// };

// const GATES = Object.entries(GATE_DEFS).map(([value, def]) => ({
//     value,
//     label: def.label,
//     category: def.category,
//     color: colors[def.category]
// }));

// export default function GatePalette({ className = '' }) {
//     const [kw, setKw] = useState('');

//     const list = GATES.filter(g =>
//         g.label.toLowerCase().includes(kw.toLowerCase())
//     );

//     return (
//         <div className={`p-4 border-r ${className}`}>
//             {/* 搜索 */}
//             <input
//                 value={kw}
//                 onChange={e => setKw(e.target.value)}
//                 placeholder="Search…"
//                 className="mb-4 w-full rounded border px-3 py-1 text-sm"
//             />

//             {/* 两列网格 */}
//             <div className="grid grid-cols-2 gap-3">
//                 {list.map(g => (
//                     <PaletteGate
//                         key={g.value}
//                         value={g.value}
//                         label={g.label}
//                         className={`${g.color} w-full py-3`}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }



import { useState } from 'react';
import PaletteGate from '@/components/PaletteGate.jsx';
import { GATE_DEFS } from '@/constants/gates';

const colors = {
    foundation: 'bg-red-600',
    rotation: 'bg-pink-600',
    entangle: 'bg-blue-600'
};

const GATES = Object.entries(GATE_DEFS).map(([v, def]) => ({
    value: v,
    label: def.label,
    category: def.category,
    color: colors[def.category]
}));

export default function GatePalette({ className = '' }) {
    const [kw, setKw] = useState('');

    const list = GATES.filter(g =>
        g.label.toLowerCase().includes(kw.toLowerCase())
    );

    return (
        <div className={`p-4 border-r ${className}`}>
            {/* 搜索框 */}
            <input
                type="text"
                placeholder="Search…"
                value={kw}
                onChange={e => setKw(e.target.value)}
                className="mb-4 w-full rounded border px-3 py-1 text-sm"
            />

            {/* 两列网格 */}
            <div className="grid grid-cols-2 gap-3">
                {list.map(g => (
                    <PaletteGate
                        key={g.value}
                        value={g.value}
                        label={g.label}
                        className={`${g.color} w-full py-3`}
                    />
                ))}
            </div>
        </div>
    );
}
