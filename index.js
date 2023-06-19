// core dependencies
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

// Custom Dependencies
const { logger } = require('./src/utils/logger');
const { PORT } = require('./src/core/config');

//  app init
const app = express()

// milddleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(morgan('tiny'));


// middlewares
const user = require('./src/router/userRouter')
const creatives = require('./src/router/creativeRouter')

app.use('/api/', user)
app.use('/api/', creatives)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });




require('./src/db/mongoose').db().then(()=> app.listen(PORT, () =>
logger.info(`Booking Backend Service Started on port ${PORT}`)
));