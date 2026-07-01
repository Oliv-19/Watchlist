import { useParams } from "react-router-dom";
import Card from "../Card";
import { useData } from "../hooks";
import { useState, useEffect } from "react";
import { Pagination } from "../Pagination";

function SearchResults() {
    const {query} = useParams()
    const [pageNum, setPageNum] = useState(1)
    const series = useData({type: 'search', query, page: pageNum})
    
    if(series == null){
        return <div>Loading...</div>
    }
    
    return (
        <div className="flex flex-col items-center">

            <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
            {series.data.map((serie) => <Card data={serie} key={serie.id}></Card>)}
            </div>
            <div className="p-6">
                <Pagination actualPage={pageNum} setPageNum={setPageNum} length={series.totalPages}/>
            </div>
        </div>
    )
}

export default SearchResults