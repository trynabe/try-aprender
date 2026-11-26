(() => {
  const labsByNumber = new Map((window.WebTechnologyLabs ?? []).map(lab => [lab.number, lab]));
  const labSolutions = window.WebTechnologyLabSolutions ?? {};
  const courses = [
    { id: "itds211", title: "Computer System Lecture", keyword: "ระบบปฏิบัติการ", chapters: window.ITDS211 ?? [] },
    { id: "itds241", title: "Website Technology Lecture & Lab", keyword: "เทคโนโลยีเว็บไซต์", chapters: window.ITDS241 ?? [] },
    {
      id: "itds231",
      title: "Computer Network Lecture",
      keyword: "เครือข่ายคอมพิวเตอร์ ITDS231",
      chapters: window.ITDS231 ?? [],
      restoreChapterPosition: true
    },
    {
      id: "itds261",
      title: "Software Engineer Lecture",
      keyword: "วิศวกรรมซอฟต์แวร์ Software Engineering ITDS261 แนวข้อสอบ",
      chapters: window.ITDS261 ?? [],
      restoreChapterPosition: true
    },
    {
      id: "itlg201",
      title: "Reading Skills Lecture",
      keyword: "Reading Skill ภาษาอังกฤษ การอ่าน",
      chapters: window.ITLG201 ?? [],
      restoreChapterPosition: true
    }
  ];
  const coursesById = new Map(courses.map(course => [course.id, course]));
  for (const course of courses) {
    course.chapters = course.chapters
      .map(chapter => ({
        ...chapter,
        courseId: course.id,
        route: course.id === "itds211" ? chapter.id : course.id + "/" + chapter.id,
        lab: course.id === "itds241" ? labsByNumber.get(chapter.number) : undefined,
        exercises: chapter.exercises ?? []
      }))
      .sort((first, second) => first.number - second.number);
  }
  const chapters = courses.flatMap(course => course.chapters);
  const chapterByRoute = new Map(chapters.map(chapter => [chapter.route, chapter]));
  const chapterByLegacyLabRoute = new Map(chapters.filter(chapter => chapter.lab)
    .map(chapter => [chapter.courseId + "/" + chapter.lab.id, chapter]));
  const practiceTopic = { id: "practice", title: "แบบฝึกหัดท้ายบท" };
  const readingSourcesTopic = { id: "reading-sources", title: "ดัชนีเอกสารทุกหน้า" };
  const reviewTopic = { id: "review", title: "เช็กลิสต์ก่อนสอบ" };
  const choiceLetters = ["ก", "ข", "ค", "ง"];
  const names = {
    introduction: "Introduction",
    process: "Process",
    "cpu-scheduling": "CPU Scheduling",
    "memory-management": "Memory Management",
    "file-systems": "File Systems"
  };
  const sourceFiles = [
    "Lecture 1 - Introduction.pdf",
    "Lecture 2 - Process.pdf",
    "Lecture 3 - Process Scheduling.pdf",
    "Lecture 4 - Memory Management.pdf",
    "Lecture 5 - File Systems.pdf"
  ];
  const main = document.getElementById("main-content");
  const chapterNavs = [document.getElementById("desktop-chapters"), document.getElementById("mobile-chapters")];
  const searchDialog = document.getElementById("search-dialog");
  const menuDialog = document.getElementById("chapter-menu");
  const searchInput = document.getElementById("query");
  const searchResults = document.getElementById("search-results");
  const searchFeedback = document.getElementById("search-feedback");
  const fontButton = document.getElementById("font-size");
  const siteName = document.title;
  const studyStorageKey = "study-time";
  const shortDay = new Intl.DateTimeFormat("th-TH", { weekday: "short" });
  const shortDate = new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short" });
  let currentView = "";
  const studyTotals = new Map(courses.map(course => [course.id, readStudyTotals(course.id) ?? {}]));
  let studyStartedAt = null;
  let studyInterval = null;
  let positionFrame = null;
  let currentTargetId = "";
  let restoreReadingPosition = "";
  let restoringPosition = false;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function link(text, target, className) {
    const anchor = element("a", className, text);
    anchor.href = target;
    return anchor;
  }

  function remember(key, value, courseId = "itds211") {
    try {
      localStorage.setItem(courseId + ":" + key, value);
    } catch {
      // Reading works even when the browser blocks local storage.
    }
  }

  function recall(key, courseId = "itds211") {
    try {
      return localStorage.getItem(courseId + ":" + key);
    } catch {
      return null;
    }
  }

  function readStudyTotals(courseId) {
    try {
      const totals = JSON.parse(recall(studyStorageKey, courseId));
      return totals && typeof totals === "object" && !Array.isArray(totals) ? totals : null;
    } catch {
      return null;
    }
  }

  function studyDateKey(date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
  }

  function storedDuration(value) {
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function millisecondsStudied(date) {
    const key = studyDateKey(date);
    return [...studyTotals.values()].reduce((sum, totals) => sum + storedDuration(totals[key]), 0);
  }

  function chapterDuration(chapter) {
    const totals = studyTotals.get(chapter.courseId)?.chapters;
    const previousLabTime = chapter.lab ? storedDuration(totals?.[chapter.lab.id]) : 0;
    return storedDuration(totals?.[chapter.id]) + previousLabTime;
  }

  function setDuration(node, milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const parts = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60];
    node.dateTime = "PT" + seconds + "S";
    node.textContent = parts.map(value => String(value).padStart(2, "0")).join(":");
    node.setAttribute("aria-label", parts[0] + " ชั่วโมง " + parts[1] + " นาที " + parts[2] + " วินาที");
  }

  function saveStudyTime(now) {
    let cursor = studyStartedAt;
    const elapsed = now - cursor;
    studyStartedAt = now;
    // Drop time since the last heartbeat if the computer was asleep.
    if (elapsed <= 0 || elapsed > 15000) return;
    const chapter = chapterByRoute.get(currentView);
    const { courseId, id } = chapter;
    const totals = readStudyTotals(courseId) ?? studyTotals.get(courseId);
    totals.chapters = {
      ...totals.chapters,
      [id]: storedDuration(totals.chapters?.[id]) + elapsed
    };
    while (cursor < now) {
      const date = new Date(cursor);
      const midnight = new Date(cursor).setHours(24, 0, 0, 0);
      const end = Math.min(now, midnight);
      const key = studyDateKey(date);
      totals[key] = storedDuration(totals[key]) + end - cursor;
      cursor = end;
    }
    studyTotals.set(courseId, totals);
    remember(studyStorageKey, JSON.stringify(totals), courseId);
  }

  function refreshChapterTime() {
    const clock = main.querySelector(".chapter-time time");
    if (!clock) return;
    const chapter = chapterByRoute.get(currentView);
    if (!chapter) return;
    const now = new Date();
    const midnight = new Date(now).setHours(0, 0, 0, 0);
    const legacyDailyClock = chapter.courseId === "itds211";
    const pendingStart = legacyDailyClock ? Math.max(midnight, studyStartedAt) : studyStartedAt;
    const pending = studyStartedAt === null ? 0 : Math.max(0, now.getTime() - pendingStart);
    const saved = legacyDailyClock
      ? storedDuration(studyTotals.get(chapter.courseId)?.[studyDateKey(now)])
      : chapterDuration(chapter);
    setDuration(clock, saved + pending);
  }

  function stopStudyTimer() {
    if (studyStartedAt === null) return;
    saveStudyTime(Date.now());
    studyStartedAt = null;
    clearInterval(studyInterval);
    studyInterval = null;
    refreshChapterTime();
  }

  function syncStudyTimer() {
    const isStudying = chapterByRoute.has(currentView) && document.visibilityState === "visible" && document.hasFocus();
    if (!isStudying) {
      stopStudyTimer();
      refreshStudyOverview();
    } else if (studyInterval === null) {
      studyStartedAt = Date.now();
      studyInterval = setInterval(() => {
        const now = Date.now();
        if (now - studyStartedAt >= 5000 || now < studyStartedAt) saveStudyTime(now);
        refreshChapterTime();
      }, 1000);
    }
  }

  function updateFontSize(large) {
    document.documentElement.toggleAttribute("data-large-type", large);
    fontButton.setAttribute("aria-pressed", String(large));
  }

  function countExamples(chapter) {
    return chapter.sections.reduce((count, section) => count + section.examples.length +
      (section.passages ?? []).reduce((total, passage) => total + passage.questions.length, 0), 0);
  }

  function renderChapterNav(current) {
    const courseId = chapterByRoute.get(current)?.courseId ?? current;
    chapterNavs.forEach(container => {
      const home = link(undefined, "#home", "nav-link");
      const homeIndex = element("span", "nav-index");
      homeIndex.setAttribute("aria-hidden", "true");
      homeIndex.append(element("i", "home-icon"));
      home.append(homeIndex, element("span", "", "หน้าแรก"));
      if (current === "home") home.setAttribute("aria-current", "page");

      container.replaceChildren(home, element("span", "sidebar-label", "คลังวิชา"));
      for (const course of courses) {
        const folder = link(undefined, "#" + course.id, "nav-link nav-course");
        const folderIndex = element("span", "nav-index");
        folderIndex.setAttribute("aria-hidden", "true");
        folderIndex.append(element("i", "folder-icon"));
        const folderName = element("span", "", course.title);
        folderName.lang = "en";
        folder.append(folderIndex, folderName);
        if (current === course.id) folder.setAttribute("aria-current", "page");
        container.append(folder);
        if (course.id !== courseId) continue;

        const items = element("ul", "nav-list");
        for (const chapter of course.chapters) {
          const item = element("li");
          const anchor = link(undefined, "#" + chapter.route, "nav-link");
          const index = element("span", "nav-index", String(chapter.number).padStart(2, "0"));
          const label = element("span", "", names[chapter.id] ?? chapter.title);
          label.lang = "en";
          anchor.append(index, label);
          if (current === chapter.route) anchor.setAttribute("aria-current", "page");
          item.append(anchor);
          items.append(item);
        }
        container.append(items);
      }
    });
  }

  function courseCounts({ chapters }) {
    const exampleCount = chapters.reduce((count, chapter) => count + countExamples(chapter), 0);
    const exerciseCount = chapters.reduce((count, chapter) => count + chapter.exercises.length, 0);
    const counts = [chapters.length + " บท", exampleCount + " ตัวอย่าง"];
    if (exerciseCount) counts.push("แบบฝึกหัด " + exerciseCount + " ข้อ");
    const labs = chapters.filter(chapter => chapter.lab).length;
    if (labs) counts.push(labs + " Lab");
    return counts.join(" · ");
  }

  function continueReading(course) {
    const storedRoute = recall("last-read", course.id) ?? "";
    const lastRead = resolveLegacyLabRoute(storedRoute);
    const lastChapter = course.chapters.find(({ route }) => lastRead === route || lastRead.startsWith(route + "/"));
    if (!lastChapter) return null;
    const savedPosition = storedRoute === lastRead ? readPosition(lastChapter) : null;
    const target = savedPosition ? lastChapter.route + (savedPosition.anchor ? "/" + savedPosition.anchor : "") : lastRead;
    const title = names[lastChapter.id] ?? lastChapter.title;
    const resume = link("อ่านต่อ · " + title, "#" + target, "primary-link");
    resume.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      restoreReadingPosition = lastChapter.route;
      if (location.hash !== resume.hash) history.pushState(null, "", resume.href);
      showLocation();
    });
    return resume;
  }

  function makeFolderMark() {
    const mark = element("span", "folder-mark");
    mark.setAttribute("aria-hidden", "true");
    mark.append(element("i", "folder-icon"));
    return mark;
  }

  function refreshStudyOverview() {
    const overview = main.querySelector(".study-overview");
    if (!overview) return;
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index - 6);
      return { date, duration: millisecondsStudied(date) };
    });
    setDuration(overview.querySelector(".today-value"), days[6].duration);
    setDuration(overview.querySelector(".week-value"), days.reduce((sum, day) => sum + day.duration, 0));
    const largest = Math.max(60000, ...days.map(day => day.duration));
    const bars = days.map(({ date, duration }, index) => {
      const day = element("li", "study-day");
      const bar = element("span", "study-day-track");
      const fill = element("span", "study-day-fill");
      fill.style.setProperty("--study-height", (duration / largest * 100) + "%");
      bar.setAttribute("aria-hidden", "true");
      bar.append(fill);
      const label = index === days.length - 1 ? "วันนี้" : shortDay.format(date);
      const caption = element("span", "study-day-label", label);
      caption.setAttribute("aria-hidden", "true");
      const time = element("time", "sr-only");
      setDuration(time, duration);
      day.title = shortDate.format(date) + " · " + time.textContent;
      day.append(bar, caption, element("span", "sr-only", shortDate.format(date)), time);
      return day;
    });
    overview.querySelector(".study-week-chart").replaceChildren(...bars);
  }

  function refreshCourseTimes() {
    for (const time of main.querySelectorAll(".course-row-time")) {
      const seconds = Math.floor(chapterDuration(chapterByRoute.get(time.dataset.chapterTime)) / 1000);
      const remainder = seconds % 60;
      time.dateTime = "PT" + seconds + "S";
      time.textContent = Math.floor(seconds / 60) + " นาที" + (remainder ? " " + remainder + " วินาที" : "");
    }
  }

  function makeHome() {
    const page = element("div", "home");
    const heading = element("header", "learning-heading");
    heading.append(element("h1", "", "พื้นที่เรียน"));
    const recentCourse = coursesById.get(recall("recent-course")) ?? courses[0];
    const resume = continueReading(recentCourse);
    if (resume) heading.append(resume);

    const overview = element("section", "study-overview");
    overview.setAttribute("aria-label", "เวลาเรียน");
    const today = element("article", "study-panel study-today");
    today.append(
      element("h2", "", "เวลาเรียนวันนี้"),
      element("time", "today-value"),
      element("p", "study-note", "นับเมื่อเปิดบทเรียนหรือแบบฝึกหัดในแท็บที่กำลังใช้งาน")
    );
    const week = element("article", "study-panel study-week");
    const weekHead = element("header");
    const total = element("span", "week-total", "รวม ");
    total.append(element("time", "week-value"));
    weekHead.append(element("h2", "", "7 วันล่าสุด"), total);
    const chart = element("ol", "study-week-chart");
    chart.setAttribute("aria-label", "เวลาเรียนแยกตามวัน");
    week.append(weekHead, chart);
    overview.append(today, week);

    const library = element("section", "course-library");
    library.append(element("h2", "", "คลังวิชา"));
    for (const course of courses) {
      const folder = link(undefined, "#" + course.id, "course-folder");
      const info = element("span", "folder-info");
      const name = element("strong", "", course.title);
      name.lang = "en";
      info.append(name, element("span", "course-count", courseCounts(course)));
      folder.append(makeFolderMark(), info, element("span", "folder-action", "เปิดโฟลเดอร์"));
      library.append(folder);
    }
    page.append(heading, overview, library);
    return page;
  }

  function makeCourse(course) {
    const { chapters } = course;
    const page = element("div", "home");
    const header = element("header", "folder-banner");
    const path = element("p", "breadcrumb");
    path.append(link("คลังวิชา", "#home"), element("span", "", "/"), element("span", "", course.title));
    const title = element("h1", "", course.title);
    title.lang = "en";
    const info = element("div");
    info.append(path, title, element("p", "course-count", courseCounts(course)));
    const first = chapters[0];
    const resume = continueReading(course) ?? (first && link("เริ่มอ่านบท " + first.number, "#" + first.route, "primary-link"));
    if (resume) info.append(resume);
    header.append(makeFolderMark(), info);
    const heading = element("header", "course-heading");
    heading.append(element("h2", "", "บทเรียน"), element("span", "course-count", "เวลาเรียนสะสมต่อบท"));

    const index = element("ol", "course-index");
    for (const chapter of chapters) {
      const item = element("li");
      const row = link(undefined, "#" + chapter.route, "course-row");
      const chapterName = element("span", "course-name");
      const englishName = element("strong", "", chapter.title);
      englishName.lang = "en";
      chapterName.append(englishName, element("span", "", chapter.thaiTitle));
      const metadata = element("span", "course-row-meta");
      const time = element("time", "course-row-time");
      time.dataset.chapterTime = chapter.route;
      metadata.append(time);
      const counts = [countExamples(chapter) + " ตัวอย่าง"];
      if (chapter.lab) counts.push("Lab " + chapter.lab.number);
      metadata.append(element("small", "", counts.join(" · ")));
      row.append(
        element("span", "chapter-index", String(chapter.number).padStart(2, "0")),
        chapterName,
        metadata
      );
      item.append(row);
      index.append(item);
    }
    page.append(header, heading, index);
    return page;
  }

  function sourceLabel(pages, chapter, pdf) {
    if (pdf) return pdf.kind === "png" ? pdf.name + " · ภาพต้นฉบับ" : pdf.name + " · หน้า PDF " + pages;
    return (chapter.source ? "หน้า PDF " : "สไลด์ ") + pages;
  }

  function slideLabel(pages, chapter, pdf) {
    const ordered = [...new Set(pages)].sort((first, second) => first - second);
    const ranges = [];
    for (let first = 0; first < ordered.length; first++) {
      let end = first;
      while (ordered[end + 1] === ordered[end] + 1) end++;
      ranges.push(end === first ? String(ordered[first]) : ordered[first] + "–" + ordered[end]);
      first = end;
    }
    return sourceLabel(ranges.join(", "), chapter, pdf);
  }

  function slideLink(chapter, page, label, className, pdf) {
    const source = pdf ? pdf.href :
      chapter.source ?? (location.protocol === "file:" && "../../" + encodeURIComponent(sourceFiles[chapter.number - 1]));
    if (!source) return element("span", className, label);
    const anchor = link(label, source + (pdf?.kind === "png" ? "" : "#page=" + page), className);
    anchor.target = "_blank";
    anchor.rel = "noopener";
    return anchor;
  }

  function makeToc(chapter) {
    const list = element("ul", "toc-list");
    const topics = [...chapter.sections];
    if (chapter.exercises.length) topics.push(practiceTopic);
    if (chapter.readingSources?.length) topics.push(readingSourcesTopic);
    if (chapter.lab) topics.push({ id: "lab", title: "โจทย์ Lab " + chapter.lab.number });
    if (chapter.checklist?.length) topics.push(reviewTopic);
    for (const section of topics) {
      const item = element("li");
      const anchor = link(section.title, "#" + chapter.route + "/" + section.id);
      anchor.dataset.section = section.id;
      item.append(anchor);
      list.append(item);
    }
    return list;
  }

  function makeTable(table, title) {
    const region = element("div", "data-region");
    region.setAttribute("role", "region");
    region.setAttribute("aria-label", title);
    region.tabIndex = 0;
    const grid = element("table");
    if (table.formats?.includes("status")) grid.classList.add("http-results");
    const thead = element("thead");
    const first = element("tr");
    for (const [index, header] of table.headers.entries()) {
      const cell = element("th", "", header);
      cell.scope = "col";
      if (table.formats?.[index]) cell.dataset.format = table.formats[index];
      first.append(cell);
    }
    thead.append(first);
    const body = element("tbody");
    for (const row of table.rows) {
      const line = element("tr");
      for (const [index, value] of row.entries()) line.append(makeTableCell(value, table.formats?.[index]));
      body.append(line);
    }
    grid.append(thead, body);
    region.append(grid);
    return region;
  }

  function makeTableCell(value, format) {
    const cell = element("td");
    if (format === "request") {
      const request = /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS) (\/\S*)$/u.exec(value);
      if (request) {
        const content = element("span", "http-request");
        content.append(
          element("span", "http-method", request[1]),
          document.createTextNode(" "),
          element("code", "http-path", request[2])
        );
        cell.append(content);
        return cell;
      }
    }
    if (format === "status" && /^[1-5]\d{2}$/u.test(value)) {
      cell.dataset.format = format;
      const badge = element("span", "http-status", value);
      badge.dataset.group = value[0];
      cell.append(badge);
      return cell;
    }
    cell.textContent = value;
    return cell;
  }

  function makeTimeline({ unit, lanes }) {
    const chart = element("figure", "timeline");
    const allSegments = lanes.flatMap(lane => lane.segments);
    const endTime = Math.max(...allSegments.map(([, , end]) => end));
    const labels = [...new Set(allSegments.map(([name]) => name))];
    const caption = element("figcaption");
    caption.append(element("span", "", "Gantt chart"), element("span", "", "เวลา (" + unit + ")"));
    chart.append(caption);
    for (const lane of lanes) {
      const row = element("div", "timeline-row");
      const track = element("div", "timeline-track");
      track.setAttribute("role", "img");
      track.setAttribute("aria-label", lane.name + " " + lane.segments.map(([name, start, end]) => name + " ช่วง " + start + " ถึง " + end).join(", "));
      for (const [name, start, end] of lane.segments) {
        const run = element("span", "run", name);
        run.style.setProperty("--start", (start / endTime * 100) + "%");
        run.style.setProperty("--duration", ((end - start) / endTime * 100) + "%");
        run.dataset.color = String(labels.indexOf(name) % 6);
        run.title = name + " · " + start + "–" + end + " " + unit;
        run.setAttribute("aria-hidden", "true");
        track.append(run);
      }
      row.append(element("span", "timeline-lane-name", lane.name), track);
      chart.append(row);
    }
    const scale = element("div", "timeline-scale");
    scale.append(element("span", "", "0"), element("span", "", String(endTime)));
    chart.append(scale);
    return chart;
  }

  function makeCodeBlock(source, label, language) {
    const code = element("pre", "example-code");
    code.tabIndex = 0;
    code.setAttribute("aria-label", label);
    const snippet = element("code", "", source);
    const prism = window.Prism;
    const grammar = language && prism?.languages[language];
    if (grammar) snippet.innerHTML = prism.highlight(source, grammar, language);
    code.append(snippet);
    return code;
  }

  function makeAnswerDraft(chapter, exercise) {
    const field = element("div", "exercise-draft");
    const label = element("label", "", "คำตอบของคุณ");
    const input = element("textarea", "reader-text");
    const storageKey = "draft:" + chapter.id + "/" + exercise.id;
    input.id = "answer-" + chapter.number + "-" + exercise.id;
    input.rows = 3;
    input.value = recall(storageKey, chapter.courseId) ?? "";
    label.htmlFor = input.id;
    input.addEventListener("input", () => remember(storageKey, input.value, chapter.courseId));
    field.append(label, input);
    return field;
  }

  function makeExerciseChoices(chapter, exercise) {
    const group = element("fieldset", "exercise-choices");
    const key = "choice:" + chapter.id + "/" + exercise.id;
    const savedChoice = recall(key, chapter.courseId);
    group.append(element("legend", "", "เลือก 1 คำตอบ"));
    exercise.choices.forEach((choice, index) => {
      const option = element("label", "exercise-choice");
      const input = element("input");
      input.type = "radio";
      input.name = key;
      input.value = choice;
      input.checked = choice === savedChoice;
      option.append(
        input,
        element("span", "choice-letter", choiceLetters[index]),
        element("span", "choice-text", choice)
      );
      group.append(option);
    });
    group.addEventListener("change", event => remember(key, event.target.value, chapter.courseId));
    return group;
  }

  function makeExistingDraft(text) {
    const draft = element("details", "previous-draft");
    draft.append(element("summary", "", "คำตอบที่จดไว้ก่อนหน้า"), element("p", "reader-text", text));
    return draft;
  }

  function updateExerciseFeedback(group, correctChoice, feedback, revealed) {
    let selectedChoice = -1;
    group.querySelectorAll("label").forEach((option, index) => {
      const selected = option.querySelector("input").checked;
      if (selected) selectedChoice = index;
      option.toggleAttribute("data-correct", (revealed || selected) && index === correctChoice);
      option.toggleAttribute("data-incorrect", revealed && selected && index !== correctChoice);
    });

    const correct = selectedChoice === correctChoice;
    feedback.toggleAttribute("data-success", correct);
    let message = "";
    if (correct) {
      message = "ตอบถูก · ข้อ " + choiceLetters[correctChoice];
    } else if (revealed) {
      const answer = "คำตอบคือข้อ " + choiceLetters[correctChoice];
      message = selectedChoice >= 0 ? "คุณเลือกข้อ " + choiceLetters[selectedChoice] + " · " + answer : answer;
    }
    if (feedback.textContent !== message) feedback.textContent = message;
  }

  function rememberReadingDisclosure(chapter, details, id) {
    const key = "disclosure:" + chapter.id + "/" + id;
    details.open = recall(key, chapter.courseId) === "true";
    details.addEventListener("toggle", () => remember(key, String(details.open), chapter.courseId));
  }

  function makeWorkedCard(chapter, item, isExercise = false) {
    const card = element("article", isExercise ? "example exercise" : "example");
    card.id = chapter.route + "/" + item.id;
    card.tabIndex = -1;
    const heading = element("header", "example-title");
    heading.append(element(isExercise ? "h3" : "h4", "", item.title));
    const pageLabel = slideLabel(item.pages, chapter, item.pdf);
    const reference = slideLink(chapter, item.pages[0], pageLabel, "source-ref", item.pdf);
    if (item.practice && !item.original) {
      const note = element("span", "source-ref", "ตัวอย่างฝึกเพิ่มเติม · อิง ");
      note.append(reference);
      heading.append(note);
    } else {
      heading.append(reference);
    }
    const prompt = element("p", "reader-text", item.prompt);
    if (chapter.readingSources) {
      prompt.classList.add("reading-lines");
      if (item.practice) prompt.lang = "en";
    }
    card.append(heading, prompt);
    if (item.task) card.append(element("p", "reader-text example-task", "สิ่งที่ต้องหา · " + item.task));
    if (item.hint) {
      const hint = element("details", "solution reading-hint");
      hint.append(element("summary", "", "เปิดคำใบ้"), element("p", "reader-text", item.hint));
      if (chapter.readingSources) rememberReadingDisclosure(chapter, hint, item.id + "/hint");
      card.append(hint);
    }
    if (item.tablePrompt) card.append(makeTable(item.tablePrompt, "ข้อมูลโจทย์"));
    const language = item.codeLanguage ?? chapter.codeLanguage;
    if (item.codePrompt) card.append(makeCodeBlock(item.codePrompt, "โค้ดในโจทย์", language));
    let choices;
    if (isExercise && item.choices?.length) {
      choices = makeExerciseChoices(chapter, item);
      card.append(choices);
      const previousDraft = recall("draft:" + chapter.id + "/" + item.id, chapter.courseId);
      if (previousDraft?.trim()) card.append(makeExistingDraft(previousDraft));
    } else if (isExercise || item.original || item.answerable) {
      card.append(makeAnswerDraft(chapter, item));
    }

    const details = element("details", "solution");
    if (chapter.readingSources && !choices) rememberReadingDisclosure(chapter, details, item.id + "/answer");
    const body = element("div", "solution-body");
    const steps = element("ol", "solution-steps reader-text");
    for (const step of item.steps) steps.append(element("li", "", step));
    if (item.timeline) body.append(makeTimeline(item.timeline));
    if (item.diagram) {
      const diagram = element("ol", "visual-flow");
      diagram.setAttribute("role", "list");
      diagram.setAttribute("aria-label", "แผนภาพลำดับ");
      for (const stage of item.diagram) diagram.append(element("li", "", stage));
      body.append(diagram);
    }
    if (item.table) body.append(makeTable(item.table, "ตารางประกอบวิธีทำ"));
    if (item.code) body.append(makeCodeBlock(item.code, "โค้ดตัวอย่าง", language));
    if (item.answerOrigin) body.append(element("p", "section-range", item.answerOrigin));
    body.append(steps);
    const answer = element("p", "answer reader-text");
    if (chapter.readingSources) answer.classList.add("reading-lines");
    answer.append(element("strong", "", "สรุปคำตอบ"), document.createTextNode(item.answer));
    body.append(answer);
    if (item.note) {
      const note = element("p", "example-note reader-text");
      note.append(element("strong", "", "จุดที่ควรสังเกต"), document.createTextNode(item.note));
      body.append(note);
    }
    if (item.references) {
      const references = element("ul", "example-references");
      for (const [label, url] of item.references) {
        const entry = element("li");
        const anchor = link(label, url);
        anchor.target = "_blank";
        anchor.rel = "noopener";
        entry.append(anchor);
        references.append(entry);
      }
      body.append(references);
    }
    const summary = element("summary", "", isExercise ? "เปิดเฉลยและวิธีคิด" : "ดูวิธีทำและคำอธิบาย");
    if (isExercise) {
      details.addEventListener("toggle", () => {
        summary.textContent = details.open ? "ซ่อนเฉลย" : "เปิดเฉลยและวิธีคิด";
      });
    }
    if (choices) {
      const feedback = element("p", "exercise-feedback");
      feedback.setAttribute("role", "status");
      choices.after(feedback);
      const updateFeedback = () => updateExerciseFeedback(choices, item.correctChoice, feedback, details.open);
      const saved = choices.querySelector("input:checked");
      const closeOnCorrect = chapter.courseId !== "itds211";
      if (closeOnCorrect && saved && saved.value !== item.choices[item.correctChoice]) details.open = true;
      updateFeedback();
      details.addEventListener("toggle", updateFeedback);
      choices.addEventListener("change", event => {
        const wrong = event.target.value !== item.choices[item.correctChoice];
        if (wrong || closeOnCorrect) details.open = wrong;
        updateFeedback();
      });
    }
    details.append(summary, body);
    card.append(details);
    return card;
  }

  function makeSection(chapter, section) {
    const article = element("section", "chapter-section");
    article.id = chapter.route + "/" + section.id;
    article.tabIndex = -1;
    const heading = element("header", "section-heading");
    const range = Array.isArray(section.pages) ? slideLabel(section.pages, chapter, section.pdf) :
      sourceLabel(section.pages, chapter, section.pdf);
    heading.append(
      section.pdf || chapter.source
        ? slideLink(chapter, parseInt(section.pages, 10), range, "section-range", section.pdf)
        : element("span", "section-range", range),
      element("h2", "", section.title)
    );
    article.append(heading, element("p", "reader-text", section.summary));

    if (section.points.length) {
      const points = element("dl", "key-points reader-text");
      for (const [label, definition] of section.points) {
        const pair = element("div");
        pair.append(element("dt", "", label), element("dd", "", definition));
        points.append(pair);
      }
      article.append(points);
    }
    for (const passage of section.passages ?? []) article.append(makeReadingPassage(chapter, passage));
    if (section.slideFigures?.length) {
      article.append(window.makeITDS211SlideGallery(chapter, section, example => makeWorkedCard(chapter, example)));
    } else if (section.examples.length) {
      const examples = element("div", "example-list");
      examples.append(element("h3", "", section.pdf ? "ตัวอย่างและโจทย์" : "ตัวอย่างจากสไลด์"));
      for (const example of section.examples) examples.append(makeWorkedCard(chapter, example));
      article.append(examples);
    }
    return article;
  }

  function makeReadingPassage(chapter, passage) {
    const card = element("article", "example reading-passage");
    card.id = chapter.route + "/" + passage.id;
    card.tabIndex = -1;
    const heading = element("header", "example-title");
    heading.append(
      element("h3", "", passage.title),
      slideLink(chapter, passage.pages[0], slideLabel(passage.pages, chapter, passage.pdf), "source-ref", passage.pdf)
    );
    card.append(heading);
    const paragraphs = element("div", "reading-paragraphs");
    for (const [index, paragraph] of passage.paragraphs.entries()) {
      const english = element("p", "reader-text reading-lines", paragraph.english);
      english.lang = "en";
      const translation = element("details", "solution");
      const analysis = element("div", "solution-body");
      translation.append(element("summary", "", "คำแปลและวิธีอ่าน · ย่อหน้า " + (index + 1)), analysis);
      rememberReadingDisclosure(chapter, translation, passage.id + "/paragraph-" + (index + 1));
      analysis.append(element("p", "reader-text reading-lines", paragraph.thai));
      if (paragraph.role) analysis.append(element("p", "reader-text", "หน้าที่ของย่อหน้า · " + paragraph.role));
      if (paragraph.analysis) analysis.append(element("p", "reader-text reading-lines", paragraph.analysis));
      if (paragraph.vocabulary?.length) {
        const vocabulary = element("ul", "reader-text");
        for (const word of paragraph.vocabulary) vocabulary.append(element("li", "", word));
        analysis.append(vocabulary);
      }
      if (paragraph.pages?.length) {
        const pageSource = slideLink(chapter, paragraph.pages[0], slideLabel(paragraph.pages, chapter, passage.pdf), "source-ref", passage.pdf);
        const reference = element("p", "reading-paragraph-source");
        reference.append(pageSource);
        analysis.append(reference);
      }
      paragraphs.append(english, translation);
    }
    const questions = element("div", "example-list");
    for (const question of passage.questions) questions.append(makeWorkedCard(chapter, question));
    card.append(paragraphs, questions);
    return card;
  }

  function makeReadingSource(chapter, source) {
    const { pdf, pages } = source;
    const panel = element("details", "reading-source-entry");
    panel.id = chapter.route + "/source-" + source.id;
    panel.tabIndex = -1;
    panel.append(element("summary", "", pdf.name + (pdf.kind === "png" ? " · ภาพ" : " · " + pages.length + " หน้า")));
    rememberReadingDisclosure(chapter, panel, source.id);
    if (pdf.canonical) {
      panel.append(element("p", "section-range", "บทอ่านฉบับเดียวกับ " + pdf.canonical));
    }
    if (pdf.kind === "png" && pdf.href) {
      const visual = element("img", "reading-source-image");
      visual.src = pdf.href;
      visual.alt = "ตาราง Phrasal Verbs และความหมายจาก Lecture " + chapter.number;
      visual.loading = "lazy";
      panel.append(visual);
    }

    const viewer = element("div", "reading-source-viewer");
    viewer.id = panel.id + "-text";
    viewer.hidden = true;
    viewer.tabIndex = -1;
    viewer.setAttribute("role", "region");
    viewer.setAttribute("aria-label", "ข้อความจากเอกสาร");
    let transcript;
    async function showPage(page) {
      viewer.hidden = false;
      viewer.dataset.page = String(page.number);
      viewer.textContent = "กำลังเปิดข้อความ…";
      viewer.focus();
      try {
        transcript ??= fetch(pdf.textHref).then(response => {
          if (!response.ok) throw new Error("Reading transcript unavailable");
          return response.json();
        }).catch(error => {
          transcript = undefined;
          throw error;
        });
        const texts = await transcript;
        if (viewer.dataset.page !== String(page.number)) return;
        const entry = texts[page.number - 1];
        const title = element("h4", "", sourceLabel(page.number, chapter, pdf));
        const readingText = element("div", "reader-text reading-lines", entry?.text || "ดูภาพหรือแผนภาพจากต้นฉบับหน้านี้");
        viewer.replaceChildren(title, element("p", "section-range", page.status), readingText);
        if (entry?.imageText) {
          const visualText = element("details", "solution");
          visualText.append(element("summary", "", "เปิดข้อความจากภาพ (OCR)"), element("div", "reader-text reading-lines", entry.imageText));
          viewer.append(visualText);
        }
      } catch {
        if (viewer.dataset.page === String(page.number)) viewer.textContent = "เปิดข้อความไม่ได้ ลองกดอีกครั้งหรือเปิดต้นฉบับจากเลขหน้า";
      }
    }

    const entries = pages.map(page => {
      const group = (chapter.coverage ?? []).find(range =>
        range.pdf === source.file && range.from <= page.number && page.number <= range.to);
      const section = chapter.sections.find(item => item.id === group?.section) ??
        chapter.sections.find(item => item.pdf === pdf && (
          item.pages.includes(page.number) || item.examples.some(example => example.pdf === pdf && example.pages.includes(page.number))
        ));
      return { page, group, section };
    });
    const grid = makeTable({
      headers: [pdf.kind === "png" ? "ต้นฉบับ" : "หน้า PDF", "หัวข้อหรือข้อความต้นหน้า", "ตำแหน่งในบท", "ข้อความอ่านประกอบ"],
      rows: entries.map(({ page, group, section }) => [
        String(page.number), group?.topic ?? page.title,
        section?.title ?? "ดัชนีเอกสารทุกหน้า", page.status
      ])
    }, pdf.name);
    const rows = grid.querySelectorAll("tbody tr");
    for (const [index, { page, section }] of entries.entries()) {
      const [number, , location, access] = rows[index].children;
      const label = pdf.kind === "png" ? "เปิดภาพ" : String(page.number);
      number.replaceChildren(slideLink(chapter, page.number, label, "", pdf));
      if (page.label) number.append(element("small", "", "เลขกำกับ " + page.label));
      if (section) location.replaceChildren(link(section.title, "#" + chapter.route + "/" + section.id));
      if (pdf.textHref && page.status !== "ดูภาพต้นฉบับ") {
        const open = element("button", "reading-text-button", page.status);
        open.type = "button";
        open.setAttribute("aria-controls", viewer.id);
        open.setAttribute("aria-label", page.status + " · หน้า " + page.number);
        open.addEventListener("click", () => showPage(page));
        access.replaceChildren(open);
      }
    }
    panel.append(grid, viewer);
    return panel;
  }

  function makeReadingSourceIndex(chapter) {
    const area = element("section", "chapter-section reading-source-index");
    area.id = chapter.route + "/" + readingSourcesTopic.id;
    area.tabIndex = -1;
    const heading = element("header", "section-heading");
    heading.append(element("h2", "", readingSourcesTopic.title));
    area.append(heading, element("p", "reader-text", "กดชื่อไฟล์เพื่อดูรายการทุกหน้า เลขหน้าเปิดต้นฉบับโดยตรง และใช้ข้อความ OCR ประกอบการอ่านภาพ"));
    for (const source of chapter.readingSources) area.append(makeReadingSource(chapter, source));
    return area;
  }

  function makePractice(chapter) {
    const section = element("section", "chapter-section practice");
    section.id = chapter.route + "/" + practiceTopic.id;
    section.tabIndex = -1;
    const heading = element("header", "section-heading");
    heading.append(element("h2", "", practiceTopic.title));
    const intro = element("p", "reader-text", "เลือกคำตอบได้เลย ถ้าเลือกผิด เฉลยพร้อมวิธีคิดจะเปิดทันที");
    const exercises = element("div", "example-list");
    for (const exercise of chapter.exercises) exercises.append(makeWorkedCard(chapter, exercise, true));
    section.append(heading, intro, exercises);
    return section;
  }

  function makeLearningList(title, items) {
    const block = element("section", "chapter-section learning-list");
    const list = element("ul", "reader-text");
    for (const item of items) list.append(element("li", "", item));
    block.append(element("h2", "", title), list);
    return block;
  }

  function makeLabSection(chapter, section) {
    const article = element("section", "chapter-section lab-section");
    article.id = chapter.route + "/lab-" + section.id;
    article.tabIndex = -1;
    const heading = element("header", "section-heading");
    heading.append(element("h3", "", section.title));
    article.append(heading);
    if (section.summary) article.append(element("p", "reader-text", section.summary));
    if (section.steps) {
      const steps = element("ol", "lab-steps reader-text");
      for (const step of section.steps) steps.append(element("li", "", step));
      article.append(steps);
    }
    for (const table of section.tables ?? []) {
      article.append(element("h4", "lab-table-title", table.title), makeTable(table, table.title));
    }
    if (section.code) article.append(makeCodeBlock(section.code, "ข้อมูลและตัวอย่างสำหรับฝึก", section.codeLanguage));
    if (section.note) article.append(element("p", "example-note reader-text", section.note));
    if (section.links) {
      const resources = element("ul", "lab-resources");
      for (const { text, href, download } of section.links) {
        const item = element("li");
        const anchor = link(text, href);
        if (download) anchor.download = download;
        else {
          anchor.target = "_blank";
          anchor.rel = "noopener";
        }
        item.append(anchor);
        resources.append(item);
      }
      article.append(resources);
    }
    if (section.images) {
      const details = element("details", "lab-disclosure");
      details.append(element("summary", "", section.imageLabel ?? "ดูภาพผลลัพธ์จากโจทย์"));
      for (const { file, width, height, caption, alt } of section.images) {
        const figure = element("figure");
        const image = element("img");
        image.src = "assets/itds241/lab-files/" + file;
        image.alt = alt;
        image.width = width;
        image.height = height;
        image.loading = "lazy";
        figure.append(image, element("figcaption", "", caption));
        details.append(figure);
      }
      article.append(details);
    }
    if (section.hints) {
      const details = element("details", "lab-disclosure");
      const list = element("ul", "lab-steps reader-text");
      for (const hint of section.hints) list.append(element("li", "", hint));
      details.append(element("summary", "", "เปิดคำใบ้"), list);
      article.append(details);
    }
    if (section.checks) {
      const list = element("ul", "lab-checks reader-text");
      for (const [id, text] of section.checks) {
        const item = element("li");
        const label = element("label");
        const input = element("input");
        const key = "lab-check:" + chapter.lab.id + "/" + id;
        input.type = "checkbox";
        input.checked = recall(key, chapter.courseId) === "true";
        input.addEventListener("change", () => remember(key, String(input.checked), chapter.courseId));
        label.append(input, element("span", "", text));
        item.append(label);
        list.append(item);
      }
      article.append(list);
    }
    return article;
  }

  function makeLab(chapter) {
    const lab = chapter.lab;
    const block = element("section", "chapter-section lab-practice");
    block.id = chapter.route + "/lab";
    block.tabIndex = -1;
    const heading = element("header", "section-heading");
    heading.append(element("h2", "", "โจทย์ Lab " + lab.number + " · " + lab.title));
    const jumps = element("div", "lab-actions");
    if (labSolutions[lab.number]) {
      jumps.append(link("ไปที่เฉลยและวิธีทำ", "#" + chapter.route + "/lab-solution", "lab-check-link"));
    }
    jumps.append(link("ไปที่เช็กลิสต์ตรวจงาน", "#" + chapter.route + "/lab-check", "lab-check-link"));
    block.append(heading, element("p", "reader-text", lab.summary), jumps);
    for (const section of lab.sections) block.append(makeLabSection(chapter, section));
    if (labSolutions[lab.number]) block.append(makeLabSolution(chapter, labSolutions[lab.number]));
    return block;
  }

  function makeLabSolution(chapter, steps) {
    const area = element("section", "chapter-section lab-section lab-solution");
    area.id = chapter.route + "/lab-solution";
    area.tabIndex = -1;
    const heading = element("header", "section-heading");
    heading.append(element("h3", "", "เฉลยและวิธีทำ Lab " + chapter.lab.number));
    const details = element("details", "lab-disclosure solution");
    details.append(element("summary", "", "เปิดขั้นตอนและโค้ดเฉลย"));
    const list = element("ol", "lab-walkthrough");
    for (const step of steps) {
      const item = element("li");
      item.append(element("h4", "", step.title), element("p", "reader-text", step.body));
      for (const file of step.files) {
        const block = element("figure", "lab-solution-file");
        block.append(element("figcaption", "", file.name), makeCodeBlock(file.code, file.name, file.language));
        item.append(block);
      }
      list.append(item);
    }
    details.append(list);
    area.append(heading, details);
    return area;
  }

  function makeChapter(chapter) {
    const course = coursesById.get(chapter.courseId);
    const { chapters } = course;
    const chapterLabel = (course.id === "itds211" ? "บท " : "Lecture ") + chapter.number;
    const page = element("div", "chapter-layout");
    const content = element("article", "chapter-content");
    const hero = element("header", "chapter-hero");
    const breadcrumb = element("p", "breadcrumb");
    breadcrumb.append(
      link("หน้าแรก", "#home"), element("span", "", "/"),
      link(course.title, "#" + course.id), element("span", "", "/"),
      element("span", "", chapterLabel)
    );
    const title = element("h1", "chapter-title", chapter.title);
    title.lang = "en";
    const metadata = element("p", "chapter-meta");
    if (!chapter.pdfSources) {
      metadata.append(
        slideLink(chapter, 1, chapter.source ? "สไลด์ต้นฉบับ · PDF " + chapter.totalPages + " หน้า" : chapter.totalPages + " สไลด์"),
        document.createTextNode(" · ")
      );
    }
    metadata.append(document.createTextNode(countExamples(chapter) + " ตัวอย่าง"));
    if (chapter.exercises.length) {
      metadata.append(
        document.createTextNode(" · "),
        link("แบบฝึกหัด " + chapter.exercises.length + " ข้อ", "#" + chapter.route + "/" + practiceTopic.id)
      );
    }
    if (chapter.lab) {
      metadata.append(document.createTextNode(" · "), link("โจทย์ Lab " + chapter.lab.number, "#" + chapter.route + "/lab"));
    }
    const clockLabel = chapter.courseId === "itds211" ? "เวลาเรียนวันนี้ " : "เวลาเรียนสะสมบทนี้ ";
    const clock = element("span", "chapter-time", clockLabel);
    clock.append(element("time"));
    metadata.append(clock);
    hero.append(
      breadcrumb, title,
      element("p", "chapter-subtitle", chapter.thaiTitle),
      element("p", "chapter-summary", chapter.summary),
      metadata
    );
    if (chapter.pdfSources) {
      const references = element("ul", "chapter-sources");
      references.setAttribute("aria-label", "เอกสารต้นฉบับ");
      for (const { pdf, from, to } of chapter.pdfSources) {
        const entry = element("li");
        const range = from === to ? String(from) : from + "–" + to;
        entry.append(slideLink(chapter, from, sourceLabel(range, chapter, pdf), undefined, pdf));
        references.append(entry);
      }
      hero.append(references);
    }
    const compact = element("details", "compact-toc");
    compact.append(element("summary", "", "หัวข้อในบทนี้"), makeToc(chapter));
    content.append(hero, compact);
    if (chapter.goals?.length) content.append(makeLearningList("อ่านจบแล้วควรทำอะไรได้", chapter.goals));
    if (chapter.confusions?.length) content.append(makeLearningList("จุดที่มักสับสน", chapter.confusions));
    for (const section of chapter.sections) content.append(makeSection(chapter, section));
    if (chapter.exercises.length) content.append(makePractice(chapter));
    if (chapter.readingSources?.length) content.append(makeReadingSourceIndex(chapter));
    if (chapter.lab) content.append(makeLab(chapter));
    if (chapter.checklist?.length) {
      const review = makeLearningList(reviewTopic.title, chapter.checklist);
      review.id = chapter.route + "/" + reviewTopic.id;
      review.tabIndex = -1;
      content.append(review);
    }

    const pagination = element("nav", "chapter-pagination");
    pagination.setAttribute("aria-label", "บทก่อนหน้าและบทถัดไป");
    const chapterIndex = chapters.indexOf(chapter);
    const adjacent = [
      ["บทก่อนหน้า", chapters[chapterIndex - 1], "previous-chapter"],
      ["บทถัดไป", chapters[chapterIndex + 1], "next-chapter"]
    ];
    for (const [label, neighbor, className] of adjacent) {
      if (!neighbor) continue;
      const button = link(undefined, "#" + neighbor.route, className);
      button.append(element("small", "", label), element("span", "", neighbor.title));
      pagination.append(button);
    }
    content.append(pagination);

    const toc = element("nav", "chapter-toc");
    toc.setAttribute("aria-label", "หัวข้อในบทนี้");
    toc.append(element("h2", "", "ในบทนี้"), makeToc(chapter));
    page.append(content, toc);
    return page;
  }

  function readPosition(chapter) {
    try {
      const position = JSON.parse(recall("position:" + chapter.id, chapter.courseId));
      return position && typeof position.anchor === "string" && Number.isFinite(position.y) && position.y >= 0
        ? position : null;
    } catch {
      return null;
    }
  }

  function savePosition() {
    const chapter = chapterByRoute.get(currentView);
    if (!chapter || restoringPosition || menuDialog.open || searchDialog.open) return;
    const position = {
      anchor: currentTargetId,
      y: Math.max(0, window.scrollY),
      width: document.documentElement.clientWidth
    };
    const line = readingLine();
    for (const block of main.querySelectorAll(".chapter-section[id], .example[id]")) {
      const rect = block.getBoundingClientRect();
      if (rect.top <= line && line < rect.bottom) {
        position.block = block.id.slice(chapter.route.length + 1);
        position.offset = line - rect.top;
        position.fraction = position.offset / rect.height;
        position.solutionOpen = block.querySelector(":scope > .solution:not(.reading-hint)")?.open ?? false;
      }
    }
    remember("position:" + chapter.id, JSON.stringify(position), chapter.courseId);
  }

  function readingLine() {
    return document.querySelector(".topbar").getBoundingClientRect().bottom + 16;
  }

  function scrollToPosition(chapter, position) {
    const block = position.block && document.getElementById(chapter.route + "/" + position.block);
    if (!block || !Number.isFinite(position.offset) || !Number.isFinite(position.fraction)) {
      window.scrollTo(0, position.y);
      return;
    }
    const solution = block.querySelector(":scope > .solution:not(.reading-hint)");
    if (solution && position.solutionOpen) solution.open = true;
    const rect = block.getBoundingClientRect();
    const offset = position.width === document.documentElement.clientWidth
      ? position.offset : position.fraction * rect.height;
    window.scrollTo(0, window.scrollY + rect.top + Math.min(offset, rect.height) - readingLine());
  }

  function resolveLegacyLabRoute(path) {
    if (path === "itds241/labs") return "itds241";
    const parts = path.split("/");
    const chapter = chapterByLegacyLabRoute.get(parts.slice(0, 2).join("/"));
    if (!chapter) return path;
    const section = chapter.lab.sections.find(({ id }) => id === parts[2]);
    return chapter.route + "/lab" + (section ? "-" + section.id : "");
  }

  function showLocation() {
    const originalHash = location.hash.slice(1);
    const hash = resolveLegacyLabRoute(originalHash);
    if (hash !== originalHash) history.replaceState(history.state, "", "#" + hash);
    const parts = hash.split("/");
    const course = coursesById.get(parts[0]);
    const chapter = chapterByRoute.get(course ? parts.slice(0, 2).join("/") : parts[0]);
    const view = chapter?.route ?? course?.id ?? "home";
    const targetId = chapter ? hash.slice(view.length + 1) : "";
    const isReload = !currentView && performance.getEntriesByType("navigation")[0]?.type === "reload";
    const resumeChapter = chapter && course?.restoreChapterPosition && !targetId && currentView !== view;
    const position = chapter && (restoreReadingPosition === view || isReload || resumeChapter) ? readPosition(chapter) : null;
    const savedPosition = resumeChapter || position?.anchor === targetId ? position : null;
    restoringPosition = Boolean(savedPosition);
    restoreReadingPosition = "";
    const wasOnPage = Boolean(currentView);
    if (positionFrame !== null) {
      cancelAnimationFrame(positionFrame);
      positionFrame = null;
    }
    if (currentView !== view) {
      stopStudyTimer();
      main.replaceChildren(chapter ? makeChapter(chapter) : course ? makeCourse(course) : makeHome());
      renderChapterNav(view);
      const title = chapter?.title ?? course?.title;
      document.title = title ? title + " · " + siteName : siteName;
      currentView = view;
      syncStudyTimer();
      refreshChapterTime();
      refreshCourseTimes();
    }
    const target = targetId ? document.getElementById(view + "/" + targetId) : null;
    if (target?.classList.contains("lab-solution")) target.querySelector("details").open = true;
    if (target?.classList.contains("reading-source-entry")) target.open = true;
    const section = target?.closest(".lab-practice") ? "lab" : target?.closest(".chapter-section")?.id.slice(view.length + 1);
    for (const anchor of main.querySelectorAll("[data-section]")) {
      if (anchor.dataset.section === section) anchor.setAttribute("aria-current", "location");
      else anchor.removeAttribute("aria-current");
    }
    currentTargetId = chapter && target ? targetId : "";
    if (chapter) {
      remember("last-read", target ? target.id : view, chapter.courseId);
      remember("recent-course", chapter.courseId);
    }

    requestAnimationFrame(async () => {
      if (savedPosition) await document.fonts.ready;
      if (location.hash.slice(1) !== hash) return;
      if (target) {
        target.focus({ preventScroll: true });
        if (!savedPosition) target.scrollIntoView({ block: "start" });
      } else {
        if (wasOnPage) main.focus({ preventScroll: true });
        if (!savedPosition) window.scrollTo(0, 0);
      }
      if (savedPosition) scrollToPosition(chapter, savedPosition);
      restoringPosition = false;
      savePosition();
    });
  }

  function normalize(input) {
    return input.normalize("NFKC").toLocaleLowerCase().trim();
  }

  const searchIndex = [];
  function registerSearch(chapter, item, label, body) {
    const title = item?.title ?? chapter.title;
    searchIndex.push({
      title,
      trail: label,
      target: "#" + (chapter.route ?? chapter.id) + (item ? "/" + item.id : ""),
      titleIndex: normalize(title),
      contentIndex: normalize([title, label, ...body].join(" "))
    });
  }

  for (const course of courses) {
    registerSearch(course, null, "โฟลเดอร์วิชา", ["คลังวิชา", course.keyword]);
  }
  for (const chapter of chapters) {
    const course = coursesById.get(chapter.courseId);
    const number = chapter.pdfSources ? "Lecture " + chapter.number : chapter.number;
    const breadcrumb = course.title + " · " + number + " · " + (names[chapter.id] ?? chapter.title);
    registerSearch(chapter, null, breadcrumb, [chapter.thaiTitle, chapter.summary, ...(chapter.goals ?? []), ...(chapter.confusions ?? [])]);
    if (chapter.checklist?.length) registerSearch(chapter, reviewTopic, breadcrumb, chapter.checklist);
    for (const section of chapter.sections) {
      const range = sourceLabel(section.pages, chapter, section.pdf);
      registerSearch(chapter, section, breadcrumb + " · " + range, [
        section.summary, ...section.points.flat(), ...(section.slideFigures ?? []).map(figure => figure.caption)
      ]);
      for (const example of section.examples) {
        const record = [
          example.prompt, example.task, example.codePrompt, ...example.steps, example.answer, example.note, example.code,
          ...(example.diagram ?? []),
          ...(example.table?.rows.flat() ?? []),
          ...(example.tablePrompt?.rows.flat() ?? [])
        ];
        registerSearch(chapter, example, breadcrumb + " · " + slideLabel(example.pages, chapter, example.pdf), record);
      }
      for (const passage of section.passages ?? []) {
        const paragraphs = passage.paragraphs.flatMap(paragraph => [paragraph.english, paragraph.thai, paragraph.role, paragraph.analysis, ...(paragraph.vocabulary ?? [])]);
        registerSearch(chapter, passage, breadcrumb, paragraphs);
        for (const question of passage.questions) registerSearch(chapter, question, breadcrumb, [question.prompt, question.answer, ...question.steps]);
      }
    }
    if (chapter.readingSources?.length) {
      registerSearch(chapter, readingSourcesTopic, breadcrumb, ["บทอ่าน สไลด์ เอกสาร ใบงาน"]);
      for (const source of chapter.readingSources) {
        registerSearch(chapter, { id: "source-" + source.id, title: source.file }, breadcrumb, source.pages.map(page => page.title));
      }
    }
    if (chapter.exercises.length) {
      const practiceTrail = breadcrumb + " · " + practiceTopic.title;
      registerSearch(chapter, practiceTopic, breadcrumb, []);
      for (const exercise of chapter.exercises) {
        const record = [exercise.prompt, exercise.codePrompt, ...(exercise.tablePrompt?.rows.flat() ?? [])];
        registerSearch(chapter, exercise, practiceTrail + " · " + slideLabel(exercise.pages, chapter, exercise.pdf), record);
      }
    }
    if (chapter.lab) {
      const lab = chapter.lab;
      const title = "โจทย์ Lab " + lab.number + " · " + lab.title;
      registerSearch(chapter, { id: "lab", title }, breadcrumb, [lab.thaiTitle, lab.summary]);
      for (const section of lab.sections) {
        const target = { id: "lab-" + section.id, title: section.title };
        registerSearch(chapter, target, title, [
          section.summary, ...(section.steps ?? []), ...(section.checks ?? []).map(([, text]) => text)
        ]);
      }
      if (labSolutions[lab.number]) {
        registerSearch(chapter, { id: "lab-solution", title: "เฉลยและวิธีทำ Lab " + lab.number }, title, ["โค้ด"]);
      }
    }
  }

  function search() {
    const query = normalize(searchInput.value);
    searchResults.replaceChildren();
    if (!query) {
      searchFeedback.textContent = "ค้นได้ทั้งชื่อหัวข้อ ศัพท์ และตัวอย่าง";
      return;
    }
    const terms = query.split(/\s+/u);
    const matches = searchIndex
      .filter(record => terms.every(term => record.contentIndex.includes(term)))
      .sort((first, second) => Number(second.titleIndex.includes(query)) - Number(first.titleIndex.includes(query)) ||
        Number(second.contentIndex.includes(query)) - Number(first.contentIndex.includes(query)));
    const shown = matches.slice(0, 24);
    searchFeedback.textContent = matches.length > shown.length
      ? "แสดง " + shown.length + " จาก " + matches.length + " ผลการค้นหา"
      : "พบ " + matches.length + " ผลการค้นหา";
    for (const record of shown) {
      const row = element("li");
      const anchor = link(undefined, record.target);
      anchor.append(element("strong", "", record.title), element("small", "", record.trail));
      row.append(anchor);
      searchResults.append(row);
    }
  }

  function openSearch() {
    if (menuDialog.open) menuDialog.close();
    if (!searchDialog.open) searchDialog.showModal();
    searchInput.focus();
    searchInput.select();
  }

  function closeOnNavigation(dialog) {
    dialog.addEventListener("click", event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      dialog.close();
      if (anchor.hash === location.hash) showLocation();
    });
  }

  closeOnNavigation(menuDialog);
  closeOnNavigation(searchDialog);
  searchInput.addEventListener("input", search);
  document.getElementById("open-search").addEventListener("click", openSearch);
  document.getElementById("open-menu").addEventListener("click", () => menuDialog.showModal());
  document.querySelector(".skip-link").addEventListener("click", event => {
    event.preventDefault();
    main.focus();
  });
  fontButton.addEventListener("click", () => {
    const large = fontButton.getAttribute("aria-pressed") === "false";
    updateFontSize(large);
    remember("large-type", String(large));
  });
  document.addEventListener("keydown", event => {
    if (!((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")) return;
    event.preventDefault();
    openSearch();
  });
  window.addEventListener("hashchange", showLocation);
  window.addEventListener("focus", syncStudyTimer);
  window.addEventListener("blur", stopStudyTimer);
  window.addEventListener("pageshow", syncStudyTimer);
  window.addEventListener("pagehide", () => {
    savePosition();
    stopStudyTimer();
  });
  window.addEventListener("scroll", () => {
    if (positionFrame !== null || !chapterByRoute.has(currentView)) return;
    positionFrame = requestAnimationFrame(() => {
      positionFrame = null;
      savePosition();
    });
  }, { passive: true });
  document.addEventListener("visibilitychange", syncStudyTimer);
  window.addEventListener("storage", event => {
    const course = courses.find(({ id }) => event.key === id + ":" + studyStorageKey);
    if (!course) return;
    studyTotals.set(course.id, readStudyTotals(course.id) ?? {});
    refreshStudyOverview();
    refreshChapterTime();
    refreshCourseTimes();
  });
  updateFontSize(recall("large-type") === "true");
  search();
  showLocation();
})();
