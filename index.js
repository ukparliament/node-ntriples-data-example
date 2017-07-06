const express = require('express')
const app = express()
const N3 = require('n3')
const N3Util = N3.Util
const https = require('follow-redirects').https

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'pug')

let port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    log('INFO', 'Started GET "/" for %s', req.connection.remoteAddress)

    let parser = N3.Parser()

    var options = {
        host: 'beta.parliament.uk',
        path: '/mps',
        method: 'GET',
        headers: {
            accept: 'application/n-triples'
        }
    }

    log('INFO', 'Requesting application/n-triples from: https://beta.parliament.uk/mps')
    let x = https.request(options,function(response){
        let str = ''

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            log('INFO', 'Received data from: %s', response.responseUrl)
            str += chunk
        })

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            log('INFO', 'Finished receiving data from: %s', response.responseUrl)
            log('DEBUG', str)

            let store = N3.Store()

            log('INFO', 'Parsing data into triples')
            parser.parse(str, function(error, triple, prefixes){
                if(triple) {
                    store.addTriple(triple)
                } else {
                    log('INFO', 'Parsing completed; Triple store contains %d triples.', store.size)

                    let partyTriples = store.getTriples(null, null, 'http://id.ukpds.org/schema/Party')

                    log('DEBUG', 'Triple store contains %d parties', partyTriples.length)

                    let parties = []

                    partyTriples.forEach(function(partyTriple) {
                        let partyNameTriple = store.getTriples(partyTriple.subject, 'http://id.ukpds.org/schema/partyName', null)[0]
                        let partyCountTriple = store.getTriples(partyTriple.subject, 'http://id.ukpds.org/schema/count', null)[0]

                        let party = '[' + partyNameTriple.object + ',' + N3Util.getLiteralValue(partyCountTriple.object) + ']'

                        parties.push(party)
                    })

                    log('INFO', 'Rendering ./views/index.pug')
                    log('DEBUG', '  Passing parties: %s', parties.toString())
                    res.render('index', {
                        parties: parties.toString()
                    });
                }
            })

        })

        response.on('error', function(error){
            res.render('error', {
                error: error
            })
        })
    })

    x.end()
})

app.listen(port, function () {
    log('INFO', 'Listening on port %d', port)
})

function log (level, message, variables) {
    if(!variables) { variables = '' }

    console.log('[%s] [%s] '+message, new Date().toISOString(), level, variables)
}