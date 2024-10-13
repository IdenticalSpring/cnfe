import styled from 'styled-components';
import DefaultLayout from './layout/DefaultLayout';
import TableCoures from './component/table/TableCourse';
import { DoubleRightOutlined } from '@ant-design/icons';

const courses = () => {
    const Title_Head = styled.h1`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #FF9900;
    margin-top: 0;
    display: block;
    visibility: visible;

    .icon {
        font-size: 24px; /* Kích thước nhỏ hơn so với văn bản */
        vertical-align: middle; /* Canh giữa theo chiều dọc với văn bản */
    }
`;
    
    const ContentWrapper = styled.div`
        padding-top: 60px;
    `;
    return (
        <>
            <DefaultLayout >
            <ContentWrapper>
                <Title_Head>Quản lí khóa học <DoubleRightOutlined className="icon" /></Title_Head>
                <TableCoures />
            </ContentWrapper>
            </DefaultLayout>
        </>
    )
}

export default courses;