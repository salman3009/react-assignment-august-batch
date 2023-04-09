import { useEffect, useState } from "react";


const UseFetch=(url)=>{

    const [getList,setList] =useState(null);
    useEffect(()=>{
      fetch(url).then((data)=>data.json()).then((result)=>{
         setList(result);
         console.log(result);
      })
    },[url])

      return getList;
}
export default UseFetch;