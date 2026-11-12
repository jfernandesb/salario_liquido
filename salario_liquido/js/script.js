
// Mascara do Input - Formato de Moeda (Não Mudar)

// usa vírgula como separador decimal, ponto como separador de milhar, sempre com 2 casas decimais
const formatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function mask(e) {
  const input = e.target;
  // elimina tudo que não é dígito
  input.value = input.value.replace(/\D+/g, "");
  if (input.value.length === 0)
    // se não tem nada preenchido, não tem o que fazer
    return;
  // verifica se ultrapassou a quantidade máxima de dígitos (pegar o valor no dataset)
  const maxDigits = parseInt(input.dataset.maxDigits);
  if (input.value.length > maxDigits) {
    // O que fazer nesse caso? Decidi pegar somente os primeiros dígitos
    input.value = input.value.substring(0, maxDigits);
  }
  // lembrando que o valor é a quantidade de centavos, então precisa dividir por 100
  input.value = formatter.format(parseInt(input.value) / 100);
}

// Input que vai receber o formato de moeda (Mudar)
document.querySelector("#salario").addEventListener("input", mask);
document.querySelector("#vale_ref_dia").addEventListener("input", mask);
document.querySelector("#vale_trans_dia").addEventListener("input", mask);
document.querySelector("#outros_1").addEventListener("input", mask);
document.querySelector("#outros_2").addEventListener("input", mask);
document.querySelector("#outros_3").addEventListener("input", mask);
document.querySelector("#noturno").addEventListener("input", mask);
document.querySelector("#insalubr").addEventListener("input", mask);
document.querySelector("#extras").addEventListener("input", mask);
document.querySelector("#comissao").addEventListener("input", mask);
document.querySelector("#rsr_dsr").addEventListener("input", mask);
document.querySelector("#outros_4").addEventListener("input", mask);


// Input em Formato Percentual (Não Mudar)
function maskpercent(mascara, documento) {
  let i = documento.value.length;
  let saida = "#";
  let texto = mascara.substring(i);
  while (texto.substring(0, 1) != saida && texto.length) {
    documento.value += texto.substring(0, 1);
    i++;
    texto = mascara.substring(i);
  }
}

//Altera o Formato de Moeda para Float (Não Mudar)
function moedaParaFloat(valor) {
  let textoLimpo = valor
    .replace(".", "")
    .replace(".", "")
    .replace(",", ".")
    .replace("", "0");
  return parseFloat(textoLimpo);
}

//Altera o Formato de Float para Moeda (Não Mudar)
function floatParaMoeda(valor) {
  // Converte o valor para um número
  const numero = parseFloat(valor);
  // Formata o número para moeda brasileira
  return `R$ ${numero.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

//Calcular (Não Mudar)
document.getElementById("bt_calcular").addEventListener("click", function () {
  //Declarar Variaveis do Input (Mudar)

  var myDiv_aviso = document.getElementById("aviso");

  var myDiv_resul = document.getElementById("resultado");

  var salario = moedaParaFloat(document.getElementById("salario").value) * 1;

  var dependentes = document.getElementById("dependentes").value * 1;

  var vale_ref_dia = moedaParaFloat(document.getElementById("vale_ref_dia").value) ;

  var vale_trans_dia =
    moedaParaFloat(document.getElementById("vale_trans_dia").value) * 1;

  var outros_1 = moedaParaFloat(document.getElementById("outros_1").value) * 1;

  var outros_2 = moedaParaFloat(document.getElementById("outros_2").value) * 1;

  var outros_3 = moedaParaFloat(document.getElementById("outros_3").value) * 1;

  var noturno = moedaParaFloat(document.getElementById("noturno").value) * 1;

  var insalubr = moedaParaFloat(document.getElementById("insalubr").value) * 1;

  var extras = moedaParaFloat(document.getElementById("extras").value) * 1;

  var comissao = moedaParaFloat(document.getElementById("comissao").value) * 1;

  var rsr_dsr = moedaParaFloat(document.getElementById("rsr_dsr").value) * 1;

  var outros_4 = moedaParaFloat(document.getElementById("outros_4").value) * 1;

  var dias_trabalhados = document.getElementById("dias_trabalhados").value * 1;

  var perc_alimentacao = document.getElementById("perc_alimentacao").value * 1;

  //Bloquear Calculo quando Campos Estão em Branco e Mostrar Avisos (Mudar)

  if (salario == "" ) {
    var aviso_branco = "Salário não informado.";

    myDiv_aviso.classList.remove("sumir");
    myDiv_aviso.offsetHeight;
    myDiv_aviso.classList.add("show_result");

    //Sumir Resultado (Não Mudar)
    myDiv_resul.classList.add("sumir");

    document.getElementById("aviso").textContent = aviso_branco;
    return;
  } else {
    //Tabela de Resultado Aparecer (Não Mudar)
    myDiv_resul.classList.remove("sumir"); // Remove a classe 'hidden'
    myDiv_resul.offsetHeight; // Força o reflow para garantir que a transição aconteça
    myDiv_resul.classList.add("show_result"); // Adiciona a classe 'show' para iniciar a transição

    //Sumir Avisos (Não Mudar)
    myDiv_aviso.classList.add("sumir");
  }

  if (vale_ref_dia != "" && dias_trabalhados == "") {
    var aviso_branco = "Dias trabalhados não informado.";

    myDiv_aviso.classList.remove("sumir");
    myDiv_aviso.offsetHeight;
    myDiv_aviso.classList.add("show_result");

    //Sumir Resultado (Não Mudar)
    myDiv_resul.classList.add("sumir");

    document.getElementById("aviso").textContent = aviso_branco;
    return;
  } else {
    //Tabela de Resultado Aparecer (Não Mudar)
    myDiv_resul.classList.remove("sumir"); // Remove a classe 'hidden'
    myDiv_resul.offsetHeight; // Força o reflow para garantir que a transição aconteça
    myDiv_resul.classList.add("show_result"); // Adiciona a classe 'show' para iniciar a transição

    //Sumir Avisos (Não Mudar)
    myDiv_aviso.classList.add("sumir");
  }

  //ADICIONAIS
  var total_adicionais =
    noturno + insalubr + extras + comissao + rsr_dsr + outros_4;

  //FGTS

  //Base FGTS
  var aliq_fgts = 8;

  var base_fgts = salario + total_adicionais;

  var vlr_fgts = base_fgts * 0.08;

  //Descontos

  //Base INSS

  var base_inss = salario + total_adicionais;

  //Calcular INSS

  if (base_inss <= 1621.0) {
    var inss_faixa_1 = base_inss * 0.075;
    var inss_faixa_2 = 0;
    var inss_faixa_3 = 0;
    var inss_faixa_4 = 0;
    var aliq_inss = 7.5;
  }
  if (base_inss >= 1621.01 && base_inss <= 2902.84) {
    var inss_faixa_1 = 121.57;
    var inss_faixa_2 = (base_inss - 1621) * 0.09;
    var inss_faixa_3 = 0;
    var inss_faixa_4 = 0;
    var aliq_inss = ((inss_faixa_1 + inss_faixa_2) / base_inss) * 100;
  }
  if (base_inss >= 2902.85 && base_inss <= 4354.27) {
    var inss_faixa_1 = 121.57;
    var inss_faixa_2 = 115.36;
    var inss_faixa_3 = (base_inss - 2902.84) * 0.12;
    var inss_faixa_4 = 0;
    var aliq_inss =
      ((inss_faixa_1 + inss_faixa_2 + inss_faixa_3) / base_inss) * 100;
  }
  if (base_inss >= 4354.28 && base_inss <= 8475.55) {
    var inss_faixa_1 = 121.57;
    var inss_faixa_2 = 115.36;
    var inss_faixa_3 = 174.17;
    var inss_faixa_4 = (base_inss - 4354.27) * 0.14;
    var aliq_inss =
      ((inss_faixa_1 + inss_faixa_2 + inss_faixa_3 + inss_faixa_4) / base_inss) *
      100;
  }
  if (base_inss > 8475.55) {
    var inss_faixa_1 = 121.57;
    var inss_faixa_2 = 115.36;
    var inss_faixa_3 = 174.17;
    var inss_faixa_4 = 576.98;
    var aliq_inss =
      ((inss_faixa_1 + inss_faixa_2 + inss_faixa_3 + inss_faixa_4) / base_inss) *
      100;
  }

  var vlr_inss = inss_faixa_1 + inss_faixa_2 + inss_faixa_3 + inss_faixa_4;

  if (vlr_inss > 988.07) {
    vlr_inss = 988.07;
  }

  //Calcular Dependentes

  var vlr_dependts = dependentes * 189.59;

  // Base IR

  var base_ir = salario + total_adicionais - vlr_inss - vlr_dependts;
  // Base IR Quando as Deduções legais (INSS, Dependentes, Pensão) for menor que 528
  if (vlr_inss + vlr_dependts < 607.20) {
    var base_ir = salario + total_adicionais - 607.20;
  } else {
    var base_ir = salario + total_adicionais - vlr_inss - vlr_dependts;
  }

  //Calcular base e valor do IR
  
  if (salario + total_adicionais <= 5000){
	  var desc_ir_2026 = 312.89;
  }else if (salario + total_adicionais > 5000 && salario + total_adicionais <= 7350){
	  var desc_ir_2026 = 978.62 - (0.133145 * (salario + total_adicionais));
  }else if (salario + total_adicionais > 7350){
	  var desc_ir_2026 = 0;
  }
  ;
  if (base_ir <= 2428.8) {
    var vlr_ir = 0;
    var aliq_ir = 0;
  }
  if (base_ir >= 2428.81 && base_ir <= 2826.65) {
    var vlr_ir = ((base_ir * 0.075) - 182.16) - desc_ir_2026;
    var aliq_ir = 7.5;
  }
  if (base_ir >= 2826.66 && base_ir <= 3751.05) {
    var vlr_ir = ((base_ir * 0.15) - 394.16) - desc_ir_2026;
    var aliq_ir = 15;
  }
  if (base_ir >= 3751.06 && base_ir <= 4664.68) {
    var vlr_ir = ((base_ir * 0.225) - 675.49) - desc_ir_2026;
    var aliq_ir = 22.5;
  }
  if (base_ir >= 4664.68) {
    var vlr_ir = ((base_ir * 0.275) - 908.73) - desc_ir_2026;
    var aliq_ir = 27.5;
  }
  if (vlr_ir < 0) {
    var vlr_ir = 0;
  }

  // Vale-transporte

  if (vale_trans_dia * dias_trabalhados < salario * 0.06) {
    var vale_trans = vale_trans_dia * dias_trabalhados;
  } else {
    var vale_trans = salario * 0.06;
  }

  // Vale-alimentação

  var vale_ref = ((vale_ref_dia * dias_trabalhados) * (perc_alimentacao /100))

  //Total Descontos
  var total_desc =
    vlr_ir + vlr_inss + vale_ref + vale_trans + outros_1 + outros_2 + outros_3;
  //Salário liquido

  var salario_liq = salario + total_adicionais - total_desc;

  //Tabela de Resultado Aparecer (Não Mudar)
  myDiv_resul.classList.remove("sumir"); // Remove a classe 'hidden'
  myDiv_resul.offsetHeight; // Força o reflow para garantir que a transição aconteça
  myDiv_resul.classList.add("show_result"); // Adiciona a classe 'show' para iniciar a transição

  //Sumir Avisos (Não Mudar)
  myDiv_aviso.classList.add("sumir");

  //Mostrar no Resultado (Mudar)

  document.getElementById("aviso").textContent = aviso_branco;
  document.getElementById("salario_i").textContent = floatParaMoeda(
    salario.toFixed(2)
  );
  document.getElementById("dependentes_i").textContent = dependentes;
  document.getElementById("vale_ref_i").textContent = floatParaMoeda(
    vale_ref.toFixed(2)
  );

  document.getElementById("vale_trans_i").textContent = floatParaMoeda(
    vale_trans.toFixed(2)
  );

  document.getElementById("outros_1_i").textContent = floatParaMoeda(outros_1);

  document.getElementById("outros_2_i").textContent = floatParaMoeda(
    outros_2.toFixed(2)
  );

  document.getElementById("outros_3_i").textContent = floatParaMoeda(
    outros_3.toFixed(2)
  );
  document.getElementById("vlr_dependents_i").textContent = floatParaMoeda(
    vlr_dependts.toFixed(2)
  );
  document.getElementById("base_inss_i").textContent = floatParaMoeda(
    base_inss.toFixed(2)
  );
  document.getElementById("vlr_inss_i").textContent = floatParaMoeda(
    vlr_inss.toFixed(2)
  );
  document.getElementById("aliq_inss_i").textContent =
    aliq_inss.toFixed(2) + "%";
  document.getElementById("vlr_fgts_i").textContent = floatParaMoeda(
    vlr_fgts.toFixed(2)
  );
  document.getElementById("base_fgts_i").textContent = floatParaMoeda(
    base_fgts.toFixed(2)
  );
  document.getElementById("aliq_fgts_i").textContent =
    aliq_fgts.toFixed(2) + "%";
  document.getElementById("aliq_ir_i").textContent = aliq_ir.toFixed(2) + "%";
  document.getElementById("base_ir_i").textContent = floatParaMoeda(
    base_ir.toFixed(2)
  );
  document.getElementById("vlr_ir_i").textContent = floatParaMoeda(
    vlr_ir.toFixed(2)
  );
  document.getElementById("total_desc_i").textContent = floatParaMoeda(
    total_desc.toFixed(2)
  );
  document.getElementById("salario_liq_i").textContent = floatParaMoeda(
    salario_liq.toFixed(2)
  );
  document.getElementById("total_adicionais_i").textContent = floatParaMoeda(
    total_adicionais.toFixed(2)
  );
});


