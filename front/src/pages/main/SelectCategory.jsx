import React, { useState, useEffect } from "react";
import {
  ListItemAvatar,
  Dialog,
  Avatar,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  DialogActions,
  Divider,
  Input,
  Alert,
} from "@mui/material";
import PropTypes from "prop-types";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import UserService from "../../service/user.service";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { Button } from "../../components/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#f7f7f9",
  },
  "& .MuiRating-iconHover": {
    color: "#f7f7f9",
  },
});

function Category(props) {
  //플레이리스트 데이터 호출
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    UserService.getPlayList().then(
      (response) => {
        setPlaylists(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  //중복제거
  const removeOverlapPlaylist = playlists.filter(
    (list, index, callback) =>
      index ===
      callback.findIndex((playlist) => playlist.list_name === list.list_name)
  );

  const { cancelSave, onClose, selectedValue, open, saveError } = props;
  const [addCategory, setAddCategory] = useState(undefined);

  const handleClose = () => {
    cancelSave();
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} scroll="paper">
      <DialogTitle>Category</DialogTitle>
      {saveError === true && (
        <Alert severity="error">동일한 영상이 이미 존재합니다.</Alert>
      )}
      <Divider />
      <List sx={{ pt: 0 }}>
        {removeOverlapPlaylist.map((playlist, index) => (
          <ListItem
            button
            onClick={() => handleListItemClick(playlist.list_name)}
            key={index}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={playlist.list_name} />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <TextField
            variant="standard"
            id="category"
            label="Add Category"
            onChange={(e) => {
              setAddCategory(e.target.value);
            }}
          />
        </ListItem>
      </List>
      <DialogActions>
        <Button
          onClick={() => handleListItemClick(addCategory)}
          buttonStyle="btn--outline"
        >
          Add
        </Button>
        <Button onClick={() => handleClose()} buttonStyle="btn--outline">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Category.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  saveError: PropTypes.bool.isRequired,
  cancelSave: PropTypes.func.isRequired,
};

export default function SelectCategory() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [saveError, setSaverError] = useState(false);
  const [rating, setRating] = useState(5);

  const { state } = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const cancelSave = () => {
    setSaverError(false);
    setOpen(false);
  };

  //플레이리스트 데이터 전송
  const handleClose = async (value) => {
    setSelectedValue(value);
    UserService.postPlayList(value, state.video.id) //앞이 플레이리스트명, 뒤가 비디오데이터 id
      .then(() => {
        setOpen(false);
        window.location.reload();
      })
      .catch(function (err) {
        setSaverError(true);
        console.log(err);
      });
  };

  const handleRating = async (value) => {
    setRating(value);
    UserService.postRating(state.video.id, value) //앞이 비디오 데이터id 뒤가 평가rating
      .then(() => {
        setOpen(false);
        // window.location.reload();
      })
      .catch(function (err) {
        setSaverError(true);
        console.log(err);
      });
  };

  return (
    <div className="save_btn_main">
      <p
        className="rating_message"
        style={{ marginRight: "-40px", marginTop: "4px" }}
      >
        요역과 번역의 내용이 어떠셨나요?
      </p>
      {/* <p>{rating}</p> */}
      <StyledRating
        name="simple-controlled"
        value={rating}
        onChange={(event, newRating) => {
          handleRating(newRating);
        }}
      />
      <Button
        className="start_btn"
        buttonStyle="btn--outline2"
        buttonSize="btn--large"
        style={{
          height: 40,
          variant: "contained",
          maxWidth: "100vh",
          minWidth: "30vh",
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        내 목록에 저장
        <AddCircleOutlineIcon
          style={{ marginLeft: "10px", marginBottom: "-6px" }}
        />
      </Button>
      <Category
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        saveError={saveError}
        cancelSave={cancelSave}
      />
    </div>
  );
}
