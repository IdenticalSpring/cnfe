import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChatBubbleOutline, Close, Send } from '@mui/icons-material';
import { userAPI } from '@/service/user';

const ChatBoxContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
  transform: ${props => (props.isVisible ? 'scale(1)' : 'scale(0.8)')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
`;

const MessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  background-color: white;
  border-top: 1px solid #eaeaea;
`;

const CodeButton = styled.button`
  width: 50%;
  background-color: #e53e3e; /* Màu đỏ */
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  padding: 5px;
  margin: 10px auto;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c53030; /* Màu đỏ khi hover */
    transform: scale(1.05);
  }

  box-shadow: none;
  outline: none;
  border: none;
  background-color: #e53e3e; /* Đảm bảo màu đồng bộ */
`;

const ChatHeader = styled.div`
  background-color: #e53e3e; /* Màu đỏ */
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
`;

const MessageBubble = styled.div`
  max-width: 80%;
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 15px;
  clear: both;
  
  ${props =>
        props.type === 'user'
            ? `align-self: flex-end; background-color: #e53e3e; color: white; border-bottom-right-radius: 5px;` /* Màu đỏ cho tin nhắn người dùng */
            : `align-self: flex-start; background-color: #fed7d7; color: #333; border-bottom-left-radius: 5px;` /* Màu sáng đỏ cho tin nhắn hỗ trợ */
    }
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #e53e3e; /* Màu đỏ khi focus */
    box-shadow: 0 0 5px rgba(229, 62, 62, 0.3);
  }
`;

const SendButton = styled.button`
  background-color: #e53e3e; /* Màu đỏ */
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c53030; /* Màu đỏ khi hover */
  }

  &:disabled {
    background-color: #fed7d7;
    cursor: not-allowed;
  }
`;

const ToggleChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #e53e3e; /* Màu đỏ */
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c53030; /* Màu đỏ khi hover */
    transform: scale(1.1);
  }
`;

const ChatBox = ({ code }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => setIsVisible(prev => !prev);

    const handleSendMessage = async (userMessage) => {
        if (userMessage.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: userMessage, type: 'user' }
            ]);

            try {
                const result = await userAPI.generateContent(userMessage);

                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: result, type: 'support' }
                ]);
            } catch (error) {
                console.error('Error while sending message to API:', error);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: 'Sorry, there was an error processing your request.', type: 'support' }
                ]);
            }
        }
    };

    // Hàm này cập nhật message khi nhấn nút "Gửi Code"
    const handleCodeSubmit = () => {
        if (code) {
            setMessage(`${code}`); // Chèn code vào ô nhập liệu
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(message);
        }
    };

    return (
        <>
            <ToggleChatButton onClick={toggleChat}>
                {isVisible ? <Close /> : <ChatBubbleOutline />}
            </ToggleChatButton>

            <ChatBoxContainer isVisible={isVisible}>
                <ChatHeader>
                    Support Chat
                    <Close onClick={toggleChat} style={{ cursor: 'pointer' }} />
                </ChatHeader>

                <MessageContainer>
                    {messages.map((msg, idx) => (
                        <MessageBubble key={idx} type={msg.type}>
                            {msg.text}
                        </MessageBubble>
                    ))}
                    <div ref={messagesEndRef} />
                </MessageContainer>

                <CodeButton onClick={handleCodeSubmit}>
                    Kéo code
                </CodeButton>

                <InputContainer>
                    <MessageInput
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                    />
                    <SendButton
                        onClick={() => handleSendMessage(message)}
                        disabled={!message.trim()}
                    >
                        <Send />
                    </SendButton>
                </InputContainer>
            </ChatBoxContainer>
        </>
    );
};
export default ChatBox;
