using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;


namespace api.Extensions;

public static class ClaimsPrincipalExtensions
{

    public static string GetMemberId(this ClaimsPrincipal user)
    {

        return user.FindFirstValue(ClaimTypes.NameIdentifier) ??
         throw new Exception("cannot get memberid from token");
    }

}
