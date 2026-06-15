import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    reactions: {
      likes: {
        type: Number,
        default: 0,
      },

      dislikes: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);
