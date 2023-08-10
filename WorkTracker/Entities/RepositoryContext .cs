
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace Entities
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<Project>? Projects { get; set; }
        public DbSet<Product>? Products { get; set; }
        public DbSet<WorkLog>? WorkLogs { get; set; }
        public DbSet<WorkLogEntry>? WorkLogEntries { get; set; }
        public DbSet<ProductCategory>? ProductCategories { get; set; }
    }
}
