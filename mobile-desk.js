(()=>{
  const switcher=document.querySelector('#mobile-pane-switcher');if(!switcher)return;
  let active=0;
  const isMobile=()=>matchMedia('(max-width: 1119px)').matches;
  const show=index=>{
    const panes=[...document.querySelectorAll('#panes .pane')];if(!panes.length)return;
    active=Math.max(0,Math.min(index,panes.length-1));
    panes.forEach((pane,n)=>pane.classList.toggle('mobile-active',n===active));
    switcher.querySelectorAll('button').forEach(button=>{const selected=+button.dataset.pane===active;button.classList.toggle('active',selected);button.setAttribute('aria-selected',String(selected));});
    if(isMobile){panes[active].dispatchEvent(new Event('pointerdown',{bubbles:true}));window.scrollTo({top:0,behavior:'smooth'});}
  };
  switcher.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>show(+button.dataset.pane)));
  new MutationObserver(()=>show(active)).observe(document.querySelector('#panes'),{childList:true});
  addEventListener('resize',()=>{if(isMobile)show(active);else document.querySelectorAll('#panes .pane').forEach(pane=>pane.classList.remove('mobile-active'));});
})();
