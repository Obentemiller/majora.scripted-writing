/* Majorama.redação — lógica do projeto. Layout e ajuda vêm do kit (vendor/majorama-ui). */
const CHAVE='majorama.redacao';
const N=ETAPAS.length;
const $=id=>document.getElementById(id);
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
const cor=(e,l)=>`hsl(${e.cor} 60% ${l}%)`;

let textos=Array(N).fill('');   // '' = etapa não concluída
let rasc={};                    // rascunhos por etapa
let edit=null;                  // índice de etapa concluída que está sendo reeditada
let foco=false;                 // pede foco no editor após renderizar

try{const s=JSON.parse(localStorage.getItem(CHAVE)||'null');
  if(s&&Array.isArray(s.t)&&s.t.length===N){textos=s.t.map(x=>String(x||''));rasc=s.r&&typeof s.r==='object'?s.r:{};}}catch(_){}
const salvar=()=>{try{localStorage.setItem(CHAVE,JSON.stringify({t:textos,r:rasc}));}catch(_){}};

const atual=()=>{const i=textos.findIndex(t=>t==='');return i<0?N:i;};
const ativo=()=>edit!==null?edit:atual();
const token=(e,fim)=>'@'+e.id+(fim?'F':'I')+'@';
const palavras=t=>(t.trim().match(/\S+/g)||[]).length;
const status=(m,cls)=>{const s=$('status-msg');s.textContent=m;s.className=cls||'';};

/* ---------- texto (palco) ---------- */
function editor(i){
  const e=ETAPAS[i],box=el('div','ed');
  box.style.setProperty('--c',cor(e,62));box.style.setProperty('--cb',cor(e,16));
  box.appendChild(el('div','ed-nome',e.nome));
  const ta=el('textarea','ed-ta');
  ta.value=edit!==null?textos[i]:(rasc[i]||'');
  ta.setAttribute('aria-label','Escreva: '+e.nome);
  ta.placeholder=e.espera;
  ta.rows=3;
  const cont=el('div','ed-info');
  const atualiza=()=>{ta.style.height='auto';ta.style.height=Math.max(ta.scrollHeight,72)+'px';
    cont.textContent=palavras(ta.value)+' palavras · Ctrl+Enter conclui a etapa'+(edit!==null?' · Esc cancela':'');};
  ta.addEventListener('input',()=>{if(edit===null){rasc[i]=ta.value;salvar();}atualiza();});
  ta.addEventListener('keydown',ev=>{
    if(ev.key==='Enter'&&(ev.ctrlKey||ev.metaKey)){ev.preventDefault();concluir();}
    else if(ev.key==='Escape'&&edit!==null){ev.preventDefault();edit=null;foco=true;render();}
  });
  box.append(ta,cont);
  box._ta=ta;box._atualiza=atualiza;
  return box;
}

function renderTexto(){
  const raiz=$('texto');raiz.textContent='';
  const a=ativo();let ed=null;
  PARAGRAFOS.forEach((titulo,p)=>{
    const par=el('section','par');
    par.appendChild(el('h2','par-t',titulo));
    const corpo=el('div','par-corpo');
    ETAPAS.forEach((e,i)=>{
      if(e.p!==p)return;
      if(i===a&&a<N){ed=editor(i);corpo.appendChild(ed);}
      else if(textos[i]!==''){
        const b=el('button','blk');b.type='button';
        b.style.setProperty('--c',cor(e,62));b.style.setProperty('--cb',cor(e,20));
        b.title=e.nome+' ('+token(e)+') — clique para editar';
        b.appendChild(el('span','blk-tag',e.id));
        b.appendChild(document.createTextNode(textos[i]+' '));
        b.addEventListener('click',()=>{edit=i;foco=true;render();});
        corpo.appendChild(b);
      }
    });
    if(corpo.childNodes.length)par.appendChild(corpo);
    if(corpo.childNodes.length||ETAPAS.some((e,i)=>e.p===p&&i===a))raiz.appendChild(par);
  });
  if(atual()===N&&edit===null){
    const f=el('div','fim','Estrutura completa. Toque em Prompt para gerar a correção, ou clique em qualquer bloco para ajustar.');
    raiz.appendChild(f);
  }
  if(ed){ed._atualiza();if(foco){ed._ta.focus();ed.scrollIntoView({block:'center',behavior:'smooth'});}}
  foco=false;
}

/* ---------- painel: estrutura + guia ---------- */
function renderLista(){
  const raiz=$('editor-opts');raiz.textContent='';
  const feitas=textos.filter(t=>t!=='').length,a=ativo();
  const prog=el('div','prog');
  const barra=el('div','prog-barra');const enche=el('div','prog-enche');
  enche.style.width=Math.round(feitas/N*100)+'%';barra.appendChild(enche);
  prog.append(el('span','prog-n',feitas+' de '+N+' etapas'),barra);
  raiz.appendChild(prog);
  PARAGRAFOS.forEach((titulo,p)=>{
    raiz.appendChild(el('div','grp',titulo));
    ETAPAS.forEach((e,i)=>{
      if(e.p!==p)return;
      const feita=textos[i]!=='',eh=i===a;
      const b=el('button','et'+(feita?' feita':'')+(eh?' atual':''));
      b.type='button';b.style.setProperty('--c',cor(e,62));
      b.appendChild(el('span','et-m',feita?'✓':(eh?'●':'○')));
      b.appendChild(el('span','et-n',e.nome));
      b.disabled=!feita&&!eh;
      if(eh)b.setAttribute('aria-current','step');
      b.addEventListener('click',()=>{if(feita)edit=i;foco=true;render();});
      raiz.appendChild(b);
    });
  });
}

function renderGuia(){
  const g=$('console-output');g.textContent='';
  const a=ativo();
  if(a>=N){g.appendChild(el('div','ok','Todas as etapas foram escritas. Gere o prompt e cole em qualquer LLM.'));return;}
  const e=ETAPAS[a];
  const t=el('div','g-titulo',e.nome);t.style.color=cor(e,70);g.appendChild(t);
  g.appendChild(el('div','g-k','O que se espera'));g.appendChild(el('div','g-v',e.espera));
  g.appendChild(el('div','g-k','Objetivo'));g.appendChild(el('div','g-v',e.objetivo));
  if(e.conectivos){g.appendChild(el('div','g-k','Conectivos possíveis'));g.appendChild(el('div','g-v',e.conectivos));}
  g.appendChild(el('div','g-k','Exemplo'));g.appendChild(el('div','g-ex',e.ex));
  g.appendChild(el('div','g-k','Marcação automática'));g.appendChild(el('div','g-v',token(e)+' … '+token(e,true)));
}

function render(){renderTexto();renderLista();renderGuia();}

/* ---------- ações ---------- */
function concluir(){
  const a=ativo();
  if(a>=N){status('Todas as etapas já estão concluídas.','ok');return;}
  const ta=document.querySelector('#texto .ed-ta');
  const v=ta?ta.value.trim():'';
  if(!v){status('Escreva o texto da etapa “'+ETAPAS[a].nome+'” antes de concluir.','warn');if(ta)ta.focus();return;}
  textos[a]=v;delete rasc[a];
  const reed=edit!==null;edit=null;salvar();foco=true;render();
  status(reed?'Etapa atualizada.':(atual()<N?'Etapa concluída. Próxima: '+ETAPAS[atual()].nome+'.':'Estrutura completa!'),'ok');
}

function montarPrompt(){
  const L=[];
  L.push('# TAREFA','Você é um corretor de redações dissertativo-argumentativas no padrão ENEM. Corrija a redação abaixo usando EXCLUSIVAMENTE o algoritmo da seção 1 como critério. A redação foi escrita em blocos sequenciais; cada bloco traz o que se espera dele, para servir de limiar da sua correção.','');
  L.push('## 1. ALGORITMO (critério de correção)',ALGORITMO,'');
  L.push('## 2. COMO LER A REDAÇÃO','Cada bloco está delimitado por marcadores de localização: @XXXI@ marca o início e @XXXF@ marca o fim da etapa XXX. Os marcadores não fazem parte do texto do aluno. Os blocos seguem a ordem do algoritmo. Se um bloco estiver como [BLOCO NÃO ESCRITO], considere a etapa ausente.','');
  L.push('## 3. REDAÇÃO DO ALUNO, POR BLOCOS','');
  ETAPAS.forEach((e,i)=>{
    L.push('### Bloco '+(i+1)+' de '+N+' — '+e.nome+' ('+PARAGRAFOS[e.p]+')');
    L.push('Esperado: '+e.espera,'Objetivo: '+e.objetivo);
    L.push(token(e),textos[i]!==''?textos[i]:'[BLOCO NÃO ESCRITO]',token(e,true),'');
  });
  L.push('## 4. O QUE VOCÊ DEVE RETORNAR',
   '1. Para cada bloco, na ordem: veredito (Cumpre / Cumpre em parte / Não cumpre) comparando o texto com “Esperado” e “Objetivo”; cite o trecho que justifica; aponte o que falta; sugira uma reescrita curta só do que for necessário.',
   '2. Coerência global: C1 e C2 anunciadas na tese são retomadas, com as mesmas ideias, nos tópicos frasais do D1 e do D2? Os repertórios são legitimados, pertinentes e produtivos (LEPER PRO)? Há lacunas argumentativas (relação entre repertório e realidade brasileira subentendida)? A leitura é linear entre os blocos?',
   '3. Estimativa de nota por competência do ENEM (0 a 200), deixando claro que é apenas estimativa, e as 3 prioridades de melhoria.',
   '','Regras: não reescreva a redação inteira; não invente trechos que o aluno não escreveu; seja específico e use linguagem direta; responda em português do Brasil.');
  return L.join('\n');
}

function mostrarPrompt(sim){
  $('texto').hidden=sim;$('prompt-view').hidden=!sim;
  if(sim){
    $('prompt-out').value=montarPrompt();
    const f=textos.filter(t=>t==='').length;
    status(f?'Prompt gerado com '+f+' bloco(s) ainda não escrito(s).':'Prompt gerado. Copie e cole no LLM de sua preferência.',f?'warn':'ok');
  }
}

async function copiar(){
  const ta=$('prompt-out');
  try{await navigator.clipboard.writeText(ta.value);status('Prompt copiado.','ok');return;}catch(_){}
  try{ta.focus();ta.select();document.execCommand('copy');status('Prompt copiado.','ok');}
  catch(_){status('Não foi possível copiar. Selecione o texto e copie manualmente.','warn');}
}

$('acaoBtn').addEventListener('click',()=>{mostrarPrompt(false);concluir();});
$('promptBtn').addEventListener('click',()=>mostrarPrompt(true));
$('voltarBtn').addEventListener('click',()=>{mostrarPrompt(false);foco=true;render();});
$('copiarBtn').addEventListener('click',copiar);
$('limparBtn').addEventListener('click',()=>{
  if(!confirm('Apagar toda a redação salva neste navegador?'))return;
  textos=Array(N).fill('');rasc={};edit=null;salvar();mostrarPrompt(false);render();status('Redação apagada. Recomece pela primeira etapa.');
});

/* ---------- kit: layout + ajuda ---------- */
const ui=MajoramaUI.iniciar({passos:[
  {alvo:'#brand',titulo:'Bem-vindo ao Majorama.redação',texto:'Você escreve a redação <b>uma etapa por vez</b>, seguindo uma estrutura fixa. No fim, o app monta um prompt para qualquer LLM corrigir.'},
  {alvo:'#terminal-container',titulo:'O texto',texto:'Escreva na caixa colorida da etapa atual. As etapas concluídas viram blocos coloridos, lidos em sequência como a redação final. <b>Clique em um bloco</b> para editá-lo.'},
  {alvo:'#acaoBtn',titulo:'Concluir a etapa',texto:'Atalho no teclado: <b>Ctrl+Enter</b> (⌘+Enter no Mac). O app já sabe em qual etapa você está e coloca os marcadores de início e fim sozinho.'},
  {alvo:'#editor-opts',titulo:'Estrutura',texto:'Mostra o que já foi feito (✓), a etapa atual (●) e o que falta (○). Toque em uma etapa feita para voltar a ela.',abrir:true},
  {alvo:'#console-output',titulo:'Guia da etapa',texto:'Para cada etapa: o que se espera, o objetivo, conectivos úteis e um exemplo.',abrir:true},
  {alvo:'#promptBtn',titulo:'Prompt de correção',texto:'Reúne o algoritmo, sua redação separada em blocos e o que se espera de cada um. Copie e cole em qualquer LLM.'},
  {alvo:'#bY',titulo:'Painel lateral',texto:'Abre e fecha o painel para dar mais espaço ao texto. <b>Arraste o divisor</b> para redimensionar.'},
  {alvo:null,titulo:'Pronto! 🏁',texto:'Para rever este tutorial, toque em <b>? Ajuda</b>.',link:['Abrir o manual','https://github.com/Obentemiller/majorama-redacao/blob/main/manual.md']},
]});
window.UI=ui;

render();
status('Pronto. Primeira vez? Toque em “? Ajuda” para o tutorial.');
