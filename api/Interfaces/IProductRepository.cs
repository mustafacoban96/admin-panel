using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Models;

namespace api.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync(); // Tüm ürünleri getir
        Task<ProductDto> GetProductByIdAsync(int id); // Belirli bir ürünü ID ile getir
        Task AddProductAsync(CreateProductDto productDto); // Yeni ürün ekle
        Task UpdateProductAsync(int id,ProductDto productDto); // Mevcut ürünü güncelle
        Task DeleteProductAsync(int id); // Belirli bir ürünü sil
    }
}