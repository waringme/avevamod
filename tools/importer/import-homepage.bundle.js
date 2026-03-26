var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(":scope > img, :scope img.cmp-image__image");
    const heading = element.querySelector(".heading h1, .heading h2, h1, h2");
    const description = element.querySelector(".description.rte-content p, .description p");
    const ctaLinks = Array.from(
      element.querySelectorAll(".hero-banner-btn-wrapper .smartbutton a[href]")
    ).filter((a) => a.textContent.trim());
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...ctaLinks);
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, {
      name: "hero-banner",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-highlight.js
  function parse2(element, { document }) {
    const columns = Array.from(
      element.querySelectorAll(".row.coltype-2 > .col.col-sm-6, .row > .col.col-12.col-sm-6")
    );
    if (columns.length === 0) return;
    const row = [];
    columns.forEach((col) => {
      const cellContent = [];
      const img = col.querySelector(".cmp-image img, .cmp-image__image, img");
      const textBlock = col.querySelector(".cmp-text");
      const ctaLink = col.querySelector(".smartbutton a[href]");
      if (textBlock && !img) {
        const headings = Array.from(textBlock.querySelectorAll("h1, h2, h3"));
        const paragraphs = Array.from(textBlock.querySelectorAll("p"));
        headings.forEach((h) => {
          if (h.textContent.trim()) cellContent.push(h);
        });
        paragraphs.forEach((p) => {
          const text = p.textContent.trim();
          if (text && text !== "\xA0") cellContent.push(p);
        });
        if (ctaLink && ctaLink.textContent.trim()) {
          cellContent.push(ctaLink);
        }
      } else if (img) {
        cellContent.push(img);
      }
      if (cellContent.length > 0) {
        row.push(cellContent);
      }
    });
    if (row.length === 0) return;
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, {
      name: "columns-highlight",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-story.js
  function parse3(element, { document }) {
    const cardCols = Array.from(
      element.querySelectorAll(".col.col-md-6, .col.col-12.col-md-6")
    );
    if (cardCols.length === 0) return;
    const cells = [];
    cardCols.forEach((col) => {
      const card = col.querySelector(".card-v3");
      if (!card) return;
      const img = card.querySelector("img.card-v3__img, img");
      const heading = card.querySelector("h3.card-v3__heading, h3, h2");
      const description = card.querySelector(".card-v3__description p, .card-v3__description");
      const ctaLink = col.querySelector(".smartbutton a[href]");
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
      name: "cards-story",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-icon.js
  function parse4(element, { document }) {
    const cardCols = Array.from(
      element.querySelectorAll(".col.col-sm-4, .col.col-12.col-sm-4")
    );
    if (cardCols.length === 0) return;
    const cells = [];
    cardCols.forEach((col) => {
      const card = col.querySelector(".card-v2-t1");
      if (!card) return;
      const img = card.querySelector("img.card-v2-t1__img, img");
      const heading = card.querySelector("h3.card-v2-t1__heading, h3, h2");
      const description = card.querySelector(".card-v2-t1__desciption p, .card-v2-t1__description p");
      const ctaLink = card.querySelector(".card-v2-t1__link a[href], .card-link a[href]");
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
      name: "cards-icon",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/transformers/aveva-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#consent_blackbar",
        "#truste-consent-track",
        '[id*="truste"]',
        '[class*="cookie"]'
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".userway_buttons_wrapper",
        '[class*="acsb"]',
        "#AccessibilityWidget"
      ]);
      WebImporter.DOMUtils.remove(element, ["a.skip"]);
      WebImporter.DOMUtils.remove(element, [
        ".modal.fade",
        ".form-dialog",
        ".image-popup-modal"
      ]);
      const emptyInteractive = element.querySelectorAll(".interactive-content");
      emptyInteractive.forEach((el) => {
        if (!el.textContent.trim()) el.remove();
      });
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--header-3",
        ".cmp-experiencefragment--header",
        "nav.main-navbar",
        ".global-nav"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--footer",
        "footer.global-footer"
      ]);
      WebImporter.DOMUtils.remove(element, ["noscript", "iframe", "link"]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-analytics");
      });
    }
  }

  // tools/importer/transformers/aveva-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { sections } = template;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        let sectionEl = null;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "columns-highlight": parse2,
    "cards-story": parse3,
    "cards-icon": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "AVEVA corporate homepage with hero banners, feature highlights, customer stories, and CTA sections",
    urls: [
      "https://www.aveva.com/"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: [
          "section.hero-banner.u-hero-height-large",
          "section.hero-banner.u-hero-height-small"
        ]
      },
      {
        name: "columns-highlight",
        instances: [
          "section#getAgileSection.background-container",
          "section.background-container:has(.column-control .col-12.col-sm-6)"
        ]
      },
      {
        name: "cards-story",
        instances: [
          ".card-v3.clickable-card"
        ]
      },
      {
        name: "cards-icon",
        instances: [
          ".card-v2-t1.clickable-card"
        ]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: "div.herobanner:first-of-type",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Announcement Bar",
        selector: "div.announcement",
        style: "accent",
        blocks: [],
        defaultContent: ["div.announcement-block .cmp-text"]
      },
      {
        id: "section-3",
        name: "Get Agile",
        selector: "section#getAgileSection",
        style: null,
        blocks: ["columns-highlight"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Expand Collaboration",
        selector: [
          "div.background-container.aem-GridColumn:nth-of-type(2)",
          "div.background-container.aem-GridColumn:has(.column-control .cmp-image[alt='Expand collaboration'])"
        ],
        style: null,
        blocks: ["columns-highlight"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Gartner Recognition",
        selector: "div.herobanner:nth-of-type(2)",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Advance Sustainability",
        selector: [
          "div.background-container.aem-GridColumn:nth-of-type(3)",
          "div.background-container.aem-GridColumn:has(.column-control .cmp-image[alt='Advance sustainability'])"
        ],
        style: null,
        blocks: ["columns-highlight"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "CONNECT Effect Banner",
        selector: "div.image.aem-GridColumn:has(a[href*='connect-effect'])",
        style: null,
        blocks: [],
        defaultContent: ["a.cmp-image__link[href*='connect-effect']"]
      },
      {
        id: "section-8",
        name: "Customer Success Stories",
        selector: "section.background-container:has(.card-v3)",
        style: null,
        blocks: ["cards-story"],
        defaultContent: ["h2.background-container__heading"]
      },
      {
        id: "section-9",
        name: "Our Industrial Life Newsletter",
        selector: "div.herobanner:nth-of-type(3)",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-10",
        name: "Industrial Ingenuity Cards",
        selector: "section.background-container:has(.card-v2-t1)",
        style: null,
        blocks: ["cards-icon"],
        defaultContent: ["h2.background-container__heading"]
      },
      {
        id: "section-11",
        name: "Speak with an Expert CTA",
        selector: "div.herobanner:nth-of-type(4)",
        style: null,
        blocks: [],
        defaultContent: ["div.hero-banner-content"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      WebImporter.rules.transformBackgroundImages(main, document);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
