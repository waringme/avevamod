/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AVEVA site cleanup.
 * Selectors from captured DOM of https://www.aveva.com/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie/consent banners (from captured DOM: #consent_blackbar, #truste-consent-button)
    WebImporter.DOMUtils.remove(element, [
      '#consent_blackbar',
      '#truste-consent-track',
      '[id*="truste"]',
      '[class*="cookie"]',
    ]);

    // Accessibility widget (from captured DOM: .userway_buttons_wrapper, .acsb-*)
    WebImporter.DOMUtils.remove(element, [
      '.userway_buttons_wrapper',
      '[class*="acsb"]',
      '#AccessibilityWidget',
    ]);

    // Skip links (from captured DOM: a.skip)
    WebImporter.DOMUtils.remove(element, ['a.skip']);

    // Modal overlays and popups (from captured DOM: .modal, .form-dialog)
    WebImporter.DOMUtils.remove(element, [
      '.modal.fade',
      '.form-dialog',
      '.image-popup-modal',
    ]);

    // Empty interactive-content divs (from captured DOM)
    const emptyInteractive = element.querySelectorAll('.interactive-content');
    emptyInteractive.forEach((el) => {
      if (!el.textContent.trim()) el.remove();
    });
  }

  if (hookName === TransformHook.afterTransform) {
    // Header/Navigation (from captured DOM: .cmp-experiencefragment--header-3, .main-navbar)
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--header-3',
      '.cmp-experiencefragment--header',
      'nav.main-navbar',
      '.global-nav',
    ]);

    // Footer (from captured DOM: .cmp-experiencefragment--footer, footer.global-footer)
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--footer',
      'footer.global-footer',
    ]);

    // Noscript, iframes, link elements
    WebImporter.DOMUtils.remove(element, ['noscript', 'iframe', 'link']);

    // Clean up tracking/analytics attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-analytics');
    });
  }
}
