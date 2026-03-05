import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import Header from '../components/header'


const name = 'Aslan';
export const siteTitle = `evadzala's Note`;

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={siteTitle}
        />
        <meta
          property="og:image"
          content="/images/profile.jpg"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header className={styles.header} />
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            ← 回到首頁
          </Link>
        </div>
      )}
    </div>
  );
}