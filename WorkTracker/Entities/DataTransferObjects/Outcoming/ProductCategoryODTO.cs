using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class ProductCategoryODTO
    {
        public int Id { get; set; }

        public string Name { get; init; }

        public int? ParentId { get; init; }

        public DateTime CreatedDate { get; init; }

        public DateTime UpdatedDate { get; init; }

    }

}
