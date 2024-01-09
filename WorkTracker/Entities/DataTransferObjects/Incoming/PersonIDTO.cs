using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects.Incoming
{
    public record class PersonIDTO
    {

        [Required]
        public String FirstName { get; set; }

        [Required]
        public String LastName { get; set; }

        public String PIN { get; set; }



    }

}
