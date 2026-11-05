import {JSDOM} from 'jsdom';import fs from 'fs';
const html=fs.readFileSync('index.html','utf8').replace(/<script src="([^"]+)"><\/script>/g,(_,s)=>'<script>'+fs.readFileSync(s,'utf8')+'</script>');
const erros=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/',
  beforeParse(w){w.addEventListener('error',e=>erros.push(e.message));w.matchMedia=w.matchMedia||(()=>({matches:false,addEventListener(){},addListener(){}}));w.HTMLElement.prototype.scrollIntoView=()=>{};w.confirm=()=>true;}});
const d=dom.window.document,w=dom.window;
const ok=(c,m)=>{if(!c){console.error('FALHA:',m);process.exitCode=1;}else console.log('ok:',m);};
const etapaAtiva=()=>d.querySelector('#texto .st[contenteditable="true"]');
const digita=v=>{const s=etapaAtiva();s.textContent=v;s.dispatchEvent(new w.Event('input',{bubbles:true}));s.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',ctrlKey:true,bubbles:true}));};

ok(!d.getElementById('plano-view').hidden,'plano aparece antes da redação');
ok(d.getElementById('texto').hidden,'redação bloqueada antes do plano');

d.getElementById('planoConcluir').click();
ok(!d.getElementById('plano-view').hidden&&d.getElementById('status-msg').className==='warn','plano vazio não conclui');

d.getElementById('promptBtn').click();
ok(d.getElementById('prompt-out').value.includes('[NÃO PREENCHIDO]'),'prompt avisa plano vazio');
d.getElementById('voltarBtn').click();
ok(!d.getElementById('plano-view').hidden,'voltar do prompt retorna ao plano pendente');

const plano={tema:'A desigualdade no acesso à educação básica no Brasil.',palavras:'desigualdade, educação, acesso, políticas públicas',p1:'A falta de investimento e de gestão pública mantém escolas periféricas sem estrutura, perpetuando a exclusão.',p2:'A desinformação e o preconceito fazem parte da população naturalizar a desigualdade e não cobrar mudanças.',s1:'O Ministério da Educação deve ampliar o repasse de verbas, por meio de um programa nacional, a fim de garantir estrutura às escolas.',s2:'Escolas e mídias públicas devem promover campanhas de conscientização, com oficinas e debates, para combater a desinformação.'};
for(const [id,v] of Object.entries(plano)){const t=d.getElementById('pl-'+id);t.value=v;t.dispatchEvent(new w.Event('input',{bubbles:true}));}
d.getElementById('planoConcluir').click();
ok(d.getElementById('plano-view').hidden,'plano fecha ao concluir');
ok(etapaAtiva()&&etapaAtiva().dataset.etapa==='R1','primeira etapa editável depois do plano');
ok(d.getElementById('plano-resumo-corpo').textContent.includes(plano.tema),'painel lateral exibe o plano');

d.getElementById('acaoBtn').click();
ok(d.getElementById('status-msg').className==='warn','etapa vazia não conclui');

d.getElementById('promptBtn').click();
ok(!d.getElementById('prompt-view').hidden,'prompt abre');
d.getElementById('acaoBtn').click();
ok(d.getElementById('prompt-view').hidden&&!d.getElementById('texto').hidden,'botão principal volta do prompt');
d.getElementById('promptBtn').click();
d.getElementById('promptBtn').click();
ok(d.getElementById('prompt-view').hidden&&!d.getElementById('texto').hidden,'prompt alterna ao clicar de novo');

const ed1=etapaAtiva();
ed1.focus();
ok(ed1.classList.contains('foco')&&d.getElementById('texto').classList.contains('tem-foco'),'foco evidencia a etapa');
ed1.blur();
ok(!d.getElementById('texto').classList.contains('tem-foco'),'blur remove o foco');

d.getElementById('togglePlano').click();
ok(d.getElementById('plano-resumo-corpo').hidden,'plano do painel recolhe');
d.getElementById('togglePlano').click();
ok(!d.getElementById('plano-resumo-corpo').hidden,'plano do painel expande');

digita('Repertório um.');
ok(d.querySelectorAll('#texto .st.concluida').length===1,'primeiro trecho concluído');
ok(etapaAtiva()&&etapaAtiva().dataset.etapa==='CI','avança para o conectivo repertório → tema');
ok(d.getElementById('console-output').textContent.includes('Fora da ficção'),'guia mostra a dica de conectivo da etapa');

for(let i=1;i<16;i++)digita('Texto '+(i+1)+'.');
ok(d.querySelectorAll('#texto .st.concluida').length===16&&d.querySelector('.fim'),'16 etapas e aviso de fim');

d.querySelector('#texto .st.concluida').click();
ok(etapaAtiva()&&etapaAtiva().dataset.etapa==='R1','reedição do primeiro trecho');
const edR1=etapaAtiva();
edR1.textContent='Repertório pendente.';
edR1.dispatchEvent(new w.Event('input',{bubbles:true}));
w.getSelection().removeAllRanges();
d.querySelectorAll('#texto .st.concluida')[1].click();
ok(d.querySelector('.st.pendente')&&d.querySelector('.st.pendente').dataset.etapa==='R1','alteração pendente é marcada');
d.querySelector('#texto .st[data-etapa="R1"]').click();
digita('Repertório novo.');
ok(d.querySelectorAll('#texto .st.concluida')[0].textContent.includes('Repertório novo.'),'edição salva');

d.getElementById('promptBtn').click();
const p=d.getElementById('prompt-out').value;
ok(p.includes('## 1. PLANO DA REDAÇÃO')&&p.includes(plano.tema),'prompt inclui o plano');
ok(p.includes('@R1I@Repertório novo.@R1F@')&&p.includes('@PIF@')&&p.includes('LEPER PRO')&&p.includes('Esperado:'),'prompt com texto direto, marcadores, algoritmo e esperado');

d.querySelector('#editor-opts .et:not(.et-plano)').click();
ok(!d.getElementById('texto').hidden&&etapaAtiva(),'estrutura volta ao texto a partir do prompt');
d.getElementById('promptBtn').click();
d.getElementById('limparBtn').click();
ok(d.querySelectorAll('#texto .st.concluida').length===0,'limpar apaga a redação');
ok(d.getElementById('plano-view').hidden,'limpar mantém o plano e volta ao texto');
d.getElementById('helpBtn').click();
ok(!d.getElementById('tour').hidden,'tutorial abre');
ok(erros.length===0,'sem erros: '+erros.join('|'));
