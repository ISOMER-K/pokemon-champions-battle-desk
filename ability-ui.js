(()=>{
  const esc=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const rowsFor=(pane,mon)=>Object.prototype.hasOwnProperty.call(pane,'mon')?(mon.rows||mon.fallbackRows||[]):(mon.summary?.battleSummary?.Current?.Singles?.rows||[]);
  const labelFor=(pane,mon,name)=>Object.prototype.hasOwnProperty.call(pane,'mon')?(mon.translate?.get(name)||name):(data.translations?.ability?.[name]||name);
  const render=pane=>{
    const mon=pane.mon||pane.selected,root=(pane.node||pane.el)?.querySelector('.hero');if(!mon||!root||root.querySelector('.ability-section'))return;
    const abilities=rowsFor(pane,mon).filter(row=>row.category==='ability').sort((a,b)=>(a.rank||99)-(b.rank||99)).slice(0,5);if(!abilities.length)return;
    const section=document.createElement('section');section.className='ability-section';section.innerHTML=`<b>특성 채용률</b><div class="ability-list">${abilities.map(row=>`<div class="usage-row"><span class="usage-rank">${row.rank||'-'}</span><b>${esc(labelFor(pane,mon,row.name))}</b><span>${esc(row.percentage||'')}</span></div>`).join('')}</div>`;
    root.querySelector(':scope > div')?.append(section);
  };
  const renderAll=()=>typeof panes==='undefined'?null:panes.filter(Boolean).forEach(render);
  new MutationObserver(renderAll).observe(document.body,{childList:true,subtree:true});renderAll();
})();
