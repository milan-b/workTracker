using Entities.DataTransferObjects;
using Entities.Models;

namespace Entities.Extensions
{
    public static class ProjectExtensions
    {
        public static Project ToDAO(this ProjectDTO project)
        {
            return new Project
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description
            };
        }

        public static ProjectDTO ToDTO(this Project project)
        {
            return new ProjectDTO { 
                    Id = project.Id,
                    Name = project.Name,
                    Description = project.Description,
                    CreatedDate = project.CreatedDate,
                    UpdatedDate = project.UpdatedDate
                };
        }
    }
}
