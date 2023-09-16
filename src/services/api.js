const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
    const responseData = await fetchData(`${apiBaseUrl}/auth/register`, "POST", userData);
    return responseData;
}

export const loginUser = async (loginData) => {
    const responseData = await fetchData(`${apiBaseUrl}/auth/login`, "POST", loginData)
    return responseData;
}

export const getCategories = async () => {
    const responseData = await fetchData(`${apiBaseUrl}/categories/all`, "GET")
    return responseData;
}

export const getCategoriesData = async () => {    
    const responseData = await fetchData(`${apiBaseUrl}/categories/categoriesData`, "GET")   
    return responseData;    
}

export const newPassword = async (email) => {        
    const responseData = await fetchData(`${apiBaseUrl}/reset`, "POST", {email})
    return responseData;
}

export const updatePassword = async (token, password) => {
    const responseData = await fetchData(`${apiBaseUrl}/reset/new-password`, "PATCH", {token, password})
    return responseData;
}

export const logoutUser = async () => {
    const responseData = await fetchData(`${apiBaseUrl}/auth/logout`, "GET")
    return responseData;
}

export const createCategoryOrSubcategory = async (formData) => {  
    const responseData = await fetchData(`${apiBaseUrl}/categories/new`, "POST", formData, true)
    return responseData;
}

export const createProduct = async (formData) => {  
    const responseData = await fetchData(`${apiBaseUrl}/products/new`, "POST", formData, true)
    return responseData;
}

export const getSubcategoryProductsList = async (id) => {
    const responseData = await fetchData(`${apiBaseUrl}/products/list/${id}`, "GET")
    return responseData;
}