using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    public class BuggyController : BaseApiController
    {
        [HttpGet("auth")]
        public IActionResult GetAuth()
        {
            return Unauthorized();
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
        
           [HttpGet("bad-request")]
        public IActionResult GetBadrequest()
        {
            return BadRequest("This was a bad request");
        }
    }
}
