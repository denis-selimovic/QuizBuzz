const checkClassroomOwnership = (req, res, next) => {
    if (req.user.classrooms.map(c => c._id.toString()).includes(req.params.id)) {
        return next();
    }
    res.status(403).json({ message: 'Not authorized to delete this classroom' });
};

module.exports = {
    checkClassroomOwnership
}
