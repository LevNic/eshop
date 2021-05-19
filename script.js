// https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json – получить список товаров;
// /getBasket.json – получить содержимое корзины;
// /addToBasket.json – добавить товар в корзину;
// /deleteFromBasket.json – удалить товар из корзины.


const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

function makeGETRequest(url, callback) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }

  // render() {
  //   return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  // }
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  // fetchGoods() {
  //   this.goods = [
  //     { title: 'Shirt', price: 150 },
  //     { title: 'Socks', price: 50 },
  //     { title: 'Jacket', price: 350 },
  //     { title: 'Shoes', price: 250 },
  //   ];
  // }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }

  // render() {
  //   let listHtml = '';
  //   this.goods.forEach(good => {
  //     const goodItem = new GoodsItem(good.title, good.price);
  //     listHtml += goodItem.render();
  //   });
  //   document.querySelector('.goods-list').innerHTML = listHtml;
  // }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  getTotalSumm() {
    const totalSum = this.goods.reduce((acc, item) => acc + item.price, 0);
    console.log(totalSum);
  }
}

// const list = new GoodsList;
// list.fetchGoods();
// list.getTotalSumm();
// list.render();

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});


class Basket extends GoodsList {
  constructor(...args) {
    super(...args);
  }
  clearAll() {

  }

  addItem() { }

  removeItem() { }

}

class BasketItem extends GoodsItem {
  constructor(...args) {
    super(...args);
    this.count = 0;
  }

  addOne() { }

  removeOne() { }
}