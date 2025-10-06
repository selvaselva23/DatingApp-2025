using System;
using api.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
namespace api.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> User { get; set; }

    public DbSet<Member> Members { get; set; }
    
    public DbSet<Photo> Photos { get; set; }


}
