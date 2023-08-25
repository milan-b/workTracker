using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("category")]
    public class ProductCategory: BaseEntity
    {
        public int Id { get; set; }


        [StringLength(60, ErrorMessage = "Name can't be longer than 60 characters")]
        [Required(ErrorMessage = "Name is required")]
        public String? Name { get; set; }


        [ForeignKey(nameof(ProductCategory))]
        public int? ParentId { get; set; }
        public ProductCategory? Parent { get; set; }

        public ICollection<Product>? Products { get; set; }

    }
}
