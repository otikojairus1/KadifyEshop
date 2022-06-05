import React from 'react'
import success from './success.gif'; 

export default function TransactionSuccess() {
    return (
      <div style={{height:500, textAlign:"center", marginLeft:100, width:500, justifyContent:'center', alignItems:"center" }}>
        <img style={{height:200, width:200}} src={success} alt="Logo" />
            <p style={{color:"blue", fontSize:25, fontWeight:"bold"}}>Your Kadify card transaction was completed successfully!</p>
      </div>
  )
}
