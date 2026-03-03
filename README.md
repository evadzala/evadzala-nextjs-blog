# evadzala-nextjs-blog

紀錄前端相關的所見所聞

主題啟發自: [Nextjs.tw](https://nextjs.tw/)

## 專案結構

```
├── components/                # 組件目錄
│   ├── date.js                # 日期處理組件
│   ├── layout.js              # 全域佈局組件
│   └── layout.module.css      # 佈局組件專用 CSS 模組
├── lib/                       # 工具函式庫
│   └── posts.js               # 處理文章資料的邏輯 (如解析 Markdown)
├── pages/                     # 路由頁面 (Pages Router)
│   ├── api/                   # API 路由
│   │   └── hello.js           # 範例 API 端點
│   ├── posts/                 # 文章相關頁面
│   │   └── [id].js            # 動態路由頁面 (用於顯示單篇文章)
│   ├── _app.js                # 全域 App 元件 (初始化頁面、引入全域 CSS)
│   ├── 404.js                 # 自定義 404 錯誤頁面
│   └── index.js               # 網站首頁
├── posts/                     # Markdown 文章來源檔
├── public/                    # 靜態資源目錄
│   ├── images/                # 圖片資源
├── styles/                    # 樣式表目錄
│   ├── global.css             # 全域樣式
│   ├── Home.module.css        # 首頁專用 CSS 模組
│   └── utils.module.css       # 通用工具類 CSS 模組
├── .gitignore                 # Git 忽略清單
├── .nvmrc                     # Node 版本管理配置
├── package-lock.json          # 依賴鎖定檔 (npm)
├── package.json               # 項目依賴與指令配置
├── pnpm-lock.yaml             # 依賴鎖定檔 (pnpm)
└── postcss.config.js          # PostCSS 配置文件
```

## Build

```
    npm run dev
```

## 新增圖片

1. 先在hackmd寫入文章並上傳圖片
2. 上傳至hackmd的圖片會有hash碼，下載此圖片並以此hash碼命名圖片
3. 將該圖片新增至public/images裡面
4. 若找不到該圖片會顯示預設圖片NoImage.png
