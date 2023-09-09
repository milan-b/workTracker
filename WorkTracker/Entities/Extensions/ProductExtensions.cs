using Entities.DataTransferObjects.Outcoming;
using Entities.DataTransferObjects.Incoming;
using Entities.Models;

namespace Entities.Extensions
{
    public static class ProductExtensions
    {
        public static void Map(this Product product, ProductIDTO productDTO)
        {
            product.Name = productDTO.Name;
            product.Units = productDTO.Units;
            product.ProductCategoryId = productDTO.ProductCategoryId;
        }

        public static ProductODTO ToDTO(this Product product)
        {
            return new ProductODTO
            {
                Id = product.Id,
                Name = product.Name,
                Units = product.Units,
                ProductCategoryId = product.ProductCategoryId
            };
        }

    }
}
