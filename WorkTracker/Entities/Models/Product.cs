

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("product")]
    public class Product
    {
        public Guid Id { get; set; }


        [Required]
        [StringLength(60, ErrorMessage = "Name can't be longer than 60 characters")]
        public String? Name { get; set; }

        [Required]
        // Example "m, mm, cm, km"
        public String? Units { get; set; }

        [Required]
        [ForeignKey(nameof(ProductCategory))]
        public Guid ProductCategoryId { get; set; }
        public ProductCategory? ProductCategory { get; set; }
    }
}
