import styled from 'styled-components';
import DefaultLayout from './layout/DefaultLayout';
import TableCoures from './component/table/TableCourse';
const courses = () => {

    const Title_Head = styled.h1`
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #FF9900;
        margin-top: 0;
        text-align: center;
        display: block;
        visibility: visible;
    `;
    
    const ContentWrapper = styled.div`
        padding-top: 60px;
    `;
    return (
        <>
            <DefaultLayout >
            <ContentWrapper>
                <Title_Head>Quản lí khóa học</Title_Head>
                <TableCoures />
            </ContentWrapper>
            </DefaultLayout>
        </>
    )
}

export default courses;