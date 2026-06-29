let respostas = {};
let pontos = 0;

const perguntas = [
  { q: "Android é baseado em qual sistema?", alternativas: [
    { t: "Linux", correta: true },
    { t: "Windows", correta: false },
    { t: "iOS", correta: false }
  ]},
  { q: "Quem criou o Linux?", alternativas: [
    { t: "Linus Torvalds", correta: true },
    { t: "Bill Gates", correta: false },
    { t: "Steve Jobs", correta: false }
  ]},
  { q: "Sistema da Apple?", alternativas: [
    { t: "iOS", correta: true },
    { t: "Android", correta: false },
    { t: "Windows", correta: false }
  ]},
  { q: "Windows pertence a qual empresa?", alternativas: [
    { t: "Microsoft", correta: true },
    { t: "Google", correta: false },
    { t: "Apple", correta: false }
  ]},
  { q: "Linux é:", alternativas: [
    { t: "Open Source", correta: true },
    { t: "Fechado", correta: false },
    { t: "Pago", correta: false }
  ]}
];

function shuffle(arr){
  return arr.sort(()=>Math.random()-0.5);
}

function montarQuiz(){
  const box=document.getElementById("quizBox");
  box.innerHTML="";

  perguntas.forEach((p,i)=>{
    let div=document.createElement("div");

    div.innerHTML=`<p><b>${p.q}</b></p>`;

    shuffle(p.alternativas).forEach(a=>{
      div.innerHTML+=`
        <button onclick="responder(${i},${a.correta},this)">
          ${a.t}
        </button>
      `;
    });

    box.appendChild(div);
  });
}

function responder(i,correta,btn){
  if(respostas[i]!==undefined) return;

  respostas[i]=correta;

  let botoes=btn.parentElement.querySelectorAll("button");
  botoes.forEach(b=>b.disabled=true);

  if(correta) btn.classList.add("certa");
  else {
    btn.classList.add("errada");
    botoes.forEach(b=>{
      if(b.onclick.toString().includes("true"))
        b.classList.add("certa");
    });
  }
}

function mostrarResultado(){
  pontos=0;
  Object.values(respostas).forEach(v=>{
    if(v===true) pontos++;
  });

  document.getElementById("resultadoQuiz").innerHTML=
  `Você acertou ${pontos}/${perguntas.length}`;
}

window.onload=montarQuiz;
