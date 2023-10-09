const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const proxyOptionsForApp1 = {
  target: 'http://localhost:3000/index.html',  // /app1 パスへのリクエストをここに転送
  changeOrigin: true,
  logLevel: 'debug',
};

const proxyOptionsForApp2 = {
  target: 'http://localhost:3001',  // /app2 パスへのリクエストをここに転送
  changeOrigin: true,
  logLevel: 'debug',
};


// パスに基づいて異なるリバースプロキシを設定
app.use('/', createProxyMiddleware(proxyOptionsForApp1));
app.use('/ytdl', createProxyMiddleware(proxyOptionsForApp2));


const IP_ADDRESS = 'localhost';
const PORT = 8000;

app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Proxy server is running on http://${IP_ADDRESS}:${PORT}`);
});
