﻿
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class WorkLogIDTO
    {
        [Required]
        public DateTime Date { get; set; }

        public bool IsApproved { get; set; }

        [Required]
        public int ProjectId { get; set; }

        public string Types { get; set; }

        public string Note { get; set; }

        //USER ID is missing

    }

}
