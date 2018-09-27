using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TaskManagerWebApp.Models
{
    public class Task
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Priority { get; set; }
        public long? ParentTask { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; }
    }
}