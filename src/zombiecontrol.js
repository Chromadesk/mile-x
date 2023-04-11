import gameContextObject from "./gamecontrol"

export class Zombie {
    health = 100
    following = false
    zombieLocal = null
    zombieSubLocal = null

    constructor(cords, point) {
        this.zombieCords = cords
        this.zombiePoint = point
        gameContextObject.register(this)
    }
}