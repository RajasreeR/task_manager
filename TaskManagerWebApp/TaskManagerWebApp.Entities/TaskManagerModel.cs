namespace TaskManagerWebApp.Entities
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TaskManagerModel : DbContext
    {
        public TaskManagerModel()
            : base("name=TaskManagerEntity")
        {
        }

        public virtual DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
