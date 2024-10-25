import React, { useState } from 'react';


function Email({ email,favorite,setHiddden ,openEmailId,setOpenEmailId,isRead,setIsRead}) {


  const handleView = (id) => {
    setHiddden(false);
    
    setOpenEmailId(openEmailId === id ? null : id); // Toggle email view
    setIsRead((prev)=>[...prev, id])
  };

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
    <div style={{display:"flex"}}>
     
    <div className='container' >

        <div key={email.id} className='EmailBlock' onClick={() => handleView(email.id)} style={isRead?.includes(email?.id) ? { backgroundColor: "#F2F2F2" } : {  backgroundColor: '#F4F5F9'}} >
          <div className="circle">{email.from.name.charAt(0).toUpperCase()}</div>
          <div className='EmailDetail'>
            <p>From: <b>{email.from.name}</b> &lt;{email.from.email}&gt;</p>
            <p>Subject: <b>{email.subject}</b></p>
            <p>{email.short_description} </p>
            
            <div style={{display:"flex"}}>
            <p>{formatDateTime(email.date)}</p>
            <p style={favorite?.includes(email?.id) ? { color: "red",paddingLeft:"10px" } : {}}>{...favorite?.includes(email?.id) ? "Favorite" : ""}</p>
            </div>
          </div>
   
      </div>
    </div>
   
      </div>
  );
}

export default Email;
