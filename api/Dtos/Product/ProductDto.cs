using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Product
{
    public class ProductDto
    {
        public int Id {get; set;}
         [Required(ErrorMessage = "Ürün adı gereklidir.")]
        [StringLength(100, ErrorMessage = "Ürün adı en fazla 100 karakter olmalıdır.")]
        public string Name { get; set; } // Ürün adı

        [Required(ErrorMessage = "Ürün açıklaması gereklidir.")]
        [StringLength(500, ErrorMessage = "Ürün açıklaması en fazla 500 karakter olmalıdır.")]
        public string Description { get; set; } // Ürün açıklaması

        [Required(ErrorMessage = "Ürün fiyatı gereklidir.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Ürün fiyatı 0'dan büyük olmalıdır.")]
        public decimal Price { get; set; } // Ürün fiyatı

        [Required(ErrorMessage = "Stok miktarı gereklidir.")]
        [Range(0, int.MaxValue, ErrorMessage = "Stok miktarı negatif olamaz.")]
        public int Stock { get; set; } // Stok miktarı
    }
}