using Contracts.Repository;
using Entities;
using Entities.Models;


namespace Repository
{
    public class WorkLogRepository : RepositoryBase<WorkLog>, IWorkLogRepository
    {
        public WorkLogRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }
    }
}
