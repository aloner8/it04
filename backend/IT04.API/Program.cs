using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<UserService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// ==========================
// CREATE USER
// ==========================
app.MapPost("/api/users", (
    CreateUserDto dto,
    UserService service) =>
{
    var validationContext = new ValidationContext(dto);
    var results = new List<ValidationResult>();

    if (!Validator.TryValidateObject(dto, validationContext, results, true))
    {
        return Results.BadRequest(results);
    }

    var id = service.Create(dto);

    return Results.Ok(new
    {
        id,
        message = "save data success"
    });
});


// ==========================
// GET ALL USERS
// ==========================
app.MapGet("/api/users", (UserService service) =>
{
    return Results.Ok(service.GetAll());
});

app.MapGet("/api/occupations", () =>
{
    return Results.Ok(new[]
    {
        new { id = 1, name = "Developer" },
        new { id = 2, name = "Tester" },
        new { id = 3, name = "Business Analyst" }
    });
});



app.Run();


// ==========================
// MODELS
// ==========================

public class CreateUserDto
{
    [Required]
    public string FirstName { get; set; } = "";

    [Required]
    public string LastName { get; set; } = "";

    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";

    [Required]
    public string Phone { get; set; } = "";

    [Required]
    public DateTime BirthDate { get; set; }

    [Required]
    public string Sex { get; set; } = "";

    [Required]
    public int OccupationId { get; set; }

    [Required]
    public string ProfileImageBase64 { get; set; } = "";
}

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public DateTime BirthDate { get; set; }
    public string Sex { get; set; } = "";
    public int OccupationId { get; set; }
    public string ProfileImageBase64 { get; set; } = "";
}


// ==========================
// IN-MEMORY SERVICE
// ==========================

public class UserService
{
    private readonly List<User> _users = new();
    private int _currentId = 1;

    public int Create(CreateUserDto dto)
    {
        var user = new User
        {
            Id = _currentId++,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Phone = dto.Phone,
            BirthDate = dto.BirthDate,
            Sex = dto.Sex,
            OccupationId = dto.OccupationId,
            ProfileImageBase64 = dto.ProfileImageBase64
        };

        _users.Add(user);

        return user.Id;
    }

    public List<User> GetAll()
    {
        return _users;
    }
}
