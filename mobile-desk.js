(()=>{
  const switcher=document.querySelector('#mobile-pane-switcher');if(!switcher)return;
  let active=0;
  const isMobile=()=>matchMedia('(max-width: 1119px)').matches;
  // Only an explicit pane switch should reset the document position.  Mobile
  // browsers emit resize events while their address bar collapses on scroll,
  // and rendering details also mutates #panes, so neither may scroll to top.
  const show=(index,resetScroll=false)=>{
    const panes=[...document.querySelectorAll('#panes .pane')];if(!panes.length)return;
    active=Math.max(0,Math.min(index,panes.length-1));
    panes.forEach((pane,n)=>pane.classList.toggle('mobile-active',n===active));
    switcher.querySelectorAll('button').forEach(button=>{const selected=+button.dataset.pane===active;button.classList.toggle('active',selected);button.setAttribute('aria-selected',String(selected));});
    if(isMobile){panes[active].dispatchEvent(new Event('pointerdown',{bubbles:true}));if(resetScroll)window.scrollTo({top:0,behavior:'smooth'});}
  };
  switcher.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>show(+button.dataset.pane,true)));
  new MutationObserver(()=>show(active)).observe(document.querySelector('#panes'),{childList:true});
  addEventListener('resize',()=>{if(isMobile)show(active);else document.querySelectorAll('#panes .pane').forEach(pane=>pane.classList.remove('mobile-active'));});
})();
