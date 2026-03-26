/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-icon
 * Base block: cards
 * Source: https://www.aveva.com/
 *
 * Source DOM: div.column-control:has(.card-v2-t1)
 *   Each card: .col.col-sm-4 > .card-icons.section > .card-v2-t1.clickable-card
 *     img.card-v2-t1__img (icon), h3.card-v2-t1__heading,
 *     .card-v2-t1__desciption > p (note: typo in source class "desciption")
 *     CTA: .card-v2-t1__link > .smartbutton > a.body-action
 *
 * Target structure (from block library):
 *   Row 1: block name
 *   Row 2+: image | heading + description + CTA (per card)
 */
export default function parse(element, { document }) {
  // Find all card columns (each .col contains one card)
  const cardCols = Array.from(
    element.querySelectorAll('.col.col-sm-4, .col.col-12.col-sm-4')
  );

  if (cardCols.length === 0) return;

  const cells = [];

  cardCols.forEach((col) => {
    const card = col.querySelector('.card-v2-t1');
    if (!card) return;

    // Icon/image (first cell)
    const img = card.querySelector('img.card-v2-t1__img, img');

    // Content (second cell): heading, description, CTA link
    const heading = card.querySelector('h3.card-v2-t1__heading, h3, h2');
    // Note: source has typo "desciption" (missing 'r')
    const description = card.querySelector('.card-v2-t1__desciption p, .card-v2-t1__description p');

    // CTA is inside the card body in .card-v2-t1__link
    const ctaLink = card.querySelector('.card-v2-t1__link a[href], .card-link a[href]');

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
    name: 'cards-icon',
    cells,
  });
  element.replaceWith(block);
}
