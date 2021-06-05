const routes = {
    '/': 'home',
    '/home/': 'home',
    '/about/': 'about',
    '/contact/': 'contact',
    '/error/': 'error'
}

const contentTypes = {
    'html' : 'text/html',
    'ico' : 'image/x-icon',
    'jpg' : 'image/jpeg',
    'png' : 'image/png',
    'gif' : 'image/gif',
    'css' : 'text/css',
    'js' : 'text/javascript'
}

module.exports = {
    contentTypes, routes
}