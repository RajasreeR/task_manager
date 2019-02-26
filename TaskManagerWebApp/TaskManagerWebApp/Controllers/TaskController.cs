using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TaskManagerWebApp.Business;
using TaskManagerWebApp.DataAccess;

namespace TaskManagerWebApp.Controllers
{    
    [EnableCors(origins: "*", headers:"*", methods:"*")]
    public class TaskController : ApiController
    {
        private ITaskBo taskBusiness;

        public TaskController(ITaskBo business)
        {
            taskBusiness = business;
        }

        [HttpGet]
        [Route("api/tasks/all")]
        public IHttpActionResult GetAllTasks()
        {
            var tasks = taskBusiness.GetAllTasks();
            List<Models.Task> taskData = new List<Models.Task>();
            foreach (var task in tasks)
            {
                taskData.Add(
                    new Models.Task()
                    {
                        Id = task.Task_ID,
                        Name = task.Task1,
                        Priority = task.Priority,
                        StartDate = task.Start_Date,
                        EndDate = task.End_Date,
                        ParentTask = task.Parent_ID,
                        IsActive = task.IsActive

                    });                
            }
            return Json(taskData);
        }

        [HttpGet]
        [Route("api/task/{id:long}")]
        public IHttpActionResult GetTask(long id)
        {
            var task = taskBusiness.GetTask(id);
            Models.Task taskData = new Models.Task()
            {
                Id = task.Task_ID,
                Name = task.Task1,
                Priority = task.Priority,
                StartDate = task.Start_Date,
                EndDate = task.End_Date,
                ParentTask = task.Parent_ID,
                IsActive = task.IsActive
            };

            return Json(taskData);
        }

        [HttpPost]
        [Route("api/tasks/add")]
        public IHttpActionResult AddTask([FromBody] Models.Task task)
        {
            try
            {
                var taskEntity = new DataAccess.Entities.Task()
                {
                    Task1 = task.Name,
                    Priority = task.Priority,
                    Start_Date = task.StartDate,
                    End_Date = task.EndDate,
                    IsActive = task.IsActive,
                    Parent_ID = task.ParentTask
                };
                taskBusiness.AddTask(taskEntity);
                return Json("Success");
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        [HttpPut]
        [Route("api/tasks/edit")]
        public IHttpActionResult EditTask([FromBody] Models.Task task)
        {
            var taskEntity = new DataAccess.Entities.Task()
            {
                Task_ID = task.Id,
                Task1 = task.Name,
                Priority = task.Priority,
                Start_Date = task.StartDate,
                End_Date = task.EndDate,
                IsActive = task.IsActive,
                Parent_ID = task.ParentTask
            };
            taskBusiness.EditTask(taskEntity);
            return Json("Success");
        }


    }
}
