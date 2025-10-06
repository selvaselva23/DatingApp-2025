using System;
using api.Entities;

namespace api.Interfaces;

public interface ITokenservice
{
    string CreateToken(AppUser user);
}
