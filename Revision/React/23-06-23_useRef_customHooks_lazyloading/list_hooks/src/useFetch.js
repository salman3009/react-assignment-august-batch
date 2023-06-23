import axios from 'axios';
import { useEffect,useState } from 'react';


const useFetch=(url)=>{

    const [data,setData] = useState([]);

    useEffect(()=>{
       axios.get(url).then((result)=>setData(result.data));
    },[url])

    return data;

}
export default useFetch;