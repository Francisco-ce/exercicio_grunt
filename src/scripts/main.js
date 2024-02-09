document.addEventListener('DOMContentLoaded', function() {

    let contador = 0;
    let linhas ='';
    const listaJogador = [];
    const listaId = [];
    const listaAleatoria = [];
    
    
    document.getElementById('form-interacao').addEventListener('submit', function(e) {
        e.preventDefault();

        adicionaLinha();
        atualizaTabela();
        atualizaNumeroJogador();
        // jogadorAleatorio();

    })
    
    document.getElementById('sorteador').addEventListener('submit', function(e) {
        e.preventDefault();
        
        jogadorAleatorio();
    })



    function adicionaLinha() {
        const nomeJogador = document.getElementById('nome-jogador');
        contador = contador+1;
        let linha = '<tr>';
        linha += `<td>${nomeJogador.value}</td>`;
        linha += `<td>${contador}</td>`;
        linha += `<td>Sim</td>`;
        linha += `</tr>`;
        linhas += linha;

        listaJogador.push(nomeJogador.value);
        listaId.push(contador);

        nomeJogador.value = '';
    }

    function atualizaTabela() {
        const corpoTabela = document.querySelector('tbody');
        corpoTabela.innerHTML = linhas;
    }

    function atualizaNumeroJogador() {
        const spanContador = document.querySelector('span');
        spanContador.innerHTML = contador+1;
    }

    function jogadorAleatorio() {
        const corpoLista = document.querySelector('h3');
        const randomElement = listaJogador[Math.floor(Math.random()*listaJogador.length)];
        alert(listaJogador.length);
        if (listaJogador.length!=0) {
            listaJogador.splice(listaJogador.indexOf(randomElement),1); 
            corpoLista.innerHTML = randomElement;
            
        } else {
            corpoLista.innerHTML = 'Sorteio Finalizado';
        }
        
    }

})