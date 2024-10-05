// Função para ler um arquivo JSON
function lerArquivoJSON(caminho, callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', caminho, true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          callback(xhr.responseText);
      }
  };
  xhr.send(null);
}

// Função para encontrar uma chave específica dentro de um objeto
function encontrarChave(objeto, chave) {
  for (var key in objeto) {
      if (key === chave) {
          return objeto[key];
      } else if (typeof objeto[key] === 'object') {
          var resultado = encontrarChave(objeto[key], chave);
          if (resultado !== undefined) {
              return resultado;
          }
      }
  }
  return undefined;
}

// Função para converter o valor da chave e formatar a string
function formatarData(valor) {
  // Tabela de conversão
  var dias = {
    '01': '1st', '02': '2nd', '03': '3rd', '04': '4th', '05': '5th', '06': '6th',
    '07': '7th', '08': '8th', '09': '9th', '10': '10th', '11': '11th', '12': '12th',
    '13': '13th', '14': '14th', '15': '15th', '16': '16th', '17': '17th', '18': '18th',
    '19': '19th', '20': '20th', '21': '21st', '22': '22nd', '23': '23rd', '24': '24th',
    '25': '25th', '26': '26th', '27': '27st', '28': '28nd', '29': '29rd', '30': '30th',
    '31': '31st'
  };

  var meses = {
    '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June',
    '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'
  };

  var horas = {
    '03': '00', '04': '01', '05': '02', '06': '03', '07': '04', '08': '05',
    '09': '06', '10': '07', '11': '08', '12': '09', '13': '10', '14': '11',
    '15': '12', '16': '13', '17': '14', '18': '15', '19': '16', '20': '17',
    '21': '18', '22': '19', '23': '20', '00': '21', '01': '22', '02': '23'
  };

  // Separando o valor em partes
  var partes = valor.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/);

  // Convertendo as partes
  var mes = meses[partes[2]];
  var dia = dias[partes[3]];
  var hora = horas[partes[4]];

  if(partes[4] = "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15") {
    var manhanoite = "am";
  } else {
    var manhanoite = "pm";
  }

  // Formatando a string
  // return "Last Updated: " + mes + " " + dia + ", " + partes[1] + " - " + hora + ":" + partes[5] + manhanoite +" BRT";
  return "Last Updated: " + mes + " " + dia + ", " + partes[1] + " - " + hora + ":" + partes[5] +" BRT";
}

// Chamando a função lerArquivoJSON para ler o arquivo e encontrar a chave
lerArquivoJSON('https://api.github.com/repos/ActuallyLinkhe/actuallylinkhe.github.io/commits', function (resposta) {
  var json = JSON.parse(resposta);
  var chave = 'date';
  var resultado = encontrarChave(json, chave);

  // Exibindo o resultado na página
  document.getElementById('display-date').textContent = formatarData(resultado);
  // document.getElementById('display-date').textContent = JSON.stringify(resultado, null, 2);
});

