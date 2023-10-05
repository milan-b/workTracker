namespace Entities.DataTransferObjects.Outcoming
{
    public record class WorkLogODTO
    {
        public Guid Id { get; set; }
        public DateOnly Date { get; set; }
        public bool IsApproved { get; set; }
        public int ProjectId { get; set; }
    }

}
