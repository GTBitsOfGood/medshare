const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const featureDataSchema = {
  _id: { id: false },
  count: Number,
  medianIndex: Number
};

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  features: [
    {
      _id: { id: false },
      productFeature: { type: ObjectId, ref: 'ProductFeatures' },
      name: featureDataSchema,
      category: featureDataSchema,
      subcategory: featureDataSchema
    }
  ]
});

productSchema.statics.insertProduct = async function featureFound(product) {
  return this.findOneAndUpdate(
    {
      productId: product.productId
    },
    product,
    {
      upsert: true,
      useFindAndModify: false,
      new: true
    }
  );
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
