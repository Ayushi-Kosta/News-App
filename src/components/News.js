import React, { useEffect, useState } from 'react'
import NewsComponent from './NewsComponent'
import Spinner from './spinner';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

    const UpdatePage = async() => {
      props.setProgress(0);
      setLoading(true);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d7148318e6014cc9b201b11ccf492170&page=${page}&pageSize=${props.pageSize}`;
      props.setProgress(10);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(60);
      // console.log(props.category);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);

      //document.title = `News - ${props.category}`;
      props.setProgress(100);
      setPage(page+1);
    }

    useEffect(() => { //use instead of componentDidMount
      UpdatePage();
    }, []);

//prev and next handle functions
  // const  handleprev = async ()=>{
  //     setPage(page-1);
  //     UpdatePage();
  //   }
  // const  handlenext = async ()=>{
  //     setPage(page+1);
  //     UpdatePage();
  //   }

    //for infinite scroll
    const fetchMoreData = async () =>{
      // console.log("starts");
      // console.log(page);
      
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d7148318e6014cc9b201b11ccf492170&page=${page}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      // document.title = `News - ${props.category}`;
      // console.log("ends");
      setPage(page+1);
    }
    //ends 
    
    return (
      <div className="container my-3">
      <h1 style={{marginTop: '90px'}}>{`News - Top ${props.category} Headlines`}</h1>
      {/* {console.log(props.category)} */}
      {loading && <Spinner/>}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length!==totalResults}
        loader={<Spinner/>}>
        <div className="container">
          <div className="row">
          {articles.map((element)=>{
            return <div className="col-md-4 my-3" key={element.url}>
              {/* <NewsComponent title={element.title? element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88):""} imgUrl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/img/2022/08/14/1600x900/mahua_moitra_nirmala_sitharaman_1660436898170_1660436911039_1660436911039.jpg"} newsUrl={element.url}/> */}
              <NewsComponent title={element.title} description={element.description} imgUrl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/img/2022/08/14/1600x900/mahua_moitra_nirmala_sitharaman_1660436898170_1660436911039_1660436911039.jpg"} author={element.author? element.author: "Unknown"} time={element.publishedAt} newsUrl={element.url}/>
            </div>
          })} 
          </div>
        </div>
      </InfiniteScroll>
      </div>
    )


    //with previous and next buttons
    // return (
    //   <div className="container my-3">
    //   <h1>{`News - Top ${props.category} Headlines`}</h1>
    //   {/* {console.log(props.category)} */}
    //   {this.state.loading && <Spinner/>}
    //   <div className="row">
    //   {!this.state.loading && this.state.articles.map((element)=>{
    //     return <div className="col-md-4 my-3" key={element.url}>
    //       {/* <NewsComponent title={element.title? element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88):""} imgUrl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/img/2022/08/14/1600x900/mahua_moitra_nirmala_sitharaman_1660436898170_1660436911039_1660436911039.jpg"} newsUrl={element.url}/> */}
    //       <NewsComponent title={element.title} description={element.description} imgUrl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/img/2022/08/14/1600x900/mahua_moitra_nirmala_sitharaman_1660436898170_1660436911039_1660436911039.jpg"} author={element.author? element.author: "Unknown"} time={element.publishedAt} newsUrl={element.url}/>
    //     </div>
    //   })} 
    //   </div>
    //   <div className="container d-flex justify-content-between">
    //     <button disabled={this.state.page <= 1 } type="button" className="btn btn-dark mx-3" onClick={this.handleprev}>&larr; Previous</button>
    //     <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark mx-3" onClick={this.handlenext}>Next &rarr;</button>
    //     </div>
    //   </div>
    // )
}

export default News;