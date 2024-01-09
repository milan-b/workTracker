using Entities.DataTransferObjects.Outcoming;
using Entities.DataTransferObjects.Incoming;
using Entities.Models;

namespace Entities.Extensions
{
    public static class PersonExtensions
    {
        public static void Map(this Person person, PersonIDTO personDTO)
        {
            person.FirstName = personDTO.FirstName;
            person.LastName = personDTO.LastName;
            person.PIN = personDTO.PIN;
        }

        public static PersonODTO ToDTO(this Person person)
        {
            return new PersonODTO
            {
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName
            };
        }

    }
}
