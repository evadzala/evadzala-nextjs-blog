import utilStyles from '../styles/utils.module.css';
import Layout from '../components/layout';
import Image from 'next/image';

export default function About() {
  return (
    <Layout home>
        <section className={utilStyles.headingMd}>
            <header className={utilStyles.headingHeader}>
                <div>
                    <Image
                        priority
                        src="/images/profile.jpg"
                        className={utilStyles.borderCircle}
                        height={144}
                        width={144}
                        alt=""
                    />
                    <h1 className={utilStyles.heading2Xl}>邱家樺</h1>
                </div>
            </header>
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
    </Layout>
  );
}