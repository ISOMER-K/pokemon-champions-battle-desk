(()=>{
  const bind=scope=>scope.querySelectorAll?.('.history-button:not([data-nav-bound])').forEach(button=>{
    button.dataset.navBound='true';
    button.addEventListener('click',()=>button.classList.contains('history-back')?history.back():history.forward());
  });
  bind(document);
  new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)bind(node)}))).observe(document.body,{childList:true,subtree:true});
  const logo=document.querySelector('.brand');
  if(!logo)return;
  logo.tabIndex=0;logo.setAttribute('role','button');logo.setAttribute('aria-label','처음 화면으로 이동');
  const goHome=()=>document.dispatchEvent(new Event('battle-desk-home'));
  logo.addEventListener('click',goHome);
  logo.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();goHome();}});
})();
