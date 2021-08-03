import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Movies(props) {
    const { id } = useParams();
    let [currentMovie, setcurrentMoive] = useState("");
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=4bcfe4d5b96cbe94853cacb35fd2b4cd&language=en-US&append_to_response=videos`;
    let prefix = "https://image.tmdb.org/t/p/original";
    //let trailerUrl = "http://api.themoviedb.org/3/movie/464052/videos?api_key=4bcfe4d5b96cbe94853cacb35fd2b4cd";
    let [loading, setLoading] = useState(true);

    async function getMovie() {
        let obj = await fetch(url);
        obj = await obj.json();
        setcurrentMoive(obj);
        setLoading(false)
    }
    useEffect(() => {
        getMovie();
        // eslint-disable-next-line
    }, []);
    // let link = prefix + currentMovie["backdrop_path"];
    let link = prefix + currentMovie["poster_path"];
    if (!loading) {
        return (
            <div className="container-1" style={{
                backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.4), 
            rgba(0, 0, 0, 0.4)
            ), url(${prefix}${currentMovie["backdrop_path"]})`
            }}>
                <div className="left"><img src={link} alt={currentMovie["original_title"]} /></div>
                <div className="right">
                    <div className="title">{currentMovie["original_title"]}</div>
                    <div className="tagline">{currentMovie["tagline"]}</div>
                    <div className="message">{currentMovie["overview"]}</div>
                    <div className="buttons">{(currentMovie["genres"]).map(elem => <div className="genre">{elem.name}</div>)}</div>

                    <a href={`https://www.youtube.com/watch?v=${currentMovie["videos"]["results"][0]["key"]}`} target="_blank" rel="noreferrer noopener">Watch Trailer</a>
                </div>
            </div>
        )
    } else {
        return (
            <h1 style={{ color: "white" }}>Loading...</h1>
        )
    }

}