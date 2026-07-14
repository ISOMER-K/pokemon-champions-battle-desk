(()=>{
  const esc=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const rowsFor=(pane,mon)=>Object.prototype.hasOwnProperty.call(pane,'mon')?(mon.rows||mon.fallbackRows||[]):(mon.summary?.battleSummary?.Current?.Singles?.rows||[]);
  const labelFor=(pane,mon,name)=>Object.prototype.hasOwnProperty.call(pane,'mon')?(mon.translate?.get(name)||name):(data.translations?.ability?.[name]||name);
  const descriptionFor=(pane,mon,name)=>Object.prototype.hasOwnProperty.call(pane,'mon')?(mon.abilityDescriptions?.get(name)||''):(data.ability_meta?.[name]?.description||'');
  const fixedMegaAbilities=(pane,mon)=>{if(!String(mon.form_kind||mon.kind||'').startsWith('Mega'))return [];const form=(mon.summary?.forms||[]).find(value=>value.form_name===mon.name);return String(form?.abilities||mon.abilities||'').split('|').map(value=>value.trim()).filter(Boolean);};
  const render=pane=>{
    const mon=pane.mon||pane.selected,root=(pane.node||pane.el)?.querySelector('.hero');if(!mon||!root||root.querySelector('.ability-section'))return;
    const fixed=fixedMegaAbilities(pane,mon),abilities=fixed.length?fixed.map((name,index)=>({name,rank:index+1,percentage:'100%'})):rowsFor(pane,mon).filter(row=>row.category==='ability').sort((a,b)=>(a.rank||99)-(b.rank||99)).slice(0,5);if(!abilities.length)return;
    const section=document.createElement('section');section.className='ability-section hero-ability';section.innerHTML=`<b>특성 채용률</b><div class="ability-list">${abilities.map(row=>{const name=labelFor(pane,mon,row.name),description=descriptionFor(pane,mon,row.name),hint=description?` title="${esc(description)}" aria-label="${esc(`${name}: ${description}`)}"`:'';return `<div class="usage-row ability-row"${hint}><span class="usage-rank">${row.rank||'-'}</span><b>${esc(name)}</b><span>${esc(row.percentage||'')}</span></div>`;}).join('')}</div>`;
    root.append(section);
  };
  const renderAll=()=>typeof panes==='undefined'?null:panes.filter(Boolean).forEach(render);
  new MutationObserver(renderAll).observe(document.body,{childList:true,subtree:true});renderAll();
})();
