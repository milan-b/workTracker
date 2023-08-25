using Entities.DataTransferObjects.Outcoming;
using Entities.DataTransferObjects.Incoming;
using Entities.Models;

namespace Entities.Extensions
{
    public static class ProductCategoryExtensions
    {
        public static void Map(this ProductCategory productCategory, ProductCategoryIDTO productCategoryDTO)
        {
            productCategory.Name = productCategoryDTO.Name;
            productCategory.ParentId = productCategoryDTO.ParentId;
        }

        public static ProductCategoryODTO ToDTO(this ProductCategory productCategory)
        {
            return new ProductCategoryODTO
            {
                Id = productCategory.Id,
                Name = productCategory.Name,
                ParentId = productCategory.ParentId,
                CreatedDate = productCategory.CreatedDate,
                UpdatedDate = productCategory.UpdatedDate
            };
        }

    }
}
