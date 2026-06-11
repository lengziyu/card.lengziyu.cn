# card.lengziyu.cn 部署说明

这个项目是纯静态站，不需要占用 `3000~3013` 之类的端口。
Nginx 直接读取 `/opt/apps/card.lengziyu.cn/www` 即可。

## 目录约定

- 仓库目录：`/opt/apps/card.lengziyu.cn`
- 构建输出：`/opt/apps/card.lengziyu.cn/dist`
- Nginx 静态目录：`/opt/apps/card.lengziyu.cn/www`

## 首次部署

```bash
sudo mkdir -p /opt/apps
cd /opt/apps
sudo git clone <你的仓库地址> card.lengziyu.cn
sudo chown -R "$USER":"$USER" /opt/apps/card.lengziyu.cn
cd /opt/apps/card.lengziyu.cn
npm ci
npm run build
python3 update.py --skip-pull
```

## 生成 Nginx 配置

```bash
sudo mkdir -p /etc/nginx/conf.d
sudo tee /etc/nginx/conf.d/card.lengziyu.cn.conf >/dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name card.lengziyu.cn;

    root /opt/apps/card.lengziyu.cn/www;
    index index.html;

    access_log /var/log/nginx/card.lengziyu.cn.access.log;
    error_log /var/log/nginx/card.lengziyu.cn.error.log;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        try_files $uri =404;
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
    }

    location = /favicon.ico {
        try_files $uri =404;
        access_log off;
        expires 1d;
    }

    location = /robots.txt {
        try_files $uri =404;
        access_log off;
        log_not_found off;
    }
}
EOF

sudo nginx -t && sudo systemctl reload nginx
```

## 配置 HTTPS

### 方案一：直接用 certbot 自动改 Nginx

先按上面的 HTTP 配置跑通，然后执行：

```bash
sudo certbot --nginx -d card.lengziyu.cn
```

如果成功，certbot 会自动：

- 申请证书
- 修改 Nginx 配置
- 加上 `80 -> 443` 跳转
- 自动 reload Nginx

### 方案二：手动维护 80/443 配置

如果你想把 SSL 配置完全自己掌控，可以直接生成这份配置：

```bash
sudo mkdir -p /var/www/certbot
sudo tee /etc/nginx/conf.d/card.lengziyu.cn.conf >/dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name card.lengziyu.cn;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name card.lengziyu.cn;

    ssl_certificate /etc/letsencrypt/live/card.lengziyu.cn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/card.lengziyu.cn/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /opt/apps/card.lengziyu.cn/www;
    index index.html;

    access_log /var/log/nginx/card.lengziyu.cn.access.log;
    error_log /var/log/nginx/card.lengziyu.cn.error.log;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        try_files $uri =404;
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
    }

    location = /favicon.ico {
        try_files $uri =404;
        access_log off;
        expires 1d;
    }

    location = /robots.txt {
        try_files $uri =404;
        access_log off;
        log_not_found off;
    }
}
EOF
```

先申请证书：

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d card.lengziyu.cn
```

然后生效配置：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 后续更新

```bash
cd /opt/apps/card.lengziyu.cn
python3 update.py
```

如果服务器上有本地改动：

```bash
python3 update.py --stash
```

如果要强制丢弃本地改动并对齐远端：

```bash
python3 update.py --hard
```
