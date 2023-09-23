import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <>
            <main className="App">
                <NavBar />
                <Outlet /> {/* this is where the child routes will render */}
                <Footer />
            </main>
        </>
    );
}

export default Layout;