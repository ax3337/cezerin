// config used by server side only
const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'shop';
const dbUser = process.env.DB_USER || 'heroku_qm639qcq';
const dbPass = process.env.DB_PASS || '4m4R8g8fkKHxPMw';
const dbCred =
	dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : '';

const dbUrl = `mongodb://heroku_qm639qcq:4m4R8g8fkKHxPMw@ds157834.mlab.com:57834/heroku_qm639qcq`;

module.exports = {
	// used by Store (server side)
	apiBaseUrl: `http://localhost:3001/api/v1`,

	// used by Store (server and client side)
	ajaxBaseUrl: `http://localhost:3001/ajax`,

	// Access-Control-Allow-Origin
	storeBaseUrl: '*',

	// used by API
	adminLoginUrl: '/admin/login',

	apiListenPort: 3001,
	storeListenPort: 3000,

	// used by API
	mongodbServerUrl: dbUrl,

	smtpServer: {
		host: 'email-smtp.us-west-2.amazonaws.com',
		port: 465,
		secure: true,
		user: 'AKIAI3WRGJJPXZ3WPUXQ',
		pass: 'Aoiw4TTPMAwQZ8jJ5GRDHyepkzV1pHaNtRn3I9bPgknL',
		fromName: 'ax3337',
		fromAddress: 'ax3337@gmail.com'
	},

	// key to sign tokens
	jwtSecretKey: 'SP69kXFR3znRi7kL8Max2GTB24wOtEQj',

	// key to sign store cookies
	cookieSecretKey: '8669X9P5yI1DAEthy1chc3M9EncyS7SM',

	// path to uploads
	categoriesUploadPath: 'public/content/images/categories',
	productsUploadPath: 'public/content/images/products',
	filesUploadPath: 'public/content',
	themeAssetsUploadPath: 'theme/assets/images',

	// url to uploads
	categoriesUploadUrl: '/images/categories',
	productsUploadUrl: '/images/products',
	filesUploadUrl: '',
	themeAssetsUploadUrl: '/assets/images',

	// store UI language
	language: 'ru',

	// used by API
	orderStartNumber: 1000,

	developerMode: true
};
