document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");

  details.forEach(element => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      if (element.classList.contains("is-open")) {
        // アコーディオンを閉じるときの処理

        // アイコンを操作するためのis-openクラスを切り替える(クラスを取り除く)
        element.classList.toggle("is-open");

        // アニメーション実行
        closeAccordion(content, element).restart();
      } else {
        // アコーディオンを開くときの処理

        // アイコンを操作するためのis-openクラスを切り替える(クラスを付与)
        element.classList.toggle("is-open");

        // open属性を付与
        element.setAttribute("open", "true");

        // アニメーション実行
        openAccordion(content).restart();
      }
    });
  });
}

/**
 * アコーディオンを閉じる時のアニメーション
 */
const closeAccordion = (content, element) => gsap.to(content, {
  opacity: 0,
  height: 0,
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
const openAccordion = (content) => gsap.fromTo(
  content,
  {
    opacity: 0,
    height: 0,
  },
  {
    opacity: 1,
    height: "auto",
    duration: 0.4,
    ease: "power3.out",
    overwrite: true,
  });