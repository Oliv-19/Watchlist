import { useLocation } from "react-router-dom";
import Card from "./Card";
import { useSearch } from "./hooks";
import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

function SearchResults() {
    const location = useLocation()
    const query = location.state
    const [pageNum, setPageNum] = useState(1)
    const [series, setSeries] = useState(null)
    const results = useSearch('searchAll', query, pageNum)

    useEffect(()=> {
        if(results){
            setSeries(results)
        }
    }, [results])
    if(series == null){
        return <div>Loading...</div>
    }
    const changePage = (dir) => {
        if(dir == 'prev'){
            setPageNum((prev)=> prev-1)
        }else if( dir == 'next'){
            setPageNum((prev)=> prev+1)
        }else {
            setPageNum(dir)
        }
    }
    
    return (
        <div className="flex flex-col items-center">

            <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
            {Object.entries(series.results).map(([key, value]) => <Card data={value} key={key}></Card>)}
            </div>
            <div className="p-6">
                <Pagination changePage={changePage} actualPage={pageNum} length={results.total_pages}/>
            </div>
        </div>
    )
}

export default SearchResults