using System.Collections.Immutable;
using System.Security.Claims;
using api.Data;
using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{

    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMemebers()
        {
            return Ok(await memberRepository.GetMembersAsync());

        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);

            if (member == null)
            {
                return NotFound();
            }
            return member;
        }


        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMembersPhots(string id)
        {
            return Ok(await memberRepository.GetPhotosForMemberAsync(id));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDto memberUpdateDto)
        {
            var memberId = User.GetMemberId();

        

            var member = await memberRepository.GetMemberForUpdate(memberId);

            if (member == null) return BadRequest("could not get member");

            member.DisplayName = memberUpdateDto.DisplayName ?? member.DisplayName;
            member.Description = memberUpdateDto.Description ?? member.Description;
            member.City = memberUpdateDto.City ?? member.City;
            member.Country = memberUpdateDto.Country ?? member.Country;

            member.User.DisplayName = memberUpdateDto.DisplayName ??member.DisplayName;
            memberRepository.Update(member); // optional

            if (await memberRepository.SaveAllAysnc()) return NoContent();

            return BadRequest("Failed to update member");
        }
    }
}
