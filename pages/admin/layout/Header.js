import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 16px;
    background-color: #f0f2f5;
    border-bottom: 1px solid #d9d9d9;
    width: calc(100% - 200px);
    margin-left: 200px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    z-index: 1;
`;

const AccountName = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-right: 20px;
    color: #333;
    cursor: pointer;

    &:hover {
        color: #ff9900;
    }
`;

const Header = () => {
    const [displayName, setDisplayName] = useState('Người Dùng');

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDisplayName(decoded.username || 'Người Dùng');
            } catch (error) {
                console.error('Lỗi khi giải mã token:', error);
            }
        }
    }, []);

    const menuItems = [
        {
            key: '1',
            label: <a href="/logout">Logout</a>,
        },
    ];



    return (
        <HeaderContainer>
            <Dropdown menu={{ items: menuItems }}>
                <AccountName>
                    {displayName} <DownOutlined />
                </AccountName>
            </Dropdown>
        </HeaderContainer>
    );
};

export default Header;
