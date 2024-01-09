using Entities.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.DataTransferObjects.Outcoming
{
    public record class WorkLogPersonODTO
    {
        public Guid Id { get; set; }

        public Guid WorkLogId { get; set; }

        public int PersontId { get; set; }

        public decimal Amount { get; set; }

        public DateTime Date { get; set; }

        public String? Note { get; set; }
    }

}
