/* Majorama.redação — lógica. Layout e ajuda vêm do kit (vendor/majorama-ui). */
const CHAVE='majorama.redacao.v2';
const N=ETAPAS.length;
const $=id=>document.getElementById(id);
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};

let S={proj:{},projOk:false,t:Array(N).fill(''),n:0,aberto:true}; // n = etapas de escrita concluídas
let edProj=false,verPrompt=false,foco=-1,campo=null;

try{const s=JSON.parse(localStorage.getItem(CHAVE)||'null');
  if(s&&Array.isArray(s.t)&&s.t.length===N){
    S.t=s.t.map(x=>String(x||''));S.n=Math.min(N,Math.max(0,s.n|0));
    S.proj=s.proj&&typeof s.proj==='object'?s.proj:{};S.projOk=!!s.projOk;S.aberto=s.aberto!==false;}}catch(_){}
const salvar=()=>{try{localStorage.setItem(CHAVE,JSON.stringify(S));}catch(_){}};

const pv=k=>String(S.proj[k]||'').trim();
const projCompleto=()=>PROJ.every(f=>pv(f.k));
const modoProj=()=>!S.projOk||edProj;
const token=(e,f)=>'@'+e.id+(f?'F':'I')+'@';
const status=(m,c)=>{const s=$('status-msg');s.textContent=m;s.className=c||'';};
/* etapa em foco: o bloco onde está o cursor; sem foco, a etapa atual */
const vi=()=>modoProj()?-1:(foco>=0&&foco<=Math.min(S.n,N-1)?foco:Math.min(S.n,N-1));

/* ---------- texto contínuo com blocos grifados ---------- */
function bloco(i){
  const e=ETAPAS[i],b=el('span','blk'+(e.k?' k':''));
  b.style.setProperty('--h',e.cor);
  b.dataset.i=i;b.dataset.id=e.id;b.dataset.ph=e.nome;
  b.textContent=S.t[i];
  b.setAttribute('contenteditable','plaintext-only');
  if(b.contentEditable!=='plaintext-only')b.setAttribute('contenteditable','true');
  b.setAttribute('role','textbox');b.setAttribute('aria-label',e.nome);
  b.addEventListener('focus',()=>{foco=i;painel();});
  b.addEventListener('input',()=>{
    if(b.textContent===''){while(b.firstChild)b.removeChild(b.firstChild);}
    S.t[i]=b.textContent;salvar();});
  b.addEventListener('beforeinput',ev=>{if(ev.inputType==='insertParagraph'||ev.inputType==='insertLineBreak')ev.preventDefault();});
  b.addEventListener('paste',ev=>{ev.preventDefault();
    const tx=((ev.clipboardData&&ev.clipboardData.getData('text/plain'))||'').replace(/\s*\n\s*/g,' ');
    try{document.execCommand('insertText',false,tx);}catch(_){}});
  b.addEventListener('keydown',ev=>teclas(ev,i,b));
  return b;
}

function teclas(ev,i,b){
  if(ev.key==='Enter'){ev.preventDefault();if(ev.ctrlKey||ev.metaKey)concluir();return;}
  if(ev.key!=='ArrowRight'&&ev.key!=='ArrowLeft')return;
  const s=window.getSelection();if(!s||!s.rangeCount||!s.isCollapsed)return;
  const r=document.createRange();r.selectNodeContents(b);
  if(ev.key==='ArrowRight'){r.setStart(s.anchorNode,s.anchorOffset);
    if(r.toString()===''&&i<Math.min(S.n,N-1)){ev.preventDefault();focarBloco(i+1,false);}}
  else{r.setEnd(s.anchorNode,s.anchorOffset);
    if(r.toString()===''&&i>0){ev.preventDefault();focarBloco(i-1,true);}}
}

function focarBloco(i,fim){
  const b=document.querySelector('#texto .blk[data-i="'+i+'"]');if(!b)return;
  b.focus();
  try{const s=window.getSelection(),r=document.createRange();r.selectNodeContents(b);r.collapse(!fim);s.removeAllRanges();s.addRange(r);
    b.scrollIntoView({block:'nearest',behavior:'smooth'});}catch(_){}
}

function renderTexto(){
  const raiz=$('texto');raiz.textContent='';
  const ult=Math.min(S.n,N-1);
  PARAGRAFOS.forEach((tit,p)=>{
    const idx=[];ETAPAS.forEach((e,i)=>{if(e.p===p&&i<=ult)idx.push(i);});
    if(!idx.length)return;
    const par=el('section','par');par.appendChild(el('h2','par-t',tit));
    const c=el('p','par-corpo');
    idx.forEach((i,j)=>{if(j)c.appendChild(document.createTextNode(' '));c.appendChild(bloco(i));});
    par.appendChild(c);raiz.appendChild(par);
  });
  if(S.n>=N)raiz.appendChild(el('div','fim','Estrutura completa. Toque em Prompt para gerar a correção, ou clique em qualquer trecho para ajustar.'));
}

/* ---------- etapa 1: projeto de texto ---------- */
function renderForm(){
  const raiz=$('form-projeto');raiz.textContent='';
  const cab=el('div','fp-cab');
  cab.append(el('h2','','Etapa 1 · Projeto de texto'),
    el('p','','Antes de escrever, extraia o rumo da redação. Cada campo vira o norte de uma parte do texto. Ctrl+Enter avança para o próximo campo.'));
  raiz.appendChild(cab);
  PROJ.forEach(f=>{
    const c=el('div','fp-c');
    const lb=el('label','fp-t',f.t);lb.htmlFor='pf-'+f.k;
    const ta=el('textarea','fp-ta');ta.id='pf-'+f.k;ta.rows=f.rows;ta.value=S.proj[f.k]||'';ta.placeholder=f.ph;
    ta.addEventListener('focus',()=>{campo=f.k;renderGuia();});
    ta.addEventListener('input',()=>{S.proj[f.k]=ta.value;salvar();renderLista();});
    ta.addEventListener('keydown',ev=>{if(ev.key==='Enter'&&(ev.ctrlKey||ev.metaKey)){ev.preventDefault();avancarCampo(f.k);}});
    c.append(lb,el('div','fp-q',f.q),ta);raiz.appendChild(c);
  });
  const b=el('button','fp-ok',S.projOk?'Salvar e voltar ao texto':'Concluir projeto e começar a redação');
  b.type='button';b.addEventListener('click',concluirProjeto);raiz.appendChild(b);
}

function avancarCampo(k){
  const f=PROJ.find(x=>x.k===k)||PROJ.find(x=>!pv(x.k))||PROJ[0];
  if(!pv(f.k)){status('Preencha “'+f.t+'” antes de avançar.','warn');$('pf-'+f.k).focus();return;}
  const j=PROJ.indexOf(f);
  if(j<PROJ.length-1)$('pf-'+PROJ[j+1].k).focus();else concluirProjeto();
}

function concluirProjeto(){
  const v=PROJ.find(f=>!pv(f.k));
  if(v){status('Falta preencher “'+v.t+'”.','warn');$('pf-'+v.k).focus();return;}
  PROJ.forEach(f=>{S.proj[f.k]=pv(f.k);});
  S.projOk=true;edProj=false;campo=null;salvar();render();
  focarBloco(Math.min(S.n,N-1),true);
  status('Projeto concluído. Comece pelo repertório inicial.','ok');
}

function renderProjPane(){
  const ver=S.aberto&&S.projOk&&!edProj;
  $('proj-pane').hidden=!ver;
  const bt=$('projBtn');bt.setAttribute('aria-pressed',String(S.aberto));bt.disabled=!S.projOk;
  const c=$('proj-corpo');c.textContent='';
  const i=vi(),e=i>=0?ETAPAS[i]:null;
  PROJ.forEach(f=>{
    const d=el('div','pi'+(e&&f.rel.includes(e.ref)?' rel':''));
    d.append(el('div','pi-t',f.t),el('div','pi-v',pv(f.k)||'—'));c.appendChild(d);
  });
}

/* ---------- painel lateral: estrutura + guia ---------- */
function irPara(i){
  if(edProj){if(!projCompleto()){status('Complete o projeto antes de voltar ao texto.','warn');return;}
    PROJ.forEach(f=>{S.proj[f.k]=pv(f.k);});edProj=false;salvar();render();}
  verPrompt=false;telas();focarBloco(i,true);
}

function renderLista(){
  const raiz=$('editor-opts');raiz.textContent='';
  const feitas=(S.projOk?1:0)+S.n,tot=N+1,a=vi();
  const prog=el('div','prog'),barra=el('div','prog-barra'),enche=el('div','prog-enche');
  enche.style.width=Math.round(feitas/tot*100)+'%';barra.appendChild(enche);
  prog.append(el('span','prog-n',feitas+' de '+tot+' etapas'),barra);raiz.appendChild(prog);

  raiz.appendChild(el('div','grp','Etapa 1'));
  const pf=PROJ.filter(f=>pv(f.k)).length;
  const bp=el('button','et'+(S.projOk&&!edProj?' feita':'')+(modoProj()?' atual':''));bp.type='button';
  bp.style.setProperty('--h',200);
  bp.append(el('span','et-m',S.projOk&&!edProj?'✓':(modoProj()?'●':'○')),el('span','et-n','Projeto de texto ('+pf+'/'+PROJ.length+')'));
  bp.addEventListener('click',()=>{if(S.projOk&&!edProj){edProj=true;verPrompt=false;render();}else{verPrompt=false;telas();const f=PROJ.find(x=>!pv(x.k))||PROJ[0];$('pf-'+f.k).focus();}});
  raiz.appendChild(bp);

  PARAGRAFOS.forEach((tit,p)=>{
    raiz.appendChild(el('div','grp',tit));
    ETAPAS.forEach((e,i)=>{
      if(e.p!==p)return;
      const feita=i<S.n,eh=i===a;
      const b=el('button','et'+(e.k?' conn':'')+(feita?' feita':'')+(eh?' atual':''));b.type='button';
      b.style.setProperty('--h',e.cor);
      b.append(el('span','et-m',feita?'✓':(eh?'●':'○')),el('span','et-n',e.nome));
      b.disabled=!S.projOk||i>S.n;
      if(eh)b.setAttribute('aria-current','step');
      b.addEventListener('click',()=>irPara(i));
      raiz.appendChild(b);
    });
  });
}

function kv(g,k,v,cls){g.appendChild(el('div','g-k',k));g.appendChild(el('div',cls||'g-v',v));}

function renderGuia(){
  const g=$('console-output');g.textContent='';
  if(modoProj()){
    const f=PROJ.find(x=>x.k===campo)||PROJ[0];
    g.appendChild(el('div','g-titulo',f.t));
    kv(g,'Raciocínio guiado',f.q);kv(g,'Para que serve',f.norte);return;
  }
  const e=ETAPAS[vi()];
  const t=el('div','g-titulo',e.nome);t.style.setProperty('--h',e.cor);g.appendChild(t);
  if(e.k){
    kv(g,'Função deste conectivo',e.funcao);
    kv(g,'Melhor opção aqui',e.melhor,'g-melhor');
    kv(g,'Alternativas',e.alt);
  }else{kv(g,'O que se espera',e.espera);kv(g,'Objetivo',e.objetivo);}
  kv(g,'Exemplo',e.ex,'g-ex');
  kv(g,'Marcação automática',token(e)+' … '+token(e,true));
}

function painel(){renderLista();renderGuia();renderProjPane();}

function telas(){
  const t=verPrompt?'prompt':(modoProj()?'form':'texto');
  $('texto').hidden=t!=='texto';$('form-projeto').hidden=t!=='form';$('prompt-view').hidden=t!=='prompt';
}

function render(){
  if(modoProj())renderForm();else renderTexto();
  telas();painel();
}

/* ---------- ações ---------- */
function concluir(){
  if(modoProj()){avancarCampo(campo);return;}
  if(S.n>=N){status('Estrutura completa. Toque em Prompt.','ok');return;}
  if(foco>=0&&foco<S.n){focarBloco(S.n,true);status('De volta ao fim do texto.');return;}
  const a=S.n,v=S.t[a].trim();
  if(!v){status('Escreva “'+ETAPAS[a].nome+'” antes de concluir.','warn');focarBloco(a,true);return;}
  S.t[a]=v;S.n=a+1;foco=S.n<N?S.n:-1;salvar();render();
  if(S.n<N){focarBloco(S.n,true);status('Próxima: '+ETAPAS[S.n].nome+'.','ok');}
  else status('Estrutura completa!','ok');
}

function montarPrompt(){
  const L=[],vazio='[BLOCO NÃO ESCRITO]';
  L.push('# TAREFA','Você é um corretor de redações dissertativo-argumentativas no padrão ENEM. Corrija a redação abaixo usando EXCLUSIVAMENTE o algoritmo da seção 1 como critério e o projeto de texto da seção 2 como norte. A redação foi escrita em blocos sequenciais; cada bloco traz o que se espera dele, para servir de limiar da sua correção.','');
  L.push('## 1. ALGORITMO (critério de correção)',ALGORITMO+ALGORITMO_EXTRA,'');
  L.push('## 2. PROJETO DE TEXTO DO ALUNO (norte da redação)');
  PROJ.forEach(f=>L.push('- '+f.t+': '+(pv(f.k)||'[NÃO PREENCHIDO]')));
  L.push('','## 3. COMO LER A REDAÇÃO','Cada bloco está delimitado por marcadores de localização: @XXXI@ marca o início e @XXXF@ o fim da etapa XXX. Os marcadores não fazem parte do texto do aluno. Blocos K1 a K11 são conectivos. Os blocos seguem a ordem do algoritmo. [BLOCO NÃO ESCRITO] significa etapa ausente.','');
  L.push('### 3.1 Texto corrido');
  PARAGRAFOS.forEach((tit,p)=>{
    const tx=ETAPAS.filter(e=>e.p===p).map(e=>S.t[ETAPAS.indexOf(e)].trim()).filter(Boolean).join(' ');
    L.push('['+tit+'] '+(tx||vazio));
  });
  L.push('','### 3.2 Blocos com o que se espera de cada um','');
  ETAPAS.forEach((e,i)=>{
    L.push('#### Bloco '+(i+1)+' de '+N+' — '+e.nome+' ('+PARAGRAFOS[e.p]+')');
    L.push('Esperado: '+e.espera,'Objetivo: '+e.objetivo);
    L.push(token(e),S.t[i].trim()||vazio,token(e,true),'');
  });
  L.push('## 4. O QUE VOCÊ DEVE RETORNAR',
   '1. Para cada bloco, na ordem: veredito (Cumpre / Cumpre em parte / Não cumpre) comparando o texto com “Esperado” e “Objetivo”; cite o trecho que justifica; aponte o que falta; sugira reescrita curta só do necessário. Nos conectivos, diga se cumprem a função da passagem.',
   '2. Coerência com o projeto de texto: tema e palavras-chave presentes? C1 e C2 anunciadas na tese e retomadas, nos mesmos termos, nos tópicos frasais do D1 e do D2? Os repertórios são legitimados, pertinentes e produtivos (LEPER PRO)? Há lacunas argumentativas? A proposta responde a C1 e C2 com S1 e S2? A leitura é linear entre os blocos?',
   '3. Estimativa de nota por competência do ENEM (0 a 200), deixando claro que é apenas estimativa, e as 3 prioridades de melhoria.',
   '','Regras: não reescreva a redação inteira; não invente trechos que o aluno não escreveu; seja específico; responda em português do Brasil.');
  return L.join('\n');
}

function mostrarPrompt(sim){
  verPrompt=sim;telas();
  if(!sim)return;
  $('prompt-out').value=montarPrompt();
  const f=S.t.filter((t,i)=>i>=S.n||!t.trim()).length+(projCompleto()?0:1);
  status(f?'Prompt gerado com partes ainda não escritas.':'Prompt gerado. Copie e cole no LLM de sua preferência.',f?'warn':'ok');
}

async function copiar(){
  const ta=$('prompt-out');
  try{await navigator.clipboard.writeText(ta.value);status('Prompt copiado.','ok');return;}catch(_){}
  try{ta.focus();ta.select();document.execCommand('copy');status('Prompt copiado.','ok');}
  catch(_){status('Não foi possível copiar. Selecione o texto e copie manualmente.','warn');}
}

$('acaoBtn').addEventListener('click',()=>{if(verPrompt){verPrompt=false;telas();}concluir();});
$('promptBtn').addEventListener('click',()=>mostrarPrompt(true));
$('voltarBtn').addEventListener('click',()=>{mostrarPrompt(false);if(!modoProj())focarBloco(Math.min(S.n,N-1),true);});
$('copiarBtn').addEventListener('click',copiar);
$('limparBtn').addEventListener('click',()=>{
  if(!confirm('Apagar a redação e o projeto de texto salvos neste navegador?'))return;
  S={proj:{},projOk:false,t:Array(N).fill(''),n:0,aberto:true};edProj=false;verPrompt=false;foco=-1;campo=null;
  salvar();render();status('Tudo apagado. Recomece pela etapa 1.');
});
$('projBtn').addEventListener('click',()=>{S.aberto=!S.aberto;salvar();renderProjPane();});
$('closeProj').addEventListener('click',()=>{S.aberto=false;salvar();renderProjPane();});
$('editProj').addEventListener('click',()=>{edProj=true;verPrompt=false;render();const f=PROJ[0];$('pf-'+f.k).focus();});

/* ---------- kit: layout + ajuda ---------- */
const ui=MajoramaUI.iniciar({passos:[
  {alvo:'#brand',titulo:'Bem-vindo ao Majorama.redação',texto:'Primeiro você monta o <b>projeto de texto</b> (etapa 1). Depois escreve a redação num texto corrido, etapa por etapa. No fim, o app monta um prompt para qualquer LLM corrigir.'},
  {alvo:'#form-projeto',titulo:'Etapa 1 · Projeto de texto',texto:'Tema, palavras-chave, o porquê do problema, as duas problemáticas (D1 e D2) e uma solução para cada. Só depois de concluir você começa a escrever.'},
  {alvo:'#texto',titulo:'O texto',texto:'É um texto corrido. Cada etapa aparece <b>grifada</b>. O trecho em que está o cursor cresce e os demais ficam levemente transparentes, sem perder o fio da leitura.'},
  {alvo:'#acaoBtn',titulo:'Concluir a etapa',texto:'Atalho: <b>Ctrl+Enter</b> (⌘+Enter no Mac). Os marcadores de início e fim são colocados sozinhos. Os conectivos também são etapas.'},
  {alvo:'#proj-pane',titulo:'Painel do projeto',texto:'Mostra o que você definiu na etapa 1. Os itens relevantes para a etapa em foco ficam destacados. Oculte pelo botão <b>Projeto</b>.'},
  {alvo:'#editor-opts',titulo:'Estrutura',texto:'O que já foi feito (✓), a etapa em foco (●) e o que falta (○). Toque em uma etapa feita para ir até ela.',abrir:true},
  {alvo:'#console-output',titulo:'Guia da etapa',texto:'O que se espera, o objetivo e um exemplo. Nos conectivos: a função da passagem e a melhor opção.',abrir:true},
  {alvo:'#promptBtn',titulo:'Prompt de correção',texto:'Reúne o algoritmo, seu projeto, sua redação em blocos e o que se espera de cada um.'},
  {alvo:'#bY',titulo:'Painel lateral',texto:'Abre e fecha o painel de estrutura e guia. Arraste o divisor para redimensionar.'},
  {alvo:null,titulo:'Pronto! 🏁',texto:'Para rever este tutorial, toque em <b>? Ajuda</b>.',link:['Abrir o manual','https://github.com/Obentemiller/majorama-redacao/blob/main/manual.md']},
]});
window.UI=ui;

render();
if(!modoProj()&&S.n<N)status('Pronto. Clique no texto para continuar.');
else status('Pronto. Primeira vez? Toque em “? Ajuda” para o tutorial.');
