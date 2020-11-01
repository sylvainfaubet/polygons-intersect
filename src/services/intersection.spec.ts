import { Point, pointState } from "../model/point";
import { Polygon } from "../model/polygon";
import intersection from "./intersection";

describe("intersection", () => {
    describe("polygons intersect", () => {
        it("should return expected", () => {
            const tests = [
                {
                    poly1: [{ x: 10, y: 100 }, { x: 40, y: 100 }, { x: 80, y: 60 }, { x: 20, y: 20 }],
                    poly2: [{ x: 30, y: 70 }, { x: 90, y: 90 }, { x: 110, y: 50 }, { x: 70, y: 10 }],
                    expectedResults: [[{ x: 60, y: 80 }, { x: 30, y: 70 }, { x: 50, y: 40 }, { x: 80, y: 60 }]],
                }, {
                    poly1: [{ x: 903, y: 429 }, { x: 1184, y: 429 }, { x: 1184, y: 621 }, { x: 903, y: 621 }],
                    poly2: [{ x: 902, y: 441 }, { x: 1185, y: 441 }, { x: 1185, y: 631 }, { x: 902, y: 631 }],
                    expectedResults: [[{ x: 1184, y: 441 }, { x: 903, y: 441 }, { x: 903, y: 621 }, { x: 1184, y: 621 }]],

                }, {
                    poly1: [
                        { x: 40, y: 100 },
                        { x: 80, y: 60 },
                        { x: 30, y: 30 },
                        { x: 110, y: 5 },
                        { x: 30, y: 5 },
                        { x: 20, y: 20 },
                        { x: 10, y: 100 }
                    ],
                    poly2: [
                        { x: 30, y: 70 },
                        { x: 90, y: 90 },
                        { x: 110, y: 50 },
                        { x: 70, y: 10 }
                    ],
                    expectedResults: [
                        [
                            { x: 60, y: 80 },
                            { x: 30, y: 70 },
                            { x: 49.05, y: 41.43 },
                            { x: 80, y: 60 }
                        ], [
                            { x: 63.68, y: 19.47 },
                            { x: 70, y: 10 },
                            { x: 75.71, y: 15.71 },
                            { x: 63.69, y: 19.47 }
                        ]
                    ]
                }, {
                    poly1: [
                        { x: 2, y: 1 },
                        { x: 2, y: 13 },
                        { x: 16, y: 13 },
                        { x: 16, y: 1 }
                    ],
                    poly2: [
                        { x: 17, y: 2 },
                        { x: 14, y: 2 },
                        { x: 14, y: 6 },
                        { x: 17, y: 6 }
                    ],
                    expectedResults: [[
                        { x: 16, y: 6 },
                        { x: 14, y: 6 },
                        { x: 14, y: 2 },
                        { x: 16, y: 2 }
                    ]],
                }

            ];
            tests.forEach(test => {
                const poly1 = Polygon.fromJson(test.poly1);
                const poly2 = Polygon.fromJson(test.poly2);

                const results = intersection(poly1, poly2)
                results.forEach((res, idx) => {
                    expect(res.getPath()).toEqual(test.expectedResults[idx]);
                });
            })
        })

        describe("polygons touch each other without intersection", () => {
            it("should return empty array (touch in two tops)", () => {
                const poly1 = Polygon.fromJson([
                    { x: 30, y: 10 },
                    { x: 30, y: 20 },
                    { x: 20, y: 15 }
                ]);
                const poly2 = Polygon.fromJson([
                    { x: 30, y: 10 },
                    { x: 30, y: 20 },
                    { x: 40, y: 20 },
                    { x: 40, y: 10 }
                ]);
                const result = intersection(poly1, poly2);
                expect(result).toEqual([]);
            });

            it("should return empty array (touch in two tops and one point on the edge)", () => {
                const poly1 = Polygon.fromJson([
                    { x: 10, y: 20 },
                    { x: 30, y: 10 },
                    { x: 30, y: 20 },
                    { x: 30, y: 30 }
                ]);
                const poly2 = Polygon.fromJson([
                    { x: 30, y: 10 },
                    { x: 30, y: 30 },
                    { x: 50, y: 20 }
                ]);
                const result = intersection(poly1, poly2);
                expect(result).toEqual([]);
            });
        });

        describe("all points of one polygon in another", () => {
            it("should return array with poly2", () => {
                const poly1 = Polygon.fromJson([
                    { x: 10, y: 10 },
                    { x: 10, y: 40 },
                    { x: 40, y: 40 },
                    { x: 40, y: 10 }
                ]);
                const poly2 = Polygon.fromJson([
                    { x: 20, y: 20 },
                    { x: 20, y: 30 },
                    { x: 30, y: 30 },
                    { x: 30, y: 20 }
                ]);
                const result = intersection(poly1, poly2);
                expect(result.length).toBe(1);
                expect(result[0].getPath()).toEqual(poly2.getPath());
            });
        });

        describe("polygons don't intersect each other", () => {
            it("should return empty array", () => {
                const poly1 = Polygon.fromJson([
                    { x: 10, y: 10 },
                    { x: 10, y: 20 },
                    { x: 20, y: 20 },
                    { x: 20, y: 10 }
                ]);
                const poly2 = Polygon.fromJson([
                    { x: 30, y: 10 },
                    { x: 30, y: 20 },
                    { x: 40, y: 20 },
                    { x: 40, y: 10 }
                ]);
                const result = intersection(poly1, poly2);
                expect(result).toEqual([]);
            });
        });
    });
});
