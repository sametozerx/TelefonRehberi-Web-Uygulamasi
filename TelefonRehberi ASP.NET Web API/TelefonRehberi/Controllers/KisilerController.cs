using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TelefonRehberi.Models;

namespace TelefonRehberi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KisilerController : ControllerBase
    {
        private readonly IGenericRepository<Kisiler> _repository;
        private readonly ILogger<KisilerController> _logger;

        public KisilerController(IGenericRepository<Kisiler> repository, ILogger<KisilerController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kisiler>>> GetKisiler()
        {
            _logger.LogInformation("Tüm Kisiler kayıtları getiriliyor.");
            var kisiler = await _repository.GetAllAsync();
            _logger.LogInformation($"{kisiler.Count()} adet Kisiler kaydı getirildi.");
            return Ok(kisiler);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kisiler>> GetKisi(int id)
        {
            _logger.LogInformation($"ID'si {id} olan Kisi kaydı getiriliyor.");
            var kisi = await _repository.GetByIdAsync(id);

            if (kisi == null)
            {
                _logger.LogWarning($"ID'si {id} olan Kisi bulunamadı.");
                return NotFound();
            }

            _logger.LogInformation($"ID'si {id} olan Kisi bulundu.");
            return Ok(kisi);
        }

        [HttpPost]
        public async Task<ActionResult<Kisiler>> PostKisiler(Kisiler kisi)
        {
            _logger.LogInformation("Yeni bir Kisi kaydı oluşturuluyor.");
            await _repository.AddAsync(kisi);

            _logger.LogInformation($"ID'si {kisi.Id} olan Kisi kaydı oluşturuldu.");
            return CreatedAtAction(nameof(GetKisi), new { id = kisi.Id }, kisi);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutKisiler(int id, Kisiler kisi)
        {
            if (id != kisi.Id)
            {
                _logger.LogWarning($"ID uyumsuzluğu: İstek ID'si {id}, Kisi ID'si {kisi.Id} ile eşleşmiyor.");
                return BadRequest();
            }

            _logger.LogInformation($"ID'si {id} olan Kisi kaydı güncelleniyor.");
            try
            {
                await _repository.UpdateAsync(kisi);
                _logger.LogInformation($"ID'si {id} olan Kisi kaydı başarıyla güncellendi.");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await _repository.GetByIdAsync(id) == null)
                {
                    _logger.LogWarning($"Güncelleme için ID'si {id} olan Kisi kaydı bulunamadı.");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"ID'si {id} olan Kisi kaydı güncellenirken bir eşzamanlılık hatası oluştu.");
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKisiler(int id)
        {
            _logger.LogInformation($"ID'si {id} olan Kisi kaydı siliniyor.");
            var kisi = await _repository.GetByIdAsync(id);

            if (kisi == null)
            {
                _logger.LogWarning($"Silme işlemi için ID'si {id} olan Kisi kaydı bulunamadı.");
                return NotFound();
            }

            await _repository.DeleteAsync(id);

            _logger.LogInformation($"ID'si {id} olan Kisi kaydı başarıyla silindi.");
            return NoContent();
        }
    }
}
