qnt_erros = 0 

cabeca = document.getElementById('cabeca')
corpo = document.getElementById('corpo')
braco_01 = document.getElementById('arm01')
braco_02 = document.getElementById('arm02')
perna_01 = document.getElementById('leg01')
perna_02 = document.getElementById('leg02')
palavras_possiveis = [
    {
        palavra: 'COMPUTADOR',
        dica: 'objeto'
    },

    {
        palavra: 'GARRAFINHA',
        dica: 'objeto'
    },

    {
        palavra: 'MOSCOU',
        dica: 'país'
    },
    {
        palavra: 'ESCRIVANINHA',
        dica: 'objeto'
    },
    {
        palavra: 'HORROROSO',
        dica: 'adjetivo'
    },
    {
        palavra: 'PERFUMARIA',
        dica: ' lugar'
    },
    {
        palavra: 'PINGUIM',
        dica: 'animal'
    },
    {
        palavra: 'MERGULHADOR',
        dica: 'profissão'
    },
    {
        palavra: 'AMPULHETA',
        dica: 'objeto'
    },
    {
        palavra: 'LUXEMBURGO',
        dica: 'lugar'
    },
    {
        palavra: 'STARBUCKS',
        dica: 'empresa'
    },
    {
        palavra: 'HEADSET',
        dica: 'objeto'
    },
    {
        palavra: 'MOCHILA',
        dica: 'objeto'
    },
    {
        palavra: 'MICROSOFT',
        dica: 'empresa'
    },
    {
        palavra: 'CELULAR',
        dica: 'objeto'
    },
    {
        palavra: 'ELEFANTE',
        dica: 'animal'
    },
]

function restartGame(){
    let reser_game = confirm('Deseja jogar de novo?') 
    if(reser_game){
        location.reload() 
     } else {
        location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
     }
}

function perdeu(){
    alert(`Você é ruim!\nPERDEU!\nA palavra era: ${palavra_sorteada}`)
    restartGame()
}
function ganhou(){
    alert(`PARABÉNS!\nVocê Venceu\nA palavra era: ${palavra_sorteada}`)
    restartGame()
}
function desenha_boneco(qnt_erros){
    switch (qnt_erros){
        case 1:
            cabeca.style.visibility = 'visible'
            return
        case 2:
            corpo.style.visibility = 'visible'
            return
        case 3:
            braco_01.style.visibility = 'visible'
            return
        case 4:
            braco_02.style.visibility = 'visible'
            return
        case 5:
            perna_01.style.visibility = 'visible'
            return
        case 6:
            perna_02.style.visibility = 'visible'
            perdeu()
            return
    }
}

//Gera palavra
let index = (Math.random() * palavras_possiveis.length).toFixed()
if(index > 15 || index < 0) index = 5
let palavra_sorteada = palavras_possiveis[index].palavra
let dica_palavra_sorteada = palavras_possiveis[index].dica
let letras_usadas = []

let palavra_hidden = []
    for(let i = 0;i<palavra_sorteada.length;i++){
        palavra_hidden[i] = '_'
    }
let vetor_palavra_sorteada = []
    for(let i = 0; i<palavra_sorteada.length;i++){
        vetor_palavra_sorteada[i] = palavra_sorteada.substring(i,i+1)
    }

setDica(dica_palavra_sorteada)
setPalavra()

document.getElementById('verifica').addEventListener('click', () => {
       preGame()
})

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if(keyName == 'Enter'){
        preGame()
    }
  });

  function preGame(){
    let input = document.getElementById('input')
    let chute = input.value
    chute = chute.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toUpperCase()

    if(chute == palavra_sorteada){
        ganhou()
    }
    else if(chute.length < 1 || chute.length > 1 || chute.search(/[a-z]/gi)){
        alert('Digite uma letra!')
    }
    else if(letras_usadas.includes(chute)) {
        alert('Você já tentou essa letra!')
    }
    else if(!vetor_palavra_sorteada.includes(chute)){
        qnt_erros++
        desenha_boneco(qnt_erros)
        setLetrasUsadas(chute)
    } 
    else {
        game(chute, vetor_palavra_sorteada)
        setLetrasUsadas(chute)
    } 
    input.value = ''
    input.focus()
  }



function setLetrasUsadas(chute){
    letras_usadas.push(chute)
    let container_letras_usadas = document.getElementById('container-letras-usadas')
    let usadas = document.createElement('p')
    usadas.className = 'texto'
    usadas.innerHTML = letras_usadas
    container_letras_usadas.innerHTML = ''
    container_letras_usadas.appendChild(usadas)
}

function setDica(dica_palavra_sorteada){
    let dica_container = document.getElementById('dica-container')
    let texto_dica = document.createElement('p')
    let dica = `Dica: É um(a) ${dica_palavra_sorteada}`

    texto_dica.id ='dica'
    texto_dica.className = 'texto'
    texto_dica.innerHTML = dica
    dica_container.appendChild(texto_dica)
}

function setPalavra() {
    let palavra_container = document.getElementById('palavra-container')
    let campo_palavra = document.createElement('p')
    campo_palavra.id = 'palavra'
    campo_palavra.className = 'texto'
    campo_palavra.innerHTML = palavra_hidden.join('')
    palavra_container.innerHTML = ''
    palavra_container.appendChild(campo_palavra)
    if(!palavra_hidden.includes('_')){
        ganhou()
    } 
}

function game(chute, vetor_palavra_sorteada){
    for(let i in vetor_palavra_sorteada){
        if(vetor_palavra_sorteada[i] == chute){
            palavra_hidden[i] = chute
        }
    }
    setPalavra(palavra_hidden.join('').toString())

    
}
