﻿using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Outcoming
{
    public record class ProjectODTO
    {
        public int Id { get; init; }

        //[Required(ErrorMessage = "Name is required")]
        public string Name { get; init; }

        public string? Description { get; init; }

        public DateTime CreatedDate { get; init; }

        public DateTime UpdatedDate { get; init; }
    }

}