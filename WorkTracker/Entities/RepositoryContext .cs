
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
        public DbSet<Person>? Persons { get; set; }
        public DbSet<Product>? Products { get; set; }
        public DbSet<WorkLog>? WorkLogs { get; set; }
        public DbSet<WorkLogProduct>? WorkLogEntries { get; set; }
        public DbSet<ProductCategory>? ProductCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            base.OnModelCreating(modelBuilder);


            #region Query Filter

            modelBuilder.Entity<Project>()
                .HasQueryFilter(p => !p.IsDeleted);

            modelBuilder.Entity<Person>()
                .HasQueryFilter(p => !p.IsDeleted);

            modelBuilder.Entity<Product>()
                .HasQueryFilter(p => !p.IsDeleted);

            modelBuilder.Entity<WorkLog>()
                .HasQueryFilter(p => !p.IsDeleted);

            modelBuilder.Entity<WorkLogProduct>()
                .HasQueryFilter(p => !p.IsDeleted);

            modelBuilder.Entity<ProductCategory>()
                .HasQueryFilter(p => !p.IsDeleted);

            //modelBuilder.Entity<Project>()
            //.HasQueryFilter(post => EF.Property<bool>(post, "IsDeleted") == false);


            #endregion
        }


        #region Soft Delete and time stamps
        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSaving();

            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void OnBeforeSaving()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["IsDeleted"] = false;
                        entry.CurrentValues["CreatedDate"] = DateTime.UtcNow;
                        entry.CurrentValues["UpdatedDate"] = DateTime.UtcNow;
                        break;

                    case EntityState.Modified:
                        entry.CurrentValues["UpdatedDate"] = DateTime.UtcNow;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["IsDeleted"] = true;
                        break;
                }
            }

        }
        #endregion
    }
}

