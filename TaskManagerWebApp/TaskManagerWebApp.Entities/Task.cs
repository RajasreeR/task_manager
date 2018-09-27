namespace TaskManagerWebApp.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Task")]
    public partial class Task
    {
        [Key]
        public long Task_ID { get; set; }

        public long? Parent_ID { get; set; }

        [Column("Task")]
        [Required]
        [StringLength(50)]
        public string Task1 { get; set; }

        public DateTime Start_Date { get; set; }

        public DateTime End_Date { get; set; }

        public int Priority { get; set; }
    }
}
