/* Dados do algoritmo: divisões argumentativas, projeto de texto (etapa 1), etapas de escrita, conectivos e texto-base do prompt.
   O algoritmo de desenvolvimento (4 passos) é universal; o que muda com a divisão escolhida (A1 x A2) são rótulos, perguntas e conectivos de abertura. */
const PARAGRAFOS=['Introdução','Desenvolvimento 1','Desenvolvimento 2','Conclusão'];

/* Formas de dividir o tema em dois desenvolvimentos. A divisão é um RECORTE do tema: A1 e A2 não podem se sobrepor. */
const DIVISOES=[
 {id:'instsoc',nome:'Causa institucional × causa sociocultural',curta:'Instituições × sociedade',
  desc:'O que o Estado/instituições deixam de fazer (A1) e o que a própria sociedade faz ou deixa de fazer (A2). Funciona bem em temas de problema social; força a barra em temas que não têm um “vilão” institucional claro.',
  n1:'causa institucional',n2:'causa sociocultural',
  q1:'O que o Estado e as instituições deixam de fazer? (inoperância, falta de lei, de verba, de fiscalização). Complete: “Isso persiste porque…”',ph1:'Ex.: inoperância governamental na …',
  q2:'Que atitude, desinformação ou preconceito da própria sociedade mantém o problema?',ph2:'Ex.: desinformação e preconceito enraizado …',
  top1:'cabe pontuar que [A1: a omissão das instituições] se configura como entrave decisivo para o enfrentamento de [tema].',
  top2:'[A2: a atitude/desinformação da sociedade] contribui diretamente para a manutenção de [tema].',
  k2:{melhor:'Em primeiro plano,',alt:'Em primeira análise, · Sob esse viés,',funcao:'Abre o primeiro desenvolvimento e marca a ordem do projeto de texto (1ª parte).'},
  k6:{melhor:'Além disso,',alt:'Ademais, · Outrossim,',funcao:'Soma a 2ª parte à 1ª. Adição: A2 é um fator independente que se acumula a A1.'}},
 {id:'desafios',nome:'Dois desafios / barreiras',curta:'Desafio 1 × desafio 2',
  desc:'Dois obstáculos de natureza diferente (ex.: acesso físico × custo financeiro; falta de estrutura × falta de formação). Bom quando o tema fala em “desafios” ou “barreiras”.',
  n1:'desafio / barreira 1',n2:'desafio / barreira 2',
  q1:'Qual é o primeiro obstáculo concreto? Em que ele é diferente do segundo? Complete: “Esse obstáculo impede … porque…”',ph1:'Ex.: barreira geográfica de acesso …',
  q2:'Qual é o segundo obstáculo, de natureza diferente do primeiro?',ph2:'Ex.: barreira econômica …',
  top1:'[A1: o primeiro desafio] constitui obstáculo central para [tema].',
  top2:'[A2: o segundo desafio], de natureza distinta, também limita [tema].',
  k2:{melhor:'Em primeira análise,',alt:'Em primeiro plano, · Sob esse viés,',funcao:'Abre o primeiro desenvolvimento e marca a ordem do projeto de texto.'},
  k6:{melhor:'Além disso,',alt:'Ademais, · Outrossim,',funcao:'Soma o 2º desafio ao 1º. Só serve se os dois forem realmente independentes.'}},
 {id:'causaconseq',nome:'Causa × consequência',curta:'Causa × consequência',
  desc:'A1 explica a origem do entrave; A2 mostra os impactos gerados por ele. Cuidado: a consequência precisa derivar da causa que você declarou, senão vira dois assuntos soltos.',
  n1:'causa (origem do entrave)',n2:'consequência (impactos gerados)',
  q1:'Qual é a origem do problema? Complete: “O problema existe porque…”',ph1:'Ex.: a falta de … faz com que …',
  q2:'Que efeitos concretos esse problema produz (quem sofre, como, com que desdobramentos)? Eles derivam da causa de A1?',ph2:'Ex.: como resultado, a população …',
  top1:'[A1: a causa] está na origem de [tema], pois [razão em uma oração].',
  top2:'[A2: o impacto] decorre desse cenário e agrava [tema].',
  k2:{melhor:'Em primeira análise,',alt:'Em primeiro plano, · Sob esse viés,',funcao:'Abre o primeiro desenvolvimento: a causa.'},
  k6:{melhor:'Em decorrência disso,',alt:'Como desdobramento, · Nessa conjuntura,',funcao:'Liga a consequência à causa. É relação de causalidade, não de soma: “Além disso” aqui apagaria o vínculo.'}},
 {id:'histcont',nome:'Raiz histórica × cenário contemporâneo',curta:'Passado × presente',
  desc:'A1 mostra de onde o problema vem; A2, como ele se reproduz hoje. Exige que o passado explique de fato o presente, sem “lição de história” solta.',
  n1:'raiz histórica',n2:'cenário contemporâneo',
  q1:'De que processo histórico o problema herda sua forma atual? Complete: “Isso vem de…”',ph1:'Ex.: herança de … na formação do país',
  q2:'Como o problema se reproduz hoje (mídia, instituições, relações cotidianas) a partir dessa herança?',ph2:'Ex.: atualmente, … ',
  top1:'[A1: a raiz histórica] explica a origem de [tema].',
  top2:'[A2: a reprodução atual] mantém, no presente, o problema de [tema].',
  k2:{melhor:'Historicamente,',alt:'Em primeira análise, · Desde a formação do país,',funcao:'Abre o desenvolvimento histórico.'},
  k6:{melhor:'Na contemporaneidade,',alt:'Atualmente, · Nos dias de hoje,',funcao:'Marca a passagem do passado ao presente: relação temporal, não de adição.'}},
 {id:'indcol',nome:'Dimensão individual × dimensão coletiva',curta:'Indivíduo × coletivo',
  desc:'A1 trata da ação ou da informação do indivíduo; A2, da reprodução do problema em grupos e instituições. Bom para temas de comportamento e cultura.',
  n1:'dimensão individual',n2:'dimensão coletiva / sistêmica',
  q1:'O que, na conduta ou na informação do indivíduo, alimenta o problema?',ph1:'Ex.: desinformação individual sobre …',
  q2:'Como o problema se reproduz em grupos, instituições ou na estrutura social, para além do indivíduo?',ph2:'Ex.: reprodução sistêmica em …',
  top1:'[A1: o plano individual] contribui para [tema].',
  top2:'[A2: o plano coletivo] amplia e reproduz [tema] para além do indivíduo.',
  k2:{melhor:'No âmbito individual,',alt:'Em primeira análise, · Em primeiro plano,',funcao:'Abre o desenvolvimento do plano individual.'},
  k6:{melhor:'Em escala coletiva,',alt:'Para além do indivíduo, · Sob a ótica social,',funcao:'Amplia o foco do indivíduo para o grupo: progressão de escala.'}},
 {id:'livre',nome:'Outra divisão (você define)',curta:'Divisão própria',
  desc:'Você escolhe o recorte. Regra única: A1 e A2 precisam ser ideias diferentes que, juntas, respondem ao tema. Escolha o conectivo de abertura do D2 conforme a relação real entre as duas (soma, causa, contraste, tempo).',
  n1:'argumento 1',n2:'argumento 2',
  q1:'Qual é o seu primeiro argumento, em uma frase? Complete: “Isso acontece porque…”',ph1:'Seu argumento 1 …',
  q2:'Qual é o segundo argumento, diferente do primeiro? Ele não pode ser reformulação do A1.',ph2:'Seu argumento 2 …',
  top1:'[A1] constitui fator relevante para [tema].',
  top2:'[A2] também sustenta [tema], por outro caminho.',
  k2:{melhor:'Em primeiro plano,',alt:'Em primeira análise, · Sob esse viés,',funcao:'Abre o primeiro desenvolvimento e marca a ordem do projeto de texto.'},
  k6:{melhor:'Ademais,',alt:'Além disso, · Outrossim, · (se A2 for consequência: Em decorrência disso,)',funcao:'Abre o D2. Troque por um conectivo de causa, contraste ou tempo se a relação com A1 não for de soma.'}}
];

/* Etapa 1: projeto de texto. rel = etapas em que o campo é o “norte”. Os campos c1, c2, s1, s2 têm título/pergunta ajustados pela divisão. */
const PROJ=[
 {k:'tema',t:'Tema',q:'Qual é o tema, em uma frase, exatamente como a proposta o formula?',norte:'Toda a redação precisa responder a esta frase. É o norte da introdução e da retomada na conclusão.',ph:'Ex.: Desafios para valorizar … no Brasil',rows:2,rel:['R1','TE','CC']},
 {k:'chaves',t:'Palavras-chave',q:'Quais 3 a 5 termos do tema e da coletânea não podem sair do texto?',norte:'Repita estes termos (ou sinônimos próximos) em cada parágrafo para evitar a fuga ao tema.',ph:'Ex.: invisibilidade, políticas públicas, cidadania (separe por vírgula)',rows:2,rel:['R1','TE']},
 {k:'porque',t:'Por que isso é um problema?',q:'Quem é prejudicado? Como isso aparece no cotidiano? O que acontece se nada for feito?',norte:'Ajuda a achar as causas. Reaparece no aprofundamento: o óbvio precisa ser dito.',ph:'Isso é um problema porque…',rows:3,rel:['TE','D1P3','D2P3']},
 {k:'c1',rows:3,rel:['TE','D1P1','D1P2','D1P3','D1P4','CC']},
 {k:'c2',rows:3,rel:['TE','D2P1','D2P2','D2P3','D2P4','CC']},
 {k:'s1',rows:3,rel:['PI']},
 {k:'s2',rows:3,rel:['PI']}
];

let DIV=DIVISOES[0];
function projDin(d){
  const m={
    c1:{t:'Argumento 1 (D1) — '+d.n1,q:d.q1,ph:d.ph1,norte:'Será anunciado na tese e retomado no tópico frasal do D1, nos mesmos termos.'},
    c2:{t:'Argumento 2 (D2) — '+d.n2,q:d.q2,ph:d.ph2,norte:'Será anunciado na tese e retomado no tópico frasal do D2, nos mesmos termos. Não pode repetir o argumento 1.'},
    s1:{t:'Solução para o argumento 1',q:'Quem (agente) faz o quê (ação), por qual meio, para qual finalidade, de modo a enfrentar “'+d.n1+'”?',ph:'Ex.: O Ministério … deve …, por meio de …, a fim de …',norte:'Vai para a proposta de intervenção da conclusão, ligada ao argumento 1.'},
    s2:{t:'Solução para o argumento 2',q:'Quem (agente) faz o quê (ação), por qual meio, para qual finalidade, de modo a enfrentar “'+d.n2+'”? Respeite os direitos humanos.',ph:'Ex.: As escolas devem …, por meio de …, a fim de …',norte:'Vai para a proposta de intervenção da conclusão, ligada ao argumento 2.'}};
  PROJ.forEach(f=>{if(m[f.k])Object.assign(f,m[f.k]);});
}

/* Etapas de conteúdo (12). Os conectivos (K1..K11) são etapas próprias, intercaladas. Os exemplos mostram a FORMA, nunca o conteúdo: não copie. */
function conteudo(d){return [
 {id:'R1',p:0,nome:'Repertório inicial',cor:210,
  espera:'Abra com um repertório sociocultural (filosofia, sociologia, história, lei, cinema, literatura, pesquisa) relacionado ao tema.',
  objetivo:'Mostrar domínio de uma área do conhecimento já na primeira frase e abrir caminho para o tema.',
  ex:'[Autor / obra / lei / dado] evidencia que [ideia central do repertório, em um período].'},
 {id:'TE',p:0,nome:'Tema + tese (antecipa A1 e A2)',cor:225,
  espera:'Apresente o tema com clareza e declare a tese, antecipando as duas partes do projeto de texto: A1 ('+d.n1+') e A2 ('+d.n2+').',
  objetivo:'Dar ao avaliador o projeto de texto. O D1 retoma A1 e o D2 retoma A2, como anunciados aqui.',
  ex:'[tema] persiste no Brasil em razão de [A1] e de [A2].'},
 {id:'D1P1',p:1,nome:'D1 · Tópico frasal (A1)',cor:150,
  espera:'Frase curta e direta que sintetiza a ideia central do parágrafo, retomando A1 ('+d.n1+') com os mesmos termos da tese.',
  objetivo:'Orientar a leitura do avaliador e demonstrar projeto de texto planejado.',
  ex:d.top1},
 {id:'D1P2',p:1,nome:'D1 · Repertório (LEPER PRO)',cor:140,
  espera:'Fundamentação de área do conhecimento reconhecida. Legitimado: área formal. Pertinente: ligado ao eixo temático. Produtivo: vinculado ao argumento A1, nunca citação de bolso solta.',
  objetivo:'Sustentar A1 com repertório que só faria sentido neste tema.',
  ex:'[Autor / obra / lei / pesquisa], em [fonte], defende que [ideia que sustenta A1].'},
 {id:'D1P3',p:1,nome:'D1 · Aprofundamento crítico',cor:130,
  espera:'Explique como o repertório se aplica ao Brasil. Responda: por que isso acontece? Como se manifesta no cotidiano? Quais as consequências imediatas? Use marcas de autoria e juízo de valor (adjetivos e advérbios opinativos), sem exagero.',
  objetivo:'Evitar lacunas argumentativas. Regra de ouro: o óbvio precisa ser dito; o corretor não deduz a relação entre repertório e tema.',
  ex:'constata-se que [a ideia do repertório] se materializa no Brasil, haja vista que [por quê / como aparece no cotidiano]. Dessa forma, [consequência concreta], o que perpetua [problema + juízo de valor].'},
 {id:'D1P4',p:1,nome:'D1 · Fechamento do parágrafo',cor:120,
  espera:'Síntese do parágrafo: reafirma a necessidade de superar A1 e conclui o raciocínio sem introduzir assunto novo.',
  objetivo:'Arrematar o raciocínio do parágrafo.',
  ex:'torna-se imperioso enfrentar [A1] para que [retomada do tema].'},
 {id:'D2P1',p:2,nome:'D2 · Tópico frasal (A2)',cor:40,
  espera:'Tópico frasal que declara A2 ('+d.n2+'), exatamente como antecipada na tese, e que seja uma ideia diferente de A1.',
  objetivo:'Marcar a progressão do texto e manter o projeto planejado.',
  ex:d.top2},
 {id:'D2P2',p:2,nome:'D2 · Repertório (LEPER PRO)',cor:35,
  espera:'Novo repertório legitimado, pertinente e produtivo, vinculado a A2 (diferente do usado no D1).',
  objetivo:'Sustentar A2 com fundamentação reconhecida.',
  ex:'[Autor / obra / lei / pesquisa], em [fonte], afirma que [ideia que sustenta A2].'},
 {id:'D2P3',p:2,nome:'D2 · Aprofundamento crítico',cor:30,
  espera:'Mostre como A2 se manifesta no Brasil e com que impacto. Responda: por quê? Como se manifesta? Quais as consequências? Com marcas de autoria.',
  objetivo:'Sem lacunas: descreva a relação entre repertório e realidade brasileira.',
  ex:'a ideia de [repertório] se concretiza no Brasil, pois [mecanismo], o que agrava [consequência concreta].'},
 {id:'D2P4',p:2,nome:'D2 · Fechamento do parágrafo',cor:25,
  espera:'Síntese do parágrafo: reafirma a necessidade de superar A2, sem assunto novo.',
  objetivo:'Arrematar o raciocínio do parágrafo.',
  ex:'é urgente enfrentar [A2] para que [retomada do tema].'},
 {id:'CC',p:3,nome:'Conclusão · Retomada',cor:290,
  espera:'Retomada breve do tema e de A1 e A2, sem novos argumentos.',
  objetivo:'Fechar o texto de modo coeso com a introdução.',
  ex:'a persistência de [tema] resulta de [A1] e de [A2].'},
 {id:'PI',p:3,nome:'Conclusão · Proposta de intervenção',cor:310,
  espera:'Proposta com agente, ação, meio/modo, finalidade e detalhamento, respondendo a A1 e a A2 com as soluções S1 e S2 do projeto de texto, sem ferir os direitos humanos.',
  objetivo:'Apresentar solução viável e coerente com as problemáticas discutidas.',
  ex:'cabe a [agente], por meio de [ação + meio], a fim de [finalidade], [detalhamento: como / quando / onde].'}
];}

/* Conectivos: um para cada passagem entre etapas (K1..K11). opc = pode ser omitido (conectivos dentro do parágrafo). */
function conex(d){return [
 {nome:'repertório → tema',funcao:'Ponte de aplicação: leva o leitor do repertório para a realidade do tema.',melhor:'Nesse sentido,',alt:'Nessa perspectiva, · Sob essa ótica, · Na realidade brasileira,',opc:true},
 {nome:'abertura do D1',...d.k2},
 {nome:'tópico frasal → repertório',funcao:'Apresenta o repertório como sustentação da ideia que acabou de ser declarada.',melhor:'Nessa perspectiva,',alt:'Nesse contexto, · Sob a ótica de [autor],',opc:true},
 {nome:'repertório → aprofundamento',funcao:'Aplica o repertório à realidade brasileira: introduz a explicação, não repete a citação.',melhor:'Sob essa ótica,',alt:'Nessa lógica, · Sob esse prisma,',opc:true},
 {nome:'aprofundamento → fechamento',funcao:'Conclusivo intraparágrafo: sintetiza a discussão e reafirma a necessidade de superar a A1.',melhor:'Assim,',alt:'Dessa forma, · Consequentemente,',opc:true},
 {nome:'abertura do D2',...d.k6},
 {nome:'tópico frasal → repertório (D2)',funcao:'Apresenta o repertório como sustentação de A2.',melhor:'Nesse contexto,',alt:'Nessa linha de raciocínio, · Sob essa perspectiva,',opc:true},
 {nome:'repertório → aprofundamento (D2)',funcao:'Aplica o repertório à realidade brasileira e abre a explicação de causa e consequência.',melhor:'Sob esse viés,',alt:'Nessa conjuntura, · Dessa ótica,',opc:true},
 {nome:'aprofundamento → fechamento (D2)',funcao:'Conclusivo intraparágrafo: sintetiza e reafirma a necessidade de superar A2.',melhor:'Dessa maneira,',alt:'Assim, · Consequentemente,',opc:true},
 {nome:'abertura da conclusão',funcao:'Sinaliza o fim da argumentação e abre a retomada; não deve ser conectivo de adição.',melhor:'Portanto,',alt:'Em suma, · Diante do exposto,'},
 {nome:'retomada → proposta',funcao:'Passa do diagnóstico à ação: introduz a proposta de intervenção.',melhor:'Diante disso,',alt:'Logo, é necessário que · Para tanto,',opc:true}
];}

/* Sequência final: conteúdo e conectivo intercalados (preenchida no lugar, para N e índices não mudarem). */
const ETAPAS=[];
function montarEtapas(d){
  const C=conteudo(d),X=conex(d);ETAPAS.length=0;
  C.forEach((c,i)=>{
    ETAPAS.push({...c,ref:c.id});
    if(i<X.length){const x=X[i],nx=C[i+1];
      ETAPAS.push({...x,id:'K'+(i+1),k:true,p:nx.p,cor:nx.cor,ref:nx.id,nome:'Conectivo · '+x.nome,
        espera:'Conectivo com esta função: '+x.funcao+' Melhor opção aqui: “'+x.melhor+'”.'+(x.opc?' Este conectivo é opcional: omita se a frase já fluir sem ele.':''),
        objetivo:'Linearizar a passagem para a etapa seguinte.',ex:x.melhor+' …'});}
  });
}
function aplicarDivisao(id){
  DIV=DIVISOES.find(x=>x.id===id)||DIVISOES[0];
  PARAGRAFOS[1]='Desenvolvimento 1 — A1: '+DIV.n1;PARAGRAFOS[2]='Desenvolvimento 2 — A2: '+DIV.n2;
  projDin(DIV);montarEtapas(DIV);
}
aplicarDivisao('instsoc');

/* Algoritmo (texto do prompt): versão geral. */
function algoritmo(){return `ALGORITMO DE DESENVOLVIMENTO (formato usado pelo autor para organizar a redação)
Microestrutura sequencial de 4 passos, aplicada a cada parágrafo de desenvolvimento (D1 e D2). É um ANDAIME DIDÁTICO de escrita, não o critério oficial da prova: ele serve para checar se o autor cumpriu a estrutura que se propôs, e não para dizer se o texto é bom.

Projeto de texto: o tema é dividido em dois argumentos, A1 (no D1) e A2 (no D2). A divisão é livre: causa institucional x causa sociocultural, dois desafios, causa x consequência, raiz histórica x cenário contemporâneo, dimensão individual x coletiva, ou outra. A divisão escolhida pelo autor está na seção 2. A1 e A2 devem ser ideias distintas, anunciadas na tese da introdução e retomadas nos tópicos frasais.

Passo 1 — Conectivo interparágrafo + tópico frasal
Operador argumentativo de abertura (ex.: Em primeiro plano, Em primeira análise, Sob esse viés, Além disso, Ademais, Em decorrência disso) seguido de frase curta e direta que declara a ideia-núcleo (A1 no D1, A2 no D2), nos mesmos termos da tese. Objetivo: orientar a leitura e mostrar projeto de texto planejado. O conectivo de abertura do D2 deve expressar a relação real entre A2 e A1 (soma, causa, tempo, escala).
Forma: "[Conectivo], [verbo/expressão] [ideia-núcleo] como [fator] para [problema do tema]."

Passo 2 — Repertório sociocultural (regra LEPER PRO)
Referência de área do conhecimento reconhecida (filosofia, sociologia, história, legislação, cinema, literatura, dados e pesquisas). LEPER PRO é um mnemônico de cursinho, não termo oficial: Legitimado (área formal do conhecimento), Pertinente (relação direta com o eixo temático), Produtivo (vinculado ao argumento, nunca citação "de bolso" decorativa).
Forma: "[Conectivo], [autor/obra/lei/dado] evidencia que [ideia, em um período]."

Passo 3 — Aprofundamento argumentativo e análise crítica (sem lacunas)
Explicar explicitamente como o repertório se aplica ao Brasil. Responder: por que isso acontece? como se manifesta no cotidiano? quais as consequências imediatas? Usar marcas de autoria e juízo de valor (adjetivos e advérbios opinativos), com moderação. Regra de ouro: "o óbvio precisa ser dito"; o corretor não deve deduzir a relação entre repertório e tema.
Forma: "[A ideia do repertório] se aplica ao Brasil porque [mecanismo]. Com isso, [consequência], o que perpetua [problema + juízo de valor]."

Passo 4 — Fechamento do parágrafo (síntese)
Conectivo conclusivo (Assim, Dessa forma, Desse modo) que reafirma a necessidade de superar aquele argumento e fecha o raciocínio sem introduzir assunto novo.
Forma: "[Conectivo], torna-se indispensável enfrentar [ideia-núcleo] para que [retomada do tema]."

Diferenciação D1 x D2: o tópico frasal e o foco do aprofundamento mudam conforme A1 e A2; o conectivo de abertura do D2 muda conforme a relação entre A2 e A1.

Complemento do projeto (não consta no algoritmo base): a Introdução segue a ordem repertório inicial → conectivo repertório-tema → tema com tese que antecipa A1 e A2. A Conclusão retoma a tese e apresenta proposta de intervenção (agente, ação, meio/modo, finalidade, detalhamento).`;}

const ALGORITMO_EXTRA=`

Etapa 1 — projeto de texto (precede a escrita)
O autor extrai: o tema; as palavras-chave; o raciocínio guiado "por que isso é um problema?"; o argumento A1 (que será o D1); o argumento A2 (que será o D2); e uma solução para cada (S1 e S2), apresentadas na proposta de intervenção. A1 e A2 devem ser antecipados na tese e retomados nos tópicos frasais; S1 e S2 devem responder a A1 e A2.

Conectivos como etapas
Cada passagem entre etapas é um bloco próprio (K1 a K11) com função específica. Os conectivos de abertura dos parágrafos (K2, K6, K10) são obrigatórios; os internos podem ser omitidos de propósito pelo autor, e isso NÃO é falha (excesso de conectivos também prejudica a coesão).`;
