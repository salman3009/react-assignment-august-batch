const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();


app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
  })

