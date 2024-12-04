import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const StyledSearch = styled(Input.Search)`
  width: 300px;
`;

const Search = ({ onSearch }) => {
  const handleSearch = (event) => {
    const value = event.target.value;
    onSearch(value);
  };

  return (
    <StyledSearch
      placeholder="Search"
      size="large"
      onChange={handleSearch}
    />
  );
};

export default Search;
