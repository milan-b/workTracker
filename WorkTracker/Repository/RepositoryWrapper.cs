using Contracts;
using Contracts.Repository;
using Entities;
using Entities.Models;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    { 
        private RepositoryContext _repoContext; 
        private IProjectRepository _project;
        private IProductRepository _product;
        private IProductCategoryRepository _productCategory;
        private IWorkLogRepository _workLog;
        private IWorkLogProductRepository _workLogEntry;

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }


        public IProjectRepository Project 
        { 
            get 
            { 
                if (_project == null) 
                {
                    _project = new ProjectRepository(_repoContext); 
                } 
                return _project; 
            } 
        }
        public IProductRepository Product
        {
            get
            {
                if (_product == null)
                {
                    _product = new ProductRepository(_repoContext);
                }
                return _product;
            }
        }
        public IProductCategoryRepository ProductCategory
        {
            get
            {
                if (_productCategory == null)
                {
                    _productCategory = new ProductCategoryRepository(_repoContext);
                }
                return _productCategory;
            }
        }

        public IWorkLogRepository WorkLog
        {
            get
            {
                if (_workLog == null)
                {
                    _workLog = new WorkLogRepository(_repoContext);
                }
                return _workLog;
            }
        }
        public IWorkLogProductRepository WorkLogProduct
        {
            get
            {
                if (_workLogEntry == null)
                {
                    _workLogEntry = new WorkLogEntryRepository(_repoContext);
                }
                return _workLogEntry;
            }
        }
        
        public async Task SaveAsync() 
        {
            await _repoContext.SaveChangesAsync();
        } 
    }
}
