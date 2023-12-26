using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class ProjectIDTO
    {
        public string Name { get; init; }

        public string Description { get; init; }

        public string Customer { get; set; }

        public string City { get; set; }

    }

}
