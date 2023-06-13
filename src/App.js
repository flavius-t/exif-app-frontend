import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import FileSelectorContainer from './containers/FileSelectorContainer';
import ImagesContainer from './containers/ImagesContainer';


function App() {
  return (
    <div className="App">
        <h1>EXIF App</h1>
        <Routes>
          <Route path="/" element={<FileSelectorContainer />} />
          <Route path="/upload" element={<FileSelectorContainer />} />
          <Route path="/images/:request_id" element={<ImagesContainer />} />
        </Routes>
    </div>
  );
}

export default App;
