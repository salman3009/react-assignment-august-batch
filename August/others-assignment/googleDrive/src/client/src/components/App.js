import React, { useState, useEffect } from "react";
import '../styles/App.css';
import fileSVG from '../svg/file-solid.svg'
import folderSVG from '../svg/folder-solid.svg'
const App = () => {

  let [currentLocation, setCurrentLocation] = useState([])
  let [currentStructure, setCurrentStructure] = useState([]);
  let [selectedFile, setSelectedFile] = useState("")
  let [currentOption, setCurrentOption] = useState(0)

  let renderLocation = () => {
    let returnStr = []
    returnStr.push(<span><a onClick={() => { setCurrentLocation([]) }} style={{ color: 'red' }}>{"drive"}</a>/</span>)
    for (let i in currentLocation)
      returnStr.push(<span><a onClick={() => { currentLocation.length !== (+i + 1) ? setCurrentLocation(currentLocation.slice(0, +i + 1)) : () => { } }} style={currentLocation.length !== (+i + 1) ? { color: 'red' } : {}}>{currentLocation[i]}</a>/</span>)

    return returnStr
  }
  let openFile = (name) => {
    fetch(`/api/file?location=${encodeURI(currentLocation.join('/'))}&name=${encodeURI(name)}`).then(e => {
      if (e.status === 200) { return e.json() }
      else {
        alert('no such file')
      }
    }).then(e => {
      document.getElementById('file-text-content').innerText = e.data
    })
  }

  useEffect(() => {

    fetch(`/api/folder?location=${currentLocation.join('/')}`, {
      method: 'GET',
    }).then(e => e.json()).then(e => {
      setCurrentStructure(e)
    })

  }, [currentLocation])

  let renderStructure = () => {
    let returnData = []
    currentStructure.forEach(e => {
      if (e.isFile) {
        returnData.push(
          <div className='folder-holder border' onClick={() => { openFile(e.name) }}>
            <img src={fileSVG} width="10px" style={{ color: 'black', marginRight: '5px' }} />{e.name}
          </div>
        )

      }
      else {
        returnData.push(
          <div className='folder-holder border'>
            <a style={{ color: "red" }} onClick={() => { setCurrentLocation([...currentLocation, e.name]) }}> <img src={folderSVG} width="15px" style={{ color: 'black', marginRight: '5px' }} />{" " + e.name + " "}</a>
          </div>)
      }
    })
    return returnData;
  }

  let uploadAFile = () => {
    const formData = new FormData();

    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    );

    formData.append("location", currentLocation.join('/'))
    formData.append("fileName", selectedFile.name)
// console.log(selectedFile)
    fetch("api/file", { method: "POST", body: formData }).then(e => {
      if (e.status === 200) {
        let oldStructure = currentStructure;
        setCurrentStructure([...oldStructure, { name: selectedFile.name, isFile: true }])
        setSelectedFile('')
        setCurrentOption(0);
      }
      else {
        alert('Failed to upload file.')
      }
    });
  }
  return (<div>
    <div id="location-url">location:- {renderLocation()}</div>

    <div className="panel panel-default m-2 border p-2" id="files-and-folder">
      <div className="panel-heading">Files and Folder</div>
      <div className="panel-body">{renderStructure()}</div>
    </div>
    <div className="panel panel-default m-2 border p-2" id="folder-options">
      <div className="panel-heading">Folder Options</div>
      <div className="panel-body">
        <button className="btn btn-dark m-1" onClick={() => { currentOption !== 1 ? setCurrentOption(1) : setCurrentOption(0) }}>Create a folder</button>
        <button className="btn btn-dark m-1" onClick={() => { currentOption !== 2 ? setCurrentOption(2) : setCurrentOption(0) }}>Rename a folder</button>
        <button className="btn btn-dark m-1" onClick={() => { currentOption !== 3 ? setCurrentOption(3) : setCurrentOption(0) }}>Remove a folder</button>
      </div>
      <div className="panel-body p-1">
        <div className="border p-2" id="folder-create-panel" style={{ display: (currentOption == 1) ? 'block' : 'none' }}>

          <div className="form-group">
            <label htmlFor="create-folder-input">New Folder Name</label>
            <input className="form-control" id="create-folder-input" onKeyDown={(e) => {
              let name = document.getElementById('create-folder-input').value
              if (e.key === "Enter")
                if (name !== "")
                  fetch(`/api/folder`, {
                    method: 'POST', body: JSON.stringify({ location: currentLocation.join('/'), name: name }), headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then(e => {
                    if (e.status === 200) {
                      setCurrentStructure([...currentStructure, { name: name, isFile: false }])
                      document.getElementById('create-folder-input').value = ""
                      setCurrentOption(0)
                      return e.json();
                    } else alert('Failed to create folder.')
                  })
            }} />
          </div>
          <button className="btn btn-dark" onClick={() => {
            let name = document.getElementById('create-folder-input').value
            if (name !== "")
              fetch(`/api/folder`, {
                method: 'POST', body: JSON.stringify({ location: currentLocation.join('/'), name: name }), headers: {
                  'Content-Type': 'application/json'
                }
              }).then(e => {
                if (e.status === 200) {
                  setCurrentStructure([...currentStructure, { name: name, isFile: false }])
                  document.getElementById('create-folder-input').value = ""
                  setCurrentOption(0)
                  return e.json();
                } else alert('Failed to create folder.')
              })
          }}>Create</button>
        </div>
        <div className="border p-2" id="folder-rename-panel" style={{ display: (currentOption == 2) ? 'block' : 'none' }}>
          <div className="form-group">
            <label htmlFor="create-folder-input">Old Name</label>
            <input className="form-control" id='rename-folder-input-1' onKeyDown={(e) => {
              let oldName = document.getElementById('rename-folder-input-1').value
              let newName = document.getElementById('rename-folder-input-2').value
              if (e.key === "Enter")
                if (oldName !== "" && newName !== "")
                  fetch(`/api/folder`, {
                    method: 'PATCH', body: JSON.stringify({ location: currentLocation.join('/'), oldName, newName }), headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then((e) => {
                    if (e.status === 200) {
                      let oldStructure = [...currentStructure];
                      oldStructure = oldStructure.filter(e => e.name !== oldName)
                      setCurrentStructure([{ name: newName, isFile: false }, ...oldStructure])
                      setCurrentOption(0)
                      document.getElementById('rename-folder-input-1').value = ""
                      document.getElementById('rename-folder-input-2').value = ""
                    } else
                      alert('Failed to rename folder.')
                  })
            }} />
          </div>
          <div className="form-group">
            <label htmlFor="create-folder-input">New Name</label>
            <input className="form-control" id='rename-folder-input-2' onKeyDown={(e) => {
              let oldName = document.getElementById('rename-folder-input-1').value
              let newName = document.getElementById('rename-folder-input-2').value
              if (e.key === "Enter")
                if (oldName !== "" && newName !== "")
                  fetch(`/api/folder`, {
                    method: 'PATCH', body: JSON.stringify({ location: currentLocation.join('/'), oldName, newName }), headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then((e) => {
                    if (e.status === 200) {
                      let oldStructure = [...currentStructure];
                      oldStructure = oldStructure.filter(e => e.name !== oldName)
                      setCurrentStructure([{ name: newName, isFile: false }, ...oldStructure])
                      setCurrentOption(0)

                      document.getElementById('rename-folder-input-1').value = ""
                      document.getElementById('rename-folder-input-2').value = ""
                    } else
                      alert('Failed to rename folder.')
                  })
            }} />
          </div>
          <button className="btn btn-dark" onClick={() => {
            let oldName = document.getElementById('rename-folder-input-1').value
            let newName = document.getElementById('rename-folder-input-2').value
            if (oldName !== "" && newName !== "")
              fetch(`/api/folder`, {
                method: 'PATCH', body: JSON.stringify({ location: currentLocation.join('/'), oldName, newName }), headers: {
                  'Content-Type': 'application/json'
                }
              }).then((e) => {
                if (e.status === 200) {
                  let oldStructure = [...currentStructure];
                  oldStructure = oldStructure.filter(e => e.name !== oldName)
                  setCurrentStructure([{ name: newName, isFile: false }, ...oldStructure])
                  setCurrentOption(0)

                  document.getElementById('rename-folder-input-1').value = ""
                  document.getElementById('rename-folder-input-2').value = ""
                } else
                  alert('Failed to rename folder.')
              })
          }}>Rename</button>
        </div>
        <div className="border p-2" id="folder-remove-panel" style={{ display: (currentOption == 3) ? 'block' : 'none' }}>
          <div className="form-group">
            <label htmlFor="create-folder-input">Folder Name</label>
            <input className="form-control" id="remove-folder-input" onKeyDown={(e) => {
              if (e.key === "Enter") {
                let name = document.getElementById('remove-folder-input').value
                if (document.getElementsByName('remove-folder-input').value !== "")
                  fetch(`/api/folder`, {
                    method: 'DELETE', body: JSON.stringify({ location: currentLocation.join('/'), name }), headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then((e) => {
                    if (e.status === 200) {
                      let oldStructure = currentStructure;
                      oldStructure = oldStructure.filter(e => e.name !== name)
                      setCurrentStructure(oldStructure)
                      setCurrentOption(0);
                      document.getElementById('remove-folder-input').value = ""
                    } else
                      alert('Failed to remove folder.')

                  })
              }
            }} />
          </div>
          <button className="btn btn-dark" onClick={() => {

            let name = document.getElementById('remove-folder-input').value
            if (document.getElementsByName('remove-folder-input').value !== "")
              fetch(`/api/folder`, {
                method: 'DELETE', body: JSON.stringify({ location: currentLocation.join('/'), name }), headers: {
                  'Content-Type': 'application/json'
                }
              }).then((e) => {
                if (e.status === 200) {
                  let oldStructure = currentStructure;
                  oldStructure = oldStructure.filter(e => e.name !== name)
                  setCurrentStructure(oldStructure)
                  setCurrentOption(0);
                  document.getElementById('remove-folder-input').value = ""
                } else
                  alert('Failed to remove folder.')

              })
          }}>Remove</button>
        </div>
      </div>
    </div>
    <div className="panel panel-default m-2 border p-2" id="file-options">
      <div className="panel-heading">File Options</div>
      <div className="panel-body ">
        <button className="btn btn-dark m-1" onClick={() => { currentOption !== 4 ? setCurrentOption(4) : setCurrentOption(0) }}>Upload a file</button>
        <button className="btn btn-dark m-1" onClick={() => { currentOption !== 5 ? setCurrentOption(5) : setCurrentOption(0) }}>Rename a file</button>
        <button className="btn btn-dark m-1" onClick={() => { currentOption !== 6 ? setCurrentOption(6) : setCurrentOption(0) }}>Remove a file</button>
      </div>
      <div className="panel-body p-1">
        <div className="border p-2" id="file-upload-panel" style={{ display: (currentOption == 4) ? 'block' : 'none' }}>
          <div className="form-group">
            <input className="form-control" type="file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} />
          </div>
          <button className="btn btn-dark" onClick={uploadAFile}>Upload!</button>
        </div>
        <div className="border p-2" id="file-rename-panel" style={{ display: (currentOption == 5) ? 'block' : 'none' }}>
          <div className="form-group">
            <label htmlFor="create-folder-input">
              Old Name</label>
            <input className="form-control" id="rename-file-input-1" onKeyDown={(e) => {
              let oldName = document.getElementById('rename-file-input-1').value
              let newName = document.getElementById('rename-file-input-2').value
              if (e.key === 'Enter') {
                if (oldName !== "" && newName !== "") {
                  fetch(`/api/file`, {
                    method: "PATCH", body: JSON.stringify({ location: currentLocation.join('/'), oldName, newName }), headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then(e => {
                    if (e.status === 200) {
                      let oldStructure = currentStructure;
                      oldStructure = oldStructure.filter(e => e.name !== oldName)
                      setCurrentStructure([{ name: newName, isFile: true }, ...oldStructure])
                      document.getElementById('rename-file-input-1').value = ""
                      document.getElementById('rename-file-input-2').value = ""
                      return e.json();
                    }
                    else alert('Failed to rename file.')
                  })
                }
              }
            }}></input>
          </div>
          <div className="form-group">
            <label htmlFor="rename-file-input-2">
              New name</label>
            <input className="form-control" id="rename-file-input-2" onKeyDown={(e) => {
              let oldName = document.getElementById('rename-file-input-1').value
              let newName = document.getElementById('rename-file-input-2').value
              if (e.key === 'Enter') {
                if (oldName !== "" && newName !== "") {
                  fetch(`/api/file`, {
                    method: "PATCH", body: JSON.stringify({ location: currentLocation.join('/'), oldName, newName }), headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then(e => {
                    if (e.status === 200) {
                      let oldStructure = currentStructure;
                      oldStructure = oldStructure.filter(e => e.name !== oldName)
                      setCurrentStructure([{ name: newName, isFile: true }, ...oldStructure])
                      document.getElementById('rename-file-input-1').value = ""
                      document.getElementById('rename-file-input-2').value = ""
                      return e.json();
                    }
                    else alert('Failed to rename file.')
                  })
                }
              }
            }}></input>
          </div>
          <button className="btn btn-dark" onClick={() => {
            let oldName = document.getElementById('rename-file-input-1').value
            let newName = document.getElementById('rename-file-input-2').value
            if (oldName !== "" && newName !== "") {
              fetch(`/api/file`, {
                method: "PATCH", body: JSON.stringify({ location: currentLocation.join('/'), oldName, newName }), headers: {
                  'Content-Type': 'application/json'
                }
              }).then(e => {
                if (e.status === 200) {
                  let oldStructure = currentStructure;
                  oldStructure = oldStructure.filter(e => e.name !== oldName)
                  setCurrentStructure([{ name: newName, isFile: true }, ...oldStructure])
                  document.getElementById('rename-file-input-1').value = ""
                  document.getElementById('rename-file-input-2').value = ""
                  return e.json();
                }
                else alert('Failed to rename file.')
              })
            }

          }}>Rename</button>
        </div>
        <div className="border p-2" id="file-remove-panel" style={{ display: (currentOption == 6) ? 'block' : 'none' }}>
          <div className="form-group">
            <label htmlFor="create-folder-input">
              File Name</label>
            <input className="form-control" id={'remove-file-input'} onKeyDown={(e) => {
              if (e.key === "Enter") {
                let name = document.getElementById('remove-file-input').value
                if (document.getElementById('remove-file-input').value !== "") {
                  fetch(`/api/file`, {
                    method: "DELETE", body: JSON.stringify({ location: currentLocation.join('/'), name }), headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then(e => {
                    if (e.status === 200) {
                      let oldStructure = currentStructure;
                      oldStructure = oldStructure.filter(e => e.name !== name)
                      setCurrentStructure(oldStructure)
                      setCurrentOption(0)
                      document.getElementById('remove-file-input').value = ""
                    } else
                      alert('Failed to remove file.')
                  })
                }
              }
            }} />
          </div>
          <button className="btn btn-dark" onClick={() => {
            let name = document.getElementById('remove-file-input').value
            if (document.getElementById('remove-file-input').value !== "") {
              fetch(`/api/file`, {
                method: "DELETE", body: JSON.stringify({ location: currentLocation.join('/'), name }), headers: {
                  'Content-Type': 'application/json'
                }
              }).then(e => {
                if (e.status === 200) {
                  let oldStructure = currentStructure;
                  oldStructure = oldStructure.filter(e => e.name !== name)
                  setCurrentStructure(oldStructure)
                  setCurrentOption(0)
                  document.getElementById('remove-file-input').value = ""
                } else
                  alert('Failed to remove file.')
              })
            }
          }}>Remove</button>
        </div>

      </div>
    </div>
    <div id="file-text-content" className="panel panel-default m-2 border p-2">
    </div>

  </div >);
}


export default App;
