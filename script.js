const olPai = document.querySelector('.cart__items');
const computersList = document.querySelector('.items');
const precoTotal = document.querySelector('.cart');
const tagTotal = document.createElement('p');
const apagaButton = document.querySelector('.empty-cart');
let total = 0;
// coloca as imagens na tela com a classe.
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// função para criar elemento, dar uma class e inserir texto.
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
// cria os elementos com os dados nescessários, juntamente com as tags e classes e os nomes destes elementos.
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));  
  return section;
}
// calcula os prices que vão para lista do carrinho de compras.
const totalPrice = (valor) => {
  total += valor;
  tagTotal.innerHTML = total;
  tagTotal.className = 'total-price';
  precoTotal.appendChild(tagTotal);
};
// ao clicar no botão "esvaziar carrinho" limpa a lista do carrinho e também o local storage.
const apagaCarrinho = () => {
  apagaButton.addEventListener('click', () => {    
    olPai.innerHTML = '';
    tagTotal.innerHTML = '';
    localStorage.clear();
  });
};
// coloquei 2 parametros para resolver a adição e subtraçao dos valores quando são criados(+) e quando clica para remover(-). o split cria um  array com indice [0] até o $ e indice [1] que é o valor que preciso.
const getPrice = (target, signal) => {
  const price = target.innerHTML.split('$');
  console.log(price);
  totalPrice(signal * (parseFloat(price[1])));
};
// remove as li do carrinho de compras.
function cartItemClickListener({ target }) {
  target.remove();
  saveCartItems(olPai.innerHTML);
  getPrice(target, -1);    
}
// renomeia as chaves que vao formar o carrinho de compras, cria as li, da o nome da class, e o texto como vai aparecer. aplica tambem um listener para o click de apaga-los.
function createCartItemElement({ id: sku, title: name, price: salePrice }) {  
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// cria lista do carrinho de compras em string por isso uso parseFloat no price pra transformar em número.
const criaLista = async (idProduct) => {
  const { id, title, price } = await fetchItem(idProduct);
  const valores = createCartItemElement({ id, title, price });  
  totalPrice(parseFloat(price));
  return valores;  
};
// ao clicar no botão o item vai para lista do carrinho de compras e salva no local storage.
const addListenerButton = () => {  
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', async ({ target }) => {
    const itemId = getSkuFromProductItem(target.parentNode);
    const li = await criaLista(itemId);
    olPai.appendChild(li);
    saveCartItems(olPai.innerHTML);   
  }));  
};
// pega os itens salvos no local storage e coloca no carrinho quando atualizada e coloca um listener neles para que se limpar o carrinho eles sejam apagados tambem.
const getCartItemsLs = () => {
  const data = getSavedCartItems();  
  const ol = document.querySelector('ol');
  ol.innerHTML = data;
  ol.querySelectorAll('li').forEach((elem) => {
    elem.addEventListener('click', cartItemClickListener);
    getPrice(elem, 1);
  });  
};
// carrega a pagina com os itens que vem através do fetch.
const elementsItems = async () => {  
  const data = await fetchProducts('computador');
  computersList.innerHTML = '';
  data.results.forEach((elem) => {
    computersList.appendChild(createProductItemElement(elem));
  });
};

window.onload = async () => {  
  const spanCarregando = createCustomElement('span', 'loading', 'carregando');
  computersList.appendChild(spanCarregando);
  await elementsItems();  
  addListenerButton();
  getCartItemsLs(); 
  apagaCarrinho();
};
