const computerUrl = (product) => `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

const fetchProducts = async (computador) => {
  if (computador === undefined) {
    throw new Error('You must provide an url');
  }
  const url = computerUrl(computador);
  const result = await fetch(url);
  return result.json();  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };  
}
