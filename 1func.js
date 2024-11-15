var viagem = [];
var x = 0;

function resgistroSaida(){
    let cod = document.getElementById('codigo').value;
    let model = document.getElementById('modelo').value;
    let moto = document.getElementById('condutor').value;
    let dest = document.getElementById('destino').value;
    let dist = document.getElementById('distancia').value;
    let horaS = new Date().toLocaleTimeString();
    //let x = viagem.length + 1;

    if(verifyCod(cod)){
        alert('Codigo ja existente!');
        return;
    }
    if(cod == '' || model == '' || moto == '' || dest == '' || dist == ''){
        alert('Campos vazios!');
        return;
    }
    x++;

    viagem.push({
        codigo: cod,
        modelo: model,
        condutor: moto,
        destino: dest,
        distancia: dist,
        horaSaida: horaS,
        horaChegada: "Em transito"
    });

    localStorage.setItem('viagem', JSON.stringify(viagem));

    exibirViagem();

    //document.getElementById("saida").innerHTML = JSON.stringify(viagem[x++], null, 2);
    //document.getElementById("saida").innerHTML = "Ultimo Registro: " + hora() + "\nQuantidade de Registros: " + x;
    //+ viagem[viagem.length -1].codigo;
}
function registroChegada(){
    let cod = document.getElementById('codigo1').value;

    if(!verifyCod(cod) || cod == null){
        alert('Digite um codigo valido!');
        return;
    }

    for(var i=0; i<viagem.length;i++){
        if(viagem[i].codigo == cod){
            console.log(i);
            viagem[i].horaChegada = new Date().toLocaleTimeString();
            localStorage.setItem('viagem', JSON.stringify(viagem));
            exibirViagem();
            x--;
        }
    }
    

}

function verifyCod(x){
    for(var i = 0; i<viagem.length; i++){
        if(viagem[i].codigo==x){
            return 1;
        }
    }
    return 0;
}
function hora(){
    const agora = new Date();
    const hora = agora.getHours();
    const min = agora.getMinutes();

    const horarioAtual = `${hora}:${min}`;

    return horarioAtual;
}

function exibirViagem() {
    let tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; 

    for (let i = 0; i < viagem.length; i++) {
        let linha = tabela.insertRow();

        let codv = linha.insertCell(0);
        let condutor = linha.insertCell(1);
        let dest = linha.insertCell(2);
        let butao = linha.insertCell(3);

        //usar getelement e inner para adicionar td oculto(e posivel adicionar botao)
        codv.innerHTML = viagem[i].codigo;
        condutor.innerHTML = viagem[i].condutor;
        dest.innerHTML = viagem[i].destino;
        butao.innerHTML = '<button type="button" onclick="mostrarMais(this)">Mostrar Mais</button>'

        let linhaInv = tabela.insertRow();
        linhaInv.classList.add('linhaInvs');

        //const date = new Date().toLocaleTimeString();

        linhaInv.innerHTML = '<td colspan="4">' + 
          '<strong>Horario Saida: </strong>' +  viagem[i].horaSaida +
          '<br><strong>Distancia: </strong>' + viagem[i].distancia + ' km' +
          '<br><strong>Chegada: </strong>' + viagem[i].horaChegada +
          '</td>';
        
        
    }
}

function mostrarMais(btn) {

    const linhaInvs = btn.closest('tr').nextElementSibling;

    if (linhaInvs.style.display === 'none' || linhaInvs.style.display === '') {
      linhaInvs.style.display = 'table-row';
      btn.textContent = 'Mostrar Menos';
    } else {
      linhaInvs.style.display = 'none';
      btn.textContent = 'Mostrar Mais '; 
    }
}

function carregarDados() {
    let dadosSalvos = localStorage.getItem('viagem'); 
    if (dadosSalvos != null) {
        viagem = JSON.parse(dadosSalvos);
        console.log(viagem.length);
        exibirViagem();
    }
}

document.addEventListener('DOMContentLoaded', carregarDados);


//localStorage.clear();






















