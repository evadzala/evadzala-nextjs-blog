import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // 拿取 /posts 資料夾中的所有檔案名稱
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // 移除名稱中的 ".md"，並將它當作 id
    const id = fileName.replace(/\.md$/, '');

    // 將 markdown 內容轉換為字串
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用 gray-matter 解析 metadata 區塊
    const matterResult = matter(fileContents);

    // 將資料與 id 結合
    return {
      id,
      ...matterResult.data,
    };
  });
  // 依照日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
        params: {
            id: fileName.replace(/\.md$/, ''),
        },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // 使用 rehype 系列來處理高亮
    const processedContent = await remark()
      .use(remarkRehype)      // 將 Markdown 轉成 HTML 結構
      .use(rehypeHighlight)   // 自動偵測程式語言並加上高亮標籤
      .use(rehypeStringify)   // 輸出成 HTML 字串
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
}