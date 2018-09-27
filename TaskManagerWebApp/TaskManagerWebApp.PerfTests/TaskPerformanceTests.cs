using NBench;
using System;
using TaskManagerWebApp.Business;
using TaskManagerWebApp.Controllers;
using System.Web.Http;
using System.Net.Http;

namespace TaskManagerWebApp.PerfTests
{
    public class TaskPerformanceTests
    {        

        private TaskController _controller = new TaskController(new TaskBo())
        {
            Request = new HttpRequestMessage(),
            Configuration = new HttpConfiguration()
        };
        private Models.Task task = null;

        [PerfSetup]
        public void Setup(BenchmarkContext context)
        {            
            task = new Models.Task()
            {
                 Name = "Test runner",
                 ParentTask = null,
                 StartDate = DateTime.Now,
                 EndDate = DateTime.Now.AddDays(4),
                 Priority = 3
            };
        }

        [PerfBenchmark(Description = "Test add task performance.",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 5000, MinTimeMilliseconds = 1000)]                
        public void Add_TaskTest()
        {            
            var result =  _controller.AddTask(task);
        }

        [PerfBenchmark(Description = "Test add task performance.",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 5000, MinTimeMilliseconds = 1000)]
        public void Edit_TaskTest()
        {
            var result = _controller.EditTask(task);
        }


        [PerfBenchmark(Description = "Test add task performance.",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 5000, MinTimeMilliseconds = 1000)]
        public void Get_TaskTest()
        {
            var result = _controller.GetAllTasks();
        }


        [PerfCleanup]
        public void Cleanup()
        {
            // does nothing
        }
    }
}
