import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function useApi(apiFetch, ...args) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
            try {
                // setTimeout for testing loading animation 
                await new Promise((resolve) => setTimeout(resolve, 2000));                
                const data = await apiFetch(...args);
                setData(data);               
            } catch (error) {
                throw error;
            } finally {                
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return {
        data,
        loading,
        LoadingAnimation: 
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> 
    };
}

export default useApi;