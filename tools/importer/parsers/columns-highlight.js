/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-highlight
 * Base block: columns
 * Source: https://www.aveva.com/
 *
 * Source DOM: section.background-container or section#getAgileSection
 *   .column-control > .container > .row.coltype-2 > .col.col-sm-6 (x2)
 *   Text column: .text.section > .cmp-text (h2, p) + sibling .smartbutton > a
 *   Image column: .image.section > .container-left > .cmp-image > img
 *
 * Target structure (from block library):
 *   Row 1: block name
 *   Row 2+: N columns of content (text, images, links side-by-side)
 */
export default function parse(element, { document }) {
  // Find the column containers
  const columns = Array.from(
    element.querySelectorAll('.row.coltype-2 > .col.col-sm-6, .row > .col.col-12.col-sm-6')
  );

  if (columns.length === 0) return;

  const row = [];

  columns.forEach((col) => {
    const cellContent = [];

    // Check if this is an image column
    const img = col.querySelector('.cmp-image img, .cmp-image__image, img');
    const textBlock = col.querySelector('.cmp-text');
    const ctaLink = col.querySelector('.smartbutton a[href]');

    if (textBlock && !img) {
      // Text column: headings, paragraphs, and CTA
      const headings = Array.from(textBlock.querySelectorAll('h1, h2, h3'));
      const paragraphs = Array.from(textBlock.querySelectorAll('p'));

      headings.forEach((h) => {
        if (h.textContent.trim()) cellContent.push(h);
      });

      paragraphs.forEach((p) => {
        const text = p.textContent.trim();
        // Skip empty paragraphs and &nbsp;
        if (text && text !== '\u00a0') cellContent.push(p);
      });

      if (ctaLink && ctaLink.textContent.trim()) {
        cellContent.push(ctaLink);
      }
    } else if (img) {
      // Image column
      cellContent.push(img);
    }

    if (cellContent.length > 0) {
      row.push(cellContent);
    }
  });

  if (row.length === 0) return;

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'columns-highlight',
    cells,
  });
  element.replaceWith(block);
}
