using Entities.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.DataTransferObjects.Outcoming
{
    public record class WorkLogProductODTO
    {
        public Guid Id { get; set; }

        public Guid WorkLogId { get; set; }

        public int ProductId { get; set; }
        public decimal Amount { get; set; }

        public String? Unit { get; set; }

        public String? Note { get; set; }
    }

}
