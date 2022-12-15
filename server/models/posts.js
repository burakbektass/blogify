import mongoose from "mongoose";

// Uygulamanın genelinde kullanılan Post yapısının şeması 

const postSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  tag: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post; // Uygulamada kullanacağımız veri tabanına gidip gelecek her şey bir post
