using NBench;
using System;
using System.Net.Http;
using System.Web.Http;
using TaskManagerWebApp.Business;
using TaskManagerWebApp.Controllers;
using NBench.Util;

namespace TaskManagerWebApp.Performance
{
    public class PerformanceTest
    {
        private Counter _counter;
        private TaskController _controller = new TaskController(new TaskBo())
        {
            Request = new HttpRequestMessage(),
            Configuration = new HttpConfiguration()
        };
        private Models.Task task = null;

        [PerfSetup]
        public void Setup(BenchmarkContext context)
        {
            //_counter = context.GetCounter("PerTest counter");
            task = new Models.Task()
            {
                Name = "Test runner",
                ParentTask = null,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(4),
                Priority = 3,
                Id = 2
            };
        }

        [PerfBenchmark(Description = "Test add task performance.",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Measurement, SkipWarmups = true)]

        [ElapsedTimeAssertion(MaxTimeMilliseconds = 5000, MinTimeMilliseconds = 800)]
        public void Add_TaskTest(BenchmarkContext context)
        {
            var result = _controller.AddTask(task);
        }

        [PerfBenchmark(Description = "Test add task performance.",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Measurement, SkipWarmups = false)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 5000, MinTimeMilliseconds = 800)]
        public void Edit_TaskTest()
        {
            var result = _controller.EditTask(task);
        }


        [PerfBenchmark(Description = "Test add task performance.",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Measurement, SkipWarmups = false)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 5000, MinTimeMilliseconds = 500)]
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
