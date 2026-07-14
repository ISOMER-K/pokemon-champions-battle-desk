(()=>{
  const historyByPane=new WeakMap();
  const paneKey=pane=>pane?.mon?.slug??pane?.selected?.name??'';
  const buttons=pane=>({back:pane.node?.querySelector('.history-back')||pane.el?.querySelector('.history-back'),forward:pane.node?.querySelector('.history-forward')||pane.el?.querySelector('.history-forward')});
  const sync=pane=>{const state=historyByPane.get(pane),nav=buttons(pane);if(!state)return;nav.back&&(nav.back.disabled=state.index<=0);nav.forward&&(nav.forward.disabled=state.index>=state.entries.length-1);};
  const observePane=pane=>{
    const key=paneKey(pane),state=historyByPane.get(pane);
    if(!state){historyByPane.set(pane,{entries:[key],index:0,replaying:false});sync(pane);return;}
    if(state.replaying||state.entries[state.index]===key){sync(pane);return;}
    state.entries.splice(state.index+1);state.entries.push(key);state.index=state.entries.length-1;sync(pane);
  };
  const allPanes=()=>typeof panes==='undefined'?[]:panes.filter(Boolean);
  const refresh=()=>allPanes().forEach(observePane);
  const apply=(pane,index,direction)=>{
    const state=historyByPane.get(pane);if(!state)return;const next=state.index+direction;if(next<0||next>=state.entries.length)return;
    state.index=next;state.replaying=true;sync(pane);const key=state.entries[next];
    if(Object.prototype.hasOwnProperty.call(pane,'mon')){
      const target=key&&app.mons.find(mon=>mon.slug===key);target?openMon(index,target,false):home(index,false);
    }else{const target=key&&data.pokemon.find(mon=>mon.name===key);target?pane.open(target,false):pane.home();}
    setTimeout(()=>{state.replaying=false;sync(pane);},80);
  };
  const bind=scope=>scope.querySelectorAll?.('.history-button:not([data-nav-bound])').forEach(button=>{
    button.dataset.navBound='true';button.addEventListener('click',()=>{const pane=button.closest('.pane'),index=[...document.querySelectorAll('#panes .pane')].indexOf(pane);if(index>=0)apply(allPanes()[index],index,button.classList.contains('history-back')?-1:1);});
  });
  bind(document);new MutationObserver(()=>{bind(document);refresh();}).observe(document.body,{childList:true,subtree:true});
  const logo=document.querySelector('.brand');
  if(!logo)return;
  logo.tabIndex=0;logo.setAttribute('role','button');logo.setAttribute('aria-label','처음 화면으로 이동');
  const goHome=()=>document.dispatchEvent(new Event('battle-desk-home'));
  logo.addEventListener('click',goHome);
  logo.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();goHome();}});
})();
