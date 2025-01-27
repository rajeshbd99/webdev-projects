import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

const Layout = () => {
    return (
        <div className='w-full mx-auto min-h-screen grid grid-rows-[auto_1fr_auto] bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
export default Layout
