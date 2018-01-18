import 'babel-polyfill';
import express from 'express';
import https from 'https';
import fs from 'fs';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app     = express();
const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}
app.set('port', (process.env.PORT || 3000));
// setup proxy - any request containing api keyword get forward to api server
// through this code
app.use(
    '/api', 
    proxy('https://react-ssr-api.herokuapp.com', 
    {
        // depend on how to setup API server
        proxyReqOptDecorator(opts) {
            opts.headers['x-forwarded-host'] = process.env.PORT ? 'ssr-demo.herokuapp.com' : 'localhost:3000';
            return opts;
        }
    }
));

app.use(express.static('public'));

app.get("*", (req,res) => {
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    }).map( promise => {
        if (promise) {
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            })
        }
    } )

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.notFound) {
            res.status(404);
        } 

        res.send(content);
    })
    ;
    
})

let secure_connect = false;

if (secure_connect) {
    https.createServer(httpsOptions, app).listen(app.get('port'), () => {
        console.log("Listening to port ",app.get('port'));
    });
} else {
    app.listen(app.get('port'), () => {
        console.log("Listening to port ",app.get('port'));
    });
}