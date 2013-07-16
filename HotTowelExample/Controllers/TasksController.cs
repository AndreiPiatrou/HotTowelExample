using System;
using System.Linq;
using System.Web.Mvc;

namespace HotTowelExample.Controllers
{
    /// <summary>
    /// The tasks controller.
    /// </summary>
    public class TasksController : Controller
    {
        /// <summary>
        /// The data base.
        /// </summary>
        private readonly DataBaseContainer db = new DataBaseContainer();

        /// <summary>
        /// The get tasks.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult GetTasks()
        {
            var json = new
                {
                    tasks = db.TaskSet.ToList()
                };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// The remove task.
        /// </summary>
        /// <param name="taskId">
        /// The task id.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult RemoveTask(int taskId)
        {
            var taskToRemove = db.TaskSet.FirstOrDefault(t => t.Id == taskId);
            if (taskToRemove != null)
            {
                db.TaskSet.Remove(taskToRemove);
                db.SaveChanges();
            }
            var json = new
                {
                    result = taskToRemove != null
                };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// The add task.
        /// </summary>
        /// <param name="name">
        /// The name.
        /// </param>
        /// <param name="description">
        /// The description.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult AddTask(string name, string description)
        {
            if (string.IsNullOrEmpty(name))
            {
                return Json(
                    new
                    {
                        error = "Name can not be empty!"
                    },
                    JsonRequestBehavior.AllowGet);
            }

            var task = new TaskSet
                {
                    CreationDate = DateTime.Now,
                    Description = description,
                    Name = name,
                    IsDone = false
                };
            task = db.TaskSet.Add(task);
            db.SaveChanges();

            return Json(
                new
                    {
                        createdTask = task
                    },
                JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// The invert is done.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <param name="value">
        /// The value.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult InvertIsDone(int id, bool value)
        {
            var succeeded = false;
            string mess;
            var task = db.TaskSet.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                mess = "Task was not found!";
            }
            else if (task.IsDone != value)
            {
                task.IsDone = value;
                db.SaveChanges();
                succeeded = true;
                mess = value ? "Task marked as done!" : "Task marked as in progress!";
            }
            else
            {
                mess = "Task was already marked as " + (value ? "done" : "in progress") + "!";
            }
            return Json(
                new
                {
                    success = succeeded,
                    message = mess
                },
                JsonRequestBehavior.AllowGet);
        }
    }
}