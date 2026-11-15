(function(){
var d=document,b=d.body;
var rok=d.getElementById('rok');if(rok)rok.textContent=new Date().getFullYear();
/* menu */
var bu=d.getElementById('burger'),pa=d.getElementById('panel');
function zamknij(){b.classList.remove('menu-otw');bu.setAttribute('aria-expanded','false')}
bu.addEventListener('click',function(){var o=b.classList.toggle('menu-otw');bu.setAttribute('aria-expanded',o?'true':'false')});
pa.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
/* aktywna pozycja menu */
var linki=[].slice.call(d.querySelectorAll('.nav a,.panel a:not(.btn)'));
var sek=['start','uslugi','magazyn','trasa','kontakt'].map(function(i){return d.getElementById(i)});
function akt(){var y=scrollY+innerHeight*.35,cur='start';sek.forEach(function(s){if(s&&s.offsetTop<=y)cur=s.id});
 linki.forEach(function(a){var on=a.getAttribute('href')==='#'+cur;a.classList.toggle('akt',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
addEventListener('scroll',akt,{passive:true});akt();
/* pasek mobilny po minięciu przycisku hero */
var mob=d.getElementById('mob'),cta=d.querySelector('.hero-cta');
if('IntersectionObserver' in window){new IntersectionObserver(function(e){mob.classList.toggle('widac',!e[0].isIntersecting&&e[0].boundingClientRect.top<0)}).observe(cta)}
/* pas kart */
var pas=d.getElementById('pas'),pp=d.getElementById('pPrev'),pn=d.getElementById('pNext');
function st(){var m=pas.scrollWidth-pas.clientWidth-2;pp.disabled=pas.scrollLeft<2;pn.disabled=pas.scrollLeft>=m}
function krok(){var k=pas.querySelector('.karta');return k.getBoundingClientRect().width+parseFloat(getComputedStyle(pas).columnGap||20)}
pp.addEventListener('click',function(){pas.scrollBy({left:-krok(),behavior:'smooth'})});
pn.addEventListener('click',function(){pas.scrollBy({left:krok(),behavior:'smooth'})});
pas.addEventListener('scroll',st,{passive:true});addEventListener('resize',st);st();
var dn=false,sx=0,sl=0,mv=false;
pas.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;mv=false;sx=e.clientX;sl=pas.scrollLeft});
addEventListener('pointermove',function(e){if(!dn)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){mv=true;pas.classList.add('ciagnie')}pas.scrollLeft=sl-dx});
addEventListener('pointerup',function(){if(!dn)return;dn=false;pas.classList.remove('ciagnie');if(mv){var k=krok();pas.scrollTo({left:Math.round(pas.scrollLeft/k)*k,behavior:'smooth'})}});
pas.addEventListener('click',function(e){if(mv){e.preventDefault();e.stopPropagation();mv=false}},true);
pas.addEventListener('dragstart',function(e){e.preventDefault()});
/* lightbox */
var lb=d.getElementById('lb'),li=lb.querySelector('img'),lt=lb.querySelector('.lb-t'),lc=lb.querySelector('.lb-c');
var el=[].slice.call(d.querySelectorAll('[data-lb]')),ix=0,ost=null;
function pokaz(i){ix=(i+el.length)%el.length;var e=el[ix],m=e.querySelector('img');li.src=m.currentSrc||m.src;li.alt=m.alt;lt.textContent=e.dataset.pod||'';lc.textContent=(ix+1)+' / '+el.length;
 var duzy=e.dataset.lb;var t=new Image();t.onload=function(){if(el[ix]===e)li.src=duzy};t.src=duzy}
el.forEach(function(e,i){e.addEventListener('click',function(){ost=e;pokaz(i);lb.classList.add('otw');b.style.overflow='hidden';lb.querySelector('.lb-x').focus()})});
function lzam(){lb.classList.remove('otw');b.style.overflow='';if(ost)ost.focus()}
lb.querySelector('.lb-x').addEventListener('click',lzam);
lb.querySelector('.lb-p').addEventListener('click',function(){pokaz(ix-1)});
lb.querySelector('.lb-n').addEventListener('click',function(){pokaz(ix+1)});
lb.addEventListener('click',function(e){if(e.target===lb)lzam()});
addEventListener('keydown',function(e){if(!lb.classList.contains('otw'))return;if(e.key==='Escape')lzam();if(e.key==='ArrowLeft')pokaz(ix-1);if(e.key==='ArrowRight')pokaz(ix+1)});
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)pokaz(ix+(dx<0?1:-1))});
/* przycisk "Zapytaj o magazyn" ustawia rodzaj */
[].forEach.call(d.querySelectorAll('[data-rodzaj]'),function(a){a.addEventListener('click',function(){var r=d.querySelector('input[name=rodzaj][value="'+a.dataset.rodzaj+'"]');if(r)r.checked=true})});
/* formularz pokazowy */
d.getElementById('form').addEventListener('submit',function(e){e.preventDefault();d.getElementById('form-info').hidden=false});
})();
