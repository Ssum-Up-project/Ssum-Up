import React,{useState,useEffect} from 'react';
import {
  Button,
  ListItemAvatar,
  Dialog,
  Avatar,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
  ListItemText
  } 
  from '@mui/material'
  import PropTypes from 'prop-types';
  import FolderIcon from '@mui/icons-material/Folder';
  import AddIcon from '@mui/icons-material/Add';
  import UserService from "../../service/user.service";
  import { VideoInfoStateContext } from "../../App.js";

function Category(props) {
    const [playlists, setPlaylists] = useState([]);
    useEffect(()=>{
      UserService.getPlayList().then(
          (response) => {
            setPlaylists(response.data);
          },(error) => {
              console.log(error)
          }
        );
      }, []);

    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Category</DialogTitle>
        <List sx={{ pt: 0 }}>
          {playlists.map((playlist,index) => (
            <ListItem button onClick={() => handleListItemClick(playlist.list_name)} key={index}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={playlist.list_name} />
            </ListItem>
          ))}
  
          <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    );
  }
  
  Category.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  
  export default function SelectCategory() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
  
    return (
      <div>
        <Button
        sx={{          
            variant:"contained",
            maxWidth: "100vh",
            minWidth: "30vh"
          }} onClick={handleClickOpen}>
          Save
        </Button>
        <Category
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </div>
    );
  }
  
  