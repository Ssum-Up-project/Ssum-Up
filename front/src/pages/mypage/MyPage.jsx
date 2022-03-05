import React,{useEffect, useState} from 'react';
import UserService from "../../service/user.service";

const MyPageContent=()=>{
    const [content, setContent] = useState("");
    useEffect(()=>{
        UserService.getPlayList().then(
            (response) => {
                setContent(response.data);
            },(error) => {
                console.log("error")
            }
          );
        }, []);
    return(
        <div>
            {content && content.map(post => (
            <div key = {post.id}>
              <h1>{post.list_name}</h1>
            </div>))}
        </div>
        );
}
export default MyPageContent;