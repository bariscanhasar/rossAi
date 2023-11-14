import app from './app';


app
    .listen(5001, () => {
        console.log(`server running on port :5001}`);
    })
    .on('error', (e) => console.log(e))