using Contracts.Repository;
using Entities.Models;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class WorkLogPersonRepository : RepositoryBase<WorkLogPerson>, IWorkLogPersonRepository
    {
        public WorkLogPersonRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }
    }
}
