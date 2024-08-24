import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />

        </>
    )
}
