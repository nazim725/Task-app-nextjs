import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The task title is required"],
      unique: true,
      trim: true,
      maxlength: [40, "Title can not be greater than 40 character"],
    },
    description: {
      type: String,
      required: [true, "The description title is required"],
      trim: true,
      maxlength: [200, "Description can not be greater than 200 character"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", TaskSchema);
