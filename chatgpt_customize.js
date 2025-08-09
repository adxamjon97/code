// ==UserScript==
// @name        chatgpt.com custom
// @namespace   Violentmonkey Scripts
// @match       https://chatgpt.com/*
// @grant       none
// @version     1.4
// @author      Adxamjon
// ==/UserScript==

function xpath(s) {
    return document.evaluate(
      s,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
}

(function() {
    'use strict';

    const pictureHTML = `
      <picture class="absolute inset-0 h-full w-full overflow-hidden" style="opacity: 1;">
        <source type="image/webp" srcset="
            https://persistent.oaistatic.com/burrito-nux/640.webp 640w,
            https://persistent.oaistatic.com/burrito-nux/1280.webp 1280w,
            https://persistent.oaistatic.com/burrito-nux/1920.webp 1920w
        ">
        <img class="absolute inset-0 h-full w-full scale-[1.02] object-cover opacity-50 blur-2xl dark:opacity-30"
             alt="" aria-hidden="true"
             src="https://persistent.oaistatic.com/burrito-nux/640.webp"
             srcset="
               https://persistent.oaistatic.com/burrito-nux/640.webp 640w,
               https://persistent.oaistatic.com/burrito-nux/1280.webp 1280w,
               https://persistent.oaistatic.com/burrito-nux/1920.webp 1920w
             "
             sizes="100vw" loading="eager" fetchpriority="high">
        <div class="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-white dark:to-black"></div>
      </picture>
    `;

    const applyChanges = () => {
        // thread-content-max-width fix
        document.querySelectorAll('[class*="thread-content-max-width"]').forEach(el => {
            el.style.setProperty('--thread-content-max-width', '100vw');
            el.style.maxWidth = '100vw';
            el.style.padding = '0 16px';
        });

        // picture qo'shish
        if (!document.querySelector('body > picture')) {
            document.body.insertAdjacentHTML('afterbegin', pictureHTML);
        }

        // 1️⃣ #stage-slideover-sidebar — style
        const stageSidebar = xpath('//*[@id="stage-slideover-sidebar"]');
        if (stageSidebar) {
            stageSidebar.setAttribute('style', 'width:var(--sidebar-width);background-color:transparent');
        }

        // 2️⃣ /html/body/div[1]/div/div[1]/div[1]/div/div[2] — class
        const div2 = xpath('/html/body/div[1]/div/div[1]/div[1]/div/div[2]');
        if (div2) {
            div2.className = 'opacity-100 motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-linear h-full w-[var(--sidebar-width)] overflow-x-clip overflow-y-auto text-clip whitespace-nowrap';
        }

        // 3️⃣ nav > div[1]
        const navDiv = xpath('/html/body/div[1]/div/div[1]/div[1]/div/div[2]/nav/div[1]');
        if (navDiv) {
            navDiv.style.background = 'rgba(255,255,255,0.05)';
            navDiv.style.backdropFilter = 'blur(10px)';
            navDiv.style.webkitBackdropFilter = 'blur(10px)';
        }

        // 4️⃣ nav > aside[1]
        const navAside = xpath('/html/body/div[1]/div/div[1]/div[1]/div/div[2]/nav/aside[1]');
        if (navAside) {
            navAside.style.background = 'rgba(255,255,255,0.05)';
            navAside.style.backdropFilter = 'blur(10px)';
            navAside.style.webkitBackdropFilter = 'blur(10px)';
        }

        // input block
        const form = xpath('/html/body/div[1]/div/div[1]/div[2]/main/div/div/div[2]/div[1]/div/div/div[2]/form');
        if (form) {
            form.style.background = 'rgba(255,255,255,0.05)';
            form.style.backdropFilter = 'blur(10px)';
            form.style.webkitBackdropFilter = 'blur(10px)';
        }

        // my text history
        document.querySelectorAll('div.user-message-bubble-color').forEach(el => {
            el.style.background = 'rgba(255, 255, 255, 0.2)'; // yarim shaffof
            el.style.backdropFilter = 'blur(10px)'; // blur effekti
            el.style.webkitBackdropFilter = 'blur(10px)'; // Safari uchun
        });
    };

    const observer = new MutationObserver(() => applyChanges());
    observer.observe(document.body, { childList: true, subtree: true });

    applyChanges();
})();
