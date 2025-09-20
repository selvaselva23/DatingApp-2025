using System.Collections.Immutable;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController(AppDbContext appDbContext) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMemebers()
        {
            var members = await appDbContext.User.ToListAsync();
            return members;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            var member = await appDbContext.User.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }
            return member;
        }

    }
}
