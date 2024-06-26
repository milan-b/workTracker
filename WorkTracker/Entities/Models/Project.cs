﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    [Table("project")]
    public class Project: BaseEntity
    {
        public int Id { get; set; }

        [Required] 
        public String? Name { get; set; }

        public String? Description { get; set; }

        public ICollection<WorkLog>? WorkLogs { get; set; }
    }
}
