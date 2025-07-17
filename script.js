document.addEventListener('DOMContentLoaded', () => {

  /**
   * スクロールで要素をふわっと表示させる機能
   */
  const setupScrollReveal = () => {
    // 1. アニメーションさせたい要素をすべて取得
    // ここでクラスを付与したい要素のセレクタを指定します
    const revealTargets = [
      // ヒーローセクション
      '.hero h1', '.hero p', '.hero .hero-price',
      // 問題提起セクション
      '.problem h2', '.problem .center-text', '.problem .problem-content',
      // 解決策セクション
      '.solution h2', '.solution .solution-content',
      // サービス内容セクション
      '.services h2', '.services .service-category',
      // 料金プランセクション
      '.pricing h2', '.pricing .pricing-period', '.pricing .initial-fee', '.pricing .plan-card', '.pricing .pricing-notes',
      // FAQセクション
      '#faq h2', '#faq dt', '#faq dd',
      // CTAセクション
      '.cta .cta-box', '.cta .cta-message', '.cta .profile-contact-card',
      // フッター
      'footer .container'
    ];

    // 2. 取得した各要素に 'scroll-reveal' クラスを付与
    revealTargets.forEach(targetSelector => {
      const elements = document.querySelectorAll(targetSelector);
      elements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        
        // カードなど、同じクラス名が複数並ぶ要素に時間差をつける
        if (elements.length > 1) {
          // 6段階以上の遅延は不要なため、6で割った余りを利用
          const delayClass = `delay-${(index % 6) + 1}`;
          element.classList.add(delayClass);
        }
      });
    });

    // 3. Intersection Observer を使って、要素が画面に入ったら is-visible クラスを付与
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // 要素が画面に表示されたら
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 一度表示したら、監視を解除（アニメーションは1回だけ）
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // 要素が10%見えたらアニメーションを開始
      rootMargin: '0px 0px -50px 0px' // 画面下部から50px手前で反応させる
    });

    // 4. scroll-reveal クラスを持つすべての要素を監視対象にする
    document.querySelectorAll('.scroll-reveal').forEach(element => {
      observer.observe(element);
    });
  };

  // 機能を実行
  setupScrollReveal();

});