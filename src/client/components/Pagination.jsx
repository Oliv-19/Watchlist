const PagButton = ({direction, changePage}) => {
    const directions = {
        prev: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/></svg>,
        next: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
    }

    return (
        <button onClick={()=> {changePage(direction)}} type="button" className="cursor-pointer inline-flex items-center justify-center box-border outline outline-black  hover:bg-black hover:text-white  w-9 h-9 ">
            {directions[direction]}
        </button>
    )
}

export const Pagination = ({changePage, length, actualPage}) => {
    const inputChangePage = (e)=> {
        e.preventDefault()
        const form = new FormData(e.target)
        changePage(form.get('page'))
    }
    return (
        <form id="page" className="flex justify-around" role="group" onSubmit={inputChangePage}>
            <PagButton direction={'prev'} changePage={changePage}/>
            <input name="page" type="text" placeholder={`${actualPage} of ${length}`} className="inline-flex text-sm items-center justify-center box-border outline outline-black px-3 h-9 w-[4.3rem]"/>
            <button type="submit" form="page" className="invisible"></button>
            <PagButton direction={'next'} changePage={changePage}/>
        </form>
    )
}
