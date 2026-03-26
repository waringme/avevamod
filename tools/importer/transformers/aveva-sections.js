/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AVEVA section breaks and section-metadata.
 * Adds <hr> between sections and section-metadata blocks for styled sections.
 * Runs in afterTransform only, using payload.template.sections.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { sections } = template;
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];

      // Find the first element matching section selector
      let sectionEl = null;
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetaBlock);
      }

      // Add <hr> before each section (except the first) if there is content before it
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
