import React from 'react';
import DefaultLayout from './layout/DefaultLayout';
import styled from 'styled-components';

const dashboard = () => {
    const Title_Head = styled.h1`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #FF9900;
    margin-top: 0;
    display: block;
    visibility: visible;

    .icon {
        font-size: 24px;
        vertical-align: middle;
    }
`;

    const ContentWrapper = styled.div`
    padding-top: 60px;
`;
    return (
        <>
            <DefaultLayout >
                <ContentWrapper>
                    <Title_Head>Chào mừng bạn đã đến với trang admin master coding </Title_Head>
                </ContentWrapper>
            </DefaultLayout>
        </>
    )
}

export default dashboard;