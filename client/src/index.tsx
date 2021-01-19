/*
 * @Author: LainCarl 
 * @Date: 2019-11-02 17:49:40 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2019-11-02 19:28:05
 * @Feature:  
 */

import * as React from "react";
import { render } from "react-dom";
import axios from 'axios'
import "./styles.css";

const { useState } = React;
function App() {
  const [progress, setProgress] = useState(0);
  const uploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const { files } = event.target;
    Array.prototype.forEach.call(files, (file: File) => {
      formData.append('file', file)
    });
    axios({
      url:'http://localhost:8081/file_upload',
      method:'POST',
      data:formData,
      onUploadProgress(progress) {
        setProgress(100 * ( progress.loaded / progress.total)) 
        console.log(100 * ( progress.loaded / progress.total))
      },
    })
  }
  return (
    <div className="App">
      <input type="file" onChange={uploadFiles} multiple />
      {`${progress.toFixed(2)}%`}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
