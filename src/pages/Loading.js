import React from 'react'
import loader from './loader.gif'; 

export default function Loading() {
    return (
      <div style={{height:500, textAlign:"center", marginLeft:100, width:500, justifyContent:'center', alignItems:"center" }}>
        <img style={{height:200, width:200}} src={loader} alt="Logo" />
            <p style={{color:"blue", fontSize:25, fontWeight:"bold"}}>Kindly wait while we process your Kadify card payment...</p>
      </div>
  )
}
