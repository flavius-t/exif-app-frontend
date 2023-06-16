import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import FileSelectorContainer from './containers/FileSelectorContainer';
import ImagesContainer from './containers/ImagesContainer';
import FilesContext from './utility/FilesContext';
import { useState } from 'react';


function App() {
  const [extractedFiles, setExtractedFiles] = useState([]);

  const updateFiles = (files) => {
    setExtractedFiles(files);
  };

  return (
    <div className="App">
        <h1>EXIF App</h1>
        <FilesContext.Provider value={{ extractedFiles, updateFiles }}>
          <Routes>
            <Route path="/" element={<FileSelectorContainer />} />
            <Route path="/upload" element={<FileSelectorContainer />} />
            <Route path="/images/:request_id" element={<ImagesContainer />} />
          </Routes>
        </FilesContext.Provider>
    </div>
  );
}

export default App;
