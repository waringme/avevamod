/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from './parsers/hero-banner.js';
import columnsHighlightParser from './parsers/columns-highlight.js';
import cardsStoryParser from './parsers/cards-story.js';
import cardsIconParser from './parsers/cards-icon.js';

// TRANSFORMER IMPORTS
import avevaCleanupTransformer from './transformers/aveva-cleanup.js';
import avevaSectionsTransformer from './transformers/aveva-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-banner': heroBannerParser,
  'columns-highlight': columnsHighlightParser,
  'cards-story': cardsStoryParser,
  'cards-icon': cardsIconParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'AVEVA corporate homepage with hero banners, feature highlights, customer stories, and CTA sections',
  urls: [
    'https://www.aveva.com/',
  ],
  blocks: [
    {
      name: 'hero-banner',
      instances: [
        'section.hero-banner.u-hero-height-large',
        'section.hero-banner.u-hero-height-small',
      ],
    },
    {
      name: 'columns-highlight',
      instances: [
        'section#getAgileSection.background-container',
        'section.background-container:has(.column-control .col-12.col-sm-6)',
      ],
    },
    {
      name: 'cards-story',
      instances: [
        '.card-v3.clickable-card',
      ],
    },
    {
      name: 'cards-icon',
      instances: [
        '.card-v2-t1.clickable-card',
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: 'div.herobanner:first-of-type',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Announcement Bar',
      selector: 'div.announcement',
      style: 'accent',
      blocks: [],
      defaultContent: ['div.announcement-block .cmp-text'],
    },
    {
      id: 'section-3',
      name: 'Get Agile',
      selector: 'section#getAgileSection',
      style: null,
      blocks: ['columns-highlight'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Expand Collaboration',
      selector: [
        'div.background-container.aem-GridColumn:nth-of-type(2)',
        "div.background-container.aem-GridColumn:has(.column-control .cmp-image[alt='Expand collaboration'])",
      ],
      style: null,
      blocks: ['columns-highlight'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Gartner Recognition',
      selector: 'div.herobanner:nth-of-type(2)',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Advance Sustainability',
      selector: [
        'div.background-container.aem-GridColumn:nth-of-type(3)',
        "div.background-container.aem-GridColumn:has(.column-control .cmp-image[alt='Advance sustainability'])",
      ],
      style: null,
      blocks: ['columns-highlight'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'CONNECT Effect Banner',
      selector: "div.image.aem-GridColumn:has(a[href*='connect-effect'])",
      style: null,
      blocks: [],
      defaultContent: ["a.cmp-image__link[href*='connect-effect']"],
    },
    {
      id: 'section-8',
      name: 'Customer Success Stories',
      selector: 'section.background-container:has(.card-v3)',
      style: null,
      blocks: ['cards-story'],
      defaultContent: ['h2.background-container__heading'],
    },
    {
      id: 'section-9',
      name: 'Our Industrial Life Newsletter',
      selector: 'div.herobanner:nth-of-type(3)',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-10',
      name: 'Industrial Ingenuity Cards',
      selector: 'section.background-container:has(.card-v2-t1)',
      style: null,
      blocks: ['cards-icon'],
      defaultContent: ['h2.background-container__heading'],
    },
    {
      id: 'section-11',
      name: 'Speak with an Expert CTA',
      selector: 'div.herobanner:nth-of-type(4)',
      style: null,
      blocks: [],
      defaultContent: ['div.hero-banner-content'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  avevaCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [avevaSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 1.5. Convert CSS background-images to <img> tags before parsing
    // (hero blocks use background-image on the live site, parsers need <img> elements)
    WebImporter.rules.transformBackgroundImages(main, document);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
