const API_BASE_URL = 'http://localhost:4000';

const getData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error: ", error)
    }
}

export const getCategories = async () => {
    const data = await getData(`${API_BASE_URL}/categories`)
    return data;
}