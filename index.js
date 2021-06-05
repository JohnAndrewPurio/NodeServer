const { createServer } = require('http')
const fs = require('fs')
const { routes, contentTypes } = require('./constants')
let { counter } = require('./counter')

const address = 'localhost'
const port = 4000

const sendCounter = async (response) => {
    response.writeHead(202, {
        'Content-Type': 'text/json'
    })

    response.write(JSON.stringify(counter / 3))
    response.end()
}

const server = createServer( (request, response) => {
    const url = request.url
    let fileExtension =  url.lastIndexOf('.') + 1
    let mimeType = 'text/html'
    let currentRoute = /\w+\.\w+/.test(url) ? /\w+\.\w+/.exec(url)[0]: routes[url] + '\\index.html'
    let responseCode = 200
    let urlPath =  currentRoute

    if(/counter/.test(url)) {
        sendCounter(response)
        return 
    }

    if(!routes[url] && !(/\w+\.\w+/.test(url)) ) {
        urlPath = 'error\\index.html'
        responseCode = 404
    }

    if(/favicon/.test(request.url)) {
        response.statusCode = responseCode
        response.end()
        return
    }

    if(fileExtension) {
        fileExtension = url.substr( fileExtension )

        mimeType = contentTypes[fileExtension]
    }

    response.setHeader('Content-Type', mimeType)
    response.statusCode = responseCode

    fs.readFile(urlPath, (err, data) => {
        if(err) {
            console.log(err)
            response.end()

            return
        }

        response.write(data)
        response.end()
    })

    counter++
})

server.listen(port, address, () => {
    console.log('Server started at port ' + port)
})

/***************** TESTING SECTION *****************/
// fs.readFile('index.css', (err, data) => {
//     if(err) {
//         console.log(err)
//     }

//     console.log(data.toString())

//     // response.write(data)
//     // response.end()
// })