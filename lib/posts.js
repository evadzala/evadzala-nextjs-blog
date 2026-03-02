import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'posts');

// 輔助函式：讀取所有文章並包含內容與 metadata
function getRawPosts() {
  // 拿取 /posts 資料夾中的所有檔案名稱
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    // 將 markdown 內容轉換為字串
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // 使用 gray-matter 解析 metadata 區塊
    const matterResult = matter(fileContents);
    return {
      fileName,
      ...matterResult.data,
      content: matterResult.content,
    };
  });
}

export function getSortedPostsData() {
  const allPostsData = getRawPosts().map(post => {
    // 我們優先使用 slug 作為 id，如果沒填 slug 則退而求其次用檔名
    return {
      id: post.slug || post.fileName.replace(/\.md$/, ''),
      ...post,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const posts = getRawPosts();
  
  return posts.map((post) => {
    return {
      params: {
        // 這裡的 id 實際上會變成網址列看到的 slug
        id: post.slug || post.fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
    // 因為 id 現在是 slug，我們必須找出哪個檔案的 slug 符合這個 id
    const posts = getRawPosts();
    const post = posts.find(p => (p.slug || p.fileName.replace(/\.md$/, '')) === id);

    if (!post) {
      throw new Error(`Post with slug "${id}" not found`);
    }

    // 使用 rehype 系列來處理高亮
    const processedContent = await remark()
      .use(remarkRehype)      // 將 Markdown 轉成 HTML 結構
      .use(rehypeHighlight)   // 自動偵測程式語言並加上高亮標籤
      .use(rehypeStringify)   // 輸出成 HTML 字串
      .process(post.content);

    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...post,
    };
}