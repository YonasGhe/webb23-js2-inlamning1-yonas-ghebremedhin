const e=["rock","paper","scissors"],t=document.querySelector("form");t.addEventListener("submit",function(e){e.preventDefault(),r.innerText=o.value,t.reset()});const o=document.querySelector("input"),r=document.querySelector("h4"),n=document.querySelector("#rock"),c=document.querySelector("#paper"),s=document.querySelector("#scissors"),i=document.querySelector("#result"),u=document.querySelector("#playerScore"),l=document.querySelector("#computerScore");let a=0,d=0;function p(t){let o=function(){let t=Math.floor(Math.random()*e.length);return e[t]}(),n=t===o?"It's a tie!":"rock"===t&&"scissors"===o||"paper"===t&&"rock"===o||"scissors"===t&&"paper"===o?"You win!":"You lose!";"You win!"===n?a++:"You lose!"===n&&d++,i.innerText=`You chose ${t}. The computer chose ${o}. ${n}`,u.innerText=`Player Score: ${a}`,l.innerText=`Computer Score: ${d}`,1===d&&(S({name:r.innerText,score:a}),setTimeout(()=>{h()},100))}n.addEventListener("click",()=>p("rock")),c.addEventListener("click",()=>p("paper")),s.addEventListener("click",()=>p("scissors"));const m=document.querySelector("#restart");function h(){a=0,d=0,i.innerText="",u.innerText="Player score: 0",l.innerText="Computer score:  0",r.innerText="",t.reset()}async function y(){let e=await fetch("http://localhost:3001/highscore"),t=await e.json();!function(e){let t=document.querySelector("#score-list");for(let o of(t.innerHTML=" ",e)){let e=document.createElement("li");e.textContent=`${o.name}: ${o.score}`,t.appendChild(e)}}(t)}async function S(e){console.log("New post",e);let t={method:"POST",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify(e)},o=await fetch("http://localhost:3001/highscore",t),r=await o.json();return r}m.addEventListener("click",h),y();//# sourceMappingURL=index.c312c809.js.map

//# sourceMappingURL=index.c312c809.js.map