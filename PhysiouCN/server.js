// 简单的HTTP服务器，用于在本地测试内容加载功能
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// 定义MIME类型
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // 解析URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // 如果请求的是根目录，则默认返回index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // 获取文件的完整路径
  const filePath = path.join(process.cwd(), pathname);
  
  // 获取文件扩展名
  const extname = path.extname(filePath).toLowerCase();
  
  // 获取MIME类型
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // 读取文件
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 如果文件不存在，返回404
      if (err.code === 'ENOENT') {
        console.error(`文件不存在: ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>404 未找到</h1><p>请求的文件 ${pathname} 不存在。</p>`);
        return;
      }
      
      // 其他错误，返回500
      console.error(`服务器错误: ${err.code}`);
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>500 服务器错误</h1><p>读取文件时发生错误: ${err.code}</p>`);
      return;
    }
    
    // 设置响应头
    res.writeHead(200, { 
      'Content-Type': `${contentType}; charset=utf-8`,
      'Access-Control-Allow-Origin': '*', // 允许跨域请求
      'Cache-Control': 'no-cache, no-store, must-revalidate', // 禁用缓存
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    // 返回文件内容
    res.end(data);
  });
});

// 设置服务器端口
const PORT = process.env.PORT || 3000;

// 启动服务器
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}/`);
  console.log(`按 Ctrl+C 停止服务器`);
}); 