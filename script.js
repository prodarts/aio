document.addEventListener('DOMContentLoaded', () => {

  /**
   * スクロールで要素をふわっと表示させる機能
   */
  const setupScrollReveal = () => {
    // 1. アニメーションさせたい要素をすべて取得
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
      // 新しいお問い合わせセクション
      '.contact-section h2', '.contact-section .contact-description', '.contact-section .input', '.contact-section .cta-btn', '.contact-section .sns-btn', '.contact-section .contact-note',
      // フッター
      'footer .container'
    ];

    // 2. 取得した各要素に 'scroll-reveal' クラスを付与
    revealTargets.forEach(targetSelector => {
      const elements = document.querySelectorAll(targetSelector);
      elements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        if (elements.length > 1) {
          const delayClass = `delay-${(index % 6) + 1}`;
          element.classList.add(delayClass);
        }
      });
    });

    // 3. Intersection Observer を使って、要素が画面に入ったら is-visible クラスを付与
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // 4. scroll-reveal クラスを持つすべての要素を監視対象にする
    document.querySelectorAll('.scroll-reveal').forEach(element => {
      observer.observe(element);
    });
  };

  // 機能を実行
  setupScrollReveal();

});

/**
 * お問い合わせテンプレートをクリップボードにコピーする機能
 */
function copyContactTemplate() {
  const contactTemplate = document.getElementById('contact-template');
  const copyAlert = document.getElementById('copy-alert');

  // テキストエリアを選択状態にする
  contactTemplate.select();
  contactTemplate.setSelectionRange(0, 99999); // モバイル端末での互換性のため

  // クリップボードへのコピーを試みる
  try {
    // 新しい Clipboard API を使用
    navigator.clipboard.writeText(contactTemplate.value).then(() => {
      // 成功時のアラート表示
      copyAlert.style.display = 'block';
      setTimeout(() => {
        copyAlert.style.display = 'none';
      }, 2500); // 2.5秒後にアラートを非表示
    }).catch(err => {
      // 失敗した場合、古い方法を試す
      console.error('クリップボードへの書き込みに失敗:', err);
      fallbackCopyTextToClipboard(contactTemplate.value, copyAlert);
    });
  } catch (err) {
    // Clipboard API がサポートされていない場合
    fallbackCopyTextToClipboard(contactTemplate.value, copyAlert);
  }
}

// 古いブラウザ用のフォールバックコピー機能
function fallbackCopyTextToClipboard(text, alertElement) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // 画面外に要素を配置
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alertElement.style.display = 'block';
            setTimeout(() => {
                alertElement.style.display = 'none';
            }, 2500);
        } else {
            alert('申し訳ありませんが、コピーに失敗しました。');
        }
    } catch (err) {
        console.error('フォールバックコピーに失敗しました', err);
        alert('申し訳ありませんが、コピーに失敗しました。');
    }

    document.body.removeChild(textArea);
}
