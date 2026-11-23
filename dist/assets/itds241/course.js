(() => {
  window.ITDS241 = [];

  function addChapter(chapter) {
    const lecture = "lecture-" + String(chapter.number).padStart(2, "0");
    window.ITDS241.push({
      codeLanguage: "javascript",
      ...chapter,
      id: lecture,
      source: "assets/itds241/references/" + lecture + ".pdf"
    });
  }

  function section(id, pages, title, summary, points, examples = []) {
    return { id, pages, title, summary, points, examples };
  }

  function example(id, pages, title, prompt, task, steps, answer, extra = {}) {
    return { id, pages, title, prompt, task, steps, answer, ...extra };
  }

  function quiz(id, pages, title, prompt, choices, correctChoice, steps, extra = {}) {
    return { id, pages, title, prompt, choices, correctChoice, steps, answer: choices[correctChoice], ...extra };
  }

  window.WebTechnology = { addChapter, section, example, quiz };
})();
