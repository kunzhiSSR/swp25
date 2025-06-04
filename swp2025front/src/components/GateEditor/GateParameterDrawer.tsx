

// import { useState, useEffect } from 'react';
// import {
//     Drawer,
//     DrawerContent,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerFooter,
// } from "@/components/ui/drawer";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface Props {
//     gate: { id: string; type: string; params?: number[] } | null;
//     open: boolean;
//     onClose: () => void;
//     onSave: (theta: number) => void;
//     onDelete: () => void;
// }

// export default function GateParameterDrawer({
//     gate,
//     open,
//     onClose,
//     onSave,
//     onDelete,
// }: Props) {
//     const [theta, setTheta] = useState(0);

//     // 每次打开时，读取原始参数
//     useEffect(() => {
//         if (gate?.params?.[0] !== undefined) {
//             setTheta(gate.params[0]);
//         }
//     }, [gate]);

//     return (
//         <Drawer open={open} onOpenChange={(val) => !val && onClose()}>
//             <DrawerContent>
//                 <DrawerHeader>
//                     <DrawerTitle>Edit θ – {gate?.type}</DrawerTitle>
//                 </DrawerHeader>

//                 <div className="p-4">
//                     <Label>θ (radians)</Label>
//                     <Input
//                         type="number"
//                         step="0.01"
//                         value={theta}
//                         onChange={(e) => setTheta(parseFloat(e.target.value))}
//                         className="mt-2"
//                     />
//                 </div>

//                 <DrawerFooter className="flex justify-between px-4 py-2">
//                     <Button variant="ghost" onClick={onDelete}>
//                         Delete
//                     </Button>
//                     <div className="space-x-2">
//                         <Button variant="outline" onClick={onClose}>
//                             Cancel
//                         </Button>
//                         <Button onClick={() => onSave(theta)}>Save</Button>
//                     </div>
//                 </DrawerFooter>
//             </DrawerContent>
//         </Drawer>
//     );
// }


import { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerClose
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GATE_DEFS } from '@/constants/gates';

interface GateParameterDrawerProps {
    gate: any;
    open: boolean;
    onClose: () => void;
    onSave: (updates: any) => void;
}

export default function GateParameterDrawer({
    gate,
    open,
    onClose,
    onSave
}: GateParameterDrawerProps) {
    const [values, setValues] = useState<number[]>([]);

    /* 当切换 gate 时同步初值 */
    useEffect(() => {
        if (!gate) return;
        const def = GATE_DEFS[gate.type];
        const initVals =
            gate.params ??
            def.params.map((p: any) => p.default ?? 0);
        setValues(initVals);
    }, [gate?.id]);

    if (!gate) return null;

    const def = GATE_DEFS[gate.type];

    return (
        <Drawer open={open} onOpenChange={onClose}>
            <DrawerContent className="mx-auto max-w-2xl">
                <DrawerHeader>
                    <DrawerTitle className="text-lg">
                        {def.label} 参数设置
                    </DrawerTitle>
                </DrawerHeader>

                {/* ---- 参数输入 ---- */}
                {def.params.length ? (
                    <div className="flex flex-col gap-4 p-4">
                        {def.params.map((p: any, idx: number) => (
                            <div key={p.key} className="flex flex-col gap-1">
                                <Label>{p.label}</Label>
                                <Input
                                    type="number"
                                    step={p.step ?? 0.01}
                                    min={p.min}
                                    max={p.max}
                                    value={values[idx]}
                                    onChange={e => {
                                        const v = parseFloat(e.target.value);
                                        setValues(vals =>
                                            vals.map((t, i) => (i === idx ? v : t))
                                        );
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="p-4 text-sm text-gray-500">
                        此门无可编辑参数。
                    </p>
                )}

                <DrawerFooter className="border-t pt-4">
                    <Button
                        disabled={!def.params.length}
                        onClick={() => {
                            onSave({ params: values });
                            onClose();
                        }}
                    >
                        Save
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
