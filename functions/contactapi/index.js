'use strict';

const catalyst = require('zcatalyst-sdk-node');

const TABLE_NAME = 'ContactSubmissions';

function readBody(req) {
	return new Promise((resolve, reject) => {
		let data = '';
		req.on('data', (chunk) => { data += chunk; });
		req.on('end', () => resolve(data));
		req.on('error', reject);
	});
}

function send(res, status, body) {
	res.writeHead(status, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
	});
	res.end(JSON.stringify(body));
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async (req, res) => {
	try {
		if (req.method === 'OPTIONS') {
			send(res, 204, {});
			return;
		}

		const app = catalyst.initialize(req);
		const table = app.datastore().table(TABLE_NAME);

		if (req.method === 'POST') {
			const raw = await readBody(req);
			const body = raw ? JSON.parse(raw) : {};
			const { name, email, phone, services, message } = body;

			if (!name || !email) {
				send(res, 400, { ok: false, error: 'Name and email are required.' });
				return;
			}

			const row = await table.insertRow({
				Name: String(name).slice(0, 200),
				Email: String(email).slice(0, 200),
				Phone: phone ? String(phone).slice(0, 50) : '',
				Services: Array.isArray(services) ? services.join(', ') : String(services || ''),
				Message: message ? String(message).slice(0, 4000) : '',
			});

			send(res, 201, { ok: true, row });
			return;
		}

		if (req.method === 'GET') {
			const adminKey = req.headers['x-admin-key'];
			if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
				send(res, 401, { ok: false, error: 'Unauthorized' });
				return;
			}

			const page = await table.getPagedRows({ maxRows: 200 });
			send(res, 200, { ok: true, rows: page.data || [] });
			return;
		}

		send(res, 405, { ok: false, error: 'Method not allowed' });
	} catch (err) {
		send(res, 500, { ok: false, error: err.message || 'Internal error' });
	}
};
