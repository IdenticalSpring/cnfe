import DefaultLayout from '@/layout/DefaultLayout';
import React from 'react'
import styled from 'styled-components';

const Title = styled.div`

  font-size: calc(10vw + 1vw);
`;

const Developer = () => {
    return (
        <>
            <DefaultLayout>
                <Title>Developer</Title>

            </DefaultLayout>

        </>
    )
}

export default Developer;