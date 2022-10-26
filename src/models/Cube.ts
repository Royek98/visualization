interface Center {
    x: number,
    y: number,
    z: number
}
interface Validated {
    id: string,
    collisionType: string
}

export interface Cube {
    id: string,
    name: string,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    center: Center,
    rotation: number
    validated: Validated[]
}