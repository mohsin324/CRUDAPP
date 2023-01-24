require('dotenv').config();
const app = require('./app');
const connect = require('./db/connect');
const port = process.env.PORT || 5000;
// connect to DB
try{
    connect
    .then(()=> {
        app.listen(port, ()=> {
            console.log(`server listen at port ${port}...`);
        });
    })
}
catch(err){
    console.log(err); 
}
