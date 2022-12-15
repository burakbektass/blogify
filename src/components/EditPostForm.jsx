import React, {useState } from "react";
import { makeStyles } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import {useDispatch} from "react-redux"
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {updatePost} from "../actions/post"


const useStyle = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons:{
    marginTop: theme.spacing(2)
  }
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const EditPostForm = ({ post , closeEditMode }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    console.log(data)
    const updatedPost = {
        _id:post._id,
        ...data,
        image:file,
    };
    dispatch(updatePost(post._id,updatedPost));
    reset();
    setFile(null);
    closeEditMode();
  
  };
  
  const classes = useStyle();
  return (
    
        <div>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="title"
              label="Başlık"
              name="title"
              variant="outlined"
              className={classes.textField}
              size="small"
              error={errors?.title ? true : false}
              {...register("title", { required: true })}
              defaultValue={post?.title}
            />
            <TextField
              id="subtitle"
              label="Alt Başlık"
              name="subtitle"
              variant="outlined"
              className={classes.textField}
              size="small"
              error={errors?.subtitle ? true : false}
              {...register("subtitle", { required: true })}
              defaultValue={post?.subtitle}
            />
            <Controller
              render={({ field }) => (
                <Select
                  input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="tag"
              control={control}
              error={errors?.tag ? true : false}
              defaultValue={post?.tag}
            />
            <TextField
              id="content"
              label="İçerik"
              multiline
              minRows={4}
              name="content"
              variant="outlined"
              className={classes.textField}
              size="small"
              error={errors?.content ? true : false}
              {...register("content", { required: true })}
              fullWidth
              defaultValue={post?.content}
            />
            <FileBase64
              mutiple={false}
              onDone={({ base64 }) => setFile(base64)}
            ></FileBase64>

            <div className={classes.buttons}>
            <Button color="secondary" variant="outlined" type="submit" onClick={closeEditMode} >
                    Vazgeç
                </Button>{" "}
                <Button color="primary" variant="outlined" type="submit" >
                    Kaydet
                </Button>
            </div>
          </form>
        </div>
  );
};
 
export default EditPostForm;
