import {Vector2} from "@s7n/math";

class NumberUtil {
    static readonly TOLERANCE = 1e-6;

    static isEqual(v1: number, v2: number, tolerance = NumberUtil.TOLERANCE) {
        return Math.abs(v1 - v2) < tolerance;
    }

    /**
     * 获取相反数
     */
    static getOppositeNumber(value: number) {
        return value === 0 ? 0 : -value;
    }

    /**
     * 将有符号的 Zero 转化为无符号
     *
     * Object.is vs === : https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    static unSignedZero(value: number) {
        return value === 0 ? 0 : value;
    }
}

export { NumberUtil };
export function getAngleBetween(a: Point, b: Point) {
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}
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
    const center = {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2};

    // 获取矩形四个顶点
    const points = [
        {x: rect.x, y: rect.y},
        {x: rect.x + rect.width, y: rect.y},
        {x: rect.x + rect.width, y: rect.y + rect.height},
        {x: rect.x, y: rect.y + rect.height},
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
        .map((intersection, index) => ({intersection, distance: distances[index]}))
        .sort((a, b) => b.distance - a.distance);

    const farthestPoints = [sortedIntersections[0].intersection, sortedIntersections[1].intersection];

    return {farthestPoints};
}


interface Line {
    start: Point;
    end: Point;
}

/**
 * 计算一个点做垂线到一条线段上的交点
 * */
export const getPerpendicularPoint = (point: Point, line: Line): Point => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const lengthSquared = dx * dx + dy * dy;
    const t = ((point.x - line.start.x) * dx + (point.y - line.start.y) * dy) / lengthSquared;
    return {
        x: line.start.x + t * dx,
        y: line.start.y + t * dy,
    };
};

/**
 * 将线段1粘附到线段2上
 * */
export function stickyTo(line1: Line, line2: Line): Line {
    const perpendicularPoint1 = getPerpendicularPoint(line1.start, line2);
    const perpendicularPoint2 = getPerpendicularPoint(line1.end, line2);

    return {start: perpendicularPoint1, end: perpendicularPoint2};
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
 * 设有一个线段 {start, end} 和两个点 points[0], points[1], 通过比较线段的方向和两个点的方向，确定两个点的顺序
 * */
export function orderPoints(line: Line, points: Point[]): Line {

    const direct = new Vector2(line.start.x, line.start.y).sub(new Vector2(line.end.x, line.end.y)).normalize()
    const vec1 = new Vector2(points[0].x, points[0].y)
    const vec2 = new Vector2(points[1].x, points[1].y)

    const direct1 = vec1.sub(vec2).normalize()
    const direct2 = vec2.sub(vec1).normalize()

    console.log('排序web的渐变控制点', direct.angle, direct1.angle, direct2.angle)

    // equals 没有实现宽容度，改为计算角度差
    // if (direct.equals(direct1)) {
    if (NumberUtil.isEqual(direct.angle, direct1.angle)) {
        console.log('顺序正确，保持不变返回', points[0], points[1])
        return {start: points[0], end: points[1]}
    }
    console.log('顺序错误，重新排序', points[1], points[0])
    return {start: points[1], end: points[0]}
}

interface Control {
    figma: Line,
    web: Line,
}

function calculateSignedDistance(line: Line, point: Point): number {
    const start = new Vector2(line.start.x, line.start.y);
    const end = new Vector2(line.end.x, line.end.y);
    const target = new Vector2(point.x, point.y);

    const direction = end.sub(start).normalize();
    const difference = target.sub(start);

    return difference.dot(direction);
}


export const getOffset = (controls: Control) => {
    const {figma, web} = controls

    console.log(controls)

    const start = new Vector2(web.start.x, web.start.y)
    const end = new Vector2(web.end.x, web.end.y)
    const line = start.sub(end)
    const length = line.length

    return [
        calculateSignedDistance(web, figma.start) / length,
        calculateSignedDistance(web, figma.end) / length,
    ]
}

