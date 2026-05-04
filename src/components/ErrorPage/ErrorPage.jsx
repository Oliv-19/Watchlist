import {useNavigate } from "react-router"

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