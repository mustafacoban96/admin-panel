using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Product;
using api.Models;
using AutoMapper;

namespace api.Helper
{
    public class AutoMapperHandler : Profile
    {
        public AutoMapperHandler(){
            CreateMap<Product, ProductDto>();
            CreateMap<ProductDto, Product>();



            // Mapping between CreateProductDto and Product
            CreateMap<CreateProductDto, Product>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Stock, opt => opt.MapFrom(src => src.Stock));
        }
    }
}