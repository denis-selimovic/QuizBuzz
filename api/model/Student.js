const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    surname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    }
});

studentSchema.pre('remove', async function (next) {
    const Classroom = this.model('Classroom');
    await Classroom.update({ 'students._id': this._id }, { $pull: { students: { _id: this._id } } } );
    next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
