const mongoose = require("mongoose");
const shortid = require('shortid');
const { Schema } = mongoose;

const classroomSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

classroomSchema.statics.getClassroomByIdAndPopulate = async (
  id,
  collection
) => {
  const classroom = await Classroom.findById(id).populate(collection);
  if (!classroom) {
    throw new Error();
  }

  return classroom;
};

classroomSchema.statics.generateRandomId = () => {
  return shortid.generate();
};

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
