const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.method === 'GET') {
    if (req.url === '/api/posts') {
    }
  } else if (req.method === 'POST') {
  } else if (req.method === 'DELETE') {
  }
  res.write('으');
  res.write('히');
  res.write('히');
  res.write('히');
  res.end('Hello, Node');
});
server.listen(3065, () => {
  console.log('서버 실행중');
});
