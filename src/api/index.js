const rp = require('request-promise')
const cheerio = require('cheerio')

exports.ConsultarNotaIMDB = (req, res) => {
    CapturarUrlIMDB(req.params.name, (url) => {
        ConsultarIMDB(url, (nota) => {
            
            res.status(200).send({ nota: nota })
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
        encoding: 'utf8',
        uri: `${url}`,
        transform: (body) => {
            return cheerio.load(body)
        }
    }

    rp(options)
        .then(($) => {
            let data

            if (typeof $('.ratingValue').find('strong').eq(0).attr('title') !== 'undefined') {
                let genero = []
                let atores = []
                data = {
                    name: $('.title_wrapper').find('h1').eq(0).text().trim(),
                    title: $('.originalTitle').text().trim().replace(' (original title)', ''),
                    release_date: $('#titleYear').text().trim().replace('(', '').replace(')', ''),
                    content_rating: $('.title_wrapper').find('.subtext').find('meta').eq(0).attr('content'),
                    duration: $('.title_wrapper').find('.subtext').find('time').eq(0).text().trim(),
                    director: $('.plot_summary').find('.credit_summary_item').eq(0).find('span').eq(1).text().trim(),
                    plot: $('.plot_summary').find('.summary_text').eq(0).text().trim(),
                    rating: $('.ratingValue').find('strong').eq(0).children().text().trim()
                }
                for (let i = 0; i < $('.plot_summary').find('.credit_summary_item').eq(2).find('.itemprop').length; i++) {
                    atores.push($('.plot_summary').find('.credit_summary_item').eq(2).find('.itemprop').eq(i).text().trim())
                }
                
                for (let i = 0; i < $('.title_wrapper').find('.subtext').find('.itemprop').length; i++) {
                    genero.push($('.title_wrapper').find('.subtext').find('.itemprop').eq(i).text().trim())
                }
                data.actors = atores
                data.genre = genero
            }

            cb(data)
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
