using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class ProductCategoryIDTO
    {
        public string Name { get; init; }

        public int? ParentId { get; init; }



    }

}
