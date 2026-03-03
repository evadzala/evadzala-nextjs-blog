import styles from '../styles/Pagination.module.css';

export default function Pagination({
    total,
    perPage,
    currentPage,
    onPageChange,
}) {
    const totalPages = Math.ceil(total / perPage);
    // 核心邏輯：計算要顯示的頁碼陣列
    const getPageNumbers = () => {
        const pages = [];
        const neighborCount = 1; // 當前頁碼前後顯示多少個數字

        if (totalPages <= 7) {
        // 總頁數太少，直接全顯示
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
        // 永遠顯示第一頁
        pages.push(1);

        if (currentPage > neighborCount + 2) {
            pages.push('...');
        }

        // 計算中間的數字範圍
        const start = Math.max(2, currentPage - neighborCount);
        const end = Math.min(totalPages - 1, currentPage + neighborCount);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - (neighborCount + 1)) {
            pages.push('...');
        }

        // 永遠顯示最後一頁
        pages.push(totalPages);
        }
        return pages;
    };

    if (totalPages <= 1) return null; // 只有一頁時不顯示分頁器

    return (
        <nav className={styles.paginationContainer}>
            {/* 上一頁按鈕 */}
            {/* <button
                className={styles.navBtn}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </button> */}

            {/* 頁碼數字 */}
            <div className={styles.pageList}>
                {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''} ${
                    page === '...' ? styles.dots : ''
                    }`}
                    disabled={page === '...'}
                    onClick={() => page !== '...' && onPageChange(page)}
                >
                    {page}
                </button>
                ))}
            </div>

            {/* 下一頁按鈕 */}
            {/* <button
                className={styles.navBtn}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &gt;
            </button> */}
        </nav>
    );
}