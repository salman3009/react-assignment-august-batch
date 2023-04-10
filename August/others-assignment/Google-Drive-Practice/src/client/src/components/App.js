import React, { useEffect,useState } from "react";
import '../styles/App.css';



const App = () => {

  const[currentLocation,setCurrentLocation] = useState([]);
  const[currentStructure,setCurrentStructure] = useState([]);
  let [selectedFile, setSelectedFile] = useState("")

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

  const onAddFolder=()=>{
    fetch(`http://localhost:8080/api/folder`, {
      method: 'POST', 
      body: JSON.stringify({ location: currentLocation.join('/'), name: "ayshu" }), 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(e => {
      if (e.status === 200) {
        setCurrentStructure([...currentStructure, { name: "salman", isFile: false }])
      } else alert('Failed to create folder.')
    })
  }

  const renameFolder=()=>{
    fetch(`/api/folder`, {
      method: 'PATCH', body: JSON.stringify({ location: currentLocation.join('/'), oldName:"index.txt", newName:"tahreen.txt" }), headers: {
        'Content-Type': 'application/json'
      }
    }).then((e) => {
      if (e.status === 200) {
        let oldStructure = [...currentStructure];
        oldStructure = oldStructure.filter(e => e.name !== "salman")
        setCurrentStructure([{ name: "akash", isFile: false }, ...oldStructure])
      } else
        alert('Failed to rename folder.')
    })
  }
  const deleteFolder=()=>{
    fetch(`/api/folder`, {
      method: 'DELETE', body: JSON.stringify({ location: currentLocation.join('/'), name:'tahreen.t' }), headers: {
        'Content-Type': 'application/json'
      }
    }).then((e) => {
      if (e.status === 200) {
        let oldStructure = currentStructure;
        oldStructure = oldStructure.filter(e => e.name !== 'tahreen')
        setCurrentStructure(oldStructure)
      } else
        alert('Failed to remove folder.')

    })
  }
  const uploadFile=()=>{
    const formData = new FormData();
    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    );
    formData.append("location", currentLocation.join('/'))
    formData.append("fileName", selectedFile.name)
    fetch("http://localhost:8080/api/file", { method: "POST", body: formData }).then(e => {
      if (e.status === 200) {
        let oldStructure = currentStructure;
        setCurrentStructure([...oldStructure, { name: selectedFile.name, isFile: true }])
        setSelectedFile('')
      }
      else {
        alert('Failed to upload file.')
      }
    });
  }
  // write your code here
  return (<>
  <div id="location-url">{renderLocation()}</div>
  <div id="files-and-folder">
     {renderStructure()}
  </div>
  <div id="file-text-content"></div>
  <button onClick={onAddFolder}>Add Folder</button>
  <button onClick={renameFolder}>Rename Folder</button>
  <button onClick={deleteFolder}>Delete Folder</button>
  <br/>
  <input type="file" name="file"  onChange={(e) => { setSelectedFile(e.target.files[0]) }}/>
  <br/>
  <button onClick={uploadFile}>Add Folder</button>

  </>);
}


export default App;
