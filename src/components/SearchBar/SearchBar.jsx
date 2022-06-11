import Search from "antd/lib/input/Search";
import React from "react";

function SearchBar(props) {
  const handleSearch = (e) => {
    props.setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      <Search placeholder="input search text" onChange={handleSearch} />
    </div>
  );
}

export default SearchBar;
