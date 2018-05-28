import express from 'express';
import path from 'path';
import compression from 'compression';

const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('./client/dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running on port ${port}`);
  }
});
