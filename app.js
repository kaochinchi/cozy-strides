const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-panel');
const triggers=[...document.querySelectorAll('.nav-trigger')];
function closeSubmenus(except){triggers.forEach(t=>{if(t!==except){t.setAttribute('aria-expanded','false');t.closest('.nav-item').classList.remove('is-open');}});}
function closeNavigation(){closeSubmenus();nav.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','展開選單');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'收合選單':'展開選單');nav.classList.toggle('is-open',open);if(!open)closeSubmenus();});
triggers.forEach(t=>t.addEventListener('click',()=>{const open=t.getAttribute('aria-expanded')!=='true';closeSubmenus(t);t.setAttribute('aria-expanded',String(open));t.closest('.nav-item').classList.toggle('is-open',open);}));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNavigation));
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeNavigation();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=triggers.find(t=>t.getAttribute('aria-expanded')==='true');if(active){closeSubmenus();active.focus();}else if(nav.classList.contains('is-open')){closeNavigation();menuToggle.focus();}}});
const dialog=document.querySelector('#productDialog');
const products={brunch:{title:'暖步早午餐',description:'示範輕食品項，規劃作為跑後用餐選擇。照片僅呈現餐飲氛圍，實際餐點內容、份量與食材尚待確認。',price:'模擬價格 NT$180'},coffee:{title:'小屋咖啡時光',description:'示範飲品價格帶為 NT$80–150，咖啡品項暫以 NT$100 起呈現。冷熱選擇、容量與正式品項將於確認後更新。',price:'模擬價格 NT$100 起'},combo:{title:'餐飲搭配提案',description:'規劃主餐加 NT$60 搭配指定飲品，其他飲品可補差額。適用品項與正式搭配規則尚待確認。',price:'主餐價格＋NT$60'}};
document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>{const p=products[b.dataset.product];document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-description').textContent=p.description;document.querySelector('#dialog-price').textContent=p.price;dialog.showModal();document.body.classList.add('dialog-open');}));
dialog.querySelectorAll('.dialog-close,.dialog-done').forEach(b=>b.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
