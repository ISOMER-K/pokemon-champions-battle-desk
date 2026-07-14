/* Pokemon Champions Battle Desk — live browser client (no Champions data is stored here). */
const API = 'https://championsbattledata.com/api';
const POKE_RAW = 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv';
const ASSETS = 'https://championsbattledata.com/';
const TYPES = ['Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
const TYPE_KO = {Normal:'노말',Fire:'불꽃',Water:'물',Electric:'전기',Grass:'풀',Ice:'얼음',Fighting:'격투',Poison:'독',Ground:'땅',Flying:'비행',Psychic:'에스퍼',Bug:'벌레',Rock:'바위',Ghost:'고스트',Dragon:'드래곤',Dark:'악',Steel:'강철',Fairy:'페어리'};
const TYPE_COLOR = {Normal:'#9fa29f',Fire:'#ed6a5a',Water:'#4d9de0',Electric:'#f6c945',Grass:'#65bd72',Ice:'#69cbd0',Fighting:'#c65a6a',Poison:'#a26abb',Ground:'#bd8554',Flying:'#8da8e6',Psychic:'#e66d9b',Bug:'#8cab42',Rock:'#b69a5c',Ghost:'#7467a8',Dragon:'#7567cf',Dark:'#635d6a',Steel:'#7f9fb1',Fairy:'#df8dab'};
const EFFECT = {Normal:{Rock:.5,Ghost:0,Steel:.5},Fire:{Fire:.5,Water:.5,Grass:2,Ice:2,Bug:2,Rock:.5,Dragon:.5,Steel:2},Water:{Fire:2,Water:.5,Grass:.5,Ground:2,Rock:2,Dragon:.5},Electric:{Water:2,Electric:.5,Grass:.5,Ground:0,Flying:2,Dragon:.5},Grass:{Fire:.5,Water:2,Grass:.5,Poison:.5,Ground:2,Flying:.5,Bug:.5,Rock:2,Dragon:.5,Steel:.5},Ice:{Fire:.5,Water:.5,Grass:2,Ice:.5,Ground:2,Flying:2,Dragon:2,Steel:.5},Fighting:{Normal:2,Ice:2,Poison:.5,Flying:.5,Psychic:.5,Bug:.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:.5},Poison:{Grass:2,Poison:.5,Ground:.5,Rock:.5,Ghost:.5,Steel:0,Fairy:2},Ground:{Fire:2,Electric:2,Grass:.5,Poison:2,Flying:0,Bug:.5,Rock:2,Steel:2},Flying:{Electric:.5,Grass:2,Fighting:2,Bug:2,Rock:.5,Steel:.5},Psychic:{Fighting:2,Poison:2,Psychic:.5,Dark:0,Steel:.5},Bug:{Fire:.5,Grass:2,Fighting:.5,Poison:.5,Flying:.5,Psychic:2,Ghost:.5,Dark:2,Steel:.5,Fairy:.5},Rock:{Fire:2,Ice:2,Fighting:.5,Ground:.5,Flying:2,Bug:2,Steel:.5},Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:.5},Dragon:{Dragon:2,Steel:.5,Fairy:0},Dark:{Fighting:.5,Psychic:2,Ghost:2,Dark:.5,Fairy:.5},Steel:{Fire:.5,Water:.5,Electric:.5,Ice:2,Rock:2,Steel:.5,Fairy:2},Fairy:{Fire:.5,Fighting:2,Poison:.5,Dragon:2,Dark:2,Steel:.5}};
const FORM_KO = {
  'Aegislash Shield Forme':'킬가르도(실드폼)','Aegislash Blade Forme':'킬가르도(블레이드폼)','Basculegion Female':'대쓰여너(암컷)','Basculegion Male':'대쓰여너(수컷)','Meowstic Female':'냐오닉스(암컷)','Florges Red Flower':'플라제스(빨간 꽃)','Furfrou Natural Form':'트리미앙(야생의 모습)','Gourgeist Jumbo Variety':'호바귀(특대 사이즈)','Gourgeist Large Variety':'호바귀(대 사이즈)','Gourgeist Small Variety':'호바귀(소 사이즈)','Lycanroc Dusk Form':'루가루암(황혼의 모습)','Lycanroc Midnight Form':'루가루암(한밤중의 모습)','Palafin Zero Form':'돌핀맨(나이브폼)','Palafin Hero Form':'돌핀맨(마이티폼)','Rotom Wash':'워시로토무','Rotom Fan':'스핀로토무','Rotom Frost':'프로스트로토무','Rotom Heat':'히트로토무','Rotom Mow':'커트로토무','Vivillon Fancy Pattern':'비비용(팬시무늬)','Paldean Tauros Aqua Breed':'팔데아 켄타로스(워터종)','Paldean Tauros Blaze Breed':'팔데아 켄타로스(블레이즈종)','Paldean Tauros Combat Breed':'팔데아 켄타로스(컴뱃종)','Mega Charizard X':'메가리자몽X','Mega Charizard Y':'메가리자몽Y','Mega Raichu X':'메가라이츄X','Mega Raichu Y':'메가라이츄Y'
};
Object.assign(FORM_KO, {'Alcremie':'마휘핑','Alcremie Vanilla Cream':'마휘핑(바닐라크림)','Alcremie Ruby Cream':'마휘핑(루비크림)','Alcremie Matcha Cream':'마휘핑(말차크림)','Alcremie Mint Cream':'마휘핑(민트크림)','Alcremie Lemon Cream':'마휘핑(레몬크림)','Alcremie Salted Cream':'마휘핑(솔티드크림)','Alcremie Ruby Swirl':'마휘핑(루비스월)','Alcremie Caramel Swirl':'마휘핑(카라멜스월)','Alcremie Rainbow Swirl':'마휘핑(레인보우스월)','Vivillon Fancy Pattern':'비비용'});
const COSMETIC_FORM_KEEP = {'Alcremie':'Alcremie','Florges':'Florges Red Flower','Furfrou':'Furfrou Natural Form','Maushold':'Maushold','Morpeko':'Morpeko','Vivillon':'Vivillon Fancy Pattern'};
Object.assign(FORM_KO, {'Furfrou Natural Form':'트리미앙'});
const ITEM_KO = {'Fairy Feather':'요정의깃털','Raichunite X':'라이츄나이트X','Raichunite Y':'라이츄나이트Y','Garchompite':'한카리아스나이트','Charizardite X':'리자몽나이트X','Charizardite Y':'리자몽나이트Y','Lucarionite':'루카리오나이트'};
const NATURE_KO = {Jolly:'명랑',Adamant:'고집',Timid:'겁쟁이',Modest:'조심',Brave:'용감',Quiet:'냉정',Bold:'대담',Impish:'장난꾸러기',Calm:'차분',Careful:'신중',Naive:'천진난만',Hasty:'성급',Lonely:'외로움',Naughty:'개구쟁이',Mild:'온순',Rash:'덜렁',Gentle:'온화',Sassy:'건방',Relaxed:'무사태평',Lax:'촐랑',Hardy:'노력',Docile:'온순',Serious:'성실',Bashful:'수줍음',Quirky:'변덕'};
const STAT_KO = {HP:'체력',Attack:'공격',Defense:'방어','Sp. Atk':'특수공격','Sp. Def':'특수방어',Speed:'스피드'};
const FAVORITES = ['Empoleon','Meowscarada','Garchomp','Lucario','Mega Charizard X','Mimikyu','Emolga','Dedenne','Mega Raichu Y'];
let app = {mons:[], season:'Current', active:0, typeahead:[], speciesKo:new Map(), info:new Map()};
const panes = [];

function esc(s=''){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function slug(s=''){ return s.toLowerCase().replace(/['’.]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
function compact(s=''){ return slug(s).replace(/-/g,''); }
function typeChip(t){ return `<span class="type" style="background:${TYPE_COLOR[t]||'#496986'}">${TYPE_KO[t]||t}</span>`; }
function asset(path){ return /^https?:/.test(path||'') ? path : ASSETS + String(path||'').replace(/^\//,''); }
function battlePart(x){ return x?.Current?.Singles || x?.['Current Singles'] || x?.Singles || x || {}; }
function getRows(mon){ return mon.rows || mon.fallbackRows || []; }
function rank(mon){ const r=getRows(mon).find(x=>x.category==='move')?.column_position; return Number.isFinite(r) ? r : 9999; }
function category(mon, name){ return getRows(mon).filter(x=>x.category===name).sort((a,b)=>(a.rank||99)-(b.rank||99)); }
function rawBaseTotal(mon){const s=mon.stats||{};return Math.max(1,(s.hp||0)-75)+Math.max(1,(s.attack||0)-20)+Math.max(1,(s.defense||0)-20)+Math.max(1,(s.sp_attack||0)-20)+Math.max(1,(s.sp_defense||0)-20)+Math.max(1,(s.speed||0)-20);}

function parseCsv(text){ return text.trim().split(/\r?\n/).map(line=>line.split(',')); }
function koreanFor(en){
  if(FORM_KO[en]) return FORM_KO[en];
  const key=slug(en), bare=key.replace(/^(mega-|alolan-|galarian-|hisuian-|paldean-)/,'');
  const base=app.speciesKo.get(key)||app.speciesKo.get(bare)||app.speciesKo.get(compact(key));
  if(base){
    if(/^mega /i.test(en)) return `메가${base}${/\s([XY])$/i.test(en)?RegExp.$1:''}`;
    if(/^alolan /i.test(en)) return `알로라 ${base}`;
    if(/^galarian /i.test(en)) return `가라르 ${base}`;
    if(/^hisuian /i.test(en)) return `히스이 ${base}`;
    if(/ female$/i.test(en)) return `${base}(암컷)`;
    if(/ male$/i.test(en)) return `${base}(수컷)`;
    return base;
  }
  return en;
}
function normalise(index){
  const result=[];
  for(const entry of index.pokemon||[]){
    const sum=entry.summary||{}; const allForms=sum.forms?.length ? sum.forms : [sum.primary||{}];
    const battle=battlePart(sum.battleSummary); const fallback=battle.rows||[];
    for(const form of allForms){
      if(!form?.form_name) continue;
      const name=form.form_name;
      if(COSMETIC_FORM_KEEP[entry.name] && COSMETIC_FORM_KEEP[entry.name]!==name) continue;
      const stats={hp:+form.hp||0,attack:+form.attack||0,defense:+form.defense||0,sp_attack:+form.sp_attack||0,sp_defense:+form.sp_defense||0,speed:+form.speed||0};
      result.push({name, ko:koreanFor(name), parent:entry.name, kind:form.form_kind||'Base', slug:form.slug||slug(name), image:form.image_path||sum.sprite, types:form.types||sum.types||[], stats, fallbackRows:fallback, rows:null, hydrated:false, liveError:false, translate:new Map(), moveTypes:new Map()});
    }
  }
  const seen=new Set();
  return result.filter(m=>!seen.has(m.name) && seen.add(m.name));
}
function findMon(q){
  const needle=String(q||'').trim().toLowerCase();
  if(!needle) return null;
  return app.mons.find(m=>m.name.toLowerCase()===needle || m.ko===needle || m.slug===slug(needle)) || app.mons.find(m=>m.name.toLowerCase().includes(needle)||m.ko.includes(needle)||m.slug.includes(slug(needle)));
}
function saveUrl(){
  const q=new URLSearchParams(); panes.forEach((p,i)=>p.mon&&q.set(i?'right':'left',p.mon.slug));
  history.pushState({},'',q.toString()?`?${q}`:location.pathname);
}
function renderMascots(){
  const host=document.querySelector('#mascots'); host.innerHTML='';
  FAVORITES.map(findMon).filter(Boolean).forEach(mon=>{
    const b=document.createElement('button'); b.className='mascot-button'; b.title=mon.ko; b.innerHTML=`<img src="${asset(mon.image)}" alt="${esc(mon.ko)}">`;
    b.onclick=()=>openMon(app.active,mon,true); host.append(b);
  });
}
function makePane(i){
  const node=document.querySelector('#pane-template').content.firstElementChild.cloneNode(true);
  const pane={node, input:node.querySelector('input'), suggestions:node.querySelector('.suggestions'), content:node.querySelector('.content'), clearButton:node.querySelector('.clear-search'), mon:null, seq:0, matches:[], suggestionIndex:-1};
  panes[i]=pane; document.querySelector('#panes').append(node);
  node.addEventListener('pointerdown',()=>app.active=i);
  node.querySelector('.home-button').onclick=()=>home(i,true);
  pane.input.addEventListener('input',()=>{refreshClear(pane);suggest(i);});
  pane.input.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      if(!pane.matches.length) suggest(i);
      if(pane.matches.length){pane.suggestionIndex=(pane.suggestionIndex+(e.key==='ArrowDown'?1:-1)+pane.matches.length)%pane.matches.length; highlightSuggestion(pane);}
      e.preventDefault(); return;
    }
    if(e.key==='Enter'){ const mon=pane.matches[pane.suggestionIndex]||pane.matches[0]||findMon(pane.input.value); if(mon) openMon(i,mon,true); e.preventDefault(); }
    if(e.key==='Escape'){pane.suggestionIndex=-1; pane.suggestions.innerHTML='';}
  });
  pane.clearButton.onclick=()=>{pane.input.value='';pane.matches=[];pane.suggestionIndex=-1;pane.suggestions.innerHTML='';refreshClear(pane);pane.input.focus();};
  return pane;
}
function refreshClear(pane){ pane.clearButton.hidden=!pane.input.value; }
function setSearchLabel(pane, mon){
  const text=mon.ko, apply=()=>{if(pane.mon===mon){pane.input.value=text;refreshClear(pane);}};
  apply(); setTimeout(apply,0);
}
function suggest(i){
  const p=panes[i], raw=p.input.value.trim(), key=raw.toLowerCase();
  if(!key){p.matches=[];p.suggestionIndex=-1;p.suggestions.innerHTML='';return;}
  const starts=[], contains=[];
  app.mons.forEach(m=>{ const hay=`${m.ko} ${m.name}`.toLowerCase(); (hay.startsWith(key)?starts:hay.includes(key)?contains:null)?.push(m); });
  p.matches=[...starts,...contains].slice(0,10); p.suggestionIndex=-1; app.typeahead=p.matches;
  p.suggestions.innerHTML=p.matches.map(m=>`<button class="suggestion" type="button" data-slug="${esc(m.slug)}"><b>${esc(m.ko)}</b><small>${esc(m.name)}</small>${m.types.map(typeChip).join('')}</button>`).join('');
  p.suggestions.querySelectorAll('button').forEach(b=>b.onclick=()=>openMon(i,app.mons.find(m=>m.slug===b.dataset.slug),true));
}
function highlightSuggestion(p){ p.suggestions.querySelectorAll('button').forEach((b,n)=>b.classList.toggle('suggestion-active',n===p.suggestionIndex)); }
function home(i, push=false){
  const p=panes[i]; p.mon=null;p.input.value='';refreshClear(p);p.suggestions.innerHTML='';
  const ranked=app.mons.filter(m=>m.kind==='Base'||m.name===m.parent).sort((a,b)=>rank(a)-rank(b)).slice(0,100);
  const row=m=>`<button type="button" data-slug="${esc(m.slug)}"><span class="rank">${rank(m)===9999?'-':rank(m)}</span><span><b>${esc(m.ko)}</b><small> · ${esc(m.name)}</small><br>${m.types.map(typeChip).join('')}</span></button>`;
  p.content.innerHTML=`<div class="empty"><h2>사용률 TOP 100</h2><p>기본 폼 기준의 라이브 인덱스입니다. 메가진화 폼은 해당 포켓몬 아래에 묶어 표시합니다.</p><div class="home-list">${ranked.map(m=>{const megas=app.mons.filter(x=>x.parent===m.parent&&x.kind==='Mega');return `<div class="rank-group">${row(m)}${megas.map(x=>`<button class="mega-child" type="button" data-slug="${esc(x.slug)}"><span>ㄴ</span><span><b>${esc(x.ko)}</b><small> · ${esc(x.name)}</small></span></button>`).join('')}</div>`}).join('')}</div></div>`;
  p.content.querySelectorAll('.mega-child').forEach(button=>{const mega=app.mons.find(m=>m.slug===button.dataset.slug);const detail=button.querySelector('span:last-child');if(mega&&detail)detail.insertAdjacentHTML('beforeend',`<br>${mega.types.map(typeChip).join('')}`);});
  p.content.querySelectorAll('button').forEach(b=>b.onclick=()=>openMon(i,app.mons.find(m=>m.slug===b.dataset.slug),true));
  if(push) saveUrl();
}
async function loadPoke(kind,name){
  const key=`${kind}:${name}`; if(app.info.has(key)) return app.info.get(key);
  const manual=kind==='item'&&ITEM_KO[name];
  const promise=fetch(`https://pokeapi.co/api/v2/${kind}/${slug(name)}`).then(r=>r.ok?r.json():null).then(data=>{
    if(!data) return {ko:manual||name,type:null};
    const ko=data.names?.find(n=>n.language?.name==='ko')?.name||manual||name;
    return {ko,type:data.type?.name ? data.type.name[0].toUpperCase()+data.type.name.slice(1) : null};
  }).catch(()=>({ko:manual||name,type:null}));
  app.info.set(key,promise); return promise;
}
async function hydrate(mon){
  if(mon.hydrated) return;
  try{
    const u=`${API}/battle/Singles/${encodeURIComponent(mon.name)}?season=${encodeURIComponent(app.season)}`;
    const r=await fetch(u); if(!r.ok) throw Error(`${r.status}`);
    const data=await r.json(); const part=battlePart(data.battleSummary||data);
    mon.rows=part.rows||data.rows||[];
    if(!mon.rows.length) throw Error('empty');
  }catch(err){ mon.liveError=true; mon.rows=mon.fallbackRows; }
  const moves=category(mon,'move').slice(0,10), items=category(mon,'held_item').slice(0,5);
  await Promise.all([...moves.map(x=>loadPoke('move',x.name).then(v=>{mon.translate.set(x.name,v.ko);mon.moveTypes.set(x.name,v.type);})),...items.map(x=>loadPoke('item',x.name).then(v=>mon.translate.set(x.name,v.ko)))]);
  mon.hydrated=true;
}
async function openMon(i,mon,push=false){
  if(!mon) return; const p=panes[i], token=++p.seq; app.active=i;p.mon=mon;setSearchLabel(p,mon);p.suggestions.innerHTML='';
  p.content.innerHTML='<div class="empty"><h2>불러오는 중…</h2><p>이 포켓몬의 최신 싱글 배틀 데이터를 API에서 요청하고 있습니다.</p></div>';
  if(push) saveUrl();
  await hydrate(mon); if(token!==p.seq) return; draw(i);
}
function defense(types){
  const out={4:[],2:[],1:[],.5:[],.25:[],0:[]};
  TYPES.forEach(att=>{const v=types.reduce((n,def)=>n*(EFFECT[att]?.[def]??1),1); (out[v]||out[1]).push(att);});return out;
}
function matchup(types){
  const d=defense(types); const line=(n,cls,label)=>`<div class="matchrow ${cls}"><b>${label}</b><div>${(d[n]||[]).map(typeChip).join('')||'<small>없음</small>'}</div></div>`;
  return line(4,'danger','4배 약점')+line(2,'danger','2배 약점')+line(1,'','1배')+line(.5,'resist','½배')+line(.25,'resist','¼배')+line(0,'immune','무효');
}
function usageRows(mon,cat,limit,type=false){
  const rows=category(mon,cat).slice(0,limit);
  return rows.length?rows.map(x=>`<div class="usage-row"><span class="usage-rank">${x.rank}</span><b>${esc(mon.translate.get(x.name)||x.name)}</b>${type&&mon.moveTypes.get(x.name)?typeChip(mon.moveTypes.get(x.name)):''}<span>${esc(x.percentage||'')}</span></div>`).join(''):'<small>현재 공개된 사용 데이터가 없습니다.</small>';
}
function attackMatchup(mon){
  const moves=category(mon,'move').slice(0,10);
  if(!moves.length) return '<small>현재 공개된 기술 통계가 없습니다.</small>';
  return `<div class="attack-grid">${moves.map(row=>{const type=mon.moveTypes.get(row.name), targets=type?TYPES.filter(def=>(EFFECT[type]?.[def]??1)>=2):[];return `<article class="attack-card"><div><b>${esc(mon.translate.get(row.name)||row.name)}</b>${type?typeChip(type):'<span class="type">타입 조회 중</span>'}</div><small>2배 이상 유효</small><div class="attack-targets">${targets.map(typeChip).join('')||'<small>없음</small>'}</div></article>`;}).join('')}</div>`;
}
function natureLabel(row){ if(!row?.name) return '성격 데이터 없음'; const plus=STAT_KO[row.stat_up]||row.stat_up||'', minus=STAT_KO[row.stat_down]||row.stat_down||''; return `${NATURE_KO[row.name]||row.name}${plus?` (${minus}↓ ${plus}↑)`:''}`; }
function megaForItem(mon,item){
  if(mon.kind==='Mega'||!item?.name) return mon.kind==='Mega'?mon:null;
  const root=slug(item.name).replace(/(nite|ite)(-[xy])?$/,'');
  let candidates=app.mons.filter(x=>x.parent===mon.parent&&x.kind==='Mega');
  if(/\sX$/i.test(item.name)) candidates=candidates.filter(x=>/ X$/i.test(x.name));
  if(/\sY$/i.test(item.name)) candidates=candidates.filter(x=>/ Y$/i.test(x.name));
  return candidates.find(x=>slug(x.parent).includes(root)||root.includes(slug(x.parent)))||null;
}
function sample(mon){
  const natures=category(mon,'stat_alignment').slice(0,5), efforts=category(mon,'stat_points').slice(0,5), items=category(mon,'held_item').slice(0,5), moves=category(mon,'move').slice(0,4);
  const statKeys=[['HP','hp'],['공격','attack'],['방어','defense'],['특공','sp_attack'],['특방','sp_defense'],['스피드','speed']];
  const effortText=e=>e?`HP ${e.hp_points??0} / 공 ${e.attack_points??0} / 방 ${e.defense_points??0} / 특공 ${e.sp_atk_points??0} / 특방 ${e.sp_def_points??0} / 스 ${e.speed_points??0}`:'노력치 데이터 없음';
  const cards=Array.from({length:5},(_,i)=>{
    const nature=natures[i]||natures[0], effort=efforts[i]||efforts[0], item=items[i]||items[0], subject=megaForItem(mon,item)||mon;
    const final={...subject.stats};
    if(effort){final.hp+=effort.hp_points||0;final.attack+=effort.attack_points||0;final.defense+=effort.defense_points||0;final.sp_attack+=effort.sp_atk_points||0;final.sp_defense+=effort.sp_def_points||0;final.speed+=effort.speed_points||0;}
    const up={Attack:'attack',Defense:'defense','Sp. Atk':'sp_attack','Sp. Def':'sp_defense',Speed:'speed'}[nature?.stat_up];
    const down={Attack:'attack',Defense:'defense','Sp. Atk':'sp_attack','Sp. Def':'sp_defense',Speed:'speed'}[nature?.stat_down];
    if(up) final[up]=Math.floor(final[up]*1.1); if(down) final[down]=Math.floor(final[down]*.9);
    const statBars=statKeys.map(([label,key])=>`<div><span>${label}</span><i style="width:${Math.min(100,final[key]/2)}%"></i><b>${final[key]}</b></div>`).join('');
    return `<article class="sample-card"><h4>${esc(subject.ko)}${subject!==mon?' <small>(메가진화)</small>':''}<small> 조합 ${i+1}</small></h4>${subject.types.map(typeChip).join('')}<p><b>${esc(natureLabel(nature))}</b> · ${esc(item?mon.translate.get(item.name)||item.name:'-')}</p><small>${esc(effortText(effort))}</small><div class="sample-stats">${statBars}</div><div class="sample-moves">${moves.map(x=>esc(mon.translate.get(x.name)||x.name)).join(' · ')||'기술 데이터 없음'}</div></article>`;
  }).join('');
  return `<section class="detail-samples"><h3>대표 실전 샘플</h3><p class="sample-note">성격·노력치·도구의 개별 채용률을 조합한 참고용 5개 예시입니다.</p><div class="sample-grid">${cards}</div></section>`;
}
function speedRanking(mon){
  const list=[...app.mons].sort((a,b)=>(b.stats.speed||0)-(a.stats.speed||0)), speed=mon.stats.speed;
  return `<section class="card"><h3>스피드 순위 · ${speed}</h3><div class="speedlist">${list.map(x=>`<div class="${x===mon?'current':''}">${esc(x.ko)}<span>${x.stats.speed}</span></div>`).join('')}</div></section>`;
}
function centerSpeedRanking(p){
  requestAnimationFrame(()=>{const list=p.content.querySelector('.speedlist'), current=list?.querySelector('.current');if(list&&current) list.scrollTop=current.offsetTop-(list.clientHeight-current.offsetHeight)/2;});
}
function draw(i){
  const p=panes[i], m=p.mon; if(!m)return; const s=m.stats, total=Object.values(s).reduce((a,b)=>a+b,0), rawTotal=rawBaseTotal(m), r=rank(m);
  const statRows=[['HP','hp'],['공격','attack'],['방어','defense'],['특수공격','sp_attack'],['특수방어','sp_defense'],['스피드','speed']].map(([label,k])=>`<div class="stat"><span>${label}</span><div class="bar"><i style="width:${Math.min(100,s[k]/2)}%"></i></div><b>${s[k]}</b></div>`).join('');
  const attacks=category(m,'move').slice(0,10).map(x=>monAttack(m,x)).join('')||'<small>공개된 기술 통계가 없습니다.</small>';
  const parentText=m.parent!==m.name ? `기반: ${koreanFor(m.parent)} · ` : '';
  const liveText=m.liveError ? '이 폼의 개별 API 응답이 없어 인덱스 요약값을 표시합니다.' : '현재 시즌 싱글 데이터';
  const megas=m.kind!=='Mega'?app.mons.filter(x=>x.parent===m.parent&&x.kind==='Mega'):[];
  p.content.innerHTML=`<article class="hero"><img class="sprite" src="${asset(m.image)}" alt="${esc(m.ko)}"><div><h2>${esc(m.ko)}</h2><small>${esc(m.name)} · ${esc(parentText)}사용률 ${r===9999?'-':r+'위'}</small><p>${m.types.map(typeChip).join(' ')}</p>${megas.length?`<div class="mega-links">${megas.map(x=>`<button class="mega-link" type="button" data-slug="${esc(x.slug)}">✦ ${esc(x.ko)} 보기</button>`).join('')}</div>`:''}<small>${liveText}</small></div></article><div class="grid"><section class="card"><h3>Champions 기본 능력치 · 합계 ${total}</h3>${statRows}<p class="stat-note">참고 · 원본 종족값 합계 ${rawTotal}</p></section>${speedRanking(m)}<section class="card"><h3>방어 상성</h3><div class="matchup">${matchup(m.types)}</div></section><section class="card"><h3>공격 상성 · 채용 기술 TOP 10</h3>${attackMatchup(m)}</section><section class="card"><h3>채용 기술 TOP 10</h3>${attacks}</section><section class="card"><h3>도구 채용률 TOP 5</h3>${usageRows(m,'held_item',5)}</section>${speedCard(m)}${sample(m)}</div>`;
  p.content.querySelectorAll('.mega-link').forEach(b=>b.onclick=()=>openMon(i,app.mons.find(x=>x.slug===b.dataset.slug),true));
  centerSpeedRanking(p); wireSpeed(p,m);
}
function monAttack(m,row){ const t=m.moveTypes.get(row.name); return `<div class="usage-row move-row"><span class="usage-rank">${row.rank}</span><b>${esc(m.translate.get(row.name)||row.name)}</b>${t?typeChip(t):'<span class="type">타입 조회 중</span>'}<span>${esc(row.percentage||'')}</span></div>`; }
function speedCard(m){ return `<section class="card speedcalc"><h3>스피드 계산기</h3><div class="speed-range"><b class="speed-min">-</b><div class="speedbar"><i class="speedmarker"></i><strong class="speed-current">-</strong></div><b class="speed-max">-</b></div><div class="speed-control"><label>성격보정 <span class="nature-buttons"><button class="nature-button" data-nature="0.9">−</button><button class="nature-button selected" data-nature="1">기본</button><button class="nature-button" data-nature="1.1">＋</button></span></label></div><div class="speed-control"><label>스피드 노력치 <input class="speedpoints-range" type="range" min="0" max="32" value="0"><input class="speedpoints-input" type="number" min="0" max="32" value="0"></label></div><div class="battle-speed"><label class="scarf-control"><input class="scarf" type="checkbox"> 구애스카프 ×1.5</label><label>스피드 랭크 <input class="rank-range" type="range" min="-6" max="6" step="1" value="0"><output>0</output></label></div><p class="active-speed">실전 최종 스피드 <strong>-</strong></p></section>`; }
function wireSpeed(p,m){
  const root=p.content.querySelector('.speedcalc'), base=m.stats.speed; let nature=1, points=0;
  const calc=()=>{const min=Math.floor((base+20)*.9), max=Math.floor((base+20+32)*1.1), normal=Math.floor((base+20+points)*nature);const scarf=root.querySelector('.scarf').checked?1.5:1;const stage=+root.querySelector('.rank-range').value; const stageMult=stage>=0?(2+stage)/2:2/(2-stage);const final=Math.floor(normal*scarf*stageMult);const pos=Math.max(0,Math.min(100,(normal-min)/(max-min)*100)); root.querySelector('.speed-min').textContent=min;root.querySelector('.speed-max').textContent=max;root.querySelector('.speedmarker').style.width=`${pos}%`;const marker=root.querySelector('.speed-current');marker.textContent=normal;marker.style.left=`${pos}%`;marker.style.transform=`translateX(${pos<8?'0':pos>92?'-100%':'-50%'})`;root.querySelector('output').textContent=stage>0?`+${stage}`:stage;root.querySelector('.active-speed strong').textContent=final;};
  root.querySelectorAll('.nature-button').forEach(b=>b.onclick=()=>{nature=+b.dataset.nature;root.querySelectorAll('.nature-button').forEach(x=>x.classList.toggle('selected',x===b));calc();});
  const range=root.querySelector('.speedpoints-range'), input=root.querySelector('.speedpoints-input'); range.oninput=()=>{points=+range.value;input.value=points;calc();}; input.oninput=()=>{points=Math.max(0,Math.min(32,+input.value||0));range.value=points;input.value=points;calc();};root.querySelector('.scarf').onchange=calc;root.querySelector('.rank-range').oninput=calc;calc();
}
async function boot(){
  try{
    const [index,species,names]=await Promise.all([fetch(`${API}/index`).then(r=>{if(!r.ok)throw Error(r.status);return r.json();}),fetch(`${POKE_RAW}/pokemon_species.csv`).then(r=>r.text()),fetch(`${POKE_RAW}/pokemon_species_names.csv`).then(r=>r.text())]);
    const identifierById=new Map(parseCsv(species).slice(1).map(r=>[r[0],r[1]]));
    parseCsv(names).slice(1).forEach(r=>{if(r[1]==='3'){ const identifier=identifierById.get(r[0]); if(identifier) app.speciesKo.set(identifier,r[2]); }});
    for(const [k,v] of [...app.speciesKo]) app.speciesKo.set(compact(k),v);
    app.season=index.defaultSeason||'Current'; app.mons=normalise(index); makePane(0);makePane(1);renderMascots();
    const q=new URLSearchParams(location.search); const left=app.mons.find(m=>m.slug===q.get('left')),right=app.mons.find(m=>m.slug===q.get('right')); left?openMon(0,left):home(0);right?openMon(1,right):home(1);
    document.querySelector('#stamp').textContent=`${app.season} · ${app.mons.length}개 폼 · live`;
    addEventListener('popstate',()=>{const qs=new URLSearchParams(location.search);const a=app.mons.find(m=>m.slug===qs.get('left')),b=app.mons.find(m=>m.slug===qs.get('right'));a?openMon(0,a):home(0);b?openMon(1,b):home(1);});
  }catch(err){ document.querySelector('#stamp').textContent='데이터 연결 실패'; document.querySelector('#panes').innerHTML=`<section class="pane"><div class="empty"><h2>데이터를 불러오지 못했습니다</h2><p>Champions Battle Data 또는 PokéAPI 연결을 확인한 뒤 새로고침해 주세요.</p></div></section>`; console.error(err); }
}
boot();
