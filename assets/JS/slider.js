document.addEventListener("DOMContentLoaded", () => {
    /* ==========  初期セットアップ  ========== */
    const track = document.querySelector(".slider-track");
    const slides = Array.from(track.children); // 元スライド
    const slideWidth = slides[0].offsetWidth + 20; // 画像幅 + 余白
    const visibleCount = Math.floor(
        document.querySelector(".slider-container").offsetWidth / slideWidth
    );

    /* 末尾にクローンを追加（目に見える枚数ぶんで OK） */
    for (let i = 0; i < visibleCount; i++) {
        track.appendChild(slides[i].cloneNode(true));
    }

    let currentIndex = 0; // 現在のスライド番号（0-始まり）
    const speed = 3000; // 自動スライド間隔（ms）

    /* スライドを移動する共通関数 */
    const goTo = (index, animate = true) => {
        if (animate) {
            track.style.transition = "transform .6s ease";
        } else {
            track.style.transition = "none"; // パッと切り替える
        }
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
    };

    /* 手動操作 */
    window.slideLeft = () => goTo(Math.max(currentIndex - 1, 0));
    window.slideRight = () => goTo(currentIndex + 1);

    /* 自動スライド */
    setInterval(() => goTo(currentIndex + 1), speed);

    /* ====== 端まで行ったら一瞬で巻き戻す ====== */
    track.addEventListener("transitionend", () => {
        /* 元スライド枚数 (= クローンを除く realCount) */
        const realCount = slides.length;

        if (currentIndex >= realCount) {
            /* クローン上で止まったので、遷移なしで先頭に戻す */
            goTo(0, false);
        }
    });
});