import app from './app';


const server = require('http').Server(app);

server.listen(port, () => {
    console.log(`Application is running on port ${port}`);
})
