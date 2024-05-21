import { useState, useEffect } from 'react';
import axios from 'axios'

const { VITE_BACKEND_URL } = import.meta.env;

interface LinkProps {
    clicks: number;
    createdAt: number;
    redirectURL: string;
    shortId: string;
    updatedAt: number;
    visitHistory?: any[]; // Assuming visitHistory is an array of any type,
    handleLinkChange: (shortId: string) => void;
  }

const useLinks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<LinkProps[] | null>(null);
  const [error, setError] = useState(null);

  useEffect( () => {
    setIsLoading(true);
    axios.get(`${VITE_BACKEND_URL}/api/v1/user/geturls`,{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    }).then((res)=>{
        setData(res.data.length? res.data : [])
    }).catch(error=>{
        setError(error)
    }).finally(()=> setIsLoading(false))
  }, []);

  return { isLoading, data, error };
};

export default useLinks;
