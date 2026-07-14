/* Keeps the raw Pokémon base stats visible as a compact reference below the
   Champions level-50 battle-stat chart. Champions' base values are raw+75 for
   HP and raw+20 for the five remaining stats. */
(() => {
  const names = ['HP', '공격', '방어', '특공', '특방', '스피드'];
  const update = () => document.querySelectorAll('.stat-note').forEach(note => {
    const card = note.closest('.card');
    const actual = [...(card?.querySelectorAll('.stat b') || [])].map(el => Number(el.textContent));
    if (actual.length !== 6 || actual.some(Number.isNaN)) return;
    const raw = actual.map((value, index) => Math.max(1, value - (index === 0 ? 75 : 20)));
    const html = `참고 · 원본 종족값 <span class="raw-stat-values">${raw.map((value, index) => `${names[index]} ${value}`).join(' · ')}</span><br>합계 ${raw.reduce((sum, value) => sum + value, 0)}`;
    if (note.dataset.rawReference !== html) {
      note.dataset.rawReference = html;
      note.innerHTML = html;
    }
  });
  new MutationObserver(update).observe(document.body, { childList: true, subtree: true, characterData: true });
  update();
})();
