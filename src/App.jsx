
import './App.css'
import Email from './Email'
import React, { useEffect, useState } from 'react';
import useCustomReactQuery from './getApi'
import axios from 'axios';

function App() {
  const [hidden, setHiddden] = useState(true);
  const [productData, setProductData] = useState([]);
  const [openEmailId, setOpenEmailId] = useState(null);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [favorite, setFavorite] = useState([])
  const [isRead,setIsRead]=useState([]);
  const [allProduct,setAllProduct] =useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  
  function handleUnRead() {
    setFilteredProduct(allProduct.filter(email => !isRead.includes(email.id)));
  }


  function handleRead(){
    setFilteredProduct(allProduct.filter(email => isRead.includes(email.id)));
  }
  function handleFavoriteFilter(){
    setFilteredProduct(allProduct?.filter(email=> favorite.includes(email.id)))
  }
 
  
  
  function handleFavorite(id) {
    setFavorite((prev) => {

      if (prev.includes(id)) {

        return prev.filter((favId) => favId !== id);
      } else {

        return [...prev, id];
      }
    });
  }

  const product = useCustomReactQuery("https://flipkart-email-mock.now.sh/")


useEffect(()=>{
setAllProduct(product?.list);
setFilteredProduct(product?.list)
},[product])


  const fetchData = async () => {
    try {
      if (openEmailId) {

        const response = await axios.get(`https://flipkart-email-mock.now.sh/?id=${openEmailId}`);
        setProductData(response.data);
        if (response) setHiddden(false)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [openEmailId]);

  useEffect(() => {

    if (filteredProduct && productData) {
      const filtered = filteredProduct?.filter(data => data.id === productData.id);
      setFilteredEmails(filtered);
    } else {
      setFilteredEmails(product?.list || []);
    }
  }, [product, productData]);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12';
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };


  return (
    <div style={{ display: "flex", flexDirection:"column" }}>
      <div  >Filter by :<button className='filterBy' onClick={handleUnRead}>Unread</button ><button className='filterBy' onClick={handleRead}>Read</button><button className='filterBy' onClick={handleFavoriteFilter}>Favorite</button>
      <button className='filterBy' onClick={()=>setFilteredProduct(allProduct)}>All email</button></div>
      
      <br></br>
      <div style={{ display: "flex" }}>


      <div style={{ width: openEmailId == null ? "100%" : "40%", overflowY: "auto", height: "100vh" }}>
        {
          filteredProduct?.map((data) => (
            <Email email={data} key={data.id}  setHiddden={setHiddden} openEmailId={openEmailId} setOpenEmailId={setOpenEmailId} favorite={favorite} filteredEmails={filteredEmails} isRead={isRead} setIsRead={setIsRead}/>

          ))
        }
      </div>

      {
        productData && !hidden && openEmailId != null && (
          <div className="Body" style={{ width: '55%', height: "90vh" }}>
            
            <div style={{ height: "100vh", width: "10%",backgroundColor:"transparent" }}>
              <div className="circle">{filteredEmails[0]?.from.name.charAt(0).toUpperCase()}</div>
            </div>
            <div >
              <div style={{ display: "flex", justifyContent: "space-between" }}>

                <h1>{filteredEmails[0]?.subject}</h1>
                <button
                  className='favbutton'
                  onClick={() => handleFavorite(filteredEmails[0]?.id)}
                  style={favorite?.includes(filteredEmails[0]?.id) ? { backgroundColor: "gray" } : {}}
                >
                  {favorite?.includes(filteredEmails[0]?.id) ? "Mark as unfavorite" : "Mark as favorite"}
                </button>

              </div>
              <p>{formatDateTime(filteredEmails[0]?.date)}</p>

              <div>{productData.body}</div>
            </div>
          </div>
        )
      }
    </div>
      </div>
  )
}

export default App
