export async function fetchJSONData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(error) {
        console.log("Error: ", error)
        return null
    }
}

export async function fetchSVGData(url) {
    try {
        const response = await fetch(url)
        const data = await response.text()
        return data
    } catch(error) {
        console.log("Error: ", error)
        return null
    }
}