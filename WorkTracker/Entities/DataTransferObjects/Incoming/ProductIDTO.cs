using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class ProductIDTO
    {
        public string Name { get; init; }
        public int? ParentId { get; set; }
        public int ProductCategoryId { get; set; }
        public String? Units { get; set; }



    }

}
