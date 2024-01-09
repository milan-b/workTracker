using Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IRepositoryWrapper 
    { 
        IProductRepository Product { get; }
        IProjectRepository Project { get; }
        IPersonRepository Person { get; }
        IProductCategoryRepository ProductCategory { get; }
        IWorkLogRepository WorkLog { get; }
        IWorkLogProductRepository WorkLogProduct { get; }
        IWorkLogPersonRepository WorkLogPerson { get; }


        Task SaveAsync(); 
    }
}
