// src/components/GateToolbar.jsx
import React from 'react';
import {
    Edit2,
    Info,
    Crop,
    Scissors,
    Copy,
    Trash2,
} from 'lucide-react';

export default function GateToolbar({
    x,                      // x 坐标（px）
    y,                      // y 坐标（px）
    onEdit,
    onInfo,
    onCrop,
    onCut,
    onCopy,
    onDelete,
}) {
    return (
        <div
            className="absolute flex items-center space-x-1 bg-white border border-gray-200 rounded-md shadow-lg p-1 z-50"
            style={{ top: y, left: x }}
        >
            <button onClick={onEdit} title="Edit">
                <Edit2 size={16} />
            </button>
            <button onClick={onInfo} title="Info">
                <Info size={16} />
            </button>
            <button onClick={onCrop} title="Crop">
                <Crop size={16} />
            </button>
            <button onClick={onCut} title="Cut">
                <Scissors size={16} />
            </button>
            <button onClick={onCopy} title="Copy">
                <Copy size={16} />
            </button>
            <button onClick={onDelete} title="Delete">
                <Trash2 size={16} />
            </button>
        </div>
    );
}
