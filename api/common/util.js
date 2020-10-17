const getBodyWithOffsetDate = (body, hours) => {
    body.date = offsetDate(body.date, hours);
    return body;
};

const offsetDate = (date, hours) => {
    return new Date(date + (hours * 60 * 60 * 1000));
}

module.exports = {
    getBodyWithOffsetDate,
    offsetDate
};