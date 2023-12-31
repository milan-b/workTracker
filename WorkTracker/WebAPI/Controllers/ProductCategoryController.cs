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

        [HttpPost("put/{id:int:min(1)}")]
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

        [HttpPost("delete/{id:int:min(1)}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(id == 1)
            {
                return BadRequest($"It is not allowed to delete first category.");
            }
            var category = await _repository.ProductCategory.FindByCondition(o => o.Id == id)
                .Include(o => o.Products).FirstOrDefaultAsync();
            if (category is null)
            {
                return NotFound($"Category with id:{id} does not exist.");
            }
            if(category.Products.Count > 0)
            {
                return BadRequest($"You can't delete this category because there are some products that belongs to it.");
            }
            var hasChildren = _repository.ProductCategory.FindByCondition(o => o.ParentId == id).Any();
            if (hasChildren)
            {
                return BadRequest($"You can't delete this category because it has children.");
            }

            _repository.ProductCategory.Delete(category);
            await _repository.SaveAsync();
            return Ok();
        }
    }
}
