import './App.css';
import { Routes, Route } from 'react-router-dom';
import FileSelectorContainer from './containers/FileSelectorContainer';
import ImagesContainer from './containers/ImagesContainer';
import FilesContext from './utility/FilesContext';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import RegisterContainer from './containers/RegisterContainer';


function App() {
  const [extractedFiles, setExtractedFiles] = useState([]);
  const [zipBlob, setZipBlob] = useState(null);

  const updateFiles = (files) => {
    setExtractedFiles(files);
  };

  return (
    <div className="App">
      <NavBar />
      <FilesContext.Provider value={{ extractedFiles, updateFiles, zipBlob, setZipBlob }}>
        <Routes>
          <Route path="/" element={<FileSelectorContainer />} />
          <Route path="/upload" element={<FileSelectorContainer />} />
          <Route path="/images/:request_id" element={<ImagesContainer />} />
          <Route path="/register" element={<RegisterContainer />} />
        </Routes>
      </FilesContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
