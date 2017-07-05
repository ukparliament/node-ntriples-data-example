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
    let parser = N3.Parser()

    var options = {
        host: 'beta.parliament.uk',
        path: '/mps',
        method: 'GET',
        headers: {
            accept: 'application/n-triples'
        }
    }

    console.log('Start')
    let x = https.request(options,function(response){
        let str = ''

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            console.log('Got Chunk')
            str += chunk
        })

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log('Finished')
            console.log(str)

            let store = N3.Store()

            parser.parse(str, function(error, triple, prefixes){
                console.log('----------')
                console.log(error)
                console.log(triple)
                console.log(prefixes)

                if(triple) {
                    store.addTriple(triple)
                } else {
                    console.log('Loading completed; the store contains %d triples.', store.size)

                    let partyTriples = store.getTriples(null, null, 'http://id.ukpds.org/schema/Party')

                    console.log('  - %d parties', partyTriples.length)

                    let parties = []

                    partyTriples.forEach(function(partyTriple) {
                        let partyNameTriple = store.getTriples(partyTriple.subject, 'http://id.ukpds.org/schema/partyName', null)[0]
                        let partyCountTriple = store.getTriples(partyTriple.subject, 'http://id.ukpds.org/schema/count', null)[0]

                        let party = '[' + partyNameTriple.object + ',' + N3Util.getLiteralValue(partyCountTriple.object) + ']'

                        parties.push(party)
                    })

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
    console.log('Example app listening on port 3000!')
})