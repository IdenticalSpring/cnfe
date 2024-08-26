import { Header } from "./Header"
import { Footer } from "./Footer"
import styled from "styled-components";


const Main = styled.div`
    min-height: 100vh;
`;

const DefaultLayout = ({children}) => {
    return (
        <>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </>
    )
}

export default DefaultLayout;