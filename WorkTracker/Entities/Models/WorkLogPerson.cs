using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    [Table("work_log_person")]
    public class WorkLogPerson: BaseEntity
    {
        public Guid Id { get; set; }

        [Required]
        [ForeignKey(nameof(WorkLog))]
        public Guid WorkLogId { get; set; }
        public WorkLog? WorkLog { get; set; }

        [Required]
        [ForeignKey(nameof(Person))]
        public int PersonId { get; set; }
        public Person? Person { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public String? Note { get; set; }
    }
}
