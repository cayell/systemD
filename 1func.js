var viagem = [];
var veiculo = [];
var volta = [];
//var x = 0;

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
    
    if(verifyPlaca(model)==2){
        alert('Veiculo em uso!');
        return;
    }
    else if(verifyPlaca(model)==0){
        alert('Veiculo nao cadastrado!');
        return;
    }
    //x++;
    viagem.push({
        codigo: cod,
        modelo: model,
        condutor: moto,
        destino: dest,
        distancia: dist,
        horaSaida: horaS,
        horaChegada: "Em transito",
        peso: 1
    });
    attlocal(model, dest);
    volta.push({horaS: "----", condutor: "Sem dados", horaC: "----", aux: cod});
    //0-finalizada, 1,1.5-transito, 2-pendente
    
    localStorage.setItem('viagem', JSON.stringify(viagem));
    localStorage.setItem('veiculo', JSON.stringify(veiculo));
    localStorage.setItem('volta', JSON.stringify(volta));
    //localStorage.setItem('x', x);

    exibirViagem();

    //document.getElementById("saida").innerHTML = JSON.stringify(viagem[x++], null, 2);
    //document.getElementById("saida").innerHTML = "Ultimo Registro: " + hora() + "\nQuantidade de Registros: " + x;
    //+ viagem[viagem.length -1].codigo;
}
function verifyPlaca(x){
    for(var i = 0; i<veiculo.length; i++){
        console.log(`Placa verificada: ${x}, Placa no registro: ${veiculo[i].placa}, Localização: ${veiculo[i].loc}`);
        if(veiculo[i].placa == x){
            if(veiculo[i].loc != "Garagem"){
                return 2;
            }
            else if (veiculo[i].loc == undefined || veiculo[i].loc == "Garagem") {
                return 1;
            }
        }
    }
    return 0;
}
function saidaDestino() {
    let cod = document.getElementById('codigo').value;
    let moto = document.getElementById('condutor').value;
    let horaS = new Date().toLocaleTimeString();

    if(cod == '' || moto == ''){
        alert("Campos essencias nao preenchidos!");
        return;
    }

    for (var i = 0; i < viagem.length; i++) {
        if (viagem[i].codigo ==  cod && viagem[i].peso == 2) {
            viagem[i].peso = 1.5;
            for (var j = 0; j < veiculo.length; j++) {
                if (veiculo[j].placa == viagem[i].modelo) {
                    veiculo[j].loc = "A caminho da Petrolina";
                    localStorage.setItem('veiculo', JSON.stringify(veiculo));
                }
            }
            let nome = moto.split(' ')[0];
            for(var j = 0; j<volta.length; j++){
                if(viagem[i].codigo == volta[j].aux){
                  //let hora = new Date().toLocaleTimeString();
                  volta[j].horaS = horaS;
                  volta[j].condutor = moto;
                  
                }
            }
            localStorage.setItem('volta', JSON.stringify(volta));
            localStorage.setItem('viagem', JSON.stringify(viagem));
        }
    }
    exibirViagem();
}

function attlocal(x, y){
    for(var i = 0; i < veiculo.length; i++){
        if(veiculo[i].placa == x){
            veiculo[i].loc = "A caminho de: " + y; 
        }
    }
    
}
function registroChegada(){
    let cod = document.getElementById('codigo1').value;

    if(!verifyCod(cod) || cod == null){
        alert('Digite um codigo valido!');
        return;
    }
    
    for(var i=0; i<viagem.length;i++){
        if(viagem[i].codigo == cod){
            if(viagem[i].peso == 1){
                viagem[i].horaChegada = new Date().toLocaleTimeString();

                for(var j = 0; j < veiculo.length; j++){
                    if(veiculo[j].placa == viagem[i].modelo){
                        veiculo[j].loc = viagem[i].destino;
                        localStorage.setItem('veiculo', JSON.stringify(veiculo));
                    }
                }
                viagem[i].peso = 2;
                localStorage.setItem('viagem', JSON.stringify(viagem));
            }
            else if(viagem[i].peso == 1.5){
                for(var j = 0; j < veiculo.length; j++){
                    if(veiculo[j].placa == viagem[i].modelo){
                        veiculo[j].loc = "Garagem";
                        localStorage.setItem('veiculo', JSON.stringify(veiculo));
                    }
                }
                for(var j = 0; j<volta.length; j++){
                  if(viagem[i].codigo == volta[j].aux){
                    let hora = new Date().toLocaleTimeString();
                    volta[j].horaC = hora;
                    localStorage.setItem('volta', JSON.stringify(volta));
                  }
                }
                viagem[i].peso = 0;
                localStorage.setItem('viagem', JSON.stringify(viagem));
            }

            exibirViagem();
            //x--;
        }
        
    }
    
}
function cadastroVeiculo(){
    let cod = document.getElementById('codigoV').value;
    let model = document.getElementsByName('modelos')[0].value;
    let placa = document.getElementById('placa').value;

    if(verifyCod(cod)){
        alert('Codigo ja existente!');
        return;
    }
    if(cod == '' || model == '' || placa == ''){
        alert('Campos vazios!');
        return;
    }
    veiculo.push({
        codigo: cod,
        modelo: model,
        placa: placa,
        loc: "Garagem"
    }) 

    localStorage.setItem('veiculo', JSON.stringify(veiculo));
    exibirVeiculos();
}
function exibirVeiculos(){
    let tabela = document.getElementById('tabelaV').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    for (let i = 0; i < veiculo.length; i++) {
        let linha = tabela.insertRow();

        let codv = linha.insertCell(0);
        let modelo = linha.insertCell(1);
        let placa = linha.insertCell(2);
        let local = linha.insertCell(3);

        //usar getelement e inner para adicionar td oculto(e posivel adicionar botao)
        codv.innerHTML = veiculo[i].codigo;
        modelo.innerHTML = veiculo[i].modelo;
        placa.innerHTML = veiculo[i].placa;
        local.innerHTML = veiculo[i].loc;
    }

}

function verifyCod(x){
    if(document.getElementById('tabela')){
        for(var i = 0; i<viagem.length; i++){
            if(viagem[i].codigo==x){
                return 1;
            }
        }
        return 0;
    }
    else{
        for(var i = 0; i<veiculo.length;i++){
            if(veiculo[i].codigo == x && veiculo != null){
                return 1;
            }
        }
        return 0;
    }
}
function hora(){
    const agora = new Date();
    const hora = agora.getHours();
    const min = agora.getMinutes();

    const horarioAtual = `${hora}:${min}`;

    return horarioAtual;
}

function exibirViagem() {
    let tabela = document.getElementById('tabela').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
    let tabela1 = document.getElementById('tabela1').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
    let tabela2 = document.getElementById('tabela2').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';
    tabela1.innerHTML = '';
    tabela2.innerHTML = '';
    
    for (let i = 0; i < viagem.length; i++) {
        if(viagem[i].peso == 1 || viagem[i].peso == 1.5){
            document.getElementById('tabela').style.display = "table";
            let linha = tabela.insertRow();

            let cod = linha.insertCell(0);
            let condutor = linha.insertCell(1);
            let dest = linha.insertCell(2);
            let butao = linha.insertCell(3);

            //usar getelement e inner para adicionar td oculto(e posivel adicionar botao)
            cod.innerHTML = viagem[i].codigo;
            condutor.innerHTML = viagem[i].condutor;
            dest.innerHTML = viagem[i].destino;
            butao.innerHTML = '<button type="button" onclick="mostrarMais(this)">Mostrar Mais</button>'

            let linhaInv = tabela.insertRow();
            linhaInv.classList.add('linhaInvs');

            //const date = new Date().toLocaleTimeString();

            linhaInv.innerHTML = '<td colspan="2">' + 
            '<strong>Saida Garagem: </strong>' +  viagem[i].horaSaida +
            '<br><strong>Distancia: </strong>' + viagem[i].distancia + ' km' +
            '<br><strong>Chegada Destino: </strong>' + viagem[i].horaChegada +
            '</td>' +
            '<td colspan="2">' + 
            '<strong>Saida Destino: </strong>' +  volta[i].horaS +
            '<br><strong>Condutor na Volta: </strong>' + volta[i].condutor +
            '<br><strong>Chegada Garagem: </strong>' + volta[i].horaC +
            '</td>';

        }
        if(viagem[i].peso == 2){
            document.getElementById('tabela1').style.display = "table";
            let linha = tabela1.insertRow();

            let cod = linha.insertCell(0);
            let condutor = linha.insertCell(1);
            let dest = linha.insertCell(2);
            let butao = linha.insertCell(3);

            //usar getelement e inner para adicionar td oculto(e posivel adicionar botao)
            cod.innerHTML = viagem[i].codigo;
            condutor.innerHTML = viagem[i].condutor;
            dest.innerHTML = viagem[i].destino;
            butao.innerHTML = '<button type="button" onclick="mostrarMais(this)">Mostrar Mais</button>'

            let linhaInv = tabela1.insertRow();
            linhaInv.classList.add('linhaInvs');

            //const date = new Date().toLocaleTimeString();

            linhaInv.innerHTML = '<td colspan="2">' + 
            '<strong>Saida Garagem: </strong>' +  viagem[i].horaSaida +
            '<br><strong>Distancia: </strong>' + viagem[i].distancia + ' km' +
            '<br><strong>Chegada Destino: </strong>' + viagem[i].horaChegada +
            '</td>' +
            '<td colspan="2">' + 
            '<strong>Saida Destino: </strong>' +  volta[i].horaS +
            '<br><strong>Condutor na Volta: </strong>' + volta[i].condutor +
            '<br><strong>Chegada Garagem: </strong>' + volta[i].horaC +
            '</td>';
        }
        if(viagem[i].peso == 0){
            document.getElementById('tabela2').style.display = "table";
            let linha = tabela2.insertRow();

            let cod = linha.insertCell(0);
            let condutor = linha.insertCell(1);
            let dest = linha.insertCell(2);
            let butao = linha.insertCell(3);

            //usar getelement e inner para adicionar td oculto(e posivel adicionar botao)
            cod.innerHTML = viagem[i].codigo;
            condutor.innerHTML = viagem[i].condutor;
            dest.innerHTML = viagem[i].destino;
            butao.innerHTML = '<button type="button" onclick="mostrarMais(this)">Mostrar Mais</button>'

            let linhaInv = tabela2.insertRow();
            linhaInv.classList.add('linhaInvs');

            //const date = new Date().toLocaleTimeString();

            linhaInv.innerHTML = '<td colspan="2">' + 
            '<strong>Saida Garagem: </strong>' +  viagem[i].horaSaida +
            '<br><strong>Distancia: </strong>' + viagem[i].distancia + ' km' +
            '<br><strong>Chegada Destino: </strong>' + viagem[i].horaChegada +
            '</td>' +
            '<td colspan="2">' + 
            '<strong>Saida Destino: </strong>' +  volta[i].horaS +
            '<br><strong>Condutor na Volta: </strong>' + volta[i].condutor +
            '<br><strong>Chegada Garagem: </strong>' + volta[i].horaC +
            '</td>';
        }
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
    let dadosViagem = localStorage.getItem('viagem'); 
    let dadosVeiculo = localStorage.getItem('veiculo');
    let dadosVolta = localStorage.getItem('volta');

    viagem = dadosViagem ? JSON.parse(dadosViagem) : [];
    veiculo = dadosVeiculo ? JSON.parse(dadosVeiculo) : [];
    volta = dadosVolta ? JSON.parse(dadosVolta) : [];

    if (dadosViagem != null && document.getElementById('tabela')) {
        //viagem = JSON.parse(dadosViagem);
        //veiculo = JSON.parse(dadosVeiculo);
        console.log(viagem.length);
        console.log(veiculo);
        exibirViagem();
    }
    else if(dadosVeiculo != null && document.getElementById('tabelaV')){

        console.log(veiculo);
        exibirVeiculos();
    }

    //x = localStorage.getItem('x');
}

document.addEventListener('DOMContentLoaded', carregarDados);


//localStorage.clear();

