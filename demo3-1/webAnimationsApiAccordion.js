document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
 */
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
  const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.isRunning === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const closeAccordion = content.animate(closeAccordionKeyframes(content), accordionTiming);
        // アニメーション実行中用の値を付与
        element.dataset.isRunning = RUNNING_VALUE;

        // アニメーションの完了後に
        closeAccordion.onfinish = () => {
          // open属性を取り除く
          element.removeAttribute("open");
          // アニメーション実行中用の値を取り除く
          element.dataset.isRunning = "";
        };
      } else {
        // アコーディオンを開くときの処理
        // open属性を付与
        element.setAttribute("open", "true");

        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const openAccordion = content.animate(openAccordionKeyframes(content), accordionTiming);
        // アニメーション実行中用の値を入れる
        element.dataset.isRunning = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openAccordion.onfinish = () => {
          element.dataset.isRunning = "";
        };
      }
    });
  });
}

/**
 * アニメーションの時間
 */
const accordionTiming = {
  duration: 400,
  easing: "ease-out"
};

/**
 * アコーディオンを閉じるときのキーフレーム
 */
const closeAccordionKeyframes = (content) => [{
  height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
  opacity: 1,
}, {
  height: 0,
  opacity: 0,
}];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openAccordionKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
];
