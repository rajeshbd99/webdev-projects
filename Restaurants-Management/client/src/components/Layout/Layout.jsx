import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
    return (
        <div className='max-w-7xl mx-auto px-5 min-h-screen grid grid-rows-[auto_1fr_auto]'>
            <Header />
            <Outlet />
            <Footer />
            <ToastContainer/>
        </div>
    )
}

export default Layout
