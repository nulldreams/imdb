const rp = require('request-promise')
const cheerio = require('cheerio')

exports.ConsultarNotaIMDB = (filme, cb) => {
    CapturarUrlIMDB(filme, (url) => {
        ConsultarIMDB(url, (nota) => {
            cb(null, nota)
        })
    })

}

exports.CapturarURLIMDB = (filme, cb) => {
    CapturarUrlIMDB(filme, (url) => {
        cb(null, url)
    })
}



exports.ConsultarIMDB = (url, cb) => {
    ConsultarIMDB(url, (nota) => {
        cb(null, nota)
    })
}

var ConsultarIMDB = (url, cb) => {
    var options = {
        method: 'GET',
        encoding: 'binary',
        uri: `${url}`,
        transform: (body) => {
            return cheerio.load(body)
        }
    }

    rp(options)
        .then(($) => {

            if (typeof $('.ratingValue').find('strong').eq(0).attr('title') !== 'undefined') {
                let nota = `Nota ${$('.ratingValue').find('strong').eq(0).attr('title').trim().replace('based on', 'com base em').replace('user ratings', 'classificações de usuários')}`
                return cb(nota)
            }
        })
}

var CapturarUrlIMDB = (filme, cb) => {
    let nome = filme.replace(/ /g, '+')

    var options = {
        method: 'GET',
        encoding: 'binary',
        uri: `https://www.google.com.br/search?q=${nome}+imdb`,
        transform: (body) => {
            return cheerio.load(body)
        }
    }
    rp(options)
        .then(($) => {
            let url = $('.g').eq(0).find('h3').eq(0).find('a').attr('href')
            url = url.substring(url.indexOf('/url?q=') + 7, url.indexOf('/&'))
            cb(url)
        })
}
