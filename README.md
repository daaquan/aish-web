# aish-web

Landing / intro site for **[aish](https://github.com/daaquan/aish)** — an open-source
AI copilot for your command line. Live at **[openaish.com](https://openaish.com)**.

Built with Next.js 16 (App Router) + Tailwind CSS v4. Terminal-dark aesthetic.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & run

```bash
npm run build
npm run start    # serves the production build
```

## Deploy (current setup)

Served via pm2 → nginx → Cloudflare Tunnel:

```bash
npm run build
PORT=3010 pm2 start npm --name aish-web -- start   # first time
pm2 restart aish-web                               # after a rebuild
```

nginx proxies `openaish.com` → `127.0.0.1:3010`; the Cloudflare tunnel fronts nginx.

## License

The aish project is licensed under the **MIT License**. See the
[aish repository](https://github.com/daaquan/aish) for details.
