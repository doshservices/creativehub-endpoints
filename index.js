// core dependencies
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

// Custom Dependencies
require("./src/schedule/cronjob");
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
  res
    .status(200)
    .send(
      '<code>Creatives Backend Running...<a target="_blank" href="https://documenter.getpostman.com/view/10152625/2s935hS7cC" style="text-decoration: none; cursor: pointer; color: black; font-weight: bold">&lt;Go To Docs/&gt;</a></code>'
    )
    });




require('./src/db/mongoose').db().then(()=> app.listen(PORT, () =>
logger.info(`Creatives Backend Service Started on port ${PORT}`)
));