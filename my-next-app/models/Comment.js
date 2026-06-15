import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
// connecting comment to its tweet thru the ID
