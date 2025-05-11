
// import { Edit, Copy, Trash, Plus, Minus } from 'lucide-react';

// export default function GateActions({
//     x,
//     y,
//     gate,
//     onEdit,
//     onDelete,
//     onAddCtrlAbove,
//     onAddCtrlBelow,
//     onRemoveCtrl
// }) {
//     /* 多控制时，显示删控制按钮（选中时删最近的） */
//     const canRemoveCtrl = gate?.control?.length;

//     return (
//         <div
//             style={{ left: x, top: y }}
//             className="absolute flex gap-[2px] bg-zinc-800 rounded border border-zinc-700 p-1 z-50"
//         >
//             <IconBtn Icon={Edit} tip="Edit" onClick={onEdit} />
//             <IconBtn Icon={Copy} tip="Copy" />
//             <IconBtn Icon={Plus} tip="Ctrl ↑" onClick={onAddCtrlAbove} />
//             <IconBtn Icon={Plus} tip="Ctrl ↓" onClick={onAddCtrlBelow} />
//             {canRemoveCtrl && (
//                 <IconBtn
//                     Icon={Minus}
//                     tip="Remove Ctrl"
//                     onClick={() =>
//                         onRemoveCtrl(gate.control[gate.control.length - 1])
//                     }
//                 />
//             )}
//             <IconBtn Icon={Trash} tip="Delete" onClick={onDelete} />
//         </div>
//     );
// }

// function IconBtn({ Icon, tip, ...rest }) {
//     return (
//         <button
//             className="w-5 h-5 flex items-center justify-center hover:bg-zinc-700 rounded"
//             title={tip}
//             {...rest}
//         >
//             <Icon size={12} strokeWidth={2} />
//         </button>
//     );
// }


import { Edit, Copy, Trash, Plus, Minus } from 'lucide-react';

/**
 * 悬浮工具条
 * props:
 *   x, y                 —— 绝对定位
 *   gate                 —— 当前选中 Gate
 *   onEdit()             —— 编辑抽屉
 *   onDelete()           —— 删除门
 *   onAddCtrlAbove()     —— 在目标之上加控制行
 *   onAddCtrlBelow()     —— 在目标之下加控制行
 *   onRemoveCtrl(row)    —— 删除控制行
 *   onDuplicate()        —— 复制门（保留以备后用）
 */
export default function GateActions({
    x,
    y,
    gate,
    onEdit = () => { },
    onDelete = () => { },
    onAddCtrlAbove = () => { },
    onAddCtrlBelow = () => { },
    onRemoveCtrl = () => { },
    onDuplicate = () => { },
}) {
    const canRemoveCtrl = gate?.control?.length;

    return (
        <div
            style={{ left: x, top: y }}
            className="absolute z-50 flex gap-[2px] bg-zinc-800 border border-zinc-700 rounded p-1"
        >
            <IconBtn Icon={Edit} tip="Edit" onClick={onEdit} />
            <IconBtn Icon={Copy} tip="Copy" onClick={onDuplicate} />
            <IconBtn Icon={Plus} tip="Ctrl ↑" onClick={onAddCtrlAbove} />
            <IconBtn Icon={Plus} tip="Ctrl ↓" onClick={onAddCtrlBelow} />
            {canRemoveCtrl && (
                <IconBtn
                    Icon={Minus}
                    tip="Remove Ctrl"
                    onClick={() =>
                        onRemoveCtrl(gate.control[gate.control.length - 1])
                    }
                />
            )}
            <IconBtn Icon={Trash} tip="Delete" onClick={onDelete} />
        </div>
    );
}

function IconBtn({ Icon, tip, ...rest }) {
    return (
        <button
            {...rest}
            title={tip}
            className="w-5 h-5 flex items-center justify-center hover:bg-zinc-700 rounded"
        >
            <Icon size={12} strokeWidth={2} />
        </button>
    );
}
