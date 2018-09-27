using System.Collections.Generic;
using TaskManagerWebApp.DataAccess;

namespace TaskManagerWebApp.Business
{
    public class TaskBo: ITaskBo
    {
        TaskDao dataAccess;
        public List<DataAccess.Entities.Task> GetAllTasks()
        {
            dataAccess = new TaskDao();
            return dataAccess.GetAllTasks();
        }

        public DataAccess.Entities.Task GetTask(long taskId)
        {
            dataAccess = new TaskDao();
            return dataAccess.GetTask(taskId);
        }

        public void AddTask(DataAccess.Entities.Task task)
        {
            dataAccess = new TaskDao();
            dataAccess.AddTask(task);
        }

        public void EditTask(DataAccess.Entities.Task task)
        {
            dataAccess = new TaskDao();
            dataAccess.UpdateTask(task);
        }

    }
}
