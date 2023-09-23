import './App.css';
import { Routes, Route } from 'react-router-dom';
import FileSelectorContainer from './containers/FileSelectorContainer';
import ImagesContainer from './containers/ImagesContainer';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import Layout from './containers/Layout';
import RequireAuth from './containers/RequireAuth';


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                {/* public routes */}
                <Route path="register" element={<RegisterContainer />} />
                <Route path="login" element={<LoginContainer />} />

                {/* protected routes */}
                <Route element={<RequireAuth />} >
                    <Route path="/" element={<FileSelectorContainer />} /> {/* change to home page with about info */}
                    <Route path="upload" element={<FileSelectorContainer />} />
                    <Route path="images/:request_id" element={<ImagesContainer />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;