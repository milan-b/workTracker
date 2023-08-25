using Contracts;
using Entities.DataTransferObjects.Incoming;
using Entities.DataTransferObjects.Outcoming;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("product-category")]
    public class ProductCategoryController : Controller
    {
        private IRepositoryWrapper _repository;

        public ProductCategoryController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("{id:int:min(1)}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var productCategory = await _repository.ProductCategory.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();

            return productCategory == null ? NotFound() : Ok(productCategory.ToDTO());
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<ProductCategoryODTO> productCategories = (await _repository.ProductCategory.FindAll().ToListAsync())
                .Select(item => item.ToDTO());
            return Ok(productCategories);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductCategoryIDTO productCategoryDTO)
        {
            var productCategory = new ProductCategory();
            productCategory.Map(productCategoryDTO);
            _repository.ProductCategory.Create(productCategory);
            await _repository.SaveAsync();
            return Ok();
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ProductCategoryIDTO productCategoryDTO)
        {
            var productCategory = await _repository.ProductCategory.FindByCondition(o => o.Id == id).FirstOrDefaultAsync();
            if (productCategory == null)
            {
                return NotFound($"Product Category with id:{id} does not exist.");
            }
            productCategory.Map(productCategoryDTO);
            _repository.ProductCategory.Update(productCategory);
            await _repository.SaveAsync();
            return Ok();
        }
    }
}
