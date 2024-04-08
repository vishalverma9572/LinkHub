import React from 'react'

export default function Linkcard(props) {
    const { data } = props;
  return (
    
          <div className="links">
            {/* {data &&
              data.links.map((link, index) => (
                <div key={index} className="link">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                </div>
              ))} */}
          </div>
  )
}
