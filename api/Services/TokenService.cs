using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly ApplicationDbContext _context;

        public TokenService(IConfiguration config,ApplicationDbContext context)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
            _context = context;

        }
        public string CreateToken(AppUser user)
        {
            // Kullanıcının rollerini al
            var roles =  _context.UserRoles
                .Where(ur => ur.UserId == user.Id)
                .Join(_context.Roles, 
                    ur => ur.RoleId, 
                    r => r.Id, 
                    (ur, r) => r.Name)
                .ToList();
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
            };
            foreach (var role in roles){
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
    

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"], //create by server. It is ıdentity of authority
                Audience = _config["JWT:Audience"] // it specifies target community who use the system.
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);



        }
    }
}