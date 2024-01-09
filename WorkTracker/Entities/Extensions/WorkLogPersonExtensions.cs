using Entities.DataTransferObjects.Outcoming;
using Entities.DataTransferObjects.Incoming;
using Entities.Models;

namespace Entities.Extensions
{
    public static class WorkLogPersonExtensions
    {
        public static void Map(this WorkLogPerson workLogEntry, WorkLogPersonIDTO workLogEntryDTO)
        {
            workLogEntry.Date = workLogEntryDTO.Date;
            workLogEntry.Amount = workLogEntryDTO.Amount;
            workLogEntry.Note = workLogEntryDTO.Note;
            workLogEntry.PersonId = workLogEntryDTO.PersontId;
            workLogEntry.WorkLogId = workLogEntryDTO.WorkLogId;
            if(workLogEntryDTO.Id != null)
            {
                workLogEntry.Id = (Guid)workLogEntryDTO.Id;
            }
            
        }

        public static List<WorkLogPerson> ToDAO(this List<WorkLogPersonIDTO> workLogEntriesDTO) {
            return workLogEntriesDTO.Select(dto =>
            {
                var workLogEntry = new WorkLogPerson();
                workLogEntry.Map(dto);
                return workLogEntry;
            }).ToList();
        }

        public static WorkLogPersonODTO ToDTO(this WorkLogPerson workLogEntry)
        {
            return new WorkLogPersonODTO
            {
                Date = workLogEntry.Date,
                Amount = workLogEntry.Amount,
                Note = workLogEntry.Note,
                PersontId = workLogEntry.PersonId,
                WorkLogId = workLogEntry.WorkLogId,
                Id = workLogEntry.Id
            };
        }

    }
}
