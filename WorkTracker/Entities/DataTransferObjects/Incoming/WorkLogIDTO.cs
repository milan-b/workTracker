
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class WorkLogIDTO
    {
        [Required]
        public DateOnly Date { get; set; }

        public bool IsApproved { get; set; }

        [Required]
        public int ProjectId { get; set; }

        //USER ID is missing

    }

}
