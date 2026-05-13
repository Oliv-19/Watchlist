import { useLocation } from "react-router-dom";
import Card from "./Card";
import { useSearch } from "./hooks";

const PagButton = ({direction}) => {
    const directions = {
        left: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/></svg>,
        right: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
    }

    return (
        <button type="button" className="cursor-pointer inline-flex items-center justify-center box-border outline outline-black  hover:bg-black hover:text-white  w-9 h-9 ">
            {directions[direction]}
        </button>
    )
}

const Pagination = () => {
  return (
    <div className="flex justify-around" role="group">
        <PagButton direction={'left'}/>
        <input type="text" placeholder="1 of 99" className="inline-flex text-sm items-center justify-center box-border outline outline-black px-3 h-9 w-[4.3rem]"/>
        <PagButton direction={'right'}/>
    </div>


  )
}


function SearchResults() {
    const location = useLocation()
    const query = location.state
    const results = useSearch('searchAll', query)

    if(results == null){
        return <div>Loading...</div>
    }
    return (
        <div className="flex flex-col items-center">

            <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
            {Object.entries(results.results).map(([key, value]) => <Card data={value} key={key}></Card>)}
            </div>
            <div className="p-6">
                <Pagination />
            </div>
        </div>
    )
}

export default SearchResults