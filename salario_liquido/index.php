<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/newadm/CONTROLLER/trava.php";
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="cache-control" content="no-cache" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>...:::: Calculadora Salário Liquído ::::...</title>
  <link rel="shortcut icon" href="../imagens/favicon.png" type="image/x-icon" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="../css/estilo_modelo_simples.css" />
  <link rel="stylesheet" href="../newadm/include/css/estilo_header_footer.css" />
</head>

<body>
  <?php
  include "../newadm/include/header.php";
  require_once $_SERVER['DOCUMENT_ROOT'] . "/newadm/autoload.php";
  ?>
  <main>
    <div id='atualiza'>
      <?php
      $id_ferramentas = 0;
      $todosavisos = Avisos_DAO::buscarAvisos($id_ferramentas);
      foreach ($todosavisos as $avisosatual) {
        echo "
        <li class='lista_atualiza'>
          <p> $avisosatual->desc_avisos</p>
        </li>
	";
      }
      ?>
    </div>
    <div id="ferramenta">
      <div id="tit_ferramenta">
        <h2>Calculadora de Salário Líquido</h2>
        <br>
        <p>
          <strong>Preencha os campos abaixo para realizar o cálculo do salário líquido do funcionário.</strong>
        </p>
      </div>
      <form method="post" name="form_ferramenta">
        <div class="formulario">
          <label>Salário Base:</label>
          <input type="text" id="salario" class="input" placeholder="R$ 00,00">
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>
        <div id="balao_prim" class="sumir balao">
          <p></p>
        </div>
        <div class="formulario">
          <label>Quantidade de Dependentes:</label>
          <input type="text" id="dependentes" class="input" placeholder="00">
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>
        <div id="balao_prim" class="sumir balao">
          <p></p>
        </div>
        <div class="formulario">
          <label class="sub_tit_ferramenta">Descontos </label>
        </div>
        <div class="formulario">
          <label>Valor Diário do Vale-Ali/Ref: </label>
          <input
            class="input"
            type="text"
            id="vale_ref_dia"
            maxlength="14"
            placeholder="R$ 00,00" />
          <button class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label>Percent. do Vale-Ali/Ref(%): </label>
          <input
            class="input"
            type="text"
            id="perc_alimentacao"
            maxlength="5"
            placeholder="00,00%"
            OnKeyPress="maskpercent('##.##',this)" />
          <button class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label>Valor Diário do Vale Transporte:</label>
          <input
            class="input"
            type="text"
            id="vale_trans_dia"
            maxlength="14"
            placeholder="R$ 00,00" />
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>
        <div id="balao_seg" class="sumir balao">
          <p></p>
        </div>
        <div class="formulario">
          <label>Quant. Dias Trabalhados (Cálculo do Vale Ref/Alim ):</label>
          <input
            class="input"
            type="text"
            id="dias_trabalhados"
            maxlength="2"
            placeholder="00" />
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>
        <div id="balao_seg" class="sumir balao">
          <p>Marque o checkbox quando a mercadoria tiver origem importada do exterior com similar nacional ou possua Conteúdo de Importação superior a 40% (quarenta por cento).</p>
        </div>
        <div class="formulario">
          <label>1 - Outros Descontos:</label>
          <input
            class="input"
            type="text"
            id="outros_1"
            maxlength="14"
            placeholder="R$ 00,00" />
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label>2 - Outros Descontos:</label>
          <input
            class="input"
            type="text"
            id="outros_2"
            maxlength="14"
            placeholder="R$ 00,00" />
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label>3 - Outros Descontos:</label>
          <input
            class="input"
            type="text"
            id="outros_3"
            maxlength="14"
            placeholder="R$ 00,00" />
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label class="sub_tit_ferramenta">Adicionais </label>
        </div>
        <div class="formulario">
          <label>Adicional Noturno:</label>
          <input
            class="input"
            type="text"
            id="noturno"
            maxlength="14"
            placeholder="R$ 00,00" />
          <button class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label>Insalubridade:</label>
          <input
            class="input"
            type="text"
            id="insalubr"
            maxlength="14"
            placeholder="R$ 00,00" />
          <button class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label>Horas Extras:</label>
          <input
            class="input"
            type="text"
            id="extras"
            maxlength="14"
            placeholder="R$ 00,00" />
          <button class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label>Comissão :</label>
          <input
            class="input"
            type="text"
            id="comissao"
            maxlength="14"
            placeholder="R$ 00,00">
          <button class="ajuda esconder" type="button">?</button>
        </div>
        <div class="formulario">
          <label>RSR/DSR:</label>
          <input
            class="input"
            type="text"
            id="rsr_dsr"
            maxlength="14"
            placeholder="R$ 00,00">
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>
        <div id="balao_ter" class="sumir balao">
          <p>Consulte a Aliquota do IPI, <a href="http://pesquisaipi.fisconet.com.br/tipi_decreto_11158_2022/" target="_blank">clicando aqui</a>.</p>
        </div>

        <div class="formulario">
          <label>Outros proventos com incidência de INSS/FGTS/IRRF:</label>
          <input
            class="input"
            type="text"
            maxlength="14"
            id="outros_4"
            placeholder="R$ 00,00">
          <button id="ajuda" class="ajuda esconder" type="button">?</button>
        </div>

        <div id="bloco_botao">
          <input class="botao" id="bt_calcular" type="button" value="Calcular" />
        </div>
        <div id="aviso" class="sumir">
          <p></p>
        </div>
        <div id="resultado" class="sumir">
          <div class="overflow">
            <table>
              <tr class="tit_resul">
                <td colspan="5">Base para Cálculo do Salário</td>
              </tr>
              <tr>
                <th class="border">Salário Base</th>
                <th class="border">Dependentes</th>
                <th class="border">Base de Cálculo INSS</th>
                <th class="border">Base de Cálculo I.R. </th>
                <th class="border">Base de Cálculo FGTS
                </th>
              </tr>
              <tr>
                <td class="border" id="salario_i"></td>
                <td class="border" id="dependentes_i"></td>
                <td class="border" id="base_inss_i"></td>
                <td class="border" id="base_ir_i"></td>
                <td id="base_fgts_i"></td>
              </tr>
              <tr>
                <th class="border">Total de Adicionais</th>
                <th class="border">Valor dos Dependentes</th>
                <th class="border">Alíquota Efetiva INSS (%)</th>
                <th class="border">Alíquota I.R. (%)</th>
                <th class="border">Alíquota FGTS (%)
                </th>
              </tr>
              <tr>
                <td class="border" id="total_adicionais_i"></td>
                <td class="border" id="vlr_dependents_i"></td>
                <td class="border" id="aliq_inss_i"></td>
                <td class="border" id="aliq_ir_i"></td>
                <td id="aliq_fgts_i"></td>
              </tr>
              <tr class="tit_resul">
                <td colspan="5">Descontos</td>
              </tr>
              <tr>
                <th class="border">I.N.S.S</th>
                <th class="border">I.R</th>
                <th class="border">Vale Refeição</th>
                <th class="border" colspan="2">Vale Transporte</th>
              </tr>
              <tr>
                <td class="border" id="vlr_inss_i"></td>
                <td class="border" id="vlr_ir_i"></td>
                <td class="border" id="vale_ref_i"></td>
                <td class="border" id="vale_trans_i" colspan="2"></td>

              </tr>
              <tr>
                <th class="border">1 - Outros Descontos</th>
                <th class="border">2 - Outros Descontos</th>
                <th class="border">3 - Outros Descontos</th>
                <th class="border" colspan="2">Total Descontos
                </th>
              </tr>
              <tr>
                <td class="border" id="outros_1_i"></td>
                <td class="border" id="outros_2_i"></td>
                <td class="border" id="outros_3_i"></td>
                <td id="total_desc_i" colspan="2"></td>
              </tr>
              </tr>
              <tr class="tit_resul">
                <td colspan="5">Recebimentos Liquidos</td>
              </tr>
              <tr>
                <th class="border" colspan="3">FGTS</th>
                <th class="border" colspan="2">Salário Liquído</th>
              </tr>
              <tr>
                <td class="border" id="vlr_fgts_i" colspan="3"></td>
                <td class="border" id="salario_liq_i" colspan="2"></td>
              </tr>
            </table>
          </div>
        </div>
      </form>
      <div class="overflow">
        <table>
          <tr class="tit_resul">
            <td colspan="5">Tabela IRRF - Maio de 2025 em diante</td>
          </tr>
          <tr>
            <th class="border">Base de Cálculo (R$)</th>
            <th class="border">Alíquota (%)</th>
            <th>Parcela a Deduzir do IR (R$)</th>
          </tr>
          <tr>
            <td class="border">De 2.428,81 até 2.826,65</td>
            <td class="border">7,5%</td>
            <td>182,16</td>
          </tr>
          <tr>
            <td class="border">De 2.826,66 até 3.751,05</td>
            <td class="border">15%</td>
            <td>394,16</td>
          </tr>
          <tr>
            <td class="border">De 3.751,06 até 4.664,68</td>
            <td class="border">22,5%</td>
            <td>675,49</td>
          </tr>
          <tr>
            <td class="border">Acima de 4.664,68</td>
            <td class="border">27,5%</td>
            <td>908,73</td>
          </tr>
          <tr>
            <td class="border">Dependentes: R$ 189,59</td>
            <td class="border">Desconto simplificado: R$ 607,20</td>
            <td>-</td>
          </tr>
        </table>

        <table>
          <tr class="tit_resul">
            <td colspan="5">Alterações na Tributação Mensal (IRRF) Art.1° da Lei 15.270/2025</td>
          </tr>
          <tr>
            <th class="border">Rendimentos Tributáveis Sujeitos ao Ajuste Mensal</th>
            <th class="border">Redução do Imposto de Renda</th>
            <th>Efeito Prático</th>
          </tr>
          <tr>
            <td class="border">Até R$ 5.000,00</td>
            <td class="border">Até R$ 312,89</td>
            <td>O imposto devido é zerado, o que na prática amplia a faixa de
              isenção para rendimentos de até R$ 5.000,00 mensais.</td>
          </tr>
          <tr>
            <td class="border">De R$ 5.000,01 até R$ 7.350,00</td>
            <td class="border">Redução decrescente linearmente</td>
            <td>A redução é calculada pela fórmula: R$ 978,62 -
              (0,133145 x rendimentos tributáveis). A redução diminui progressivamente até
              ser zero para rendimentos a partir de R$ 7.350,00.</td>
          </tr>
          <tr>
            <td class="border">Acima de R$ 7.350,00</td>
            <td class="border">Nenhuma redução</td>
            <td>Contribuintes com rendimentos superiores a este valor
              não terão a redução de imposto prevista neste artigo.</td>
          </tr>
        </table>
      </div>
      <div class="overflow">
        <table>
          <tr class="tit_resul">
            <td colspan="5">Tabela INSS</td>
          </tr>
          <tr>
            <th class="border">Base de Cálculo (R$)</th>
            <th class="border">Alíquota (%)</th>
          </tr>
          <tr>
            <td class="border">até R$ 1.621,00</td>
            <td>7,5%</td>
          </tr>
          <tr>
            <td class="border">de R$ 1.621,01 até R$ 2.902,84</td>
            <td>9%</td>
          </tr>
          <tr>
            <td class="border">de R$ 2.902,85 até R$ 4.354,27</td>
            <td>12%</td>
          </tr>
          <tr>
            <td class="border">de R$ 4.354,28 até R$ 8.475,55</td>
            <td>14%</td>
          </tr>
          <tr>
            <td colspan="2">Teto Máximo de Desconto do Empregado = R$ 988,07</td>
          </tr>
          <tr>
            <td colspan="2">Teto Máximo de Desconto do Contribuinte Individual = R$ 932,31</td>
          </tr>
        </table>
      </div>
  </main>
  <?php
  include "../newadm/include/footer.php"
  ?>
  <script src="js/script.js?v=8"></script>
  <script src="../newadm/include/js/script.js"></script>
</body>

</html>