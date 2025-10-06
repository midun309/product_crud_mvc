import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Product.countDocuments();

    return res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ message: "Failed to fetch products." });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, category } = req.body;

    if (!productName || !price) {
      return res.status(400).json({ message: "Product name and price are required." });
    }

    const newProduct = await Product.create({
      productName,
      description,
      price,
      category,
    });

    console.log("New Product Created:", newProduct);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    return res.status(400).json({ message: "Failed to create product." });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return res.status(500).json({ message: "Failed to fetch product." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price, category } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    product.productName = productName || product.productName;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;

    await product.save();

    console.log("Product updated:", product);

    return res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(400).json({ message: "Failed to update product." });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.deleteOne({ _id: id });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    console.log(`Product with ID ${id} deleted successfully`);

    return res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({ message: "Failed to delete product." });
  }
};
