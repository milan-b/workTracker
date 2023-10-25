using Contracts;
using Entities.DataTransferObjects.Incoming;
using Entities.DataTransferObjects.Outcoming;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("worklogentry")]
    public class WorkLogEntryController : Controller
    {
        private IRepositoryWrapper _repository;

        public WorkLogEntryController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get([FromRoute] Guid id)
        //{
        //    var workLogEntry = await _repository.WorkLogEntry.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();

        //    return workLogEntry == null ? NotFound() : Ok(workLogEntry.ToDTO());
        //}


        [HttpGet("{workLogId}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid workLogId)
        {
            IEnumerable<WorkLogEntryODTO> workLogEntries = (await _repository.WorkLogEntry.FindByCondition(o => o.WorkLogId == workLogId).ToListAsync())
                .Select(item => item.ToDTO());
            return Ok(workLogEntries);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] List<WorkLogEntryIDTO> workLogEntriesDTO)
        {

            List<WorkLogEntry> workLogEntries = workLogEntriesDTO.ToDAO();
            foreach (WorkLogEntry workLogEntry in workLogEntries)
            {
                _repository.WorkLogEntry.Create(workLogEntry);
            }
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] List<WorkLogEntryIDTO> workLogEntriesDTO)
        {
            List<WorkLogEntry> workLogEntries = workLogEntriesDTO.ToDAO();
            foreach (WorkLogEntry workLogEntry in workLogEntries)
            {
                _repository.WorkLogEntry.Update(workLogEntry);
            }
            await _repository.SaveAsync();
            return Ok();
        }
    }
}
