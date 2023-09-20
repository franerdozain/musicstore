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

// user 
export const registerUser = async (userData) => {
    const responseData = await fetchData(`${apiBaseUrl}/auth/register`, "POST", userData);
    return responseData;
}

export const loginUser = async (loginData) => {
    const responseData = await fetchData(`${apiBaseUrl}/auth/login`, "POST", loginData)
    return responseData;
}

export const checkUserStatus = async () => {
    const responseData = await fetchData(`${apiBaseUrl}/auth/status`, "GET");
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

export const getUserData = async (id) => {
    const responseData = await fetchData(`${apiBaseUrl}/users/${id}`, "GET")
    return responseData;
}

export const updateUserData = async (id, newData) => {
    const responseData = await fetchData(`${apiBaseUrl}/users/${id}`, "PATCH", newData)
    return responseData;
}

export const deleteUser = async (id) => {
    const responseData = await fetchData(`${apiBaseUrl}/users/${id}`, "DELETE")
    return responseData;
}

// categories
export const getCategories = async () => {
    const responseData = await fetchData(`${apiBaseUrl}/categories/all`, "GET")
    return responseData;
}

export const getCategoriesData = async () => {    
    const responseData = await fetchData(`${apiBaseUrl}/categories/categoriesData`, "GET")   
    return responseData;    
}


export const createCategoryOrSubcategory = async (formData) => {  
    const responseData = await fetchData(`${apiBaseUrl}/categories/new`, "POST", formData, true)
    return responseData;
}

// product
export const createProduct = async (formData) => {  
    const responseData = await fetchData(`${apiBaseUrl}/products/new`, "POST", formData, true)
    return responseData;
}

export const getProductsList = async (id, page, pageSize, sortBy, isCategory) => {
    const queryParams = new URLSearchParams({
        page,
        pageSize,
        sortBy,
        isCategory
    });

    const responseData = await fetchData(`${apiBaseUrl}/products/list/${id}?${queryParams}`, "GET");   
    return responseData;
}

export const getProduct = async (id) => {   
    const responseData = await fetchData(`${apiBaseUrl}/products/details/${id}`, "GET");   
    return responseData;
}

// cart
export const addToCart = async (data) => {
    const responseData = await fetchData(`${apiBaseUrl}/cart/add/`, 'POST', data);
    return responseData;
}

export const getCart = async () => {
    const responseData = await fetchData(`${apiBaseUrl}/cart/all/`, 'GET');
    return responseData;
}

export const deleteFromCart = async (id) => {
    const responseData = await fetchData(`${apiBaseUrl}/cart/${id}`, 'DELETE');
    return responseData;
}

export const modifyCartItemQuantity = async (productId, modifyType) => {  
    const responseData = await fetchData(`${apiBaseUrl}/cart/modify`, 'PATCH', {productId, modifyType});
    return responseData;
}

export const completePurchase = async (cartItems) => {
    const responseData = await fetchData(`${apiBaseUrl}/checkout`, "POST", {cartItems});
    return responseData;
}

export const search = async (q) => {
        const queryParams = new URLSearchParams({q});
        const responseData = await fetchData(`${apiBaseUrl}/search?${queryParams}`, "GET");   
        return responseData;
}