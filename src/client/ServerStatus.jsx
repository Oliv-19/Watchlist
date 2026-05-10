import { useEffect, useState } from "react";

export function ServerStatus() {
    const [health, setHealth] = useState('')
    useEffect(()=> {
        async function fetchServer() {
            console.log('calling');
            try{
                const response = await fetch('/api/health')
                const res = await response?.json()
                setHealth(res)
            } catch {
                setHealth('server not found')
            }
        }
        fetchServer()
    }, [])
    return (
        <div className="flex flex-col items-center justify-center h-[85dvh] bg-black text-white">
            <h1 className="text-lg">Server Status: </h1>
            {health}
        </div>
    )
}