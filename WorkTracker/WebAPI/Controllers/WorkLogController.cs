﻿using Contracts;
using Entities.DataTransferObjects.Incoming;
using Entities.DataTransferObjects.Outcoming;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("worklog")]
    public class WorkLogController : Controller
    {
        private IRepositoryWrapper _repository;

        public WorkLogController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var workLog = await _repository.WorkLog.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();

            return workLog == null ? NotFound() : Ok(workLog.ToDTO());
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<WorkLogODTO> workLogs = (await _repository.WorkLog.FindAll().ToListAsync())
                .Select(item => item.ToDTO());
            return Ok(workLogs);
        } 

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] WorkLogIDTO workLogDTO)
        {
            var workLog = new WorkLog();
            workLog.Map(workLogDTO);
            workLog.IsApproved = false;
            _repository.WorkLog.Create(workLog);
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] WorkLogIDTO workLogDTO)
        {
            var workLog = await _repository.WorkLog.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();
            if (workLog == null)
            {
                return NotFound($"WorkLog with id:{id} does not exist.");
            }
            workLog.Map(workLogDTO);
            _repository.WorkLog.Update(workLog);
            await _repository.SaveAsync();
            return Ok();
        }
    }
}