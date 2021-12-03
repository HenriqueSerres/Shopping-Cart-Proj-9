// let localArray = [];
const saveCartItems = (item) => {
  // localArray = [...localArray, item];
  localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
