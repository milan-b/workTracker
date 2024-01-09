using Contracts;
using Entities.DataTransferObjects.Incoming;
using Entities.DataTransferObjects.Outcoming;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("worklogproduct")]
    public class WorkLogProductController : Controller
    {
        private IRepositoryWrapper _repository;

        public WorkLogProductController(IRepositoryWrapper repository)
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
            IEnumerable<WorkLogProductODTO> workLogEntries = (await _repository.WorkLogProduct.FindByCondition(o => o.WorkLogId == workLogId).ToListAsync())
                .Select(item => item.ToDTO());
            return Ok(workLogEntries);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] List<WorkLogProductIDTO> workLogEntriesDTO)
        {

            List<WorkLogProduct> workLogEntries = workLogEntriesDTO.ToDAO();
            foreach (WorkLogProduct workLogEntry in workLogEntries)
            {
                _repository.WorkLogProduct.Create(workLogEntry);
            }
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] List<WorkLogProductIDTO> workLogEntriesDTO)
        {
            List<WorkLogProduct> workLogEntries = workLogEntriesDTO.ToDAO();
            foreach (WorkLogProduct workLogEntry in workLogEntries)
            {
                _repository.WorkLogProduct.Update(workLogEntry);
            }
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{workLogEntryId}")]
        public async Task<IActionResult> Delete([FromRoute] Guid worklogEntryId)
        {
            var workLogEntry = await _repository.WorkLogProduct.FindByCondition(o => o.Id == worklogEntryId)
                .Include(o => o.WorkLog).FirstOrDefaultAsync();
            if (workLogEntry is null)
            {
                return NotFound($"WorkLogEntry with id:{worklogEntryId} does not exist.");
            }
            if (workLogEntry.WorkLog.IsApproved)
            {
                return BadRequest($"You can't change work log entries in approved work log.");
            }
            _repository.WorkLogProduct.Delete(workLogEntry);
            await _repository.SaveAsync();
            return Ok();
        }
    }
}
