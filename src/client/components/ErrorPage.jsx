
export default function ErrorPage(){
    const navigate = useNavigate()
    return (
        <main >
            <div >  
                <span>404</span>
                <h1>Page not found</h1>
                <button onClick={()=> navigate(-1)}>
                    Go back
                </button>
            </div>
        </main>
    )
}

export const ErrorMessage = ({message}) => {
    return (
        <div className="w-full flex justify-center mt-10 p-10 text-center text-white 
            font-medium text-[1rem] md:text-xl">
            <div className="bg-(--color-text-bg) w-fit p-10 rounded-xl">
                {message}
            </div>
        </div>
    )
}