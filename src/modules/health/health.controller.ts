import { Public } from '@core/decorator';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  @Public()
  @Get()
  ui(@Res() res: Response) {
    const isHealthy = true;
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Health Check</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: ${isHealthy ? '#e8f5e9' : '#ffebee'};
              color: #333;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .card {
              background: white;
              padding: 2rem 3rem;
              border-radius: 16px;
              box-shadow: 0 4px 15px rgba(0,0,0,0.1);
              text-align: center;
              animation: fadeIn 0.5s ease;
            }
            h1 {
              margin-bottom: 0.5rem;
              color: ${isHealthy ? '#2e7d32' : '#c62828'};
            }
            p {
              font-size: 1rem;
              color: #666;
            }
            .status {
              font-size: 1.2rem;
              font-weight: bold;
              margin-top: 1rem;
              color: ${isHealthy ? '#2e7d32' : '#c62828'};
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${isHealthy ? '✅ Healthy' : '❌ Unhealthy'}</h1>
            <p>Service is ${isHealthy ? 'running smoothly' : 'not responding'}</p>
            <div class="status">${new Date().toLocaleString()}</div>
          </div>
        </body>
      </html>
    `;
    res.type('html').send(html);
  }
}
