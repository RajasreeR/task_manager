using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using Moq;
using TaskManagerWebApp.Business;
using TaskManagerWebApp.Controllers;

namespace TaskManagerWebApp.Tests
{
    [TestClass]
    public class TaskControllerTests
    {
        [TestMethod]
        public void Test_GetAllTasks()
        {
            var taskData = new List<DataAccess.Entities.Task>()
            {
                new DataAccess.Entities.Task()
                {
                    Task1 = "Test1",
                    Priority = 10,
                    Start_Date = DateTime.Now,
                    End_Date = DateTime.Now,
                    IsActive = true,
                },
                new DataAccess.Entities.Task()
                {
                    Task1 = "Test2",
                    Priority = 20,
                    Start_Date = DateTime.Now,
                    End_Date = DateTime.Now,
                    IsActive = true,
                },
                new DataAccess.Entities.Task()
                {
                    Task1 = "Test3",
                    Priority = 2,
                    Start_Date = DateTime.Now,
                    End_Date = DateTime.Now,
                    IsActive = true,
                }
            };
            var mock = new Mock<ITaskBo>();
            mock.Setup(business => business.GetAllTasks()).Returns(taskData);
            var controller = new TaskController(mock.Object);
            var response = controller.GetAllTasks();
            Assert.IsNotNull(response);
        }

        [TestMethod]
        public void Test_GetTasks()
        {
            var taskData = new DataAccess.Entities.Task()
                {
                    Task1 = "Test1",
                    Priority = 10,
                    Start_Date = DateTime.Now,
                    End_Date = DateTime.Now,
                    IsActive = true,
                    Task_ID = 1
                };
            var mock = new Mock<ITaskBo>();
            mock.Setup(business => business.GetTask(1)).Returns(taskData);
            var controller = new TaskController(mock.Object);
            var response = controller.GetTask(1);
            Assert.IsNotNull(response);            
        }

        [TestMethod]
        public void Test_AddTasks()
        {
            var taskData = new DataAccess.Entities.Task();
            var task = new Models.Task()
            {
                Name = "Test1",
                Priority = 10,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(4),
                IsActive = true
            };
            var mock = new Mock<ITaskBo>();
            mock.Setup(business => business.AddTask(taskData));            
            var controller = new TaskController(mock.Object);
            var response = controller.AddTask(task);
            Assert.IsNotNull(response);
        }

        [TestMethod]
        public void Test_EditTasks()
        {
            var taskData = new DataAccess.Entities.Task();
            var task = new Models.Task()
            {
                Name = "Test1",
                Priority = 10,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(4),
                IsActive = true
            };
            var mock = new Mock<ITaskBo>();
            mock.Setup(business => business.EditTask(taskData));
            var controller = new TaskController(mock.Object);
            var response = controller.EditTask(task);
            Assert.IsNotNull(response);
        }        
    }
}
