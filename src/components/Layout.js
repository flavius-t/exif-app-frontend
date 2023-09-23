import { Outlet } from 'react-router-dom';
import NavBarContainer from '../containers/NavBarContainer';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
            <main className="App">
                <NavBarContainer />
                <Outlet /> {/* this is where child routes render */}
                <Footer />
            </main>
        </>
    );
}

export default Layout;