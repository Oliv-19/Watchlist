import { useLocation } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w342"; // Options: w92, w154, w185, w342, w500, w780, original
function Media() {
    const location = useLocation();
    const data = location.state;
    
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.poster_path}`
    return (
        <>
            {data && (
                <div>
                    <img src={fullImageUrl} alt="" />
                </div> 
            )
            }
        </>
        
    )
}

export default Media