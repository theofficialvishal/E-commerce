import productModel from "../models/product.model.js";
import redis from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({}); //find all products
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featuredProducts");
    if (featuredProducts) {
      return res.status(200).json({ products: JSON.parse(featuredProducts) });
    }
    // if not found in redis then fetch from mongodb database
    // .lean() is gonna return plain javascript objects instead of mongodb documents
    // which is good for performance
    featuredProducts = await productModel.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ error: "Featured products not found" });
    }
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    return res.status(200).json({ products: featuredProducts });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return res.status(500).json({ error: "Failed to fetch featured products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "Products" });
    }
    const product = await productModel.create({
      name,
      description,
      price,
      category,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse?.secure_url
        : "",
    });
    return res.status(201).json({ product });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }
    await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await productModel.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await productModel.find({ category });
    res.json({ products });
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


async function updateFeaturedProductsCache() {
  try {
    // The lean() method is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance
    const featuredProducts = await productModel.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("error in update cache function");
  }
}