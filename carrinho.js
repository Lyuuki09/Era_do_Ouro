
function AdicionarCarrinho(nome, preco, dinheiro) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    let produtoExistente = carrinho.find(item => item.nome === nome)

    if (produtoExistente) {
        produtoExistente.quantidade += 1
    } else {
        carrinho.push({
            nome,
            preco,
            quantidade: 1,
            dinheiro,
            imagem: `url(img/${nome}.png)`
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    alert(`O produto ${nome} foi adicionado ao carrinho`)
}

function DiminuirItem(nome) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    let item = carrinho.find(item => item.nome === nome)

    if (item) {
        item.quantidade -= 1;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(item => item.nome !== nome)
            alert(`${nome} foi retirado do carrinho`)
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho))
    }

    AttCarrinho();
}


function RemoverItem(nome) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    carrinho = carrinho.filter(item => item.nome !== nome)

    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    alert(`${nome} foi retirado do carrinho`)
    AttCarrinho();
}


function AttCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    let itemContainer = document.getElementById('item')
    let containerTotal = document.getElementById('total')

    itemContainer.innerHTML = '';
    containerTotal.innerText = 'Valor Total:0';

    if (carrinho.length === 0) {
        
        let vazio=document.getElementById('fakecontainer')
        vazio.style.display=''
      
        return;
    }
    else{
        let vazio=document.getElementById('fakecontainer')
        vazio.style.display='none'
    }
    let totalAux = {}

    carrinho.forEach(item => {
        const elementContainer = document.createElement('div')
        elementContainer.classList.add('produto-carrinho')

        let detalhes = item.preco.map((preco, i) => 
            `${preco}  ${item.dinheiro[i]}`
        ).join(' ou ');

        let subtotal = item.preco.map((preco, index) => 
            `${preco * item.quantidade} ${item.dinheiro[index]}`
        );

        

        elementContainer.innerHTML = `
                <div id="container-item-carrinho">
                    <div id="fundo-item-carrinho">
                        <img src="img/${item.nome}.png" alt="Imagem do produto ${item.nome} ">
                    </div>
                    
                <div id="fundo-preco-carrinho"><p class='preco-carrinho'>Preço: ${detalhes}</p>
                </div>
                <div id="fundo-quantidade-carrinho">
                    <p class='quantidade-carrinho'>Quantidade: ${item.quantidade}</p>
                </div>
                <div id="fundo-subtotal-carrinho">
                    <p class='subtotal-carrinho'>Subtotal: ${subtotal.join(', ')}</p>
                </div>


                </div>
            </div>
                    <button class='button-carrinho' id="button-remover" onclick="RemoverItem('${item.nome}')">Remover</button>
                    <button class='button-carrinho' id="button-diminuir"onclick="DiminuirItem('${item.nome}')"> Diminuir em 1</button>
        `;
        itemContainer.appendChild(elementContainer)

        item.preco.forEach((preco, index) => {
            let unidade = item.dinheiro[index]
            let amount = preco * item.quantidade
            if (!totalAux[unidade]) {
                totalAux[unidade] = 0;
            }
            totalAux[unidade] += amount;
        });
    });

   
    let totalText = 'Total da compra:\n'
    let contador=0
    for (let unidade in totalAux) {
        contador++
        if (contador === Object.keys(totalAux).length - 1) {
            penultimaUnidade = unidade
        }
    }
    contador = 0;

    for (let unidade in totalAux) {
        contador++
        
    if (contador < Object.keys(totalAux).length) {
            totalText += `${totalAux[unidade]} ${unidade}, `
        } else {
            totalText += `${totalAux[unidade]} ${unidade} `
        }
    }

    containerTotal.innerHTML = `${totalText}`;
}

document.addEventListener('DOMContentLoaded', AttCarrinho);


