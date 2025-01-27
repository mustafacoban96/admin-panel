import * as yup from "yup";


//add product
export const addProductSchema = yup.object({
    name: yup.string()
      .required('Ürün adı gereklidir.')
      .max(100, 'Ürün adı en fazla 100 karakter olmalıdır.'),
    
    description: yup.string()
      .required('Ürün açıklaması gereklidir.')
      .max(500, 'Ürün açıklaması en fazla 500 karakter olmalıdır.'),
    
    price: yup.number()
      .required('Ürün fiyatı gereklidir.')
      .min(0.01, 'Ürün fiyatı 0\'dan büyük olmalıdır.')
      .typeError('Fiyat geçerli bir sayı olmalıdır.'),
    
    stock: yup.number()
      .required('Stok miktarı gereklidir.')
      .min(0, 'Stok miktarı negatif olamaz.')
      .integer('Stok miktarı tam sayı olmalıdır.')
      .typeError('Stok geçerli bir sayı olmalıdır.'),
  });


//update schema
export const UpdateProductSchema = yup.object({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().positive("Price must be positive").required("Price is required"),
  stock: yup.number().integer("Stock must be an integer").min(0, "Stock cannot be negative").required("Stock is required"),
});