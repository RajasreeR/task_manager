using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerWebApp.Business
{
    public interface ITaskBo
    {
        List<DataAccess.Entities.Task> GetAllTasks();
        DataAccess.Entities.Task GetTask(long taskId);
        void AddTask(DataAccess.Entities.Task task);
        void EditTask(DataAccess.Entities.Task task);

    }
}
