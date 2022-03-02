```jsx
const MyContext = React.createContext();

<MyContext.Provider value={전역으로 전달 하고자 하는 값 }>
  {/* Provider는 value 라는 props를 받아서 그 값을 자식 컴포넌트들에 전달한다. */}
  {/* {Conetxt 안에 위치할 자식 컴포넌트 들} */}
</MyContext.Provider>



// App.js

export const VideoDispatchContext = React.createContext();

return
 <VideoStateContext.Provider value={data ?? }>
   <Video link={link}/>
   <Section2 handleCreate={handleCreate} handleVideoInfo={handleVideoInfo}/>
 </VideoStateContext.Provider>


```

```jsx
// Video.js

// Context에서 값을 꺼내올 때 useContext Hook을 사용
import { useContext } from "react";
import { VideoStateContext } from "./App";

const Video = () => {
  const { link } = useContext(VideoDispatchContext);
};
```

```jsx
// Home.js

Section2로 전달해주던 것들 삭제

```

```jsx
// Section2.js

const Section2 = () => {
  const {handleCreate, handleVideoInfo} = useContext(VideoDispatchContext)
  ...

  return
  ...
}
```
