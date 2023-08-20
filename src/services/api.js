const API_BASE_URL = 'http://localhost:4000';

const fetchData = async (url, method, data = null) => {
    try {
        let options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        if (method === "POST" || method === "PATCH") {
            options.body = JSON.stringify(data)
        }
        const response = await fetch(url, options);
        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.log("Error: ", error)
        throw error;
    }
}

export const registerUser = async (userData) => {
    const responseData = await fetchData(`${API_BASE_URL}/auth/register`, "POST", userData);
    return responseData;
}

export const loginUser = async (loginData) => {
    const responseData = await fetchData(`${API_BASE_URL}/auth/login`, "POST", loginData)
    return responseData;
}

export const getCategories = async () => {
    const data = await fetchData(`${API_BASE_URL}/categories`, "GET")
    return data;
}

