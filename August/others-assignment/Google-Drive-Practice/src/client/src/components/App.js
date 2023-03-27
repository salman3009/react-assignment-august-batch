import React, { useEffect,useState } from "react";
import '../styles/App.css';



const App = () => {

  const[currentLocation,setCurrentLocation] = useState([]);
  const[currentStructure,setCurrentStructure] = useState([]);

  const renderLocation=()=>{
   let renderList=[];
   renderList.push(<span key={'-1'}><a style={{color:'red'}} onClick={()=>setCurrentLocation([])}>Drive/</a></span>);

    currentLocation.forEach((obj,index)=>{
      renderList.push(<span key={index}><a style={{color:'red'}} onClick={()=>setCurrentLocation(currentLocation.slice(0,index+1))}>{obj}/</a></span>);
     })
   
 
   
   
   return renderList;
  }

  const openFile=(name)=>{
    fetch(`http://localhost:8080/api/file?location=${currentLocation.join('/')}&name=${(name)}`).then((result)=>{
      return result.json();
    }).then((result)=>{
         console.log(result);
        document.getElementById('file-text-content').innerText = result.data;
    })
  }

  const renderStructure=()=>{
    let renderList=[];
   currentStructure.forEach((e,index)=>{
     if(e.isFile){
       renderList.push(<div key={index}><a onClick={()=>openFile(e.name)}>{e.name}</a></div>)
     }else{
      renderList.push(<div key={index}><a onClick={()=>setCurrentLocation([...currentLocation,e.name])}>{e.name}</a></div>)
     }

   })
     return renderList;
  }

  useEffect(()=>{
      fetch(`http://localhost:8080/api/folder?location=${currentLocation.join('/')}`).then((result)=>{
        return result.json();
      }).then((result)=>{
           console.log(result);
           setCurrentStructure(result);
      })
  },[currentLocation])

  // write your code here
  return (<>
  <div id="location-url">{renderLocation()}</div>
  <div id="files-and-folder">
     {renderStructure()}
  </div>
  <div id="file-text-content"></div>
  </>);
}


export default App;
