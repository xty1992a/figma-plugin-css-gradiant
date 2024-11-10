import {Vector2} from '@s7n/math'


const direct1 = new Vector2(1, 1).normalize()

const direct2 = new Vector2(10, 10).normalize()
const direct3 = new Vector2(-10, -10).normalize()

console.log(direct1.equals(direct2))
console.log(direct1.equals(direct3))

