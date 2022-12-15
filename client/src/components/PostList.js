import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Post from "./Post";

const useStyle = makeStyles((theme) => ({
  layoutShifter: {
    float: "right",
    margin: theme.spacing(2),
  },
}));
const PostList = () => {
  const classes = useStyle();
  const posts = useSelector((state) => state.posts.posts);
  const [layout, setLayout] = useState("gridThree");
  const calculateMd = () => {
    return layout === "gridThree" ? 4 : 3;
  };
  return (
    <>
      <div className={classes.layoutShifter}>
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridThree")}
        >
          <img
            src="https://img.icons8.com/material-rounded/24/null/activity-grid-2.png"
            style={{ background: layout === "gridThree" ? "#ccc" : "" }}
            alt="Three Columns Grid"
          />
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridFour")}
        >
          <img
            src="https://img.icons8.com/ios-glyphs/30/null/activity-grid-2.png"
            style={{ background: layout === "gridFour" ? "#ccc" : "" }}
            alt="Four Columns Grid"
          />
        </Button>
      </div>

      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid item key={post?._id} xs={12} md={calculateMd()}>
              <Post {...post}></Post>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostList;
