/* Dados do algoritmo: etapas, explicações e texto-base do prompt.
   Desenvolvimento 1 e 2: fiel ao algoritmo anexado. Introdução e Conclusão: complemento do projeto (marcado como tal). */
const PARAGRAFOS=['Introdução','Desenvolvimento 1 — causa institucional (C1)','Desenvolvimento 2 — causa sociocultural (C2)','Conclusão'];

const ETAPAS=[
 {id:'R1',p:0,nome:'Repertório inicial',cor:210,
  espera:'Abra com um repertório sociocultural (filosofia, sociologia, história, lei, cinema, literatura, pesquisa) que se relacione ao tema.',
  objetivo:'Mostrar domínio de uma área do conhecimento já na primeira frase e abrir caminho para o tema.',
  ex:'“Na obra “Vidas Secas”, Graciliano Ramos retrata a exclusão de sujeitos invisibilizados pelo Estado.”'},
 {id:'CI',p:0,nome:'Conectivo repertório → tema',cor:195,
  espera:'Uma ponte que liga o repertório ao tema, sem salto brusco.',
  objetivo:'Manter a leitura linear: o leitor deve entender por que o repertório foi trazido.',
  ex:'“Fora da ficção, essa realidade ainda persiste no Brasil contemporâneo, uma vez que…”  (também: Nesse sentido / Nessa ótica / Sob esse viés)'},
 {id:'TE',p:0,nome:'Tema + tese (antecipa C1 e C2)',cor:225,
  espera:'Apresente o tema com clareza e declare a tese, antecipando as duas causas: a institucional (C1) e a sociocultural (C2).',
  objetivo:'Dar ao avaliador o projeto de texto. O D1 retomará C1 e o D2 retomará C2, exatamente como anunciados aqui.',
  ex:'“…o problema X persiste. Isso ocorre pela inoperância governamental (C1) e pela desinformação social (C2).”'},
 {id:'D1P1',p:1,nome:'D1 · Conectivo + tópico frasal',cor:150,
  espera:'Comece com um operador argumentativo interparágrafo e, em seguida, o tópico frasal: frase curta e direta que retoma C1 como foi antecipada na tese.',
  objetivo:'Orientar a leitura do avaliador e demonstrar um projeto de texto planejado.',
  ex:'“Em primeiro plano, cabe pontuar que a inoperância governamental se configura como um entrave decisivo para o enfrentamento dessa problemática.”',
  conectivos:'Em primeiro plano · Em primeira análise · Sob esse viés'},
 {id:'D1P2',p:1,nome:'D1 · Repertório (LEPER PRO)',cor:140,
  espera:'Fundamentação de uma área do conhecimento reconhecida. Legitimado: área formal. Pertinente: ligado ao eixo temático. Produtivo: vinculado ao argumento, nunca uma citação de bolso solta.',
  objetivo:'Atingir a nota máxima na Competência II com repertório que sustenta a causa.',
  ex:'“Nessa perspectiva, o sociólogo Zygmunt Bauman, em “Modernidade Líquida”, defende que as instituições públicas perdem sua função social quando não garantem a proteção efetiva dos cidadãos.”'},
 {id:'D1P3',p:1,nome:'D1 · Aprofundamento crítico',cor:130,
  espera:'Explique como o repertório se aplica ao Brasil. Responda: por que isso acontece? Como se manifesta no cotidiano? Quais as consequências imediatas? Use marcas de autoria e juízo de valor (adjetivos e advérbios opinativos).',
  objetivo:'Evitar lacunas argumentativas. Regra de ouro: o óbvio precisa ser dito; o corretor não deduz a relação entre teoria e tema.',
  ex:'“Sob essa ótica, constata-se que a tese de Bauman se materializa no cenário brasileiro, haja vista que a escassez de investimentos estatais perpetua a marginalização dos grupos afetados. Dessa forma, a ausência de políticas públicas integradas converte direitos em meros privilégios inalcançáveis.”'},
 {id:'D1P4',p:1,nome:'D1 · Fechamento do parágrafo',cor:120,
  espera:'Conectivo conclusivo intraparágrafo que sintetiza a discussão, reafirma a necessidade de superar C1 e conclui sem introduzir assunto novo.',
  objetivo:'Arrematar o raciocínio do parágrafo.',
  ex:'“Assim, torna-se imperioso combater a omissão do Poder Público para que a cidadania plena seja restaurada.”',
  conectivos:'Dessa forma · Assim · Consequentemente'},
 {id:'D2P1',p:2,nome:'D2 · Conectivo + tópico frasal',cor:40,
  espera:'Conectivo de adição/progressão e tópico frasal que declara a causa social/comportamental (C2), exatamente como antecipada na tese.',
  objetivo:'Marcar a progressão do texto e manter o projeto planejado.',
  ex:'“Além disso, a desinformação da própria sociedade contribui diretamente para a manutenção desse problema.”',
  conectivos:'Além disso · Ademais · Outrossim'},
 {id:'D2P2',p:2,nome:'D2 · Repertório (LEPER PRO)',cor:35,
  espera:'Novo repertório legitimado, pertinente e produtivo, vinculado a C2 (diferente do usado no D1).',
  objetivo:'Sustentar a causa sociocultural com fundamentação reconhecida.',
  ex:'“Nesse contexto, o filósofo Immanuel Kant afirma que o esclarecimento é a saída do homem de sua menoridade, o que exige acesso ao conhecimento.”'},
 {id:'D2P3',p:2,nome:'D2 · Aprofundamento crítico',cor:30,
  espera:'Mostre o impacto da desinformação, do preconceito ou da omissão da própria sociedade. Responda: por quê? Como se manifesta? Quais as consequências? Com marcas de autoria.',
  objetivo:'Sem lacunas: descreva a relação entre repertório e realidade brasileira.',
  ex:'“Sob esse viés, a tese kantiana se concretiza no Brasil, pois a circulação de informações falsas mantém a população refém de preconceitos, o que agrava a exclusão social.”'},
 {id:'D2P4',p:2,nome:'D2 · Fechamento do parágrafo',cor:25,
  espera:'Conectivo conclusivo que sintetiza o parágrafo e reafirma a necessidade de superar C2, sem assunto novo.',
  objetivo:'Arrematar o raciocínio do parágrafo.',
  ex:'“Assim, é urgente combater a desinformação para que a sociedade exerça sua cidadania de forma crítica.”',
  conectivos:'Dessa maneira · Assim · Portanto'},
 {id:'CC',p:3,nome:'Conclusão · Retomada (complemento)',cor:290,
  espera:'Conectivo conclusivo e retomada breve da tese (tema, C1 e C2), sem novos argumentos.',
  objetivo:'Fechar o texto de modo coeso com a introdução.',
  ex:'“Portanto, a persistência do problema X resulta da omissão estatal e da desinformação social.”',
  conectivos:'Portanto · Em suma · Diante do exposto'},
 {id:'PI',p:3,nome:'Conclusão · Proposta de intervenção (complemento)',cor:310,
  espera:'Proposta com agente, ação, meio/modo, finalidade e detalhamento, articulada às causas C1 e C2.',
  objetivo:'Apresentar solução viável e coerente com o que foi discutido.',
  ex:'“Cabe ao Ministério da Educação, em parceria com as escolas, promover campanhas e debates por meio de oficinas, a fim de combater a desinformação e garantir a cidadania.”'}
];

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
