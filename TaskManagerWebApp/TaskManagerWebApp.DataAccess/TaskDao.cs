using System;
using System.Collections.Generic;
using System.Linq;
using TaskManagerWebApp.DataAccess.Entities;

namespace TaskManagerWebApp.DataAccess
{
    public class TaskDao
    {
        public List<Entities.Task> GetAllTasks()
        {
            try
            {
                var task = new List<Entities.Task>();
                using (var db = new TaskManagerEntities())
                {
                    var query = from b in db.Tasks
                                orderby b.Task1
                                select b;
                    task = query.ToList();
                }
                return task;
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }

        public Task GetTask(long id)
        {
            Task task = null;
            using (var db = new TaskManagerEntities())
            {
                task = db.Tasks.Where(p => p.Task_ID.Equals(id)).FirstOrDefault();
            }
            return task;
        }

        public void AddTask(Task taskData)
        {
            using (var db = new TaskManagerEntities())
            {
                db.Tasks.Add(taskData);
            }
        }

        public void UpdateTask(Task taskData)
        {
            using (var db = new TaskManagerEntities())
            {
                Task task = db.Tasks.Where(p => p.Task_ID.Equals(taskData.Task_ID)).FirstOrDefault();
                task.Task1 = taskData.Task1;
                task.Priority = taskData.Priority;
                task.Start_Date = taskData.Start_Date;
                task.End_Date = taskData.End_Date;
                task.Parent_ID = taskData.Parent_ID;
                task.IsActive = taskData.IsActive;
                db.SaveChanges();
            }
        }

    }
}
