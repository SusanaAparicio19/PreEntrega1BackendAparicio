import { promises as fs } from 'fs';

export class CartsManager {
    static #lastId = 0;

    constructor() {
    this.carts = [];
  }

  async loadCartsFromFile() {
    try {
      const data = await fs.readFileSync('carts.json', 'utf8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  async saveCartsToFile() {
    await fs.writeFileSync('carts.json', JSON.stringify(this.carts), 'utf8');
  }

  static #generarNewCartId() {
    return ++CartsManager.#lastId;
  }
  createCart() {
    
const idCart = CartsManager.#generarNewCartId()
    const newCart = {
        idCart,
        products: []
    };

    this.carts.push(newCart);
    this.saveCartsToFile();

    return newCart;
  }

  getCartById(cartId) {
    return this.carts.find(cart => cart.id === cartId);
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    const existingProduct = cart.products.find(product => product.id === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveCartsToFile();

    return cart;
  }

  getProductsFromCart(cartId) {
    const cart = this.getCartById(cartId);
    return cart ? cart.products : [];
  }
}


