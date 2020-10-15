const mongoose = require('mongoose');
const { Schema } = mongoose;

const classroomSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    quizzes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
