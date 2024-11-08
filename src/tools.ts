interface Point {
    x: number;
    y: number;
}

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * 计算 web 的线性渐变的两个控制点
 * */
export function getLinearGradientPoints(rect: Rect, angle: number): { farthestPoints: Point[] } {
    const radians = (angle * Math.PI) / 180;
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

    // 获取矩形四个顶点
    const points = [
        { x: rect.x, y: rect.y },
        { x: rect.x + rect.width, y: rect.y },
        { x: rect.x + rect.width, y: rect.y + rect.height },
        { x: rect.x, y: rect.y + rect.height },
    ];

    // 计算每个顶点到中心点的垂直线与 line 的交点
    const intersections = points.map(point => {
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        const distance = dx * Math.cos(radians) + dy * Math.sin(radians);
        return {
            x: center.x + distance * Math.cos(radians),
            y: center.y + distance * Math.sin(radians),
        };
    });

    // 计算每个交点到中心点的距离
    const distances = intersections.map(intersection => {
        const dx = intersection.x - center.x;
        const dy = intersection.y - center.y;
        return Math.sqrt(dx * dx + dy * dy);
    });

    // 找到距离中心点最远的两个交点
    const sortedIntersections = intersections
        .map((intersection, index) => ({ intersection, distance: distances[index] }))
        .sort((a, b) => b.distance - a.distance);

    const farthestPoints = [sortedIntersections[0].intersection, sortedIntersections[1].intersection];

    return { farthestPoints };
}

function calculateDistance(point1: Point, point2: Point): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}


interface Line {
    start: Point;
    end: Point;
}

export function calculatePerpendicularDistances(line1: Line, line2: Line): { distances: number[], line: Line } {
    const getPerpendicularPoint = (point: Point, line: Line): Point => {
        const dx = line.end.x - line.start.x;
        const dy = line.end.y - line.start.y;
        const lengthSquared = dx * dx + dy * dy;
        const t = ((point.x - line.start.x) * dx + (point.y - line.start.y) * dy) / lengthSquared;
        return {
            x: line.start.x + t * dx,
            y: line.start.y + t * dy,
        };
    };

    const distance = (point1: Point, point2: Point): number => {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const perpendicularPoint1 = getPerpendicularPoint(line1.start, line2);
    const perpendicularPoint2 = getPerpendicularPoint(line1.end, line2);

    const line3 = { start: perpendicularPoint1, end: perpendicularPoint2 };

    const distance1 = distance(line2.start, line3.start);
    const distance2 = distance(line2.end, line3.end);

    const length = calculateDistance(line2.start, line2.end)

    return { distances: [distance1 / length, distance2 / length], line: line3 };
}

interface Point {
    x: number;
    y: number;
}

interface Line {
    start: Point;
    end: Point;
}

/**
 * 将点按照线段的顺序排序
 * */
export function orderPoints(line: Line, points: Point[]): Line {
    const {start, end} = line
    const left = start.x === end.x ? start.y > end.y : start.x > end.x

    return left ? {start: points[1], end: points[0]} : {start: points[0], end: points[1]}
}

export function calculateOffsets(line1: Line, line2: Line): number[] {
    const calculateOffset = (point1: Point, point2: Point, reference: Point): number => {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        const referenceDx = reference.x - point1.x;
        const referenceDy = reference.y - point1.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        return (referenceDx * dx + referenceDy * dy) / length;
    };

    const startOffset = calculateOffset(line1.start, line1.end, line2.start);
    const endOffset = calculateOffset(line1.start, line1.end, line2.end);

    return [startOffset, endOffset];
}
