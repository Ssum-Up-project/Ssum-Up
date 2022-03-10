import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import ReactPlayer from "react-player";
import { 
  Button, 
  Card, 
  CardActionArea,
  Box,
  CardActions } 
  from '@mui/material';

const settings={ 
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 1,
    responsive: [
     {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      } ,
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]}
    const StyledSlider = styled(Slider)`
    .slick-slide {
      margin: 0 auto;
    }
      `;
  
export default function PlaylistCarousel(props){
  const selectData = props.playlists.filter(data => data.list_name===props.category);
  const AllPlaylistData=props.playlists.filter(
    (arr, index, callback) => index === callback.findIndex(data => data.video_data_id.id === arr.video_data_id.id)
  );
  return (
    <div>
      {props.category?(
              <StyledSlider {...settings}>
              {selectData.map((playlist,index) => (
                <Card key={index} sx={{ 
                  maxWidth: 330 
                  }}>
                  <CardActionArea>
                    <Box>
                      <ReactPlayer
                        width='330px'
                        height='155px'
                        light={true}
                        muted={true}
                        url={playlist.video_data_id.url} /></Box>
                  </CardActionArea>
                 <CardActions>
                   <Button size="small" color="primary">
                   {playlist.video_data_id.title}
                   </Button>
                  </CardActions>
                </Card>
                    ))}
              </StyledSlider>
      ):(
        <StyledSlider {...settings}>
        {AllPlaylistData.map((playlist,index) => (
          <Card key={index} sx={{ 
            maxWidth: 330 
            }}>
            <CardActionArea>
              <Box>
                <ReactPlayer
                  width='330px'
                  height='155px'
                  light={true}
                  muted={true}
                  url={playlist.video_data_id.url} /></Box>
            </CardActionArea>
           <CardActions>
             <Button size="small" color="primary">
             {playlist.video_data_id.title}
             </Button>
            </CardActions>
          </Card>
              ))}
        </StyledSlider>
      )}

    </div>
  );
};

