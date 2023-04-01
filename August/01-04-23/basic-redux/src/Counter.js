import { useSelector } from "react-redux";



const Counter=()=>{
    const centralData = useSelector((state)=>state.newton);
    console.log(centralData);

    return (<div>
     Counter component
    </div>)
 }
 
 export default Counter;