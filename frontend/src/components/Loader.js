import React from 'react'
import gifPath from "../images/loader.gif"
export default function Loader() {
  return (
    <div className="loader">
      <img src={gifPath} alt="Loading..." className="spinner" />
    </div>
  )
}
