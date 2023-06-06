import logo from './logo.svg';
import './App.css';
import FileSelectorContainer from './containers/FileSelectorContainer';

function App() {
  const handleFilesSelected = (files) => {
    console.log(files);
  };

  return (
    <div className="App">
        <h1>EXIF Eraser App</h1>
        <FileSelectorContainer onFilesSelected={handleFilesSelected} />
    </div>
  );
}

export default App;
