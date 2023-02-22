export default async function useSVGFetch(url) {
    try {
        const response = await fetch(url)
        const data = await response.text()
        return data
    } catch(error) {
        console.log("Error: ", error)
        return null
    }
}