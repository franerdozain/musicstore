const API_BASE_URL = 'http://localhost:4000';

const fetchData = async (url, method, data = null, files = false) => {
    try {
        let options = {
            method,
            credentials: "include",          
        }

        if (files) {
            const formData = new FormData();
            for (const key in data) {
                if (key !== 'images') {
                    formData.append(key, data[key]);
                }
            }

            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }                     

            options.body = formData;
        } else {
            options.headers = {
                'Content-Type': 'application/json'
            };
            if (method === "POST" || method === "PATCH") {
                options.body = JSON.stringify(data)
            }
        }

        const response = await fetch(url, options);
        const responseData = await response.json();

        return responseData;
    } catch (error) {
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
    const responseData = await fetchData(`${API_BASE_URL}/categories/all`, "GET")
    return responseData;
}

export const getCategoriesData = async () => {    
    const responseData = await fetchData(`${API_BASE_URL}/categories/categoriesData`, "GET")   
    return responseData;    
}

export const newPassword = async (email) => {        
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

export const createCategoryOrSubcategory = async (formData) => {  
    const responseData = await fetchData(`${API_BASE_URL}/categories/new`, "POST", formData, true)
    return responseData;
}

export const createProduct = async (formData) => {  
    const responseData = await fetchData(`${API_BASE_URL}/products/new`, "POST", formData, true)
    return responseData;
}
