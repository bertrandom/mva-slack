const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const rp = require('request-promise-native');

const OAuth = require('oauth');
const OAuth2 = OAuth.OAuth2;    
const oauth2 = new OAuth2(config.slack.client_id,
	config.slack.client_secret,
	'https://slack.com/', 
	'/oauth/authorize',
	'/api/oauth.access', 
	null);

var WebClient = require('@slack/client').WebClient;

const app = express();

app.engine('hb', exphbs({
	defaultLayout: 'main',
	extname: 'hb'
}));

app.set('view engine', 'hb');
app.enable('view cache');

app.use(express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/complete', function (req, res) {
	res.render('complete');
});

app.get('/oauth', function (req, res) {

	oauth2.getOAuthAccessToken(
		req.query.code,
		{'grant_type':'client_credentials'},
		function (e, access_token, refresh_token, results) {

			if (e) {
				throw new Error('install_failed');
			}

			res.redirect('/complete');

		}
	);

});

app.listen(config.port, function () {
	console.log('Server started on port ' + config.port + '.');
});