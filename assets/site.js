/* Tanan Shosai — small enhancements; every page works without this file */
(function(){
  var $=function(id){return document.getElementById(id)};

  // filter chips (งานแปล: by group, งานเขียน: by card)
  document.querySelectorAll(".filters").forEach(function(box){
    box.addEventListener("click",function(e){
      var b=e.target.closest(".chip");if(!b)return;
      box.querySelectorAll(".chip").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
      var f=b.dataset.f,all=f==="ทั้งหมด";
      document.querySelectorAll("#all-works .group").forEach(function(g){g.hidden=!all&&g.dataset.type!==f});
      document.querySelectorAll("#all-posts .pcard").forEach(function(c){c.hidden=!all&&c.dataset.cat!==f});
    });
  });

  // copy e-mail / copy link
  function copy(btn,text,label){
    var done=function(){btn.textContent="คัดลอกแล้ว";btn.classList.add("copied");setTimeout(function(){btn.textContent=label;btn.classList.remove("copied")},2200)};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done,function(){btn.textContent=text})}
    else{btn.textContent=text}
  }
  var cp=$("copy");if(cp)cp.addEventListener("click",function(){copy(cp,$("mail").textContent.trim(),"คัดลอก")});
  document.addEventListener("click",function(e){var b=e.target.closest(".copylink");if(b)copy(b,b.dataset.url,"คัดลอกลิงก์")});

  // reading pencil on story pages
  var bar=$("readbar");
  if(bar){
    var line=$("rb-line"),rb=bar.querySelector(".rb");
    var upd=function(){var max=document.documentElement.scrollHeight-innerHeight;var pr=max>0?Math.min(1,Math.max(0,scrollY/max)):0;line.style.width=(pr*Math.max(0,rb.clientWidth-36))+"px"};
    addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);upd();
  }

  // PWA: no automatic install pop-up — readers can still add the app from the browser menu
  addEventListener("beforeinstallprompt",function(e){e.preventDefault()});

  // PWA: offline reading
  if("serviceWorker" in navigator&&location.protocol==="https:"){
    addEventListener("load",function(){navigator.serviceWorker.register("/sw.js").catch(function(){})});
  }
    // Cloudflare Web Analytics (cookie-free) — only on the real site, not local tests
  if(/(^|\.)tananshosai\.com$/.test(location.hostname)){
    var cf=document.createElement("script");
    cf.type="module";cf.defer=true;
    cf.src="https://static.cloudflareinsights.com/beacon.min.js";
    cf.setAttribute("data-cf-beacon",'{"token": "b1fc85320f8645e1837f0ace6233099d"}');
    document.head.appendChild(cf);
 }
})();
