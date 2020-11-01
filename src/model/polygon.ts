import intersection from "../services/intersection";
import { Edge } from "./edge";
import { Point, pointState } from "./point";

enum direction {
    backward = 0,
    forward = 1
}

export class Polygon {
    private edges: Edge[];
    private edgesIndex = 0;
    private direction = direction.forward;

    static fromJson(array: {x:number, y:number, state?:pointState}[], intersectionEnd?:boolean): Polygon{
        return new Polygon(array.map(it => Point.fromJson(it)), intersectionEnd);
    }

    constructor(private points: Point[] = [], private intersectionEnd = false) {
        this.edges = this.points.map((item, i, arr) => {
            return new Edge(item, arr[(i + 1) % arr.length]);
        });
    }

    public isIntersectionEnd(): boolean {
        return this.intersectionEnd;
    }

    public endIntersection() {
        this.intersectionEnd = true;
    }

    public getEdges(): Edge[] {
        return this.edges;
    }

    public getNextEdge(): Edge {
        if (this.direction === direction.backward) {
            this.edgesIndex =
                --this.edgesIndex < 0 ? this.edges.length - 1 : this.edgesIndex;
        } else {
            this.edgesIndex = ++this.edgesIndex % this.edges.length;
        }
        const edgeCopy = this.edges.slice(this.edgesIndex)[0];
        if (this.direction === direction.backward) {
            edgeCopy.changePoints();
        }
        return edgeCopy;
    }

    public isEdgeExist(edge: Edge): boolean {
        return this.edges.indexOf(edge) > -1;
    }

    public setDirection(intersectEdge: Edge, nextEdge: Edge) {
        const ind1 = this.edges.indexOf(intersectEdge);
        const ind2 = this.edges.indexOf(nextEdge);
        this.edgesIndex = ind2;
        this.direction =
            ind2 % (this.edges.length - 1) <= ind1
                ? direction.backward
                : direction.forward;
    }

    public isDirectionBackward() {
        return this.direction === direction.backward;
    }

    public getPoints(): Point[] {
        return this.points;
    }
    public getPath(): object[] {
        return this.points.map(point => point.getCoords());
    }

    public isPointsOnEdgesAndOut(): boolean {
        for (const point of this.points) {
            if (
                point.state !== pointState.outPoly &&
                point.state !== pointState.onEdge
            ) {
                return false;
            }
        }
        return true;
    }

    public addPoint(point: Point): void {
        const lastPoint = this.points[this.points.length - 1];
        if (lastPoint) {
            this.edges.push(new Edge(lastPoint, point));
        }
        this.points.push(point);
    }

    public isPointExist(point: Point): boolean {
        return (
            this.points.filter(pointItem => point.isCoordEqual(pointItem))
                .length > 0
        );
    }

    public calcPointsInPoly(poly: Polygon): number {
        let count = 0;
        this.points.forEach(point => {
            if (poly.isPointInPoly(point)) {
                count++;
            }
        });
        return count;
    }

    public getBoundingBox(): Edge {
        let minX = this.points[0].x;
        let maxX = this.points[0].x;
        let minY = this.points[0].y;
        let maxY = this.points[0].y;
        this.points.forEach(point => {
            minX = Math.min(minX, point.x);
            maxX = Math.max(maxX, point.x);
            minY = Math.min(minY, point.y);
            maxY = Math.max(maxY, point.y);
        });
        return new Edge(new Point(minX, minY), new Point(maxX, maxY));
    }

    public isPointInPoly(point: Point): boolean {
        const boundingBox = this.getBoundingBox();
        const raySegment = new Edge(
            new Point(
                boundingBox.startPoint.x - 3,
                boundingBox.startPoint.y + 1
            ),
            point
        );
        raySegment.setEdgeIntersections(this.edges);
        const intersections = raySegment.getIntersectElements();
        if (
            intersections.filter(intersect => {
                const intersectPoint = intersect.point;
                return (
                    intersectPoint.x === point.x && intersectPoint.y === point.y
                );
            }).length > 0
        ) {
            point.state = pointState.onEdge;
            return true;
        }

        if (intersections.length % 2 === 1) {
            point.state = pointState.inPoly;
            return true;
        } else {
            point.state = pointState.outPoly;
            return false;
        }
    }
}
