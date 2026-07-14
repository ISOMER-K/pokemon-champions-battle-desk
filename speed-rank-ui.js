function enhanceRankSliders(root=document){
  root.querySelectorAll('input.stage:not([data-rank-ui])').forEach(input=>{
    input.dataset.rankUi='true'; input.classList.add('rank-range');
    const wrap=document.createElement('span'); wrap.className='rank-slider';
    const ticks=document.createElement('span'); ticks.className='rank-ticks'; ticks.setAttribute('aria-hidden','true');
    for(let i=0;i<13;i+=1)ticks.append(document.createElement('i'));
    input.replaceWith(wrap); wrap.append(ticks,input);
  });
}
enhanceRankSliders();
new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)enhanceRankSliders(node)}))).observe(document.body,{childList:true,subtree:true});
