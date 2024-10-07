import styled from 'styled-components';
import { Menu, Dropdown } from 'antd'

const header = () => {

    const SidebarWidth = '200px';

    // Styled-components
    const HeaderContainer = styled.div`
        display: flex;
        justify-content: end;
        align-items: center;
        padding: 16px;
        background-color: #f0f2f5;
        border-bottom: 1px solid #d9d9d9;
        width: calc(100% - ${SidebarWidth});
        margin-left: ${SidebarWidth};
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

    // Dropdown menu
    const menu = (
        <Menu>
            <Menu.Item key="1">
                <a href="/logout">Logout</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <HeaderContainer>
            <Dropdown overlay={menu}>
                <AccountName>
                    Tên Tài Khoản
                </AccountName>
            </Dropdown>
        </HeaderContainer>
    )
}

export default header;