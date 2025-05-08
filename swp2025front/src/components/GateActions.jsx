import { Edit, Info, Scissors, Copy, Trash } from 'lucide-react';

export default function GateActions({ x, y, onEdit, onDelete }) {
    return (
        <div
            style={{ left: x, top: y }}
            className="absolute flex gap-[2px] bg-zinc-800 rounded border border-zinc-700 p-1"
        >
            <IconBtn Icon={Edit} tip="Edit" onClick={onEdit} />
            <IconBtn Icon={Info} tip="Info" />
            <IconBtn Icon={Scissors} tip="Cut" />
            <IconBtn Icon={Copy} tip="Copy" />
            <IconBtn Icon={Trash} tip="Delete" onClick={onDelete} />
        </div>
    );
}

function IconBtn({ Icon, tip, ...rest }) {
    return (
        <button
            className="w-5 h-5 flex items-center justify-center hover:bg-zinc-700 rounded"
            title={tip}
            {...rest}
        >
            <Icon size={12} strokeWidth={2} />
        </button>
    );
}
