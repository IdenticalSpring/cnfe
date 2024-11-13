import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, Select, Typography, Skeleton } from "antd";

const { Option } = Select;
const { Title } = Typography;

const CalendarContainer = styled.div`
  margin-top: 0px;
  padding: 015px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 320px;

  /* Responsive styles */
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }

  .ant-picker-calendar-header {
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 8px 8px 0 0;
  }

  .ant-picker-calendar-mode-switch {
    color: #1890ff;
  }

  .ant-picker-calendar-date {
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .ant-picker-calendar-date:hover {
    background-color: var(--background-hover-color);
  }

  .ant-picker-calendar-date-today .ant-picker-calendar-date-content {
    border: 1px solid red;
    border-radius: 6px;
  }

  /* Đặt màu nền cam cho ngày được chọn */
  .ant-picker-cell-selected .ant-picker-calendar-date-content {
    background-color: #ffa500 !important;
    color: white;
    border-radius: 4px;
    border: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;

  /* Responsive styles */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 20px;

  /* Responsive styles */
  @media (max-width: 768px) {
    height: 18px;
  }
`;

const CustomTitle = styled(Title)`
  margin: 0;
  white-space: nowrap; /* Ngăn tiêu đề xuống hàng */
`;

const CustomSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 8px;
    border-color: #d9d9d9;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    width: 70px;
  }
`;

const CustomCalendar = () => {
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    // Giả lập quá trình tải dữ liệu
    const timer = setTimeout(() => {
      setLoading(false); // Sau 2 giây, dừng Skeleton và hiển thị Calendar
    }, 200);

    return () => clearTimeout(timer); // Xóa timer khi component bị unmount
  }, []);

  const customHeaderRender = ({ value, onChange }) => {
    const currentYear = value.year();
    const currentMonth = value.month();

    const handleYearChange = (newYear) => {
      const updatedValue = value.clone().year(newYear);
      onChange(updatedValue);
    };

    const handleMonthChange = (newMonth) => {
      const updatedValue = value.clone().month(newMonth);
      onChange(updatedValue);
    };

    return (
      <HeaderContainer>
        <LogoContainer>
          <Logo src="/assets/img/iconLogo.png" alt="Logo" />
          <CustomTitle
            style={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              marginBottom: 0,
              marginRight: 5,
            }}
          >
            CodMaster
          </CustomTitle>
        </LogoContainer>

        <div style={{ display: "flex", gap: "8px" }}>
          <CustomSelect
            value={currentMonth}
            onChange={handleMonthChange}
            style={{ width: 80 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Option key={i} value={i}>
                {value.clone().month(i).format("MMM")}
              </Option>
            ))}
          </CustomSelect>

          <CustomSelect
            value={currentYear}
            onChange={handleYearChange}
            style={{ width: 80 }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <Option key={i} value={currentYear - 5 + i}>
                {currentYear - 5 + i}
              </Option>
            ))}
          </CustomSelect>
        </div>
      </HeaderContainer>
    );
  };

  return (
    <CalendarContainer>
      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} /> // Hiển thị Skeleton khi đang tải
      ) : (
        <Calendar fullscreen={false} headerRender={customHeaderRender} />
      )}
    </CalendarContainer>
  );
};

export default CustomCalendar;
