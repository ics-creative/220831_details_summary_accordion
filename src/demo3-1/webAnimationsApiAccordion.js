document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");

  details.forEach(element => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");
    // アニメーション実行中か？
    let isRunning = false;

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // アニメーション中だったらクリックベントを受け付けないでリターンする
      if (isRunning) {
        return;
      }

      if (element.open) {
        // アコーディオンを閉じるときの処理
        // フラグを立てる
        isRunning = true;

        // アイコンを操作するためのis-openクラスを切り替える(クラスを取り除く)
        element.classList.toggle("is-open");

        // アニメーション実行
        closeAccordion(content).onfinish = () => {
          // アニメーションの完了後にopen属性を取り除く
          element.removeAttribute("open");
          // フラグをおろす
          isRunning = false;
        }

      } else {
        // アコーディオンを開くときの処理
        // フラグを立てる
        isRunning = true;

        // アイコンを操作するためのis-openクラスを切り替える(クラスを付与)
        element.classList.toggle("is-open");

        // open属性を付与
        element.setAttribute("open", "true");

        // アニメーション実行
        openAccordion(content).onfinish = () => {
          // アニメーション完了後にフラグをおろす
          isRunning = false;
        }
      }
    });
  });
}


/**
 * アコーディオンを閉じる時のアニメーション
 */
const closeAccordion = (content) => content.animate([{
    height: content.offsetHeight + 'px',
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }],
  {
    duration: 400,
    easing: "ease-out"
  }
);

/**
 * アコーディオンを開く時のアニメーション
 */
const openAccordion = (content) => content.animate([
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
], {
  duration: 400,
  easing: "ease-out"
});
