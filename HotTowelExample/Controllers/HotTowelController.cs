using System.Web.Mvc;

namespace HotTowelExample.Controllers
{
    /// <summary>
    /// The hot towel controller.
    /// </summary>
    public class HotTowelController : Controller
    {
        /// <summary>
        /// The index.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}
