const olPai = document.querySelector('.cart__items');
const computersList = document.querySelector('.items');
const precoTotal = document.querySelector('.cart');
const tagTotal = document.createElement('p');
let total = 0;
const apagaButton = document.querySelector('.empty-cart');
tagTotal.className = 'total-price';
precoTotal.appendChild(tagTotal);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));  
  return section;
}

const totalPrice = (valor) => {
  total += valor;
  tagTotal.innerHTML = total;
};

const apagaCarrinho = () => {
  apagaButton.addEventListener('click', () => {
    // const classTotalPrice = document.querySelectorAll('.cart__item');
    // classTotalPrice.innerHTML = '';
    olPai.innerHTML = '';
    tagTotal.innerHTML = '';
    localStorage.clear();
  });
};

const getPrice = (target, signal) => {
  const price = target.innerHTML.split('$');
  totalPrice(signal * (parseFloat(price[1])));
};

function cartItemClickListener({ target }) {
  target.remove();
  saveCartItems(olPai.innerHTML);
  getPrice(target, -1);    
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {  
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const criaLista = async (idProduct) => {
  const { id, title, price } = await fetchItem(idProduct);
  const valores = createCartItemElement({ id, title, price });  
  totalPrice(parseFloat(price));
  return valores;  
};

const addListenerButton = () => {
  console.log(olPai);
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', async ({ target }) => {
    const itemId = getSkuFromProductItem(target.parentNode);
    const li = await criaLista(itemId);
    olPai.appendChild(li);
    saveCartItems(olPai.innerHTML);   
  }));  
};

const getCartItemsLs = () => {
  const data = getSavedCartItems();  
  const ol = document.querySelector('ol');
  ol.innerHTML = data;
  ol.querySelectorAll('li').forEach((elem) => {
    elem.addEventListener('click', cartItemClickListener);
    getPrice(elem, 1);
  });  
};

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
