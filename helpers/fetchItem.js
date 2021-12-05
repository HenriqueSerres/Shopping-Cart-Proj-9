const idItemUrl = (elemid) => `https://api.mercadolibre.com/items/${elemid}`;

const fetchItem = async (elemid) => {
  if (elemid === undefined) {
    throw new Error('You must provide an url');
  }
  const urlId = idItemUrl(elemid);
  const result = await fetch(urlId);
  const data = await result.json();  
  return data;
};
// fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
