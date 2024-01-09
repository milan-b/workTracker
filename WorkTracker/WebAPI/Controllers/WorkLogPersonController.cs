using Contracts;
using Entities.DataTransferObjects.Incoming;
using Entities.DataTransferObjects.Outcoming;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("worklogperson")]
    public class WorkLogPersonController : Controller
    {
        private IRepositoryWrapper _repository;

        public WorkLogPersonController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("{workLogId}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid workLogId)
        {
            IEnumerable<WorkLogPersonODTO> workLogEntries = (await _repository.WorkLogPerson.FindByCondition(o => o.WorkLogId == workLogId).ToListAsync())
                .Select(item => item.ToDTO());
            return Ok(workLogEntries);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] List<WorkLogPersonIDTO> workLogEntriesDTO)
        {

            List<WorkLogPerson> workLogEntries = workLogEntriesDTO.ToDAO();
            foreach (WorkLogPerson workLogEntry in workLogEntries)
            {
                _repository.WorkLogPerson.Create(workLogEntry);
            }
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] List<WorkLogPersonIDTO> workLogEntriesDTO)
        {
            List<WorkLogPerson> workLogEntries = workLogEntriesDTO.ToDAO();
            foreach (WorkLogPerson workLogEntry in workLogEntries)
            {
                _repository.WorkLogPerson.Update(workLogEntry);
            }
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{workLogEntryId}")]
        public async Task<IActionResult> Delete([FromRoute] Guid worklogEntryId)
        {
            var workLogEntry = await _repository.WorkLogPerson.FindByCondition(o => o.Id == worklogEntryId)
                .Include(o => o.WorkLog).FirstOrDefaultAsync();
            if (workLogEntry is null)
            {
                return NotFound($"WorkLogEntry with id:{worklogEntryId} does not exist.");
            }
            if (workLogEntry.WorkLog.IsApproved)
            {
                return BadRequest($"You can't change work log entries in approved work log.");
            }
            _repository.WorkLogPerson.Delete(workLogEntry);
            await _repository.SaveAsync();
            return Ok();
        }
    }
}
