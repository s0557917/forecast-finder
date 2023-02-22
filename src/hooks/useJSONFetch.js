export default async function useJSONFetch(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(error) {
        console.log("Error: ", error)
        return null
    }
}
