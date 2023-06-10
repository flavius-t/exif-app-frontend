import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import FileSelectorContainer from './containers/FileSelectorContainer';


function App() {
  return (
    <div className="App">
        <h1>EXIF App</h1>
        <Routes>
          <Route path="/" element={<FileSelectorContainer />} />
          <Route path="/upload" element={<FileSelectorContainer />} />
        </Routes>
    </div>
  );
}

export default App;
