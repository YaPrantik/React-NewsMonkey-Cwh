import React  from 'react'

const NewsIteam =(props) => {
        let { title, description, imgUrl, newsUrl, author, date, source} = props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imgUrl ? "http://www.simpleimageresizer.com/_uploads/photos/1c9c4f1e/img-bg_1_600x450.jpg" : imgUrl} className="card-img-top" alt=" Not found" />
                    <div className="card-body">
                        <h5 className="card-title">{title}  <br/><span className="badge rounded-pill bg-info text-dark">{source}</span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn bt-sm btn-dark">Read more</a>
                    </div>
                </div>

            </div>
        )
}

export default NewsIteam
