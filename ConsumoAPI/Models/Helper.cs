using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using Newtonsoft.Json;
using System.Security.Claims;

namespace ConsumoAPI.Models
{
    public class Helper
    {
        HttpMessageHandler HandlerPersona;
        public string Error { get; set; }
        string DirBase;
        string StatusCode = "";
        Personas DatosPersonas;
        List<DatosRequeridos> Lista = new List<DatosRequeridos>();

        public async Task<List<DatosRequeridos>> ComsumeAPIDatosPersonas()
        {
            HandlerPersona = new HttpClientHandler();
            //End Point: https://run.mocky.io/v3/3e5d5d22-0bc1-40e4-b3ea-897fe533646c
            DirBase = "https://run.mocky.io/v3/";
            string SolicitudClienteURI = "3e5d5d22-0bc1-40e4-b3ea-897fe533646c";
            try
            {
                // creamos la instancia para el cliente http
                using (var Cliente = new HttpClient(HandlerPersona))
                {
                    //configuramos la direccion base, limpiamos cabecera, solicitamos una respuesta JSON
                    Cliente.BaseAddress = new Uri(DirBase);
                    Cliente.DefaultRequestHeaders.Accept.Clear();
                    Cliente.DefaultRequestHeaders.Accept.Add(
                        new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue
                        ("application/Json"));
                    //obtenemos la respuesta del servicio web (200ok)
                    HttpResponseMessage respuesta = await Cliente.GetAsync($"{SolicitudClienteURI}");
                    StatusCode = respuesta.StatusCode.ToString();
                    respuesta.EnsureSuccessStatusCode();

                    if (respuesta.IsSuccessStatusCode) //si el llamado es exitoso
                    {
                        //convertimos el json a string
                        var jsoncadena = await respuesta.Content.ReadAsStringAsync();
                        //mapeamos (deserealizar el string) hacia la variable "DatosClima" (Lista) (aqui ya se encuentran los datos)
                        DatosPersonas = JsonConvert.DeserializeObject<Personas>(jsoncadena);

                        for (int i = 0; i < DatosPersonas.Datos.LongCount(); i++)
                        {
                            //Llenamos la lista (Dr), con los datos que necesitamos, un solo elemento en la Lista (posicion 0)
                            DatosRequeridos Dr = new DatosRequeridos
                            {
                                nombre = DatosPersonas.Datos[i].nombre,
                                edad = DatosPersonas.Datos[i].edad,
                                nacionalidad = DatosPersonas.Datos[i].nacionalidad,
                                estaCasado = DatosPersonas.Datos[i].estaCasado,
                                direccion = DatosPersonas.Datos[i].direccion,
                                sueldo = DatosPersonas.Datos[i].sueldo,
                                platos = DatosPersonas.Datos[i].platos,
                                imagen = DatosPersonas.Datos[i].imagen
                            };
                            Lista.Add(Dr);
                        }
                        
                    }
                    else
                    {
                        Error = "Se ha producido un error al solicitar el Servicio Web";
                        throw new Exception();
                    }
                }
            }
            catch (Exception)
            {
                Error = StatusCode;
            }

            return (Lista); //devuelve la lista
        }
    }
}
