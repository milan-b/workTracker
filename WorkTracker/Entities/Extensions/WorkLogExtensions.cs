using Entities.DataTransferObjects.Outcoming;
using Entities.DataTransferObjects.Incoming;
using Entities.Models;

namespace Entities.Extensions
{
    public static class WorkLogExtensions
    {
        public static void Map(this WorkLog workLog, WorkLogIDTO workLogDTO)
        {
            workLog.IsApproved = workLogDTO.IsApproved;
            workLog.ProjectId = workLogDTO.ProjectId;
            workLog.Date = workLogDTO.Date;
        }

        public static WorkLogODTO ToDTO(this WorkLog workLog)
        {
            return new WorkLogODTO
            {
                Id = workLog.Id,
                Date = workLog.Date,
                ProjectId = workLog.ProjectId,
                IsApproved = workLog.IsApproved
            };
        }

    }
}
