using Entities.DataTransferObjects.Outcoming;
using Entities.DataTransferObjects.Incoming;
using Entities.Models;

namespace Entities.Extensions
{
    public static class WorkLogProductExtensions
    {
        public static void Map(this WorkLogProduct workLogEntry, WorkLogProductIDTO workLogEntryDTO)
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

        public static List<WorkLogProduct> ToDAO(this List<WorkLogProductIDTO> workLogEntriesDTO) {
            return workLogEntriesDTO.Select(dto =>
            {
                var workLogEntry = new WorkLogProduct();
                workLogEntry.Map(dto);
                return workLogEntry;
            }).ToList();
        }

        public static WorkLogProductODTO ToDTO(this WorkLogProduct workLogEntry)
        {
            return new WorkLogProductODTO
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
