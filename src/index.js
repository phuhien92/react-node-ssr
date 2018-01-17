import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app     = express();
app.set('port', (process.env.PORT || 3000));

// setup proxy - any request containing api keyword get forward to api server
// through this code
app.use(
    '/api', 
    proxy('https://react-ssr-api.herokuapp.com', 
    {
        // depend on how to setup API server
        proxyReqOptDecorator(opts) {
            opts.headers['x-forwarded-host'] = process.env.PORT ? 'ssr-demo.herokuapp.com/' : 'localhost:3000';
            return opts;
        }
    }
));

app.use(express.static('public'));

app.get("*", (req,res) => {
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
    
})

app.listen(app.get('port'), () => {
    console.log("Listening to port ",app.get('port'));
})