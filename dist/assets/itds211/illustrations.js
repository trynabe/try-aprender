(() => {
  const catalog = window.ITDS211SlideFigures ?? {};
  const figuresByLecture = new Map();
  const pad = value => String(value).padStart(2, "0");

  for (const chapter of window.ITDS211 ?? []) {
    const entries = catalog[chapter.number];
    if (!entries) continue;
    chapter.source ??= "assets/itds211/references/lecture-" + pad(chapter.number) + ".pdf";
    figuresByLecture.set(chapter.number, new Map(Object.values(entries).flat().map(figure => [figure.page, figure])));
    for (const section of chapter.sections) section.slideFigures = entries[section.id];
  }

  function makeFigure(chapter, { page, caption, width, height }) {
    const figure = document.createElement("figure");
    figure.className = "slide-figure";

    const zoom = document.createElement("a");
    zoom.className = "slide-figure-zoom";
    zoom.href = "assets/itds211/figures/lecture-" + pad(chapter.number) + "/page-" + pad(page) + ".webp";
    zoom.target = "_blank";
    zoom.rel = "noopener";
    zoom.setAttribute("aria-label", "เปิดภาพขนาดเต็ม " + caption);

    const img = document.createElement("img");
    img.alt = caption;
    img.width = width;
    img.height = height;
    img.loading = "lazy";
    img.decoding = "async";
    img.src = zoom.href;
    zoom.append(img);

    const label = document.createElement("figcaption");
    const origin = document.createElement("a");
    origin.href = chapter.source + "#page=" + page;
    origin.target = "_blank";
    origin.rel = "noopener";
    origin.textContent = "สไลด์ " + page;
    origin.setAttribute("aria-label", "เปิด PDF ของ Lecture " + chapter.number + " หน้า " + page);
    label.append(caption, origin);
    figure.append(zoom, label);
    return figure;
  }

  window.makeITDS211SlideGallery = (chapter, section, renderExample) => {
    const gallery = document.createElement("div");
    gallery.className = "slide-gallery";
    const heading = document.createElement("h3");
    heading.textContent = section.examples.length ? "สไลด์และตัวอย่าง" : "ภาพจากสไลด์";
    gallery.append(heading);

    const examplesByPage = new Map();
    for (const example of section.examples) {
      const page = example.pages[0];
      if (!examplesByPage.has(page)) examplesByPage.set(page, []);
      examplesByPage.get(page).push(example);
    }
    const figures = figuresByLecture.get(chapter.number);
    for (const [page, examples] of [...examplesByPage].sort(([first], [second]) => first - second)) {
      const group = document.createElement("div");
      group.className = "slide-page";
      group.dataset.slidePage = page;
      const figure = figures.get(page);
      if (figure) group.append(makeFigure(chapter, figure));
      const cards = document.createElement("div");
      cards.className = "example-list";
      for (const example of examples) cards.append(renderExample(example));
      group.append(cards);
      gallery.append(group);
    }

    const additional = section.slideFigures.filter(figure => !examplesByPage.has(figure.page));
    if (!examplesByPage.size) gallery.append(makeFigure(chapter, additional.shift()));
    if (additional.length) {
      const disclosure = document.createElement("details");
      disclosure.className = "slide-gallery-more";
      const summary = document.createElement("summary");
      summary.textContent = "ดูภาพเพิ่มเติมอีก " + additional.length + " ภาพ";
      const collection = document.createElement("div");
      collection.className = "slide-gallery-grid";
      for (const figure of additional) collection.append(makeFigure(chapter, figure));
      disclosure.append(summary, collection);
      gallery.append(disclosure);
    }
    return gallery;
  };
})();
