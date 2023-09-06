const API_BASE_URL = 'http://localhost:4000';

const fetchData = async (url, method, data = null, files = false) => {
    try {
        let options = {
            method,
            credentials: "include",
            // headers: {
            //     'Content-Type': 'application/json'                
            // }
            headers: files ? {} : { 'Content-Type': 'application/json' },
        }

        if (files){
            const boundary = 'boundary-' + Math.random().toString(16).substring(2) + new Date().getTime();
            options.headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;

        }

        if (method === "POST" || method === "PATCH") {
            // options.body = JSON.stringify(data)
            options.body = files ? data : JSON.stringify(data);
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
    const responseData = await fetchData(`${API_BASE_URL}/categories`, "GET")
    return responseData;
}

export const resetPassword = async (email) => {        
    const responseData = await fetchData(`${API_BASE_URL}/reset`, "POST", {email})
    return responseData;
}

export const updatePassword = async (token, password) => {
    const responseData = await fetchData(`${API_BASE_URL}/reset/new-password`, "PATCH", {token, password})
    return responseData;
}

export const logoutUser = async () => {
    const responseData = await fetchData(`${API_BASE_URL}/auth/logout`, "GET")
    return responseData;
}

export const getCategoriesImages = async () => {
    const responseData = await fetchData(`${API_BASE_URL}/images/categories`, "GET")   
    return responseData;
}

export const uploadImages = async (formData) => {  
    console.log("gohan", formData);
    const responseData = await fetchData(`${API_BASE_URL}/images/categories/new`, "POST", {formData}, true)
    return responseData;
}