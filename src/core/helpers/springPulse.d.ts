export declare class SpringPulse {
    stiffness: number;
    damping: number;
    mass: number;
    private x;
    private v;
    private restingValue;
    private tolerance;
    private updating;
    private lastTime;
    get value(): number;
    private startUpdating;
    private update;
    applyCollision(impulse: number): void;
    moveTo(restingValue: number): void;
    snapTo(restingValue: number): void;
}
