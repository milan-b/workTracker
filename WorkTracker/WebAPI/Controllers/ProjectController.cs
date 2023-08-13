using Contracts;
using Entities.DataTransferObjects;
using Entities.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("project")]
    public class ProjectController : Controller
    {

        private IRepositoryWrapper _repository;

        public ProjectController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<ProjectDTO> projects = (await _repository.Project.FindAll().ToListAsync())
                .Select( item => item.ToDTO());
            return Ok(projects);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectDTO projectDTO)
        {
            var project = projectDTO.ToDAO();
            _repository.Project.Create(project);
            await _repository.SaveAsync();
            return Ok();
        }

        
    }
}
