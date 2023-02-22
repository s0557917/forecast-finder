export default function isObjectEmpty(weatherObj) {
    return weatherObj
    && Object.keys(weatherObj).length === 0
    && Object.getPrototypeOf(weatherObj) === Object.prototype
}