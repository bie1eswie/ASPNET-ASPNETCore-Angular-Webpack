using FoodAPICore.Entities;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace FoodAPICore.Services
{
    public class EnsureDatabaseDataService : IEnsureDatabaseDataService
    {
        private readonly ILogger _logger;
        private readonly FoodDbContext _context;

        public EnsureDatabaseDataService(
            ILoggerFactory loggerFactory,
            FoodDbContext context)
        {
            _logger = loggerFactory.CreateLogger<EnsureDatabaseDataService>();
            _context = context;
        }

        public async Task EnsureSeedData()
        {
            // Add possible seed data here...
        }
    }
}
