import React, { useState } from 'react';
import Axios from 'axios';
import { Input } from 'antd';

import { SERVER_VIDEO } from '../../../Config';

const { Search } = Input;



function SearchBar(props) {
    const [SearchText, setSearchText] = useState('');

    const onChangeSearchText = (e) => {
        setSearchText(e.currentTarget.value);
    }

    const onSearch = () => {
        const variables = {
            searchText: SearchText
        }

        Axios.post(`${SERVER_VIDEO}/getSearchVideos`, variables)
        .then(response => {
            console.log(response.data);
            if(response.data.getSearchVideosSuccess) {
                props.onRefreshVideos(response.data.videos);
            }
            else {
                alert('검색에 실패하였습니다.');
            }
        });
    }

    return (
        <div className="video-search">
            <Search size="large" placeholder="Search" value={SearchText} onChange={onChangeSearchText} onSearch={onSearch} />
        </div>
    )
}

export default SearchBar;
