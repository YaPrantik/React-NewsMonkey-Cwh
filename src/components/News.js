import React, { useEffect, useState } from 'react'
import NewsIteam from './NewsIteam'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalResult] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
        // eslint-disable-next-line
    },[])


    const  updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let paresdData = await data.json();
        props.setProgress(60);
        setArticles(paresdData.articles)
        setTotalResult(paresdData.totalResult)
        setLoading(false)
        props.setProgress(100);
    }
    
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let paresdData = await data.json();
        setArticles(articles.concat(paresdData.articles))
        setTotalResult(paresdData.totalResults)
        setLoading(false)
       
    };
        return (
            <>
                <h1 className="text-center" style={{margin:'35px 0px' , marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines.</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResult}
                    loader={<Spinner />}
                >
                    <div className="container my-3">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsIteam title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


            </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
}


export default News
