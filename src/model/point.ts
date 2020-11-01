export enum pointState {
    undefined = 0,
    outPoly = 1,
    inPoly = 2,
    onEdge = 3
}

export class Point {
    
    constructor(
        public x: number,
        public y: number,
        public state: pointState = pointState.undefined
    ) {}

    static fromJson(point: {x:number, y:number, state?:pointState}) : Point {
        return new Point(point.x, point.y, point.state);
    }

    public calcDistance(point: Point): number {
        return Math.sqrt(
            Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2)
        );
    }

    public getCoords(): object {
        return { x: this.x, y: this.y };
    }

    public isCoordEqual(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }
}
