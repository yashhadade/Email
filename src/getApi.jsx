import axios from "axios";
import { useState, useEffect } from "react"; 

const useCustomReactQuery = (urlPath) => {
    const [product, setProduct] = useState([]);
    

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${urlPath}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, [ urlPath]); // Added urlPath to the dependency array

    return [product,setProduct];
}

export default useCustomReactQuery