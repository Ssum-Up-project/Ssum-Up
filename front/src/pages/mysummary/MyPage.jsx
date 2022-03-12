import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
  containerClasses,
} from "@mui/material";
import UserService from "../../service/user.service";
import Playlist from "./PlaylistCarousel";
import RecentVideos from "./RecentCarousel";
import Layout from "../../Layout";

const MyPageContent = () => {
  //플레이리스트
  const [contents, setContents] = useState([]);
  useEffect(() => {
    UserService.getPlayList().then(
      (response) => {
        console.log(response.data);
        setContents(response.data);
      },
      (error) => {
        console.log("error");
      }
    );
  }, []);
  //서치로그
  const [searchlog, setSearchlog] = useState([]);
  useEffect(() => {
    UserService.getSearchLog().then(
      (response) => {
        console.log(response.data);
        setSearchlog(response.data);
      },
      (error) => {
        console.log("error");
      }
    );
  }, []);

  //카테고리별 플레이리스트
  const savedPlaylist = contents.filter(
    (arr, index, callback) =>
      index === callback.findIndex((data) => data.list_name === arr.list_name)
  );
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Layout>
      <Box
        sx={{
          p: 5,
          margin: "auto",
          height: "50rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ color: "#f7f7f9", fontSize: "20px" }}>
            <div>최근 기록</div>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <RecentVideos searchlog={searchlog} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant="standard"
              sx={{ minHeight: 20, minWidth: 120 }}
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{ color: "#f7f7f9", fontSize: "20px" }}
              >
                재생목록
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={""}>전체</MenuItem>
                {savedPlaylist.map((playlist, index) => (
                  <MenuItem value={playlist.list_name} key={index}>
                    {playlist.list_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box>
              {category ? (
                <Playlist category={category} playlists={contents} />
              ) : (
                <Playlist category={""} playlists={contents} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};
export default MyPageContent;
