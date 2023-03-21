const Moment = require('moment')


function sortByDate(expenses) {
    return expenses.sort((a,b) => new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD'))
}


function format(date) {
    return Moment(date).format('YYYY-MM-DD')
}


module.exports = {
    sortByDate,
    format
}