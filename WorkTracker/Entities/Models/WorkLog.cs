
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace Entities.Models
{
    [Table("work_log")]
    public class WorkLog
    {
        public Guid Id { get; set; }


        [Required]
        public DateOnly Date { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool IsApproved { get; set; }

        [ForeignKey(nameof(Project))]
        public Guid ProjectId { get; set; }
        public Project? Project { get; set; }

        public ICollection<WorkLogEntry>? WorkLogEntries { get; set; }

        //TODO add USER
    }
}
