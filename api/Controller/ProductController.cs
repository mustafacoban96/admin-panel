using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
         private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return Ok(products);
        }

        // ID'ye göre ürün getir
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
                return NotFound($"Product with ID {id} not found.");

            return Ok(product);
        }

        // Yeni ürün ekle
        [HttpPost]
        //[Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddProduct([FromBody] CreateProductDto productDto)
        {
            if (productDto == null)
                return BadRequest("Invalid product data."); // Burayı düzelttim

            await _productRepository.AddProductAsync(productDto);
            return Ok("Porduct was created");
        }

        // Ürünü güncelle
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct([FromRoute]int id, [FromBody] ProductDto productDto)
        {
            

            var existingProduct = await _productRepository.GetProductByIdAsync(id);
            if (existingProduct == null)
                return NotFound($"Product with ID {id} not found.");

            await _productRepository.UpdateProductAsync(id,productDto);
            return Ok("product is updated");
        }

        // Ürünü sil
        [HttpDelete("{id:int}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var existingProduct = await _productRepository.GetProductByIdAsync(id);
            if (existingProduct == null)
                return NotFound("Product with ID not found.");

            await _productRepository.DeleteProductAsync(id);
            return Ok("Product were deleted");
        }
        
    }

    
}