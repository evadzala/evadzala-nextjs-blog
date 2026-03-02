import React, { useState } from 'react';
import styles from '../styles/header.module.css'; // 引入外部 CSS
import { siteTitle } from './layout';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {title: 'Blog', slug: ''},
    {title: 'About', slug: 'about'},
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.headerNav}>
      <div className={styles.headerContainer}>
        {/* 左側 Title */}
        <div className={styles.headerLogo}>
          {siteTitle}
        </div>

        {/* 右側按鈕 - 電腦版 */}
        <div className={`${styles.headerLinks} ${isOpen ? 'is-active' : ''}`}>
          {navItems.map((item) => (
            <Link key={item} className={styles.headerBtn} href={`/${item.slug}`}>
              {item.title}
            </Link>
          ))}
        </div>

        {/* 手機版漢堡按鈕 */}
        <button 
          className={`${styles.headerHamburger} ${isOpen ? 'is-open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>
    </nav>
  );
};

export default Header;