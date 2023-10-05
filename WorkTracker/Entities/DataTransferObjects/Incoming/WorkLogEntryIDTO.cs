
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class WorkLogEntryIDTO
    {

        public Guid? Id { get; set; }

        [Required]
        public Guid WorkLogId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public String? Unit { get; set; }

        public String? Note { get; set; }

    }

}
