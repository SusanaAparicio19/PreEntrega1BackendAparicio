import { Router } from "express";
import {CartsManager} from './CartsManager';

export const cartsRouter = Router()

const cartsManager = new CartsManager();

cartsManager.loadCartsFromFile();

cartsRouter.post('/', (req, res) => {
  const newCart = cartsManager.createCart();
  res.json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const products = cartsManager.getProductsFromCart(cartId);
  res.json(products);
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = parseInt(req.body.quantity);

  const updatedCart = cartsManager.addProductToCart(cartId, productId, quantity);
  res.json(updatedCart);
});

export {cartsRouter}


