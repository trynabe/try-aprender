(() => {
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  const sourceManifest = window.ReadingSkillsSources ?? [];
  const sourceById = new Map(sourceManifest.map(source => [source.id, source]));
  window.ITLG201 = [];

  function pageNumbers(value) {
    if (Array.isArray(value)) return value;
    return String(value ?? 1).split(/,\s*/u).flatMap(part => {
      const [start, end = start] = part.split(/[-–]/u).map(Number);
      return Array.from({ length: end - start + 1 }, (_, offset) => start + offset);
    });
  }

  function sourceReference(source) {
    const canonical = sourceById.get(source.canonical) ?? source;
    const textVersion = sourceById.get(source.textCanonical) ?? canonical;
    const filePath = canonical.relative.split("/").map(encodeURIComponent).join("/");
    return {
      name: source.file,
      kind: source.kind,
      href: loopback ? "/itlg201-reference/" + filePath : null,
      textHref: loopback ? "/itlg201-text/" + textVersion.id + ".json" : null,
      canonical: textVersion === source ? null : textVersion.file
    };
  }

  function addChapter(chapter) {
    const readingSources = sourceManifest.filter(source => source.lecture === chapter.number)
      .map(source => ({ ...source, pdf: sourceReference(source) }));
    const references = new Map(readingSources.map(source => [source.file, source.pdf]));
    const cite = (item, fallback) => {
      const pdf = references.get(item.pdf) ?? fallback;
      return { ...item, pdf, pages: pageNumbers(item.pages), answerable: item.answerable ?? Boolean(item.task) };
    };
    const sections = chapter.sections.map(section => {
      const cited = cite(section, readingSources[0]?.pdf);
      return {
        ...cited,
        points: (section.points ?? []).map(point => Array.isArray(point) ? point : [point.term, point.description]),
        examples: (section.examples ?? []).map(example => cite(example, cited.pdf)),
        passages: (section.passages ?? []).map(passage => {
          const text = cite(passage, cited.pdf);
          return { ...text, questions: (passage.questions ?? []).map(question => cite(question, text.pdf)) };
        })
      };
    });
    window.ITLG201.push({
      ...chapter,
      id: "lecture-" + String(chapter.number).padStart(2, "0"),
      readingSources,
      pdfSources: readingSources.map(source => ({ pdf: source.pdf, from: 1, to: source.pages.length })),
      sections,
      exercises: chapter.exercises.map(exercise => cite({ ...exercise, practice: true }, readingSources[0]?.pdf))
    });
  }

  window.ReadingSkills = { addChapter };
})();
