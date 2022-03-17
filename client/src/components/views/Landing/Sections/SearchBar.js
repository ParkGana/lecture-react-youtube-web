import React from 'react';
import { Input } from 'antd';

const { Search } = Input;


function SearchBar() {
    return (
        <div className="video-search">
            <Search size="large" placeholder="Search" value onSearch />
        </div>
    )
}

export default SearchBar;
