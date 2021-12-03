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
  // addListenerButton();
  return section;
}
function cartItemClickListener({ target }) {
  target.remove();
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
  return valores;
};

const addListenerButton = () => {
  const olPai = document.querySelector('.cart__items');
  console.log(olPai);
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', async ({ target }) => {
    const itemId = getSkuFromProductItem(target.parentNode);
    const li = await criaLista(itemId);
    olPai.appendChild(li);
  }));  
};

window.onload = async () => {  
  const computersList = document.querySelector('.items');
  const data = await fetchProducts('computador');
  data.forEach((elem) => {
    computersList.appendChild(createProductItemElement(elem));
  });
  addListenerButton();
};
