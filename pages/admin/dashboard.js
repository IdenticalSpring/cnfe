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
    `;
    return (
        <>
            <DefaultLayout >
                <Title_Head>Dashboard</Title_Head>
            </DefaultLayout>
        </>
    )
}

export default dashboard;