using System;
using api.DTOs;
using api.Entities;

using api.Interfaces;

namespace api.Extensions;

public static class AppUserExtensions
{
    public static UserDto ToDto(this AppUser appUser, ITokenservice tokenservice)
    {
         return new UserDto
        {
            Id = appUser.Id,
            ImageUrl=appUser.ImageUrl,
            DisplayName = appUser.DisplayName,
            Email = appUser.Email,
            Token = tokenservice.CreateToken(appUser)
        };
    }
}
