import {Point, Rect} from './types'
export class Theta {
    degrees = 0;
    radians = 0;

    constructor({degrees, radians}: { degrees?: number, radians?: number }) {
        if (degrees === undefined && radians === undefined)
            throw new Error("degrees or radians must be provided");
        if (degrees !== undefined) {
            this.degrees = degrees;
            this.radians = toRadians(degrees);
        }
        if (radians !== undefined) {
            this.radians = radians;
            this.degrees = toDegrees(radians);
        }
    }

    add(deg: number) {
        return new Theta({degrees: this.degrees + deg});
    }

    sub(deg: number) {
        return new Theta({degrees: this.degrees - deg});
    }

    static Degrees(deg: number) {
        return new Theta({degrees: deg});
    }

    static Radians(rad: number) {
        return new Theta({radians: rad});
    }
}


export function toRadians(angle: number) {
    return angle * (Math.PI / 180);
}

export function toDegrees(angle: number) {
    return angle * (180 / Math.PI);
}

/**
 三角函数
 @link https://zh.wikipedia.org/wiki/%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0#%E4%BB%A5%E7%9B%B4%E8%A7%92%E5%9D%90%E6%A0%87%E7%B3%BB%E4%BE%86%E5%AE%9A%E4%B9%89
 *
 * */
// 根据角度与 X，计算斜边
function getRX(theta: Theta, x: number) {
    return Math.abs(x / Math.cos(theta.radians));
}

// 根据角度与 Y，计算斜边
function getRY(theta: Theta, y: number) {
    return Math.abs(y / Math.sin(theta.radians));
}

/**
 * @description 笛卡尔坐标系转极坐标系
 * 接受一个坐标，返回其距原点的距离r和角度theta
 * */
export function cartesian2Polar(x: number, y: number) {
    const r = Math.sqrt(x * x + y * y);
    const theta = Theta.Radians(Math.atan(y / x));
    return {r, theta};
}

/**
 * @desccription 极坐标系转笛卡尔坐标系
 * 接受一个距原点的距离r和一个角度theta
 * */
export function polar2Cartesian(r: number, theta: Theta) {
    const radians = theta.radians;
    const x = r * Math.cos(radians);
    const y = r * Math.sin(radians);
    return {x, y};
}

/**
 * @description 计算一个矩形与其中心射线的交点（坐标在矩形中心）
 * 接受矩形坐标尺寸信息与射线角度
 * */
export function getCrossPoint(rect: Rect, theta: Theta) {
    const x = rect.width / 2;
    const y = rect.height / 2;

    // 延长矩形四边，会形成一个井字行，射线从中心出发，必然会与与两条线相交。
    // 分别计算这两个交点距离中心的距离，取最小值
    const r1 = getRX(theta, x);
    const r2 = getRY(theta, y);
    const rmin = Math.min(r1, r2);
    const rmax = Math.max(r1, r2);
    const point = polar2Cartesian(rmin, theta);
    const p2 = polar2Cartesian(rmax, theta);

    point.x += rect.width / 2 + rect.x;
    point.y += rect.height / 2 + rect.y;
    p2.x += rect.width / 2 + rect.x;
    p2.y += rect.height / 2 + rect.y;

    // 得到交点与中心距离后，相当于具有了一个极坐标，再转换为笛卡尔坐标
    return {
        point,
        radius: rmin,
        remote: p2,
    };
}

/**
 * 计算一个线段与矩形的交点
 * */
export function crossWith(rect: Rect, start: Point, end: Point): {
    tail: Point
    head: Point
} | null {

    const theta = Theta.Radians(Math.atan2(end.y - start.y, end.x - start.x));
    const {point, remote} = getCrossPoint(rect, theta);

    // 判断交点是否在矩形内
    if (point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height) {
        return {
            head: point,
            tail: remote,
        };
    }

    return null;


}

export function getCross(rect: Rect, theta: Theta) {
    const {point: head, remote} = getCrossPoint(rect, theta); // 射线正前方的交点
    const tail = getCrossPoint(rect, Theta.Degrees(theta.degrees + 180)).point; // 射线背后的交点

    return {
        head,
        tail,
        remote,
    };
}


export function getAngleBetween(a: Point, b: Point) {
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}

class Vec {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    normalize(): Vec {
        return this.divide(this.len());
    }

    len2(): number {
        return this.x * this.x + this.y * this.y;
    }

    len(): number {
        return Math.sqrt(this.len2());
    }

    add(b: Vec): Vec {
        return new Vec(this.x + b.x, this.y + b.y);
    }

    subtract(b: Vec): Vec {
        return new Vec(this.x - b.x, this.y - b.y);
    }

    multiply(t: number): Vec {
        return new Vec(this.x * t, this.y * t);
    }

    divide(t: number): Vec {
        return new Vec(this.x / t, this.y / t);
    }

    negate(): Vec {
        return new Vec(-this.x, -this.y);
    }

    distanceTo(other: Vec): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
//向量积的模
export function cross(a: Vec, b: Vec): number {
    return a.x * b.y - b.x * a.y;
}

//求解两直线交点
//p1、v1 用于表示直线 1，p2、v2 用于表示直线 2
function _intersection(p1: Vec, v1: Vec, p2: Vec, v2: Vec): Vec {
    const t = cross(p2.subtract(p1), v2) / cross(v1, v2);
    return p1.add(v1.multiply(t));
}

interface Line {
    start: Point;
    end: Point;
}
export function intersection(a: Line, b: Line) {
    const p1 = new Vec(a.start.x, a.start.y);
    const v1 = new Vec(a.end.x - a.start.x, a.end.y - a.start.y);
    const p2 = new Vec(b.start.x, b.start.y);
    const v2 = new Vec(b.end.x - b.start.x, b.end.y - b.start.y);

    return _intersection(p1, v1, p2, v2);
}

export const distance = (a: Point, b: Point) => {
    return new Vec(a.x, a.y).distanceTo(new Vec(b.x, b.y));
}

export function sortCollinearPoints(points: Point[]): Point[] {
    if (points.length !== 4) {
        throw new Error("Exactly 4 points are required");
    }

    const referencePoint = points[0];
    return points.sort((a, b) => distance(referencePoint, a) - distance(referencePoint, b));
}

export function getMidPoint(a: Point, b: Point): Point {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    };
}

/**
 * 获取线性渐变的起始点和结束点
 * 这两点的定义是矩形四个顶点与渐变线作垂直线的交点中，距离矩形中心最远的两个点
 * */
export function getLinearGradiant(rect: Rect, theta: Theta) {
    const points = [
        {x: rect.x, y: rect.y},
        {x: rect.x + rect.width, y: rect.y},
        {x: rect.x + rect.width, y: rect.y + rect.height},
        {x: rect.x, y: rect.y + rect.height},
    ]
    const center = {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2};

}
