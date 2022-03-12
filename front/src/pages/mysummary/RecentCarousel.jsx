import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Button, Card, CardActionArea, Box, CardActions } from "@mui/material";
import { minHeight } from "@mui/system";
import { useNavigate } from "react-router";
import UserService from "../../service/user.service";

const settings = {
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
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const StyledSlider = styled(Slider)`
  .slick-slide {
    margin: 0 auto;
  }
`;

export default function Test(props) {
  const navigate = useNavigate();

  const requestURL = async (url) => {
    const fetchedVideoInfo = await UserService.postVideoData(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
    return fetchedVideoInfo;
  };

  const onClickButton = async (url) => {
    const fetchedVideoInfo = await requestURL(url);
    localStorage.setItem("storedURL", JSON.stringify(url));
    navigate("/main", {
      state: {
        video: fetchedVideoInfo,
      },
    });
  };
  return (
    <div>
      <StyledSlider {...settings}>
        {props.searchlog.map((log, index) => (
          <Card key={index} sx={{ maxWidth: 330 }}>
            <CardActionArea>
              <Box>
                <ReactPlayer
                  width="330px"
                  height="155px"
                  light={true}
                  muted={true}
                  url={log.video_data.url}
                />
              </Box>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={(e) => onClickButton(log.video_data.url)}
              >
                {log.video_data.title}
              </Button>
            </CardActions>
          </Card>
        ))}
      </StyledSlider>
    </div>
  );
}
