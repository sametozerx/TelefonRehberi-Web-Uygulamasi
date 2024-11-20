using Microsoft.EntityFrameworkCore;

namespace TelefonRehberi.Models
{
    public class KisilerContext:DbContext
    {
        public KisilerContext(DbContextOptions options) : base(options)
        { 
        
        }
        public DbSet<Kisiler> Kisiler { get; set;}
    }
}
