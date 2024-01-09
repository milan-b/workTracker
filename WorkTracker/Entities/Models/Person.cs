using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    [Table("person")]
    public class Person: BaseEntity
    {
        public int Id { get; set; }

        [Required] 
        public String FirstName { get; set; }

        [Required]
        public String LastName { get; set; }

        public String PIN { get; set; }

    }
}
