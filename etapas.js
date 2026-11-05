/* Dados do algoritmo: projeto de texto (etapa 1), etapas de escrita, conectivos e texto-base do prompt.
   D1/D2: fiéis ao algoritmo anexado. Introdução, Conclusão, projeto de texto e conectivos como etapas: formulação do projeto. */
const PARAGRAFOS=['Introdução','Desenvolvimento 1 — causa institucional (C1)','Desenvolvimento 2 — causa sociocultural (C2)','Conclusão'];

/* Etapa 1: extração do projeto de texto (raciocínio guiado). rel = etapas de escrita em que o campo é o "norte". */
const PROJ=[
 {k:'tema',t:'Tema',q:'Qual é o tema, em uma frase, exatamente como a proposta o formula?',norte:'Toda a redação precisa responder a esta frase. É o norte da introdução e da retomada na conclusão.',ph:'Ex.: Desafios para valorizar … no Brasil',rows:2,rel:['R1','TE','CC']},
 {k:'chaves',t:'Palavras-chave',q:'Quais 3 a 5 termos do tema e da coletânea não podem sair do texto?',norte:'Repita estes termos (ou sinônimos próximos) em cada parágrafo para evitar a fuga ao tema.',ph:'Ex.: invisibilidade, políticas públicas, cidadania',rows:2,rel:['R1','TE']},
 {k:'porque',t:'Por que isso é um problema?',q:'Quem é prejudicado? Como isso aparece no cotidiano? O que acontece se nada for feito?',norte:'Ajuda a achar as causas. Reaparece no aprofundamento: o óbvio precisa ser dito.',ph:'Isso é um problema porque…',rows:3,rel:['TE','D1P3','D2P3']},
 {k:'c1',t:'Problemática 1 (D1) — causa institucional',q:'O que o Estado e as instituições deixam de fazer? (inoperância, falta de lei, de verba, de fiscalização). Complete: “Isso persiste porque…”',norte:'Será anunciada na tese e retomada no tópico frasal do D1, nos mesmos termos.',ph:'Ex.: inoperância governamental na …',rows:3,rel:['TE','D1P1','D1P2','D1P3','D1P4','CC']},
 {k:'c2',t:'Problemática 2 (D2) — causa sociocultural',q:'Que atitude, desinformação ou preconceito da própria sociedade mantém o problema?',norte:'Será anunciada na tese e retomada no tópico frasal do D2, nos mesmos termos.',ph:'Ex.: desinformação e preconceito enraizado …',rows:3,rel:['TE','D2P1','D2P2','D2P3','D2P4','CC']},
 {k:'s1',t:'Solução para a problemática 1',q:'Quem (agente) faz o quê (ação), por qual meio, para qual finalidade, de modo a vencer a causa institucional?',norte:'Vai para a proposta de intervenção da conclusão, ligada a C1.',ph:'Ex.: O Ministério … deve …, por meio de …, a fim de …',rows:3,rel:['PI']},
 {k:'s2',t:'Solução para a problemática 2',q:'Quem (agente) faz o quê (ação), por qual meio, para qual finalidade, de modo a vencer a causa sociocultural?',norte:'Vai para a proposta de intervenção da conclusão, ligada a C2.',ph:'Ex.: As escolas devem …, por meio de …, a fim de …',rows:3,rel:['PI']}
];

/* Etapas de conteúdo (12). Os conectivos (K1..K11) são etapas próprias, intercaladas. */
const CONTEUDO=[
 {id:'R1',p:0,nome:'Repertório inicial',cor:210,
  espera:'Abra com um repertório sociocultural (filosofia, sociologia, história, lei, cinema, literatura, pesquisa) relacionado ao tema.',
  objetivo:'Mostrar domínio de uma área do conhecimento já na primeira frase e abrir caminho para o tema.',
  ex:'Na obra “Vidas Secas”, Graciliano Ramos retrata a exclusão de sujeitos invisibilizados pelo Estado.'},
 {id:'TE',p:0,nome:'Tema + tese (antecipa C1 e C2)',cor:225,
  espera:'Apresente o tema com clareza e declare a tese, antecipando as duas causas do projeto de texto: C1 (institucional) e C2 (sociocultural).',
  objetivo:'Dar ao avaliador o projeto de texto. O D1 retoma C1 e o D2 retoma C2, como anunciados aqui.',
  ex:'o problema X persiste no país, em razão da inoperância governamental e da desinformação social.'},
 {id:'D1P1',p:1,nome:'D1 · Tópico frasal (C1)',cor:150,
  espera:'Frase curta e direta que sintetiza a ideia central do parágrafo, retomando exatamente C1, antecipada na tese.',
  objetivo:'Orientar a leitura do avaliador e demonstrar projeto de texto planejado.',
  ex:'cabe pontuar que a inoperância governamental se configura como um entrave decisivo para o enfrentamento dessa problemática.'},
 {id:'D1P2',p:1,nome:'D1 · Repertório (LEPER PRO)',cor:140,
  espera:'Fundamentação de área do conhecimento reconhecida. Legitimado: área formal. Pertinente: ligado ao eixo temático. Produtivo: vinculado ao argumento, nunca citação de bolso solta.',
  objetivo:'Atingir a nota máxima na Competência II com repertório que sustenta C1.',
  ex:'o sociólogo Zygmunt Bauman, em “Modernidade Líquida”, defende que as instituições públicas perdem sua função social quando não garantem a proteção efetiva dos cidadãos.'},
 {id:'D1P3',p:1,nome:'D1 · Aprofundamento crítico',cor:130,
  espera:'Explique como o repertório se aplica ao Brasil. Responda: por que isso acontece? Como se manifesta no cotidiano? Quais as consequências imediatas? Use marcas de autoria e juízo de valor (adjetivos e advérbios opinativos).',
  objetivo:'Evitar lacunas argumentativas. Regra de ouro: o óbvio precisa ser dito; o corretor não deduz a relação entre teoria e tema.',
  ex:'constata-se que a tese de Bauman se materializa no cenário brasileiro, haja vista que a escassez de investimentos estatais perpetua a marginalização dos grupos afetados. Dessa forma, a ausência de políticas públicas converte direitos em meros privilégios inalcançáveis.'},
 {id:'D1P4',p:1,nome:'D1 · Fechamento do parágrafo',cor:120,
  espera:'Síntese do parágrafo: reafirma a necessidade de superar C1 e conclui o raciocínio sem introduzir assunto novo.',
  objetivo:'Arrematar o raciocínio do parágrafo.',
  ex:'torna-se imperioso combater a omissão do Poder Público para que a cidadania plena seja restaurada.'},
 {id:'D2P1',p:2,nome:'D2 · Tópico frasal (C2)',cor:40,
  espera:'Tópico frasal que declara a causa social/comportamental (C2), exatamente como antecipada na tese.',
  objetivo:'Marcar a progressão do texto e manter o projeto planejado.',
  ex:'a desinformação da própria sociedade contribui diretamente para a manutenção desse problema.'},
 {id:'D2P2',p:2,nome:'D2 · Repertório (LEPER PRO)',cor:35,
  espera:'Novo repertório legitimado, pertinente e produtivo, vinculado a C2 (diferente do usado no D1).',
  objetivo:'Sustentar a causa sociocultural com fundamentação reconhecida.',
  ex:'o filósofo Immanuel Kant afirma que o esclarecimento é a saída do homem de sua menoridade, o que exige acesso ao conhecimento.'},
 {id:'D2P3',p:2,nome:'D2 · Aprofundamento crítico',cor:30,
  espera:'Mostre o impacto da desinformação, do preconceito ou da omissão da própria sociedade. Responda: por quê? Como se manifesta? Quais as consequências? Com marcas de autoria.',
  objetivo:'Sem lacunas: descreva a relação entre repertório e realidade brasileira.',
  ex:'a tese kantiana se concretiza no Brasil, pois a circulação de informações falsas mantém a população refém de preconceitos, o que agrava a exclusão social.'},
 {id:'D2P4',p:2,nome:'D2 · Fechamento do parágrafo',cor:25,
  espera:'Síntese do parágrafo: reafirma a necessidade de superar C2, sem assunto novo.',
  objetivo:'Arrematar o raciocínio do parágrafo.',
  ex:'é urgente combater a desinformação para que a sociedade exerça sua cidadania de forma crítica.'},
 {id:'CC',p:3,nome:'Conclusão · Retomada',cor:290,
  espera:'Retomada breve do tema e das causas C1 e C2, sem novos argumentos.',
  objetivo:'Fechar o texto de modo coeso com a introdução.',
  ex:'a persistência do problema X resulta da omissão estatal e da desinformação social.'},
 {id:'PI',p:3,nome:'Conclusão · Proposta de intervenção',cor:310,
  espera:'Proposta com agente, ação, meio/modo, finalidade e detalhamento, respondendo a C1 e a C2 com as soluções definidas no projeto de texto.',
  objetivo:'Apresentar solução viável e coerente com as problemáticas discutidas.',
  ex:'cabe ao Ministério da Educação, em parceria com as escolas, promover campanhas e oficinas, a fim de combater a desinformação e garantir a cidadania.'}
];

/* Conectivos: um para cada passagem entre etapas de conteúdo (K1..K11), cada qual com a sua função. */
const CONEX=[
 {nome:'repertório → tema',funcao:'Ponte de aplicação: leva o leitor do repertório para a realidade do tema.',melhor:'Nesse sentido,',alt:'Nessa perspectiva, · Sob essa ótica, · Na realidade brasileira,'},
 {nome:'abertura do D1',funcao:'Abre o primeiro desenvolvimento e marca a ordem do projeto de texto (1ª causa).',melhor:'Em primeiro plano,',alt:'Em primeira análise, · Sob esse viés,'},
 {nome:'tópico frasal → repertório',funcao:'Apresenta o repertório como sustentação da causa que acabou de ser declarada.',melhor:'Nessa perspectiva,',alt:'Nesse contexto, · Sob a ótica de [autor],'},
 {nome:'repertório → aprofundamento',funcao:'Aplica o repertório à realidade brasileira: introduz a explicação, não repete a citação.',melhor:'Sob essa ótica,',alt:'Nessa lógica, · Sob esse prisma,'},
 {nome:'aprofundamento → fechamento',funcao:'Conclusivo intraparágrafo: sintetiza a discussão e reafirma a necessidade de superar a causa.',melhor:'Assim,',alt:'Dessa forma, · Consequentemente,'},
 {nome:'abertura do D2',funcao:'Abre o segundo desenvolvimento por adição/progressão: soma a 2ª causa à 1ª.',melhor:'Além disso,',alt:'Ademais, · Outrossim,'},
 {nome:'tópico frasal → repertório (D2)',funcao:'Apresenta o repertório como sustentação da causa sociocultural.',melhor:'Nesse contexto,',alt:'Nessa linha de raciocínio, · Sob essa perspectiva,'},
 {nome:'repertório → aprofundamento (D2)',funcao:'Aplica o repertório à realidade brasileira e abre a explicação de causa e consequência.',melhor:'Sob esse viés,',alt:'Nessa conjuntura, · Dessa ótica,'},
 {nome:'aprofundamento → fechamento (D2)',funcao:'Conclusivo intraparágrafo: sintetiza e reafirma a necessidade de superar C2.',melhor:'Dessa maneira,',alt:'Assim, · Consequentemente,'},
 {nome:'abertura da conclusão',funcao:'Sinaliza o fim da argumentação e abre a retomada; não deve ser conectivo de adição.',melhor:'Portanto,',alt:'Em suma, · Diante do exposto,'},
 {nome:'retomada → proposta',funcao:'Passa do diagnóstico à ação: introduz a proposta de intervenção.',melhor:'Diante disso,',alt:'Logo, é necessário que · Para tanto,'}
];

/* Sequência final: conteúdo e conectivo intercalados. O conectivo pertence ao parágrafo da etapa seguinte. */
const ETAPAS=[];
CONTEUDO.forEach((c,i)=>{
  ETAPAS.push({...c,ref:c.id});
  if(i<CONEX.length){const x=CONEX[i],nx=CONTEUDO[i+1];
    ETAPAS.push({...x,id:'K'+(i+1),k:true,p:nx.p,cor:nx.cor,ref:nx.id,nome:'Conectivo · '+x.nome,
      espera:'Conectivo com esta função: '+x.funcao+' Melhor opção aqui: “'+x.melhor+'”.',objetivo:'Linearizar a passagem para a etapa seguinte.',
      ex:x.melhor+' …'});}
});

const ALGORITMO=`ALGORITMO DE DESENVOLVIMENTO DA REDAÇÃO DO ENEM
Microestrutura sequencial de 4 passos lógicos, aplicada a cada parágrafo argumentativo (Desenvolvimento 1 e Desenvolvimento 2).
Projeto de texto: D1 processa a Causa Institucional/Estrutural (C1: inoperância governamental, insuficiência legislativa). D2 processa a Causa Sociocultural/Comportamental (C2: desinformação, preconceito enraizado). C1 e C2 devem ser antecipadas na tese da introdução.

Passo 1 — Conectivo interparágrafo + tópico frasal
Inicia-se com operador argumentativo interparágrafo; em seguida, tópico frasal (frase curta e direta que sintetiza a ideia central, retomando exatamente C1 no D1 ou C2 no D2, antecipada na tese). Objetivo: orientar a leitura do avaliador e demonstrar projeto de texto planejado.
Exemplo (D1): "Em primeiro plano, cabe pontuar que a inoperância governamental se configura como um entrave decisivo para o enfrentamento dessa problemática."

Passo 2 — Repertório sociocultural (regra LEPER PRO)
Fundamentação de área do conhecimento reconhecida (filosofia, sociologia, história, legislação, cinema, literatura, pesquisas). Para a nota máxima na Competência II: Legitimado (área formal do conhecimento), Pertinente (relação direta com o eixo temático), Produtivo (ativamente vinculado ao argumento, nunca citação de "bolso" decorativa).
Exemplo: "Nessa perspectiva, o sociólogo Zygmunt Bauman, em sua obra 'Modernidade Líquida', defende que as instituições públicas perdem sua função social quando não garantem a proteção efetiva dos cidadãos."

Passo 3 — Aprofundamento argumentativo e análise crítica (sem lacunas)
Explicar explicitamente como o repertório se aplica à realidade do problema no Brasil. Para evitar lacunas argumentativas (relação lógica subentendida), responder: Por que isso acontece? Como se manifesta no cotidiano? Quais são as consequências imediatas? É indispensável usar marcas de autoria e juízo de valor (adjetivos e advérbios opinativos). Regra de ouro: "O óbvio precisa ser dito" — o corretor não deve deduzir a relação entre teoria e tema.
Exemplo: "Sob essa ótica, constata-se que a tese de Bauman se materializa no cenário brasileiro, haja vista que a escassez de investimentos estatais perpetua a marginalização dos grupos afetados. Dessa forma, a ausência de políticas públicas integradas converte direitos constitucionalmente assegurados em meros privilégios inalcançáveis, agravando a vulnerabilidade social."

Passo 4 — Fechamento do parágrafo (síntese intraparágrafo)
Conectivo conclusivo intraparágrafo (Dessa forma, Assim, Consequentemente) que sintetiza a discussão, reafirma a necessidade de superar aquela causa específica e conclui sem introduzir assuntos novos.
Exemplo: "Assim, torna-se imperioso combater a omissão do Poder Público para que a cidadania plena seja restaurada."

Diferenciação D1 x D2
- Conectivo inicial: D1 = Em primeiro plano / Em primeira análise / Sob esse viés. D2 = Além disso / Ademais / Outrossim (adição/progressão).
- Tópico frasal: D1 declara a causa estatal/estrutural (C1). D2 declara a causa social/comportamental (C2).
- Foco do aprofundamento: D1 = falhas de gestão, omissão legislativa, falta de investimentos. D2 = impacto da desinformação, do preconceito ou da omissão da própria sociedade.

Complemento do projeto (não consta no algoritmo anexado; usar como critério básico): a Introdução segue a ordem repertório inicial → conectivo repertório-tema → apresentação do tema com tese que antecipa C1 e C2. A Conclusão retoma a tese e apresenta proposta de intervenção (agente, ação, meio/modo, finalidade, detalhamento).`;

const ALGORITMO_EXTRA=`

Etapa 1 do desenvolvimento — projeto de texto (formulação do projeto; precede a escrita)
Antes de escrever, o autor extrai: o tema; as palavras-chave; o raciocínio guiado "por que isso é um problema?"; a problemática 1 (C1, causa institucional/estrutural, que será o D1); a problemática 2 (C2, causa sociocultural/comportamental, que será o D2); e uma solução para cada problemática (S1 e S2), apresentadas na proposta de intervenção da conclusão. C1 e C2 devem ser antecipadas na tese, retomadas nos tópicos frasais do D1 e do D2, e S1 e S2 devem responder a C1 e a C2.

Conectivos como etapas
Cada passagem entre etapas é marcada por um conectivo próprio (blocos K1 a K11), com função específica: ponte repertório→tema, abertura de desenvolvimento, ancoragem do repertório, aplicação à realidade, fechamento conclusivo, abertura da conclusão e passagem à proposta. Avalie se cada conectivo cumpre a função da sua passagem.`;
