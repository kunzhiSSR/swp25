import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCircuitStore } from "@/stores/useCircuitStore";

/**
 * Props
 * gateId   – 唯一 gate.id
 * open     – 控制抽屉显隐
 * onClose  – 关闭回调（父组件控制 open 状态）
 */
interface GateParameterDrawerProps {
    gateId: string | null;
    open: boolean;
    onClose: () => void;
}

/**
 * <GateParameterDrawer />
 *
 * 显示并编辑参数化门（Rx/Ry/Rz）的参数 θ。
 * 参数存储在 Zustand store -> circuit.gates[].params[0]
 */
export default function GateParameterDrawer({ gateId, open, onClose }: GateParameterDrawerProps) {
    const gate = useCircuitStore((s) => s.circuit.gates.find((g) => g.id === gateId));
    const updateGate = useCircuitStore((s) => s.updateGate);

    // 本地状态（防止未保存前直接写入全局）

    const [theta, setTheta] = useState<number>(gate?.params?.[0] ?? 0);

    // 当 gateId 变化时，刷新本地状态
    useEffect(() => {
        if (gate) {
            setTheta(gate.params?.[0] ?? 0);
        }
    }, [gateId]);

    if (!gate) return null; // 容错

    // 参数保存
    const handleSave = () => {
        updateGate(gate.id, { params: [theta] });
        onClose();
    };

    return (
        <Drawer open={open} onOpenChange={onClose}>
            <DrawerContent className="max-w-md mx-auto p-6 space-y-4">
                <DrawerHeader>
                    <DrawerTitle className="text-xl font-semibold">
                        Edit Parameters – {gate.type}
                    </DrawerTitle>
                </DrawerHeader>

                <div className="space-y-2">
                    <Label htmlFor="theta">θ (radians)</Label>
                    <Input
                        id="theta"
                        type="number"
                        step="0.01"
                        value={theta}
                        onChange={(e) => setTheta(parseFloat(e.target.value))}
                    />
                    <Slider
                        min={-Math.PI}
                        max={Math.PI}
                        step={0.01}
                        value={[theta]}
                        onValueChange={([value]) => setTheta(value)}
                    />
                </div>

                <DrawerFooter className="pt-4 flex justify-end space-x-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
