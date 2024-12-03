import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { HttpsProxyAgent } from 'https-proxy-agent';

export function createScraperClient(): AxiosInstance {
  const client = axios.create({
    timeout: 30000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  // Add retry logic
  axiosRetry(client, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
      return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.code === 'ECONNABORTED';
    }
  });

  // Add proxy support if PROXY_URL environment variable is set
  const proxyUrl = process.env.PROXY_URL;
  if (proxyUrl) {
    client.defaults.httpsAgent = new HttpsProxyAgent(proxyUrl);
  }

  return client;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));