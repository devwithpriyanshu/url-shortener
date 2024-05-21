import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"

const { VITE_BACKEND_URL } = import.meta.env;

export default function RedirectHandler() {
    const {shortid} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`${VITE_BACKEND_URL}/api/v1/url/${shortid}`,{
            headers:{
                "Content-Type":"application/json"
            },
        }).then((res)=>{
            if(res.statusText === 'OK'){

                window.location.href = res.data.url;
            }
        }).catch(error=>{
            console.error('Error:', error);
            // alert('An error occurred while trying to redirect.');
            navigate('/');
        })

      }, [shortid, navigate]);

      return <div>Redirecting...</div>;
}
