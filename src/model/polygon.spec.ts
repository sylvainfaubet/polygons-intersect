import { Point } from "./point";
import { Polygon } from "./polygon";

const poly = new Polygon([
    new Point(0, 0),
    new Point(0, 2),
    new Point(2, 2),
    new Point(2, 0),
    new Point(1, 1)
]);

describe("Polygon", () => {
    describe("isPointInPoly", () => {
        it("should return true when point is in poly", () => {
            const point = new Point(0.5, 1);
            expect(poly.isPointInPoly(point)).toBeTruthy();
        });
        it("should return false when point is not in poly", () => {
            const point = new Point(1, 0);
            expect(poly.isPointInPoly(point)).toBeFalsy();
        });
        it("should return true when point is on vertical edge of poly", () => {
            const point = new Point(2, 1);
            expect(poly.isPointInPoly(point)).toBeTruthy();
        });
        it("should return true when point is on horizontal edge of poly", () => {
            const point = new Point(1, 2);
            expect(poly.isPointInPoly(point)).toBeTruthy();
        });
        it("should return true when point is on oblical edge of poly", () => {
            const point = new Point(1.5, 0.5);
            expect(poly.isPointInPoly(point)).toBeTruthy();
        });
    });
});
