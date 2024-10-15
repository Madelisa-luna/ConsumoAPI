﻿namespace ConsumoAPI.Models
{
    public class DatosRequeridos
    {
        public string nombre { get; set; }
        public int edad { get; set; }
        public string nacionalidad { get; set; }
        public bool estaCasado { get; set; }
        public object direccion { get; set; }
        public int sueldo { get; set; }
        public List<string> platos { get; set; }
        public string imagen { get; set; }
    }
}
