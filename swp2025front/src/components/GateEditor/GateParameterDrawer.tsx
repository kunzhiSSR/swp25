// // import { useState, useEffect } from 'react';
// // import {
// //   Drawer,
// //   DrawerContent,
// //   DrawerHeader,
// //   DrawerTitle,
// //   DrawerFooter,
// //   DrawerClose,
// // } from '@/components/ui/drawer';
// // import { Label } from '@/components/ui/label';
// // import { Input } from '@/components/ui/input';
// // import { Slider } from '@/components/ui/slider';
// // import { Button } from '@/components/ui/button';

// // interface Gate {
// //   id: string;
// //   type: string;
// //   params?: number[];
// // }

// // interface Props {
// //   gate: Gate | null;
// //   open: boolean;
// //   onClose: () => void;
// //   onSave: (theta: number) => void;
// // }

// // export default function GateParameterDrawer({
// //   gate,
// //   open,
// //   onClose,
// //   onSave,
// // }: Props) {
// //   const [theta, setTheta] = useState(0);

// //   /* 当切换不同 gate 时，重置 θ */
// //   useEffect(() => {
// //     setTheta(gate?.params?.[0] ?? 0);
// //   }, [gate?.id]);

// //   if (!gate) return null;

// //   return (
// //     <Drawer open={open} onOpenChange={onClose}>
// //       {/* DrawerContent 默认贴边展开；这里限制宽度并居中视觉 */}
// //       <DrawerContent className="max-w-sm mx-auto rounded-t-lg p-6 space-y-6">
// //         <DrawerHeader>
// //           <DrawerTitle className="text-lg font-semibold">
// //             {gate.type} — θ (radians)
// //           </DrawerTitle>
// //         </DrawerHeader>

// //         {/* 输入区域 */}
// //         <div className="space-y-4">
// //           <div className="space-y-1">
// //             <Label htmlFor="theta-input">θ 数值</Label>
// //             <Input
// //               id="theta-input"
// //               type="number"
// //               step="0.01"
// //               value={theta}
// //               onChange={(e) => setTheta(parseFloat(e.target.value))}
// //             />
// //           </div>

// //           <Slider
// //             min={-Math.PI}
// //             max={Math.PI}
// //             step={0.01}
// //             value={[theta]}
// //             onValueChange={([v]) => setTheta(v)}
// //             className="w-full"
// //           />
// //         </div>

// //         <DrawerFooter className="pt-2">
// //           <Button variant="secondary" onClick={onClose}>
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={() => {
// //               onSave(theta);
// //               onClose();
// //             }}
// //           >
// //             Save
// //           </Button>
// //         </DrawerFooter>

// //         {/* 隐藏默认右上角 × 按钮（DrawerClose 默认渲染） */}
// //         <DrawerClose className="hidden" />
// //       </DrawerContent>
// //     </Drawer>
// //   );
// // }



// import { useState, useEffect } from 'react';
// import {
//     Drawer,
//     DrawerContent,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerFooter,
//     DrawerClose,
// } from '@/components/ui/drawer';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Slider } from '@/components/ui/slider';
// import { Button } from '@/components/ui/button';

// interface Gate {
//     id: string;
//     type: string;
//     params?: number[];
// }

// interface Props {
//     gate: Gate | null;
//     open: boolean;
//     onClose: () => void;
//     onSave: (theta: number) => void;
// }

// export default function GateParameterDrawer({
//     gate,
//     open,
//     onClose,
//     onSave,
// }: Props) {
//     const [theta, setTheta] = useState(0);

//     /* 当切换不同 gate 时，重置 θ */
//     useEffect(() => {
//         setTheta(gate?.params?.[0] ?? 0);
//     }, [gate?.id]);

//     if (!gate) return null;

//     return (
//         <Drawer open={open} onOpenChange={onClose}>
//             {/* DrawerContent 默认贴边展开；这里限制宽度并居中视觉 */}
//             <DrawerContent className="max-w-sm mx-auto rounded-t-lg p-6 space-y-6">
//                 <DrawerHeader>
//                     <DrawerTitle className="text-lg font-semibold">
//                         {gate.type} — θ (radians)
//                     </DrawerTitle>
//                 </DrawerHeader>

//                 {/* 输入区域 */}
//                 <div className="space-y-4">
//                     <div className="space-y-1">
//                         <Label htmlFor="theta-input">θ 数值</Label>
//                         <Input
//                             id="theta-input"
//                             type="number"
//                             step="0.01"
//                             value={theta}
//                             onChange={(e) => setTheta(parseFloat(e.target.value))}
//                         />
//                     </div>

//                     <Slider
//                         min={-Math.PI}
//                         max={Math.PI}
//                         step={0.01}
//                         value={[theta]}
//                         onValueChange={([v]) => setTheta(v)}
//                         className="w-full"
//                     />
//                 </div>

//                 <DrawerFooter className="pt-2">
//                     <Button variant="secondary" onClick={onClose}>
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={() => {
//                             onSave(theta);
//                             onClose();
//                         }}
//                     >
//                         Save
//                     </Button>
//                 </DrawerFooter>

//                 {/* 隐藏默认右上角 × 按钮（DrawerClose 默认渲染） */}
//                 <DrawerClose className="hidden" />
//             </DrawerContent>
//         </Drawer>
//     );
// }


import { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    gate: { id: string; type: string; params?: number[] } | null;
    open: boolean;
    onClose: () => void;
    onSave: (theta: number) => void;
    onDelete: () => void;
}

export default function GateParameterDrawer({
    gate,
    open,
    onClose,
    onSave,
    onDelete,
}: Props) {
    const [theta, setTheta] = useState(0);

    // 每次打开时，读取原始参数
    useEffect(() => {
        if (gate?.params?.[0] !== undefined) {
            setTheta(gate.params[0]);
        }
    }, [gate]);

    return (
        <Drawer open={open} onOpenChange={(val) => !val && onClose()}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit θ – {gate?.type}</DrawerTitle>
                </DrawerHeader>

                <div className="p-4">
                    <Label>θ (radians)</Label>
                    <Input
                        type="number"
                        step="0.01"
                        value={theta}
                        onChange={(e) => setTheta(parseFloat(e.target.value))}
                        className="mt-2"
                    />
                </div>

                <DrawerFooter className="flex justify-between px-4 py-2">
                    <Button variant="ghost" onClick={onDelete}>
                        Delete
                    </Button>
                    <div className="space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={() => onSave(theta)}>Save</Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
