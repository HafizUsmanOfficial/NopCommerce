using Microsoft.AspNetCore.Mvc;
using Nop.Web.Framework.Mvc.Filters;
using Nop.Web.Framework.Security;

namespace Nop.Web.Controllers
{
    public partial class HomeController : BasePublicController
    {
        [HttpsRequirement(SslRequirement.No)]
        public virtual IActionResult Index()
        {
            //return View();
            return Redirect(Url.Content("~/word-signs-dev"));
            //return LocalRedirect("~/word-signs-dev");
        }

        //[HttpsRequirement(SslRequirement.No)]
        //public virtual IActionResult IndexProd()
        //{
        //    //return View();
        //    return Redirect(Url.Content("~/word-signs-dev"));
        //    //return LocalRedirect("~/word-signs-dev");
        //}


        ///// For testing (Nov 13, 22), only main Index method enabled:
        //[HttpsRequirement(SslRequirement.No)]
        //public virtual IActionResult Index()
        //{
        //    //return View();
        //    var r = new RedirectResult(Url.Content("~/word-signs-dev")); // View();

        //    try
        //    {
        //        r = Redirect(Url.Content("~/word-signs-dev"));
        //        //Redirect(Url.Content("~/word-signs-dev"));
        //        //return LocalRedirect("~/word-signs-dev");
        //    }

        //    catch (System.Exception exp)
        //    {
        //    }
        //    return r; //



            //[HttpsRequirement(SslRequirement.No)]
            //public virtual IActionResult IndexProd()
            //{
            //    //return View();
            //    return Redirect(Url.Content("~/word-signs-dev"));
            //    //return LocalRedirect("~/word-signs-dev");
            //}
        }
    }