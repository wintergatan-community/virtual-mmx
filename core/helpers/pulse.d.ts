export declare class ForcePulse {
    x: number;
    private v;
    tension: number;
    friction: number;
    mass: number;
    updating: boolean;
    tolerance: number;
    private startUpdating;
    private update;
    applyCollision(velocity: number): void;
}
