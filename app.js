/* Majorama.redação — lógica do projeto. Layout e ajuda vêm do kit (vendor/majorama-ui). */
const CHAVE='majorama.redacao';
const CHAVE_PLANO_ABERTO='majorama.redacao.planoAberto';
const N=ETAPAS.length;
const $=id=>document.getElementById(id);
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
const cor=(e,l)=>`hsl(${e.cor} 60% ${l}%)`;
const idx=id=>ETAPAS.findIndex(e=>e.id===id);

let textos=Array(N).fill('');   // '' = etapa não concluída
let rasc={};                    // rascunhos por etapa
let edit=null;                  // índice de etapa concluída que está sendo reeditada
let foco=false;                 // pede foco no editor após renderizar
let editorAtual=null;           // trecho contenteditable da etapa ativa
let plano={tema:'',palavras:'',p1:'',p2:'',s1:'',s2:''};
let planoConcluido=false;
let modo='texto';               // 'texto' | 'plano' | 'prompt'
let planoSnapshot=null;
let planoAberto=true;

/* ---------- migração do formato antigo (13 etapas, sem plano) ---------- */
const IDS_ANTIGOS=['R1','CI','TE','D1P1','D1P2','D1P3','D1P4','D2P1','D2P2','D2P3','D2P4','CC','PI'];
const CONECTIVOS_ANTIGOS={
  D1P1:['Em primeiro plano','Em primeira análise','Sob esse viés','Primeiramente'],
  D2P1:['Além disso','Ademais','Outrossim','Em segundo plano'],
  CC:['Portanto','Em suma','Diante do exposto','Dessa forma','Assim']
};
const escaparRe=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function separarConectivo(txt,lista){
  const original=String(txt||'');
  if(!original.trim())return ['',original];
  for(const c of lista){
    const re=new RegExp('^\\s*'+escaparRe(c)+'\\s*,?\\s*','i');
    const m=original.match(re);
    if(m){
      const bruto=original.slice(0,m[0].length).trim();
      const conector=bruto.endsWith(',')?bruto:bruto+',';
      return [conector,original.slice(m[0].length).trimStart()];
    }
  }
  return ['',original];
}
function mapearAntigo(id,txt){
  const out={};
  if(!txt)return out;
  if(id==='D1P1'||id==='D2P1'||id==='CC'){
    const [c,t]=separarConectivo(txt,CONECTIVOS_ANTIGOS[id]);
    if(c)out[id==='D1P1'?'D1C':id==='D2P1'?'D2C':'CCL']=c;
    out[id]=t;return out;
  }
  out[id]=txt;return out;
}
function carregar(){
  try{
    const s=JSON.parse(localStorage.getItem(CHAVE)||'null');
    if(!s)return;
    if(s.v===2&&Array.isArray(s.t)&&s.t.length===N){
      textos=s.t.map(x=>String(x||''));
      if(s.r&&typeof s.r==='object')rasc=s.r;
      if(s.plano&&typeof s.plano==='object'){
        PLANO_CAMPOS.forEach(c=>{plano[c.id]=String(s.plano[c.id]||'');});
      }
      planoConcluido=!!s.pc||textos.some(t=>t!=='');
      return;
    }
    if(Array.isArray(s.t)){
      IDS_ANTIGOS.forEach((id,oi)=>{
        const mapa=mapearAntigo(id,String(s.t[oi]||''));
        Object.keys(mapa).forEach(k=>{const ni=idx(k);if(ni>=0)textos[ni]=mapa[k];});
      });
      if(s.r&&typeof s.r==='object'){
        Object.keys(s.r).forEach(k=>{
          const oi=Number(k),id=IDS_ANTIGOS[oi];if(!id)return;
          const mapa=mapearAntigo(id,String(s.r[k]||''));
          Object.keys(mapa).forEach(nk=>{const ni=idx(nk);if(ni>=0)rasc[ni]=mapa[nk];});
        });
      }
      if(textos.some(t=>t!==''))planoConcluido=true;
    }
  }catch(_){}
}
const salvar=()=>{try{localStorage.setItem(CHAVE,JSON.stringify({v:2,t:textos,r:rasc,plano,pc:planoConcluido}));}catch(_){}};

const atual=()=>{const i=textos.findIndex(t=>t==='');return i<0?N:i;};
const ativo=()=>edit!==null?edit:atual();
const token=(e,fim)=>'@'+e.id+(fim?'F':'I')+'@';
const status=(m,cls)=>{const s=$('status-msg');s.textContent=m;s.className=cls||'';};
const pendentesRasc=()=>Object.keys(rasc).filter(k=>{
  const i=+k;
  return i>=0&&i<N&&String(rasc[k]||'')!==''&&String(rasc[k]||'')!==textos[i];
});

/* ---------- plano: formulário e resumo ---------- */
function montarPlanoForm(){
  const raiz=$('plano-campos');if(!raiz)return;
  raiz.textContent='';
  PLANO_CAMPOS.forEach(c=>{
    const box=el('div','plano-campo');
    const lab=el('label','',c.rotulo);lab.htmlFor='pl-'+c.id;
    const dica=el('p','plano-dica',c.dica);dica.id='dica-'+c.id;
    const ta=el('textarea');ta.id='pl-'+c.id;ta.rows=c.rows||2;ta.placeholder=c.placeholder||'';ta.value=plano[c.id]||'';
    ta.required=true;ta.setAttribute('aria-required','true');ta.setAttribute('aria-describedby',dica.id);
    ta.addEventListener('input',()=>{plano[c.id]=ta.value;salvar();renderPlanoResumo();});
    ta.addEventListener('keydown',ev=>{
      if(ev.isComposing)return;
      if(ev.key==='Enter'&&(ev.ctrlKey||ev.metaKey)){ev.preventDefault();concluirPlano();}
    });
    box.append(lab,dica,ta);raiz.appendChild(box);
  });
  const intro=$('plano-intro');if(intro)intro.textContent=PLANO_GUIA;
}
function preencherPlanoForm(){
  PLANO_CAMPOS.forEach(c=>{const ta=$('pl-'+c.id);if(ta)ta.value=plano[c.id]||'';});
}
function renderPlanoResumo(){
  const raiz=$('plano-resumo-corpo');if(!raiz)return;
  const rolagem=raiz.scrollTop;
  raiz.textContent='';
  if(!planoConcluido){
    raiz.appendChild(el('p','plano-resumo-vazio','Preencha o plano para liberar a redação.'));
    const b=el('button','editar-plano','Preencher plano');b.type='button';b.addEventListener('click',abrirPlano);
    raiz.appendChild(b);raiz.scrollTop=rolagem;return;
  }
  if(PLANO_CAMPOS.some(c=>!String(plano[c.id]||'').trim())){
    raiz.appendChild(el('p','plano-resumo-vazio','Alguns campos estão vazios; use Editar plano para completar.'));
  }
  const dl=el('dl','plano-resumo-lista');
  PLANO_CAMPOS.forEach(c=>{
    dl.appendChild(el('dt','',c.rotulo));
    dl.appendChild(el('dd','',String(plano[c.id]||'').trim()||'—'));
  });
  raiz.appendChild(dl);
  const b=el('button','editar-plano','Editar plano');b.type='button';b.addEventListener('click',abrirPlano);
  raiz.appendChild(b);
  raiz.scrollTop=rolagem;
}
function aplicarPlanoAberto(){
  const corpo=$('plano-resumo-corpo');if(!corpo)return;
  corpo.hidden=!planoAberto;
  const b=$('togglePlano');if(b){b.textContent=planoAberto?'▾':'▸';b.setAttribute('aria-expanded',String(planoAberto));}
}
function togglePlanoResumo(){
  planoAberto=!planoAberto;
  try{localStorage.setItem(CHAVE_PLANO_ABERTO,planoAberto?'1':'0');}catch(_){}
  aplicarPlanoAberto();
}

/* ---------- texto contínuo ---------- */
function colocarCursorFim(no){
  try{
    const r=document.createRange();r.selectNodeContents(no);r.collapse(false);
    const s=window.getSelection();if(!s)return;s.removeAllRanges();s.addRange(r);
  }catch(_){}
}
function inserirTexto(no,txt){
  try{
    const s=window.getSelection();
    const r=s&&s.rangeCount?s.getRangeAt(0):null;
    if(r&&no.contains(r.startContainer)&&no.contains(r.endContainer)){
      r.deleteContents();
      const n=document.createTextNode(txt);r.insertNode(n);r.setStartAfter(n);r.collapse(true);
      s.removeAllRanges();s.addRange(r);
    }else{no.textContent=(no.textContent||'')+txt;}
  }catch(_){no.textContent=(no.textContent||'')+txt;}
  no.dispatchEvent(new Event('input',{bubbles:true}));
}
function ligarEditor(no,i){
  no.addEventListener('focus',()=>{no.classList.add('foco');$('texto').classList.add('tem-foco');});
  no.addEventListener('blur',()=>{
    no.classList.remove('foco');
    if(!$('texto').querySelector('.st.foco'))$('texto').classList.remove('tem-foco');
  });
  no.addEventListener('input',()=>{
    rasc[i]=no.textContent;salvar();
    no.classList.toggle('pendente',textos[i]!==''&&String(rasc[i])!==textos[i]);
  });
  no.addEventListener('beforeinput',ev=>{
    if(ev.inputType==='insertParagraph'||ev.inputType==='insertLineBreak')ev.preventDefault();
  });
  no.addEventListener('keydown',ev=>{
    if(ev.isComposing)return;
    if(ev.key==='Enter'&&(ev.ctrlKey||ev.metaKey)){ev.preventDefault();concluir();}
    else if(ev.key==='Escape'&&edit!==null){ev.preventDefault();cancelarEdicao();}
    else if(ev.key==='Enter'){ev.preventDefault();status('Cada etapa é um parágrafo contínuo. Use Ctrl+Enter para concluir.','warn');}
  });
  no.addEventListener('paste',ev=>{
    ev.preventDefault();
    const cd=ev.clipboardData||window.clipboardData;
    if(!cd)return;
    inserirTexto(no,cd.getData('text/plain').replace(/\s*\n+\s*/g,' '));
  });
  no.addEventListener('drop',ev=>ev.preventDefault());
}
function criarSpan(e,i,editando,txt,rascunho){
  const pendente=textos[i]!==''&&rasc[i]!==undefined&&String(rasc[i])!==textos[i];
  const s=el('span','st'+(editando?' editando':'')+(rascunho?' rascunho':'')+(pendente?' pendente':'')+(textos[i]!==''?' concluida':'')+(e.tipo==='conectivo'?' conectivo':''));
  s.style.setProperty('--h',e.cor);
  s.style.setProperty('--c',cor(e,62));
  s.dataset.etapa=e.id;
  s.textContent=txt;
  if(editando){
    s.contentEditable='true';s.setAttribute('contenteditable','true');s.spellcheck=true;
    s.setAttribute('role','textbox');
    s.setAttribute('aria-multiline','false');
    s.setAttribute('aria-label','Escreva a etapa: '+e.nome);
    s.dataset.placeholder='Escreva esta etapa…';
    ligarEditor(s,i);editorAtual=s;
  }else{
    s.tabIndex=0;
    s.setAttribute('role','button');
    s.setAttribute('aria-label','Editar etapa: '+e.nome);
    s.title=e.nome+(rascunho?' — rascunho não concluído':pendente?' — alterações não concluídas':' — clique para editar');
    s.addEventListener('click',()=>{
      const sel=window.getSelection&&window.getSelection();
      if(sel&&String(sel).trim()!=='')return;
      editar(i);
    });
    s.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();editar(i);}});
  }
  return s;
}
function renderTexto(){
  const raiz=$('texto');raiz.textContent='';raiz.classList.remove('tem-foco');editorAtual=null;
  const a=ativo();
  PARAGRAFOS.forEach((titulo,p)=>{
    const par=el('p','par');par.setAttribute('aria-label',titulo);
    let tem=false;
    ETAPAS.forEach((e,i)=>{
      if(e.p!==p)return;
      const editando=i===a&&a<N;
      const commit=textos[i]!=='';
      const draft=!commit&&rasc[i]!==undefined&&rasc[i]!=='';
      if(!editando&&!commit&&!draft)return;
      let txt='';
      if(editando)txt=rasc[i]!==undefined?rasc[i]:textos[i];
      else if(commit)txt=textos[i];
      else txt=rasc[i]||'';
      if(tem)par.appendChild(document.createTextNode(' '));
      par.appendChild(criarSpan(e,i,editando,txt,draft));
      tem=true;
    });
    if(tem)raiz.appendChild(par);
  });
  if(atual()===N&&edit===null){
    const pendentes=pendentesRasc();
    const f=el('div','fim',pendentes.length
      ?'Há alterações não concluídas. Clique no trecho correspondente e use Ctrl+Enter para salvar.'
      :'Estrutura completa. Toque em Prompt para gerar a correção, ou clique em qualquer trecho grifado para ajustar.');
    raiz.appendChild(f);
  }
  if(editorAtual&&foco){
    editorAtual.focus();colocarCursorFim(editorAtual);
    if(editorAtual.scrollIntoView)editorAtual.scrollIntoView({block:'center',behavior:'smooth'});
  }
  foco=false;
}

/* ---------- painel: estrutura + guia ---------- */
function renderLista(){
  const raiz=$('editor-opts');const rolagem=raiz.scrollTop;raiz.textContent='';
  const feitas=textos.filter(t=>t!=='').length,a=ativo();
  const prog=el('div','prog');
  const barra=el('div','prog-barra'),enche=el('div','prog-enche');
  barra.setAttribute('role','progressbar');
  barra.setAttribute('aria-label','Etapas concluídas');
  barra.setAttribute('aria-valuemin','0');
  barra.setAttribute('aria-valuemax',String(N));
  barra.setAttribute('aria-valuenow',String(feitas));
  enche.style.width=Math.round(feitas/N*100)+'%';barra.appendChild(enche);
  prog.append(el('span','prog-n',feitas+' de '+N+' etapas'),barra);
  raiz.appendChild(prog);

  const planoAtual=!planoConcluido;
  const noPlano=modo==='plano';
  const bp=el('button','et et-plano'+(planoConcluido?' feita':'')+(planoAtual?' atual':''));
  bp.type='button';
  bp.appendChild(el('span','et-m',planoConcluido?'✓':(planoAtual?'●':'○')));
  bp.appendChild(el('span','et-n','Etapa 1 · Plano da redação'));
  if(planoAtual)bp.setAttribute('aria-current','step');
  bp.addEventListener('click',abrirPlano);
  raiz.appendChild(bp);

  PARAGRAFOS.forEach((titulo,p)=>{
    raiz.appendChild(el('div','grp',titulo));
    ETAPAS.forEach((e,i)=>{
      if(e.p!==p)return;
      const feita=textos[i]!=='',temRasc=rasc[i]!==undefined&&rasc[i]!=='',eh=i===a&&planoConcluido;
      const b=el('button','et'+(feita?' feita':'')+(eh?' atual':''));
      b.type='button';b.style.setProperty('--c',cor(e,62));
      b.appendChild(el('span','et-m',feita?'✓':(eh?'●':'○')));
      b.appendChild(el('span','et-n',e.nome));
      b.disabled=!planoConcluido||noPlano||(!feita&&!eh&&!temRasc);
      if(eh)b.setAttribute('aria-current','step');
      b.addEventListener('click',()=>{if(feita||temRasc)editar(i);else if(eh){foco=true;render();}});
      raiz.appendChild(b);
    });
  });
  raiz.scrollTop=rolagem;
}
function renderGuia(){
  const g=$('console-output');g.textContent='';
  if(modo==='plano'||!planoConcluido){
    g.appendChild(el('div','ok','Etapa 1 · Plano da redação'));
    g.appendChild(el('div','g-k','O norte'));
    g.appendChild(el('div','g-v',PLANO_GUIA));
    g.appendChild(el('div','g-k','O que extrair'));
    PLANO_CAMPOS.forEach(c=>g.appendChild(el('div','g-v','• '+c.rotulo+': '+c.dica)));
    g.appendChild(el('div','g-k','Depois do plano'));
    g.appendChild(el('div','g-v','Conclua o plano para liberar a escrita. O plano ficará no painel lateral enquanto você escreve.'));
    return;
  }
  const a=ativo();
  if(a>=N){g.appendChild(el('div','ok','Todas as etapas foram escritas. Gere o prompt e cole em qualquer LLM.'));return;}
  const e=ETAPAS[a];
  const t=el('div','g-titulo',e.nome);t.style.color=cor(e,70);g.appendChild(t);
  g.appendChild(el('div','g-k','O que se espera'));g.appendChild(el('div','g-v',e.espera));
  g.appendChild(el('div','g-k','Objetivo'));g.appendChild(el('div','g-v',e.objetivo));
  if(e.dicaConectivo){
    const box=el('div','g-conectivo');
    box.appendChild(el('div','g-k','Dica de conectivo'));
    box.appendChild(el('div','g-conectivo-principal','“'+e.dicaConectivo.principal+'”'));
    box.appendChild(el('div','g-v',e.dicaConectivo.funcao));
    if(e.dicaConectivo.alternativas)box.appendChild(el('div','g-conectivo-alt','Também: '+e.dicaConectivo.alternativas));
    g.appendChild(box);
  }
  g.appendChild(el('div','g-k','Exemplo'));g.appendChild(el('div','g-ex',e.ex));
  g.appendChild(el('div','g-k','Marcação no prompt'));g.appendChild(el('div','g-v',token(e)+' … '+token(e,true)));
}
function atualizarModo(){
  $('plano-view').hidden=modo!=='plano';
  $('prompt-view').hidden=modo!=='prompt';
  $('texto').hidden=modo!=='texto';
  const btn=$('acaoBtn'),txt=btn.querySelector('.txt'),ic=btn.querySelector('.ic');
  const rotulo=modo==='plano'?(planoConcluido?'Salvar':'Concluir'):modo==='prompt'?'Voltar':'Concluir';
  if(txt)txt.textContent=rotulo;
  if(ic)ic.textContent=modo==='prompt'?'←':'✓';
  btn.title=modo==='plano'
    ?(planoConcluido?'Salvar as alterações do plano':'Concluir o plano')
    :modo==='prompt'?'Fechar o prompt':'Concluir a etapa atual (Ctrl+Enter)';
  const pb=$('planoBtn');
  if(pb){
    pb.setAttribute('aria-pressed',String(modo==='plano'));
    pb.title=modo==='plano'
      ?(planoConcluido?'Voltar ao texto':'Conclua o plano para voltar ao texto')
      :'Abrir o plano da redação';
  }
  const pr=$('promptBtn');
  if(pr){
    pr.setAttribute('aria-pressed',String(modo==='prompt'));
    pr.title=modo==='prompt'?'Fechar o prompt':'Ver e copiar o prompt de correção';
  }
  const pc=$('planoConcluir');if(pc)pc.textContent=planoConcluido?'Salvar plano':'Concluir plano e começar a redação';
  const pv=$('planoVoltar');if(pv)pv.hidden=!planoConcluido;
  const vb=$('voltarBtn');if(vb)vb.textContent=planoConcluido?'← Voltar ao texto':'← Voltar ao plano';
  aplicarPlanoAberto();
}
function render(){renderTexto();renderLista();renderGuia();renderPlanoResumo();atualizarModo();}

/* ---------- ações ---------- */
function abrirPlano(){
  if(planoConcluido&&modo!=='plano')planoSnapshot={...plano};
  preencherPlanoForm();foco=false;modo='plano';render();
  status(planoConcluido?'Edite o plano e salve para voltar à redação.':'Preencha o plano para liberar a redação.','');
  const primeiro=PLANO_CAMPOS.find(c=>!String(plano[c.id]||'').trim());
  const ta=primeiro?$('pl-'+primeiro.id):null;
  if(ta)ta.focus();
}
function voltarDoPlano(){
  if(!planoConcluido){status('Conclua o plano para liberar a redação.','warn');return;}
  const descartou=!!planoSnapshot&&PLANO_CAMPOS.some(c=>String(plano[c.id]||'')!==String(planoSnapshot[c.id]||''));
  if(planoSnapshot){plano={...planoSnapshot};salvar();}
  planoSnapshot=null;modo='texto';foco=true;render();
  status(descartou?'Alterações não salvas do plano foram descartadas. Continue a redação.':'Plano mantido. Continue a redação.');
}
function concluirPlano(){
  const faltando=PLANO_CAMPOS.find(c=>!String(plano[c.id]||'').trim());
  if(faltando){
    status('Preencha “'+faltando.rotulo+'” para concluir o plano.','warn');
    const ta=$('pl-'+faltando.id);if(ta)ta.focus();return;
  }
  PLANO_CAMPOS.forEach(c=>{plano[c.id]=String(plano[c.id]||'').trim();});
  const ja=planoConcluido;
  planoConcluido=true;planoSnapshot=null;salvar();
  modo='texto';foco=true;render();
  status(ja?'Plano atualizado.':'Plano concluído. Comece pela introdução.','ok');
}
function editar(i){
  if(i<0||i>=N||!planoConcluido)return;
  if(textos[i]===''&&!(rasc[i]!==undefined&&rasc[i]!==''))return;
  if(modo==='plano'&&planoSnapshot){plano={...planoSnapshot};salvar();}
  planoSnapshot=null;modo='texto';
  edit=i;foco=true;render();
}
function concluir(){
  if(!planoConcluido){status('Conclua o plano antes de escrever a redação.','warn');abrirPlano();return;}
  const a=ativo();
  if(a>=N){status('Todas as etapas já estão concluídas.','ok');return;}
  const v=editorAtual?editorAtual.textContent.trim():'';
  if(!v){status('Escreva o texto da etapa “'+ETAPAS[a].nome+'” antes de concluir.','warn');if(editorAtual)editorAtual.focus();return;}
  textos[a]=v;delete rasc[a];
  const reed=edit!==null;edit=null;salvar();foco=true;render();
  status(reed?'Etapa atualizada.':(atual()<N?'Etapa concluída. Próxima: '+ETAPAS[atual()].nome+'.':'Estrutura completa!'),'ok');
}
function cancelarEdicao(){
  const a=ativo();
  if(edit!==null){
    delete rasc[a];edit=null;foco=true;salvar();render();
    status('Edição cancelada.');
  }
}

function montarPrompt(){
  const L=[];
  L.push('# TAREFA','Você é um corretor de redações dissertativo-argumentativas no padrão ENEM. Corrija a redação abaixo usando o plano da seção 1, o algoritmo da seção 2 e o que se espera de cada etapa na seção 4. A redação é um texto direto; os marcadores @XXXI@ e @XXXF@ apenas demarcam as etapas do algoritmo e não fazem parte do texto do aluno.','');
  L.push('## 1. PLANO DA REDAÇÃO (etapa 1 — norte do texto)');
  L.push('Use o plano para verificar se o texto cumpre o que foi planejado; aponte incoerências entre plano e redação.');
  PLANO_CAMPOS.forEach(c=>L.push(c.rotulo+': '+(String(plano[c.id]||'').trim()||'[NÃO PREENCHIDO]')));
  L.push('');
  L.push('## 2. ALGORITMO (critério de correção)',ALGORITMO,'');
  L.push('## 3. REDAÇÃO DO ALUNO (texto direto, com demarcações)');
  const blocos=PARAGRAFOS.map((_,p)=>{
    const partes=[];
    ETAPAS.forEach((e,i)=>{
      if(e.p!==p)return;
      const t=textos[i]!==''?textos[i]:'[ETAPA NÃO ESCRITA]';
      partes.push(token(e)+t+token(e,true));
    });
    return partes.join(' ');
  });
  L.push(blocos.join('\n\n'),'');
  L.push('## 4. O QUE SE ESPERA DE CADA ETAPA');
  ETAPAS.forEach((e,i)=>{
    L.push('### '+e.id+' — '+e.nome+' ('+PARAGRAFOS[e.p]+')');
    L.push('Esperado: '+e.espera,'Objetivo: '+e.objetivo);
    if(e.dicaConectivo)L.push('Conectivo/transição: “'+e.dicaConectivo.principal+'” — '+e.dicaConectivo.funcao+(e.dicaConectivo.alternativas?' (também: '+e.dicaConectivo.alternativas+')':''));
    L.push('');
  });
  L.push('## 5. O QUE VOCÊ DEVE RETORNAR',
   '1. Para cada etapa demarcada, na ordem: veredito (Cumpre / Cumpre em parte / Não cumpre) comparando o texto com “Esperado” e “Objetivo” e com o plano; cite o trecho que justifica; aponte o que falta; sugira uma reescrita curta só do que for necessário.',
   '2. Coerência global: o tema e as palavras-chave do plano aparecem? C1 e C2 anunciadas na tese são retomadas, com as mesmas ideias, nos tópicos frasais do D1 e do D2? As soluções do plano aparecem na proposta de intervenção? Os repertórios são legitimados, pertinentes e produtivos (LEPER PRO)? Há lacunas argumentativas? A leitura é linear entre as etapas?',
   '3. Avalie o plano: as problemáticas respondem a “por que isso é um problema?” e as soluções indicam agente, ação, meio/modo e finalidade? O texto se mantém fiel ao plano?',
   '4. Estimativa de nota por competência do ENEM (0 a 200), deixando claro que é apenas estimativa, e as 3 prioridades de melhoria.',
   '','Regras: não reescreva a redação inteira; não invente trechos que o aluno não escreveu; seja específico e use linguagem direta; responda em português do Brasil.');
  return L.join('\n');
}
function mostrarPrompt(sim){
  if(!sim){
    if(!planoConcluido){
      modo='plano';foco=false;preencherPlanoForm();render();
      status('Preencha o plano para liberar a redação.','warn');return;
    }
    modo='texto';foco=true;render();return;
  }
  $('prompt-out').value=montarPrompt();
  foco=false;modo='prompt';render();
  const vazias=textos.filter(t=>t==='').length;
  const pendentes=pendentesRasc().length;
  const planoVazio=PLANO_CAMPOS.some(c=>!String(plano[c.id]||'').trim());
  let msg='Prompt gerado.';
  if(vazias)msg+=' '+vazias+' etapa(s) ainda não escrita(s).';
  if(!planoConcluido)msg+=' O plano ainda não foi concluído.';
  else if(planoVazio)msg+=' Há campos do plano vazios.';
  if(pendentes)msg+=' '+pendentes+' etapa(s) com alterações não concluídas.';
  if(!vazias&&planoConcluido&&!pendentes&&!planoVazio)msg+=' Copie e cole no LLM de sua preferência.';
  status(msg,(vazias||!planoConcluido||pendentes||planoVazio)?'warn':'ok');
}
async function copiar(){
  const ta=$('prompt-out');
  try{await navigator.clipboard.writeText(ta.value);status('Prompt copiado.','ok');return;}catch(_){}
  try{ta.focus();ta.select();document.execCommand('copy');status('Prompt copiado.','ok');}
  catch(_){status('Não foi possível copiar. Selecione o texto e copie manualmente.','warn');}
}
function limpar(){
  if(!confirm('Apagar toda a redação salva neste navegador? O plano será mantido.'))return;
  textos=Array(N).fill('');rasc={};edit=null;planoSnapshot=null;
  salvar();
  modo=planoConcluido?'texto':'plano';foco=modo==='texto';render();
  status('Redação apagada. O plano foi mantido; edite-o para trocar o tema.');
}

$('acaoBtn').addEventListener('click',()=>{
  if(modo==='plano')concluirPlano();
  else if(modo==='prompt')mostrarPrompt(false);
  else concluir();
});
$('promptBtn').addEventListener('click',()=>mostrarPrompt(modo!=='prompt'));
$('planoBtn').addEventListener('click',()=>{if(modo==='plano'&&planoConcluido)voltarDoPlano();else abrirPlano();});
$('voltarBtn').addEventListener('click',()=>mostrarPrompt(false));
$('copiarBtn').addEventListener('click',copiar);
$('limparBtn').addEventListener('click',limpar);
$('planoConcluir').addEventListener('click',concluirPlano);
$('planoVoltar').addEventListener('click',voltarDoPlano);
$('togglePlano').addEventListener('click',togglePlanoResumo);

/* ---------- kit: layout + ajuda ---------- */
const ui=MajoramaUI.iniciar({passos:[
  {alvo:'#brand',titulo:'Bem-vindo ao Majorama.redação',texto:'Primeiro você monta o <b>plano</b> (tema, palavras-chave, problemáticas e soluções). Só depois a redação é liberada. No fim, o app monta um prompt para qualquer LLM corrigir.'},
  {alvo:'#terminal-container',titulo:'O centro do trabalho',texto:'Primeiro você preenche o <b>plano</b>; depois, a redação vira um <b>texto direto</b>, com cada etapa grifada. Clique em um trecho para editá-lo. O trecho em foco cresce e os demais ficam levemente transparentes, para você não perder o fio.'},
  {alvo:'#acaoBtn',titulo:'Concluir',texto:'No plano, o botão conclui e salva o plano; na redação, conclui a etapa atual. Atalho: <b>Ctrl+Enter</b> (⌘+Enter no Mac). O app avança e guarda os marcadores de início e fim para o prompt.'},
  {alvo:'#planoBtn',titulo:'Plano',texto:'Abre o plano da redação. O plano é a <b>etapa 1</b>: ele reúne tema, palavras-chave, as problemáticas do D1 e do D2 e as soluções que serão retomadas na conclusão.'},
  {alvo:'#plano-view',titulo:'Etapa 1 · Plano da redação',texto:'Extraia o tema, as palavras-chave, as problemáticas C1 e C2 (perguntando “por que isso é um problema?”) e uma solução para cada causa. A redação só é liberada quando todos os campos estiverem preenchidos.'},
  {alvo:'#plano-resumo',titulo:'Plano no painel',texto:'Enquanto você escreve, o painel lateral mostra o que foi construído no plano. Recolha ou expanda no botão <b>▾</b>; o painel inteiro continua no botão <b>Painel</b>.',abrir:true},
  {alvo:'#editor-opts',titulo:'Estrutura',texto:'Mostra o plano (etapa 1), o que já foi feito (✓), a etapa atual (●) e o que falta (○). Toque em uma etapa feita para voltar a ela.',abrir:true},
  {alvo:'#console-output',titulo:'Guia da etapa',texto:'Para cada etapa: o que se espera, o objetivo, a <b>dica de conectivo</b> daquela passagem e um exemplo. Cada conectivo tem uma função: ligar repertório ao tema, abrir o D1, progredir para o D2 ou concluir.',abrir:true},
  {alvo:'#promptBtn',titulo:'Prompt de correção',texto:'Reúne o plano, o algoritmo, sua redação como texto direto com demarcações e o que se espera de cada etapa. Copie e cole em qualquer LLM. Toque de novo em <b>Prompt</b> para voltar.'},
  {alvo:'#bY',titulo:'Painel lateral',texto:'Abre e fecha o painel para dar mais espaço ao texto. <b>Arraste o divisor</b> para redimensionar.'},
  {alvo:null,titulo:'Pronto! 🏁',texto:'Para rever este tutorial, toque em <b>? Ajuda</b>.',link:['Abrir o manual','https://github.com/Obentemiller/majorama-redacao/blob/main/manual.md']},
]});

function inicializarPlanoAberto(){
  try{const s=localStorage.getItem(CHAVE_PLANO_ABERTO);if(s!==null){planoAberto=s==='1';return;}}catch(_){}
  planoAberto=!matchMedia(MajoramaUI.MQ_VERTICAL).matches;
}

carregar();montarPlanoForm();inicializarPlanoAberto();
modo=planoConcluido?'texto':'plano';
if(modo==='plano')preencherPlanoForm();
render();
status(modo==='plano'?'Preencha o plano para liberar a redação.':'Pronto. Primeira vez? Toque em “? Ajuda” para o tutorial.');
window.UI=ui;
