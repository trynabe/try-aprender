(() => {
  const filenames = {
    vlan: "ITDS231-Lecture7-VLAN-2026.pdf",
    tutorial: "ITDS231_Data-Link-Layer-Tutorial_with_GBN_SR.pdf",
    "data-plane": "Chapter_4_rev3.pdf",
    "control-plane": "Chapter_5_rev3.pdf",
    transport: "Chapter_6_rev2.pdf",
    "5g": "5G Introduction_ICT-MU_5Nov2026_ (1).pdf",
    satellite: "NT nexConnect Deep Dive.pdf"
  };
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  const pdfs = Object.fromEntries(Object.entries(filenames).map(([key, name]) => [key, {
    name,
    href: loopback ? "/itds231-reference/" + encodeURIComponent(name) : null
  }]));

  window.ITDS231 = [];

  function addChapter(chapter) {
    const id = "lecture-" + String(chapter.number).padStart(2, "0");
    const pdfSources = chapter.sources.map(([key, from, to]) => ({ pdf: pdfs[key], from, to }));
    window.ITDS231.push({ ...chapter, id, pdfSources });
  }

  function section(id, source, pages, title, summary, points, examples = []) {
    const pdf = pdfs[source];
    return { id, pdf, pages, title, summary, points, examples: examples.map(item => ({ ...item, pdf })) };
  }

  function example(id, pages, title, prompt, task, steps, answer, extra = {}) {
    return { id, pages, title, prompt, task, steps, answer, ...extra };
  }

  function quiz(id, source, pages, title, prompt, choices, correctChoice, steps, extra = {}) {
    return { id, pdf: pdfs[source], pages, title, prompt, choices, correctChoice, steps,
      answer: choices[correctChoice], practice: true, ...extra };
  }

  window.ComputerNetwork = { addChapter, section, example, quiz };
})();
