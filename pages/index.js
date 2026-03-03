import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import Pagination from '../components/pagination';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 透過 getStaticProps 取得伺服器端的文章資料
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // 1. 監聽 URL Query 參數
  // 當使用者直接輸入網址或點擊瀏覽器回退鍵時，同步頁碼狀態
  useEffect(() => {
    // 確保 router 已準備就緒
    if (!router.isReady) return;

    if (router.query.page) {
      const page = parseInt(router.query.page);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    } else {
      setCurrentPage(1);
    }
  }, [router.query.page, router.isReady]);

  // 2. 處理分頁切換
  const handlePageChange = (page) => {
    // 更新 URL，使用 shallow: true 避免觸發 getStaticProps 重新抓取資料
    // scroll: true 讓頁面切換後滾動回頂部
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: page },
      },
      undefined,
      { shallow: true, scroll: true }
    );
  };

  // 計算分頁顯示的文章範圍
  const totalPages = Math.ceil(allPostsData.length / postsPerPage);
  const currentPosts = allPostsData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <Layout home>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {currentPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>

        {/* 分頁器組件 */}
        <Pagination 
          total={totalPages} 
          CurrentPage={currentPage} 
          onPageChange={handlePageChange} 
        />
      </section>
    </Layout>
  );
}