// // src/components/GateToolbar.jsx
// import {
//     PiPencil,
//     PiInfo,
//     PiMagnifyingGlassPlus,
//     PiScissors,
//     PiCopy,
//     PiTrash,
// } from "react-icons/pi";

// /**
//  * @param {object} props
//  * @param {boolean} props.visible 是否显示
//  * @param {number}  props.x       绝对定位 left
//  * @param {number}  props.y       绝对定位 top
//  * @param {() => void} props.onEdit
//  * @param {() => void} props.onDelete
//  */
// export default function GateToolbar({ visible, x, y, onEdit, onDelete }) {
//     if (!visible) return null;

//     return (
//         <div
//             className="absolute flex gap-1 bg-white/80 backdrop-blur-sm border
//                  rounded-md p-1 shadow"
//             style={{ top: y, left: x }}
//         >
//             <IconBtn Icon={PiPencil} title="Edit" onClick={onEdit} />
//             <IconBtn Icon={PiInfo} title="Info" onClick={() => { }} />
//             <IconBtn Icon={PiMagnifyingGlassPlus} title="Zoom" onClick={() => { }} />
//             <IconBtn Icon={PiScissors} title="Cut" onClick={() => { }} />
//             <IconBtn Icon={PiCopy} title="Copy" onClick={() => { }} />
//             <IconBtn Icon={PiTrash} title="Delete" onClick={onDelete} />
//         </div>
//     );
// }

// function IconBtn({ Icon, title, onClick }) {
//     return (
//         <button
//             type="button"
//             title={title}
//             onClick={onClick}
//             className="w-6 h-6 grid place-items-center hover:bg-gray-100 rounded"
//         >
//             <Icon className="text-[14px]" />
//         </button>
//     );
// }


import React from "react";
import { PiPencil, PiTrash, PiCopy } from "react-icons/pi";

export default function GateToolbar({ visible, x, y, onEdit, onDelete }) {
    if (!visible) return null;

    return (
        <div
            className="absolute inline-flex items-center gap-1
                 bg-black/90 backdrop-blur-sm shadow-md rounded-md
                 px-1.5 py-0.5 z-30"
            style={{ left: x, top: y }}
        >
            <IconBtn Icon={PiPencil} onClick={onEdit} tip="Edit" />
            <IconBtn Icon={PiCopy} onClick={() => navigator.clipboard.writeText('')} tip="Copy" />
            <IconBtn Icon={PiTrash} onClick={onDelete} tip="Delete" className="text-red-500" />
        </div>
    );
}

/* 小图标按钮 */
function IconBtn({ Icon, onClick, tip, className = "" }) {
    return (
        <button
            onClick={onClick}
            title={tip}
            className={`w-5 h-5 flex items-center justify-center hover:bg-slate-200 rounded ${className}`}
        >
            <Icon size={14} />
        </button>
    );
}
