export function convertDegreesToDirection(deg) {
    const arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    let index = parseInt((deg/22.5)+.5)
    return arr[(index % 16)]

}