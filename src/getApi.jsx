import axios from "axios";
import { useState, useEffect } from "react"; 

const useCustomReactQuery = (urlPath) => {
    const [product, setProduct] = useState([]);


const fetchData =async () => {
    try {
        const response = await axios.get(urlPath);
      
    
        
        setProduct(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
    useEffect(() => {
 fetchData();
    }, [ urlPath]); // Added urlPath to the dependency array


    return product
}

export default useCustomReactQuery