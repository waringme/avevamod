/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-banner
 * Base block: hero
 * Source: https://www.aveva.com/
 *
 * Source DOM: section.hero-banner with direct child <img> (background),
 *   .heading > h1/h2, .description.rte-content > p, .hero-banner-btn-wrapper > .smartbutton > a
 *
 * Target structure (from block library):
 *   Row 1: block name
 *   Row 2: background image
 *   Row 3: heading + subheading + CTA(s)
 */
export default function parse(element, { document }) {
  // Extract background image (direct child img of section.hero-banner)
  const bgImage = element.querySelector(':scope > img, :scope img.cmp-image__image');

  // Extract heading (h1 or h2 inside .heading container)
  const heading = element.querySelector('.heading h1, .heading h2, h1, h2');

  // Extract description text (optional, present in u-hero-height-large variant)
  const description = element.querySelector('.description.rte-content p, .description p');

  // Extract CTA buttons
  const ctaLinks = Array.from(
    element.querySelectorAll('.hero-banner-btn-wrapper .smartbutton a[href]')
  ).filter((a) => a.textContent.trim());

  // Build cells array matching hero block library structure
  const cells = [];

  // Row 2: Background image (optional)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 3: Content cell - heading + description + CTAs
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...ctaLinks);

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero-banner',
    cells,
  });
  element.replaceWith(block);
}
