import React, { useState} from 'react';
import logo from './assets/images/kahoot_messenger.png'
import './App.css';

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function App() {

  const [ kahootQuestions, setKahootQuestions ] = useState(false)

  const handleUploadFile = (event) =>{
    const file = event.target.files[0]

    const reader = new FileReader();
    reader.onload = function(e) {
      const contents = e.target.result;


      fetch('http://0.0.0.0:8000/interrogate', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(({
          data: contents
        }))
      })
      .then((response) => response.json())
      .then((json) => {
        setKahootQuestions(json)
        window.document.getElementById('downloadButton').click()
      })
      .catch((error) => {
        console.error(error);
      });

    };
    reader.readAsText(file);
  }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <div className="container-file-upload">
          <label htmlFor="file-upload" className="custom-file-upload">
          <i className="fa fa-cloud-upload"></i> Click here to upload Messenger data
          </label>
            </div>
            <div className="container-file-upload">
              <input id="file-upload" type="file" onChange={handleUploadFile}/>
            </div>
            {kahootQuestions &&
              <ExcelFile  filename={"KahootQuiz"} element={<div id='downloadButton'></div>}>
                <ExcelSheet data={kahootQuestions} name="Organization">
                  <ExcelColumn label="Question - max 120 characters" value="question"/>
                  <ExcelColumn label="Answer 1 - max 75 characters" value="answer1"/>
                  <ExcelColumn label="Answer 2 - max 75 characters" value="answer2"/>
                  <ExcelColumn label="Answer 3 - max 75 characters" value="answer3"/>
                  <ExcelColumn label="Answer 4 - max 75 characters" value="answer4"/>
                  <ExcelColumn label="Time limit (sec) – 5, 10, 20, 30, 60, 90, 120, or 240 secs" value="time"/>
                  <ExcelColumn label="Correct answer(s) - choose at least one" value="correct"/>
                </ExcelSheet>
              </ExcelFile>
        }
        </header>
      </div>
    );

}

export default App;
