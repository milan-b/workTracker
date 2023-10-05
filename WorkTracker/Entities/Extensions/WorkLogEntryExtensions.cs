using Entities.DataTransferObjects.Outcoming;
using Entities.DataTransferObjects.Incoming;
using Entities.Models;

namespace Entities.Extensions
{
    public static class WorkLogEntryExtensions
    {
        public static void Map(this WorkLogEntry workLogEntry, WorkLogEntryIDTO workLogEntryDTO)
        {
            workLogEntry.Unit = workLogEntryDTO.Unit;
            workLogEntry.Amount = workLogEntryDTO.Amount;
            workLogEntry.Note = workLogEntryDTO.Note;
            workLogEntry.ProductId = workLogEntryDTO.ProductId;
            workLogEntry.WorkLogId = workLogEntryDTO.WorkLogId;
            if(workLogEntryDTO.Id != null)
            {
                workLogEntry.Id = (Guid)workLogEntryDTO.Id;
            }
            
        }

        public static List<WorkLogEntry> ToDAO(this List<WorkLogEntryIDTO> workLogEntriesDTO) {
            return workLogEntriesDTO.Select(dto =>
            {
                var workLogEntry = new WorkLogEntry();
                workLogEntry.Map(dto);
                return workLogEntry;
            }).ToList();
        }

        public static WorkLogEntryODTO ToDTO(this WorkLogEntry workLogEntry)
        {
            return new WorkLogEntryODTO
            {
                Unit = workLogEntry.Unit,
                Amount = workLogEntry.Amount,
                Note = workLogEntry.Note,
                ProductId = workLogEntry.ProductId,
                WorkLogId = workLogEntry.WorkLogId,
                Id = workLogEntry.Id
            };
        }

    }
}
