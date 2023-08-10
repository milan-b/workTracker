using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    [Table("work_log_entry")]
    public class WorkLogEntry
    {
        public Guid Id { get; set; }

        [Required]
        [ForeignKey(nameof(WorkLog))]
        public Guid WorkLogId { get; set; }
        public WorkLog? WorkLog { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public String? Unit { get; set; }

        public String? Note { get; set; }
    }
}
