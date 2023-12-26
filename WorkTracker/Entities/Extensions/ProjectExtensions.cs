using Entities.DataTransferObjects.Outcoming;
using Entities.DataTransferObjects.Incoming;
using Entities.Models;

namespace Entities.Extensions
{
    public static class ProjectExtensions
    {
        public static void Map(this Project project, ProjectIDTO projectDTO)
        {
            project.Name = projectDTO.Name;
            project.Description = projectDTO.Description;
            project.City = projectDTO.City;
            project.Customer = projectDTO.Customer;
        }

        public static ProjectODTO ToDTO(this Project project)
        {
            return new ProjectODTO
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                CreatedDate = project.CreatedDate,
                UpdatedDate = project.UpdatedDate,
                City = project.City,
                Customer = project.Customer
            };
        }

    }
}
