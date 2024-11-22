/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import express from "express";
import util from "util";

const debug = util.debuglog("debug:express-server");
const app = express();
const port = 3000;

//app.use(express.bodyParser()); 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {

});
