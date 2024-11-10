import {Vector2} from '@s7n/math'

function rotateVectorToHorizontal(vector: Vector2): Vector2 {
    return new Vector2(vector.length, 0);
}

const vec = new Vector2(1, 1)

console.log(rotateVectorToHorizontal(vec))

