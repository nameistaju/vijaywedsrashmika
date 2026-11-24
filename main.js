(()=>{
// ---- CONFIG ----
const WEDDING=new Date('2026-10-26T10:00:00+05:30');
const YT_ID='';          // paste the YouTube video id here
const MUSIC_SRC='assets/music.mp3';      // background wedding music
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
document.body.classList.add('rb-lock');
$$('.km-hero__name').forEach(n=>$$('.km-hero__char',n).forEach((c,i)=>c.style.setProperty('--i',i)));
const hv=$('.km-hero__video video');
const entry=$('.km-entry');
function open(){entry.classList.add('km-entry--closing');document.body.classList.remove('rb-lock');
 document.body.classList.add('rb-go');hv&&hv.play().catch(()=>{});setTimeout(()=>entry.remove(),950);
 if(audio)audio.play().then(()=>setBell(true)).catch(()=>{});}
entry.addEventListener('click',open);
// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in','is-revealed');io.unobserve(e.target)}}),{threshold:.15});
$$('.km-events__stop,.km-gallery__cell').forEach(el=>io.observe(el));
// footprints appear as the path scrolls into view
const feet=$$('.km-events__foot'),stage=$('.km-events__stage');
function walk(){const r=stage.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.75-r.top)/r.height));
 feet.forEach((f,i)=>f.classList.toggle('is-in',i/feet.length<=p));}
addEventListener('scroll',walk,{passive:true});walk();
// countdown
const vals=Object.fromEntries($$('.km-countdown__value').map(v=>[v.dataset.u,v]));
function tick(){let d=WEDDING-Date.now();const done=d<=0;
 $('.km-countdown__units').hidden=done;$('.km-countdown__arrived').hidden=!done;if(done)return;
 const s=d/1000|0,pad=n=>String(n).padStart(2,'0');
 vals.d.textContent=pad(s/86400|0);vals.h.textContent=pad(s%86400/3600|0);vals.m.textContent=pad(s%3600/60|0);vals.s.textContent=pad(s%60);}
tick();setInterval(tick,1000);
// RSVP
const ch=$$('.km-rsvp__choice'),sub=$('.km-rsvp__submit');
ch.forEach(b=>b.addEventListener('click',()=>{ch.forEach(x=>{x.classList.toggle('is-on',x===b);x.setAttribute('aria-pressed',x===b)});sub.disabled=false}));
$('.km-rsvp form').addEventListener('submit',e=>{e.preventDefault();sub.textContent='Thank you';sub.disabled=true});
// video
$('.rb-yt').addEventListener('click',e=>{if(!YT_ID)return alert('Set YT_ID in main.js');
 const f=document.createElement('iframe');f.src='https://www.youtube.com/embed/'+YT_ID+'?autoplay=1&rel=0';f.allow='autoplay;encrypted-media;fullscreen';e.currentTarget.replaceWith(f)});
// music bell
const bell=$('.km-bell'),audio=MUSIC_SRC?Object.assign(new Audio(),{src:MUSIC_SRC,loop:true,preload:'metadata'}):null;
function setBell(on){bell.classList.toggle('km-bell--playing',on);bell.setAttribute('aria-pressed',on)}
bell.addEventListener('click',()=>{if(!audio)return;audio.paused?audio.play().then(()=>setBell(true)):(audio.pause(),setBell(false))});
})();