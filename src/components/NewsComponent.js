import React from 'react'

export default function NewsComponent(props) {
  let {title, description, imgUrl, author, time, newsUrl} = props;
  return (
    <div>
      <div className="card">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
          {author}
        </span>
        <img src={imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-muted">By {author} on {time}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  )
}
