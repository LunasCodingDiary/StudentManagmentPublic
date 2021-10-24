const port = process.env.PORT || 3200;
const db = require('./db');
const app = require('./app');

//Init

const init = async() => {
    try {
        await db.syncAndSeed();
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
        console.log(ex);
    }
}

init();