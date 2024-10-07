import styled from 'styled-components';
import DefaultLayout from './layout/DefaultLayout';
import TableAccount from './component/table/TableAccount';
import {DoubleRightOutlined } from '@ant-design/icons';

const Title_Head = styled.h1`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #FF9900;
    margin-top: 0;
    display: block;
    visibility: visible;
`;

const ContentWrapper = styled.div`
    padding-top: 60px;
`;

const Users = () => {
    return (
        <DefaultLayout>
            <ContentWrapper>
                <Title_Head>Quản lí tài khoản <DoubleRightOutlined /></Title_Head>
                <TableAccount />
            </ContentWrapper>
        </DefaultLayout>
    );
}

export default Users;
