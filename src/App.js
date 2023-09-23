import './App.css';
import { Routes, Route } from 'react-router-dom';
import FileSelectorContainer from './containers/FileSelectorContainer';
import ImagesContainer from './containers/ImagesContainer';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';


const App = () => {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<FileSelectorContainer />} />
                <Route path="/upload" element={<FileSelectorContainer />} />
                <Route path="/images/:request_id" element={<ImagesContainer />} />
                <Route path="/register" element={<RegisterContainer />} />
                <Route path="/login" element={<LoginContainer />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;