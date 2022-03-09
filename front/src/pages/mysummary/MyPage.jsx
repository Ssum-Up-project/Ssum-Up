import React,{useEffect, useState} from 'react';
import {
    Grid,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Paper
} from '@mui/material';
import UserService from "../../service/user.service";
import Playlist from "./PlaylistCarousel"
import RecentVideos from "./RecentCarousel"

const MyPageContent=()=>{
    const [contents, setContents] = useState([]);
    useEffect(()=>{
        UserService.getPlayList().then(
            (response) => {
                console.log(response.data)
                setContents(response.data);
            },(error) => {
                console.log("error")
            }
          );
        }, []);
    
    
    //카테고리별 플레이리스트
    const savedPlaylist=contents.filter(
        (arr, index, callback) => index === callback.findIndex(data => data.list_name === arr.list_name)
      );
    const [category, setCategory] = useState("");
    const handleChange = (event) => {
        setCategory(event.target.value);
     };
    const selectData = contents.filter(data => data.list_name===category);

    return(
        <Box
         sx={{
          p: 5,
          margin: "auto",
        }}
      >
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <FormControl variant="standard" sx={{minHeight:20, minWidth: 120}}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                {savedPlaylist.map((playlist,index) => (
                    <MenuItem value={playlist.list_name} key={index}>{playlist.list_name}</MenuItem>))}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12}>        
           {category?(<Playlist category={selectData}/>):(<Playlist category={savedPlaylist[0]}/>)}
        </Grid>
        <Grid item xs={12}>
            <div>최근 기록</div>
        </Grid>
        <Grid item xs={12}>
            <RecentVideos videos={contents}/>
        </Grid>
      </Grid>
    </Box>
        );
}
export default MyPageContent;
