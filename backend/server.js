const app = require('./app');

const port = 4000;
const server = app.listen(port, function() {
    console.log('Listening on '+ port);
});
