import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          - 5年以上的網頁前端開發經驗 + 1年的維運經驗<br />

          - 規劃並執行從零到有的後台系統，使用前端主流框架 Vue 及 React<br />

          - 使用 bootstrap 及 Element UI 建立後台介面<br />

          - 具模組化管理、前端框架應用、Webview 實作經驗<br />

          - 與後端討論規格並執行介接後端 API<br />

          - 與 UI/UX 或使用者討論介面，聽取反饋後修正<br />

          - 專案負責人並帶領最多帶領4位組員的前端小組<br />

          - 協助建立團隊 Coding Style<br />

          - 使用 git 做版本控制<br />
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
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
      </section>
    </Layout>
  );
}