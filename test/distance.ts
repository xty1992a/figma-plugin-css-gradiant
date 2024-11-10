import { Vector2 } from '@s7n/math';

interface Point {
    x: number;
    y: number;
}

interface Line {
    start: Point;
    end: Point;
}

function calculateSignedDistance(line: Line, point: Point): number {
    const start = new Vector2(line.start.x, line.start.y);
    const end = new Vector2(line.end.x, line.end.y);
    const target = new Vector2(point.x, point.y);

    const direction = end.sub(start).normalize();
    const difference = target.sub(start);

    return difference.dot(direction);
}

// Given values
const line: Line = {
    start: { x: 69.16824699596026, y: -18.06304656053723 },
    end: { x: 130.83175300403974, y: 218.06304656053723 }
};

const point: Point = {
    x: 52.71530115638271,
    y: -81.06578631592924
};

const signedDistance = calculateSignedDistance(line, point);
console.log(signedDistance); // Output the signed distance
