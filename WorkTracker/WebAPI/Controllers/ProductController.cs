using Contracts;
using Entities.DataTransferObjects.Incoming;
using Entities.DataTransferObjects.Outcoming;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("product")]
    public class ProductController : Controller
    {
        private IRepositoryWrapper _repository;

        public ProductController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("{id:int:min(1)}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var product = await _repository.Product.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();

            return product == null ? NotFound() : Ok(product.ToDTO());
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<ProductODTO> products = (await _repository.Product.FindAll().ToListAsync())
                .Select(item => item.ToDTO());
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductIDTO productDTO)
        {
            var product = new Product();
            product.Map(productDTO);
            _repository.Product.Create(product);
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpPost("put/{id:int:min(1)}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ProductIDTO productDTO)
        {
            var product = await _repository.Product.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();
            if (product == null)
            {
                return NotFound($"Product with id:{id} does not exist.");
            }
            product.Map(productDTO);
            _repository.Product.Update(product);
            await _repository.SaveAsync();
            return Ok();
        }
    }
}
