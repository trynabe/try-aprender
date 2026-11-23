(() => {
  const filenames = {
    8: "2026 - ITDS261 - L8 - User Interface Design.pdf",
    9: "2026 - ITDS261 - L9 - Design Architecture and Methodology.pdf",
    10: "2026 - ITDS261 - L10 - Implementation  Code review.pdf",
    11: "2026 - ITDS261 - L11 - VCS.pdf",
    12: "2026 - ITDS261 - L12 - Testing.pdf",
    13: "2026 - ITDS261 - L13 - Unit, integration and system testing.pdf",
    14: "2026 - ITDS261 - L14 - Agentic Software Engineering.pdf"
  };
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  window.ITDS261 = [];

  function addChapter(chapter) {
    const id = "lecture-" + String(chapter.number).padStart(2, "0");
    const pdf = {
      name: filenames[chapter.number],
      href: loopback ? "/itds261-reference/" + id + ".pdf" : null
    };
    const cite = item => ({ ...item, pdf });
    window.ITDS261.push({
      ...chapter,
      id,
      pdfSources: [{ pdf, from: 1, to: chapter.totalPages }],
      sections: chapter.sections.map(section => ({ ...cite(section), examples: section.examples.map(cite) })),
      exercises: chapter.exercises.map(cite)
    });
  }

  function section(id, pages, title, summary, points, examples = []) {
    return { id, pages, title, summary, points, examples };
  }

  function example(id, pages, title, prompt, task, steps, answer, extra = {}) {
    return { id, pages, title, prompt, task, steps, answer, ...extra };
  }

  function quiz(id, pages, title, prompt, choices, correctChoice, steps, extra = {}) {
    return { id, pages, title, prompt, choices, correctChoice, steps, answer: choices[correctChoice], practice: true, ...extra };
  }

  window.SoftwareEngineering = { addChapter, section, example, quiz };
})();
