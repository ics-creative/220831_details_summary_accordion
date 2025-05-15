document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * アニメーションライブラリ(GSAP)を使ってアコーディオンのアニメーションを制御します
 */
const setUpAccordion = () => {
  const detailsList = document.querySelectorAll(".js-details");
  const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

  detailsList.forEach((details) => {
    const summary = details.querySelector(".js-summary");
    const content = details.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // is-openedクラスの有無で判定（detailsのopen属性の判定だと、アニメーション完了を待つ必要がありタイミング的に不安定になるため）
      if (details.classList.contains(IS_OPENED_CLASS)) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        details.classList.toggle(IS_OPENED_CLASS);

        // アニメーション実行
        closingAnim(content, details).restart();
      } else {
        // アコーディオンを開くときの処理
        // アイコン操作用クラスを切り替える(クラスを付与)
        details.classList.toggle(IS_OPENED_CLASS);

        // open属性を付与
        details.setAttribute("open", "true");

        // アニメーション実行
        openingAnim(content).restart();
      }
    });
  });
}

/**
 * アコーディオンを閉じる時のアニメーション
 * @param content {HTMLElement}
 * @param element {HTMLDetailsElement}
 */
const closingAnim = (content, element) => gsap.to(content, {
  height: 0,
  opacity: 0,
  duration: 0.4,
  ease: "power3.out",
  overwrite: true,
  onComplete: () => {
    // アニメーションの完了後にopen属性を取り除く
    element.removeAttribute("open");
  },
});

/**
 * アコーディオンを開く時のアニメーション
 * @param content {HTMLElement}
 */
const openingAnim = (content) => gsap.fromTo(
  content,
  {
    height: 0,
    opacity: 0,
  },
  {
    height: "auto",
    opacity: 1,
    duration: 0.4,
    ease: "power3.out",
    overwrite: true,
  });
