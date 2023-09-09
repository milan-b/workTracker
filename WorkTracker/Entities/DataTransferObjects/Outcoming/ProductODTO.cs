using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class ProductODTO
    {
        public int Id { get; set; }
        public string Name { get; init; }
        public int ProductCategoryId { get; set; }
        public String? Units { get; set; }

    }

}
