import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import { useSearch } from "./hooks";
import { urlReducer } from "./reducers/urlReducer";
const key= import.meta.env.VITE_API_KEY

function SearchResults() {
    const location = useLocation()
    const query = location.state
    const results = useSearch('searchAll', query)

    if(results == null){
        return <div>Loading...</div>
    }
    return (
        <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
        {Object.entries(results.results).map(([key, value]) => <Card data={value} key={value.id}></Card>)}
        </div>
    )
}

export default SearchResults