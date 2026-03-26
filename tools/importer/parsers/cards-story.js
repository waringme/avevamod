/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-story
 * Base block: cards
 * Source: https://www.aveva.com/
 *
 * Source DOM: div.column-control:has(.card-v3)
 *   Each card: .col.col-md-6 > .card-images.section > .card-v3.clickable-card
 *     img.card-v3__img, h3.card-v3__heading, .card-v3__description > p
 *     CTA: sibling .smartbutton > a (outside .card-images, inside .col)
 *
 * Target structure (from block library):
 *   Row 1: block name
 *   Row 2+: image | heading + description + CTA (per card)
 */
export default function parse(element, { document }) {
  // Find all card columns (each .col contains one card + its CTA)
  const cardCols = Array.from(
    element.querySelectorAll('.col.col-md-6, .col.col-12.col-md-6')
  );

  if (cardCols.length === 0) return;

  const cells = [];

  cardCols.forEach((col) => {
    const card = col.querySelector('.card-v3');
    if (!card) return;

    // Image (first cell)
    const img = card.querySelector('img.card-v3__img, img');

    // Content (second cell): heading, description, CTA link
    const heading = card.querySelector('h3.card-v3__heading, h3, h2');
    const description = card.querySelector('.card-v3__description p, .card-v3__description');

    // CTA is a sibling of .card-images, inside the .col container
    const ctaLink = col.querySelector('.smartbutton a[href]');

    const imageCell = img ? [img] : [];
    const contentCell = [];

    if (heading && heading.textContent.trim()) contentCell.push(heading);
    if (description && description.textContent.trim()) contentCell.push(description);
    if (ctaLink && ctaLink.textContent.trim()) contentCell.push(ctaLink);

    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'cards-story',
    cells,
  });
  element.replaceWith(block);
}
