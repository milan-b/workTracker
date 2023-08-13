using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects
{
    public record class ProjectDTO
    {
        public Guid Id  { get; init; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; init; }

        public string Description { get; init; }
    }

}
