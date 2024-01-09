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
    [Route("person")]
    public class PersonController : Controller
    {

        private IRepositoryWrapper _repository;

        public PersonController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("{id:int:min(1)}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var person = await _repository.Person.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();

            return person == null ? NotFound() : Ok(person.ToDTO());
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<PersonODTO> persons = (await _repository.Person.FindAll().ToListAsync())
                .Select( item => item.ToDTO());
            return Ok(persons);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PersonIDTO personDTO)
        {
            var person = new Person();
            person.Map(personDTO);
            _repository.Person.Create(person);
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] PersonIDTO personDTO)
        {
            var person = await _repository.Person.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();
            if (person == null)
            {
                return NotFound($"Project with id:{id} does not exist.");
            }
            person.Map(personDTO);
            _repository.Person.Update(person);
            await _repository.SaveAsync();
            return Ok();
        }

    }
}
