const computerUrl = (product) => `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

const fetchProducts = async (computador) => {
  const url = computerUrl(computador);
  const result = await fetch(url);
  const data = await result.json();
  const { results } = data;
  // console.log(results);
  return results;
};
// fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
