import { Edge } from "./edge";
import { Point } from "./point";

describe("Edge", () => {
    describe("findIntersectingPoint", () => {
        it("should find intersecting point", () => {
            const edge1 = new Edge(new Point(1, 0), new Point(-1, 0));
            const edge2 = new Edge(new Point(0, 1), new Point(0, -1));
            expect(edge1.findIntersectingPoint(edge2)).toEqual(new Point(0, 0));
        });
        it("should find intersecting point", () => {
            const edge1 = new Edge(new Point(3, 2), new Point(1, 4));
            const edge2 = new Edge(new Point(0, 13), new Point(2, 1));
            expect(edge1.findIntersectingPoint(edge2)).toEqual(
                new Point(1.6, 3.4)
            );
        });
    });
    describe("getIntersectionRayX", () => {
        it("should return intersection rayX edge not specifc", () => {
            const edge = new Edge(new Point(4, 4), new Point(1, 1));
            const point = new Point(4, 1);
            expect(edge.getIntersectionRayX(point)).toBe(4);
        });
        it("should return intersection rayX when point is not in bounds", () => {
            const edge = new Edge(new Point(4, 4), new Point(1, 1));
            const point = new Point(0.5, 1);
            expect(edge.getIntersectionRayX(point)).toBe(0.5);
        });
    });
    describe("getIntersectionRayY", () => {
        it("should return intersection rayY when point is in bounds", () => {
            const edge = new Edge(new Point(4, 4), new Point(1, 1));
            const point = new Point(1, 4);
            expect(edge.getIntersectionRayY(point)).toBe(4);
        });
    });
});
