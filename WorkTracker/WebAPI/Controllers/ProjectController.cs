using Contracts;
using Entities.DataTransferObjects.Incoming;
using Entities.DataTransferObjects.Outcoming;
using Entities.Extensions;
using Entities.Models;
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
            IEnumerable<ProjectODTO> projects = (await _repository.Project.FindAll().ToListAsync())
                .Select( item => item.ToDTO());
            return Ok(projects);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectIDTO projectDTO)
        {
            var project = new Project();
            project.Map(projectDTO);
            _repository.Project.Create(project);
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ProjectIDTO projectDTO)
        {
            var project = await _repository.Project.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();
            if (project == null)
            {
                return NotFound($"Project with id:{id} does not exist.");
            }
            project.Map(projectDTO);
            _repository.Project.Update(project);
            await _repository.SaveAsync();
            return Ok();
        }

        //[HttpDelete("{id:int:min(1)}")]


    }
}
