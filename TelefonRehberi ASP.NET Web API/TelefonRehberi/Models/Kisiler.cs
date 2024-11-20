using System.ComponentModel.DataAnnotations;

namespace TelefonRehberi.Models
{
    public class Kisiler
    {
        [Key]
        public int Id { get; set; }
        public string Isim { get; set; }
        public string Soyisim { get; set; }
        public string Numara { get; set; }
        public string Email { get; set; }
          
    }
}
