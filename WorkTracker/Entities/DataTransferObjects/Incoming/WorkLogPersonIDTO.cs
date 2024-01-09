
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class WorkLogPersonIDTO
    {

        public Guid? Id { get; set; }

        [Required]
        public Guid WorkLogId { get; set; }

        [Required]
        public int PersontId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public String? Note { get; set; }

    }

}
