using ConsumoAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace ConsumoAPI.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly Helper _helper; //Inyectamos el objeto helper a traves del constructor

        public HomeController(ILogger<HomeController> logger, Helper helper)
        {
            _logger = logger;
            _helper = helper;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult APIPersonas()
        {
            return View();
        }
        public IActionResult Calculadora()
        {
            return View();
        }

        public async Task<List<DatosRequeridos>> AlmacenaDatosPersonas()
        {
            List<DatosRequeridos> Lista = new List<DatosRequeridos>();//lista de tipo datosRequeridos
                                                                      //mediante la inyeccion de dependencias creamos el objeto _helper
            Lista = await _helper.ComsumeAPIDatosPersonas();
            return Lista;
        }

        //public IActionResult Privacy()
        //{
        //    return View();
        //}

        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}
    }
}
