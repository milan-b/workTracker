using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class PersonODTO
    {
        public int Id { get; set; }
        public String FirstName { get; set; }

        public String LastName { get; set; }
    }

}
