using api.Data;
using api.Helper;
using api.Interfaces;
using api.Models;
using api.Repository;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

///////////Controller///////
builder.Services.AddControllers();
////////////////


builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();



/////// cors policy container///////
builder.Services.AddCors(options =>{
    options.AddPolicy("ReactApp",
        policy =>{
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});
///


///////DB SQL////////////////////
builder.Services.AddDbContext<ApplicationDbContext>(options =>{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
///////////////////////
///////Service-Repo-Interface DI////////////
builder.Services.AddScoped<IProductRepository,ProductRepository>();
builder.Services.AddScoped<ITokenService,TokenService>();
/////////////////////////

//Auto mapper
var automapper = new MapperConfiguration(item => item.AddProfile(new AutoMapperHandler()));
IMapper mapper = automapper.CreateMapper();
builder.Services.AddSingleton(mapper);
//

//Newton js
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
////////////////


///Identity/////////////////////////////
///
builder.Services.AddIdentity<AppUser,IdentityRole>(options =>{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
}).AddEntityFrameworkStores<ApplicationDbContext>();
///////////////////////////////////////////

///////jwt token scheme//////////////////

builder.Services.AddAuthentication(options =>{
    options.DefaultAuthenticateScheme = 
    options.DefaultChallengeScheme = 
    options.DefaultForbidScheme = 
    options.DefaultScheme = 
    options.DefaultSignInScheme =
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme; 
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ClockSkew = TimeSpan.Zero,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        )
    };

    //  options.Events = new JwtBearerEvents
    // {
    //     OnAuthenticationFailed = context =>
    //     {
    //         // Token doğrulama hatası durumunda yapılacak işlemler
    //         if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
    //         {
    //             context.Response.Headers.Add("Token-Expired", "true");  // Header ekleyebilirsiniz.
    //         }
    //         return Task.CompletedTask;
    //     }
    // };
});

////////////////////////////////////////////
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger(); // Swagger'ı etkinleştirir.
    app.UseSwaggerUI();
    
}

app.UseHttpsRedirection();
///////auth and map controller////
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
/////

//// use Cors policy
app.UseCors("ReactApp");
///

app.Run();

