import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
    let [currentPage, setCurrentPage] = useState(1);
    let [loading, setLoading] = useState(true);
    let history = useHistory();
    function toMovies(id) {
        history.push(`/Movies/${id}`);
    }
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=4bcfe4d5b96cbe94853cacb35fd2b4cd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`;
    let prefix = "https://image.tmdb.org/t/p/w500";
    let [values, setValues] = useState([]);
    async function getMovies(url) {
        setLoading(true);
        let obj = await fetch(url);
        obj = await obj.json();
        setLoading(false);
        setValues(obj.results)
        console.log(obj);
    }

    useEffect(() => {
        getMovies(url);
    }, [url, currentPage])
    if (!loading) {
        return (
            <div>
                <h1>Movies For You</h1>
                <div className="container">
                    {values.map((elem, index) => {
                        let link = prefix + elem["poster_path"];
                        return <div className="image" key={index}>
                            <div className="information">
                                <div className="top">
                                    <div className="info-title">{elem["original_title"]}</div>
                                </div>
                                <hr />
                                <div className="bottom">
                                    <div className="info-message">{`${elem["overview"].slice(0, 120)}...`}</div>
                                    <div className="info-rating">{elem["vote_average"]}</div>
                                </div>
                            </div>
                            <img onClick={() => goToMovie(elem["id"])} src={link} alt={elem["original_title"]} />
                        </div>
                    }
                    )};
                    <div className="options">
                        <div className="previous" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} style={{ opacity: currentPage === 1 ? "0.4" : "1" }}>previous</div>
                        <div className="current">{currentPage}</div>
                        <div className="next" onClick={() => currentPage < 10 && setCurrentPage(currentPage + 1)} style={{ opacity: currentPage === 10 ? "0.4" : "1" }}>next</div>
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <h1 style={{ color: "white" }}>Loading...</h1>
        )
    }
    function goToMovie(id) {
        toMovies(id);
    }
}