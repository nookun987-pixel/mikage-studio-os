import { executeGenerationPipeline } from '@mikage/runtime-orchestration-boundary';
import { orchestrationChainRequestShellSchema } from '@mikage/runtime-orchestration-boundary';

export const serviceName = 'orchestration-service';

export const bootstrap = () => `${serviceName} scaffold ready`;

// Health check endpoint
export const healthCheck = () => ({
  status: 'healthy',
  service: serviceName,
  timestamp: new Date().toISOString(),
  version: '0.1.0'
});

// Execute generation pipeline endpoint
export const executePipeline = async (request: any) => {
  try {
    const parsedRequest = orchestrationChainRequestShellSchema.parse(request);
    const result = executeGenerationPipeline(parsedRequest);
    
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
};

// Simple HTTP server using Node.js built-in modules
export const startServer = async (port: number = 3000) => {
  try {
    const { createServer } = await import('node:http');
    
    const server = createServer(async (req: any, res: any) => {
      // CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }
      
      try {
        const url = new URL(req.url, `http://localhost:${port}`);
        
        switch (url.pathname) {
          case '/health':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(healthCheck()));
            break;
            
          case '/api/v1/execute':
            if (req.method !== 'POST') {
              res.writeHead(405);
              res.end('Method not allowed');
              return;
            }
            
            const body = await new Promise((resolve, reject) => {
              let data = '';
              req.on('data', (chunk: any) => data += chunk);
              req.on('end', () => {
                try {
                  resolve(JSON.parse(data));
                } catch (e) {
                  reject(e);
                }
              });
              req.on('error', reject);
            });
            
            const result = await executePipeline(body);
            const status = result.success ? 200 : 400;
            
            res.writeHead(status, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
            break;
            
          default:
            res.writeHead(404);
            res.end('Not found');
        }
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : 'Internal server error'
        }));
      }
    });
    
    server.listen(port, () => {
      console.log(`🚀 ${serviceName} running on http://localhost:${port}`);
      console.log(`📊 Health: http://localhost:${port}/health`);
      console.log(`🔧 Execute: http://localhost:${port}/api/v1/execute`);
    });
    
  } catch (error) {
    console.log(`${serviceName} API functions exported. Use healthCheck() and executePipeline() manually.`);
  }
};

// Auto-start server if --start flag is provided
if (process.argv.includes('--start')) {
  startServer();
}
