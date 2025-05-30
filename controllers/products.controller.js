import { ProductRepository } from '../models/Repositories.js';
import { pool } from '../config/db.js';

const getProducts = async (req, res) => {
  try {
    const products = await ProductRepository.selectAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Falta el nombre del producto' });
    const products = await ProductRepository.selectByName(name);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const product = await ProductRepository.select(id, connection);
    if (!product || product.length === 0)
      return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    connection.release();
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, image } = req.body;
    await ProductRepository.insert({ name, price, stock, image });
    res.status(201).json({ message: 'Producto creado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, image } = req.body;
    const result = await ProductRepository.update(parseInt(id), {
      name,
      price,
      stock,
      image,
    });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Producto no encontrado' });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getProduct, getProducts, createProduct, editProduct, searchProducts };
