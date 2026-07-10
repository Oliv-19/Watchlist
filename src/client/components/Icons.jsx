export function Icon({title, style}){
    const icons = {
        calendar: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Release date</title>
                    <path d="M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z" />
                </svg>,
        search: <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>,
        tv: <svg xmlns="http://www.w3.org/2000/svg" width={'40'} viewBox="0 0 24 24" >
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M9 10v8l7-4zm12-4h-7.58l3.29-3.29L16 2l-4 4h-.03l-4-4-.69.71L10.56 6H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H3V8h18v12z"/>
            </svg>,
        genre: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>tag</title>
                <path d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.44 21.77,11.94 21.41,11.58Z" />
            </svg>,
        episodes: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M12,14.5V5.5L18,10L12,14.5Z" />
               </svg>,
        rating: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Rating</title>
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>,
        add: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Add to watchlist</title>
            <path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z" />
        </svg>,
        next: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Next</title>
                <path d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,18L16,12L10,6L8.6,7.4L13.2,12L8.6,16.6L10,18Z" />
            </svg>,
        prev: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Previous</title>
                <path d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.4,16.6L10.8,12L15.4,7.4L14,6L8,12L14,18L15.4,16.6Z" />
            </svg>,
        login: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>login</title>
                <path d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7M20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z" />
            </svg>,
        logout:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>logout</title>
                <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" />
            </svg>,
        leftArrow: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Log in</title>
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>,
        rightArrow: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>arrow-right</title>
            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
        </svg>,
        watchList : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>library</title>
                <path d="M12,8A3,3 0 0,0 15,5A3,3 0 0,0 12,2A3,3 0 0,0 9,5A3,3 0 0,0 12,8M12,11.54C9.64,9.35 6.5,8 3,8V19C6.5,19 9.64,20.35 12,22.54C14.36,20.35 17.5,19 21,19V8C17.5,8 14.36,9.35 12,11.54Z" />
            </svg>,
        menu: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>menu</title>
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>,
        dropped: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Dropped</title>
            <path d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" />
        </svg>,
        finished: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Finished</title>
            <path d="M20,2H4V4L9.81,8.36C6.14,9.57 4.14,13.53 5.35,17.2C6.56,20.87 10.5,22.87 14.19,21.66C17.86,20.45 19.86,16.5 18.65,12.82C17.95,10.71 16.3,9.05 14.19,8.36L20,4V2M14.94,19.5L12,17.78L9.06,19.5L9.84,16.17L7.25,13.93L10.66,13.64L12,10.5L13.34,13.64L16.75,13.93L14.16,16.17L14.94,19.5Z" />
        </svg>,
        dropdown:<svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
            fill="none" viewBox="0 0 24 24"><path stroke="currentColor" 
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            d="m19 9-7 7-7-7"/></svg>,
        filter: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>filter</title>
            <path d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" />
        </svg>,
        brokenImage: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Image not found</title>
            <path d="M21,5V11.59L18,8.58L14,12.59L10,8.59L6,12.59L3,9.58V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5M18,11.42L21,14.43V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V12.42L6,15.41L10,11.41L14,15.41" />
        </svg>
        
    }
    
    return (
        <div className={style? style :`w-6 fill-[#f7f5f0]`}>
            {icons[title]}
        </div>
    )
}