const API = require('./api/index')

module.exports = (app) => {

    app.get('/api/v1/movie/:name', API.ConsultarNotaIMDB)
}