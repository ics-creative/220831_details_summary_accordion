document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * ライブラリ(GSAP)を使ってアコーディオンのアニメーションを制御します
 */
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // is-openedクラスの有無で判定
      if (element.classList.contains("is-opened")) {
        // アコーディオンを閉じるときの処理
        // アイコンを操作するためのis-openedクラスを切り替える(クラスを取り除く)
        element.classList.toggle("is-opened");

        // アニメーション実行
        closeAnim(content, element).restart();
      } else {
        // アコーディオンを開くときの処理
        // アイコンを操作するためのis-openedクラスを切り替える(クラスを付与)
        element.classList.toggle("is-opened");

        // open属性を付与
        element.setAttribute("open", "true");

        // アニメーション実行
        openAnim(content).restart();
      }
    });
  });
}

/**
 * アコーディオンを閉じる時のアニメーション
 */
const closeAnim = (content, element) => gsap.to(content, {
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
 */
const openAnim = (content) => gsap.fromTo(
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