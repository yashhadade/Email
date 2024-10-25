import React from 'react'

const Emailbody = () => {
  return (
    <div>
       {openEmailId === email.id && (
        <div className="Body" style={{ display: 'block', width: '55%',height:"100%" }}>
          <div>{product.body}</div>
        </div>
      )}
    </div>
  )
}

export default Emailbody
