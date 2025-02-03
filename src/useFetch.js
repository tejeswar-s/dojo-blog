import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal : abortCont.signal })
            .then(response => {
                if (!response.ok) {
                    setLoading(false);
                    throw new Error('Network response was not ok');
                }
                return response.json()
            })
            .then(data => {
                setLoading(false);
                setData(data);
                setError(null);
            })
            .catch((e) => {
                if(e.name === 'AbortError') {
                    console.log('fetch aborted');
                }
                else {
                    setError(e.message);
                    setLoading(false);
                }
            })
        }, 1000);

        return  () => abortCont.abort();
        
    }, [url]);

    return {data, loading, error};
}
 
export default useFetch;