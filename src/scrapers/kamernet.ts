import * as cheerio from 'cheerio';
import type { Property } from '../types/index.js';
import { createScraperClient, delay } from '../utils/scraper.js';

export async function scrapeKamernet(): Promise<Partial<Property>[]> {
  const client = createScraperClient();
  const properties: Partial<Property>[] = [];

  try {
    console.log('Scraping Kamernet...');
    const response = await client.get('https://kamernet.nl/huren/huurwoningen-netherlands');
    
    const $ = cheerio.load(response.data);

    $('.property-list-item').each((_, element) => {
      try {
        const title = $(element).find('.property-title').text().trim();
        const priceText = $(element).find('.property-price').text().trim();
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        const city = $(element).find('.property-city').text().trim();
        const surfaceAreaText = $(element).find('.property-size').text().trim();
        const surfaceArea = parseInt(surfaceAreaText);
        const imageUrl = $(element).find('.property-image img').attr('src') || '';

        if (title && price && city) {
          properties.push({
            id: Math.random().toString(36).substr(2, 9),
            title,
            price,
            city,
            surfaceArea,
            imageUrl,
            sourceUrl: $(element).find('a').attr('href') || '#',
            bedrooms: 1
          });
        }
      } catch (error) {
        console.warn('Error parsing Kamernet property:', error);
      }
    });

    await delay(1000); // Polite delay between requests
    return properties;
  } catch (error) {
    console.error('Error scraping Kamernet:', error);
    return [];
  }
}