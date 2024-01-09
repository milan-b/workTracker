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
            workLog.Types = workLogDTO.Types;
            workLog.Note = workLogDTO.Note;
        }

        public static WorkLogODTO ToDTO(this WorkLog workLog)
        {
            return new WorkLogODTO
            {
                Id = workLog.Id,
                Date = workLog.Date,
                ProjectId = workLog.ProjectId,
                IsApproved = workLog.IsApproved,
                Types = workLog.Types,
                Note = workLog.Note
            };
        }

    }
}
