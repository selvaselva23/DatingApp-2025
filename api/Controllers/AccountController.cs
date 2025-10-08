using System;
using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

public class AccountController(AppDbContext context , ITokenservice tokenservice) : BaseApiController
{
    [HttpPost("register")] //api/account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto register)
    {
        if (await EmailExists(register.Email)) return BadRequest("Email exists");
    
        var hmac = new HMACSHA512();

        var user = new AppUser
        {
            DisplayName = register.DisplayName,
            Email = register.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
            PasswordSalt = hmac.Key,
             Member = new Member
            {
                DisplayName = register.DisplayName,
                Gender = register.Gender,
                City = register.City,
                Country = register.Country,
                DateOfBirth = register.DateOfBirth
            }
        };

        context.User.Add(user);
        await context.SaveChangesAsync();

       return user.ToDto(tokenservice);
    }


    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.User.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
        if (user == null) return Unauthorized("invalid email address");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (var i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }

        return user.ToDto(tokenservice);
        
    }

    private async Task<Boolean> EmailExists(string email)
    {
        return await context.User.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }
}
