const map = []

export function generateMap(size) {
    while (map.length < size) {
        let yAxis = []
        while (yAxis.length < size) {
            yAxis.push(Math.round(Math.random() * 100))
        }
        let yAxisCopy = [...yAxis]
        map.push(yAxisCopy)
        console.log("map " + map)
        yAxis.length = 0
    }
    return map
}

export function getAtXY(x, y) {
    return map[x][y]
}