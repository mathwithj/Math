(() => {
  document.body.classList.add('unified-page');
  const bar = document.createElement('nav');
  bar.className = 'unified-bar screen';
  bar.setAttribute('aria-label', 'راهبری جزوه');
  const home = document.createElement('a');
  home.href = 'index.html';
  home.textContent = '← صفحهٔ اصلی جزوه‌ها';
  const menu = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = 'فهرست بخش‌ها و زیرمبحث‌ها';
  const list = document.createElement('ol');
  let subsectionList = null;
  let count = 0;
  document.querySelectorAll('h2, h3, .enrichment li > b:first-child').forEach((heading) => {
    const title = heading.textContent.trim();
    if (!title || title === 'فهرست' || title === 'اثبات') return;
    const subtopic = heading.matches('h3, .enrichment li > b:first-child');
    const target = heading.matches('.enrichment li > b:first-child') ? heading.parentElement : heading;
    if (!target.id) target.id = `unified-section-${++count}`;
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${target.id}`;
    link.textContent = title;
    item.append(link);
    if (subtopic && list.lastElementChild) {
      if (!subsectionList) {
        subsectionList = document.createElement('ol');
        subsectionList.className = 'subtopic';
        list.lastElementChild.append(subsectionList);
      }
      subsectionList.append(item);
    } else {
      list.append(item);
      subsectionList = null;
    }
  });
  menu.append(summary, list);
  bar.append(home, menu);
  document.body.prepend(bar);
})();
