const VideoData = () => {
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/videodata/").then((response) => {
      console.log(response);
      setVideoData(response.data);
    });
  }, []);
  return (
    <>
      <h1>Users</h1>
      <UserList users={users} />
    </>
  );
};

export default Users;
