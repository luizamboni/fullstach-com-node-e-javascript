const http = require('http');
const fs = require('fs');

function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}

const server = http.createServer((req, res) => {
    console.log(req.method, req.url)
    if (req.method === 'GET') {
        if (req.url === '/') {
            serveFile('index.html', 'text/html', res);
        } else if (req.url === '/styles.css') {
            serveFile('styles.css', 'text/css', res);
        } else if (req.url === '/client.js') {
            serveFile('client.js', 'application/javascript', res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/echo') {
        let body = 'echo: ';

        req.on('data', chunk => {
            body += chunk.toString();
        });


        req.on('end', () => {
            if (body === "echo: 42") {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end("Opa, com esse número eu não consigo");
            } else {
                res.end(body);

            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
