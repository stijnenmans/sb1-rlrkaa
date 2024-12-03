import * as cheerio from 'cheerio';
import type { Property } from '../types/index.js';
import { createScraperClient, delay } from '../utils/scraper.js';

export async function scrapePararius(): Promise<Partial<Property>[]> {
  const client = createScraperClient();
  const properties: Partial<Property>[] = [];

  try {
    console.log('Scraping Pararius...');
    const response = await client.get('https://www.pararius.nl/huurwoningen/nederland');
    
    const $ = cheerio.load(response.data);

    $('.search-list__item--listing').each((_, element) => {
      try {
        const title = $(element).find('.listing-search-item__title').text().trim();
        const priceText = $(element).find('.listing-search-item__price').text().trim();
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        const city = $(element).find('.listing-search-item__location').text().trim();
        const surfaceAreaText = $(element).find('.listing-search-item__features').text().trim();
        const surfaceArea = parseInt(surfaceAreaText.match(/(\d+)\s*m²/)?.[1] || '0');
        const imageUrl = $(element).find('.listing-search-item__image img').attr('src') || '';
        const bedroomsMatch = surfaceAreaText.match(/(\d+)\s*(?:slaapkamer|kamer)/);
        const bedrooms = bedroomsMatch ? parseInt(bedroomsMatch[1]) : 1;

        if (title && price && city) {
          properties.push({
            id: Math.random().toString(36).substr(2, 9),
            title,
            price,
            city,
            surfaceArea,
            bedrooms,
            imageUrl,
            sourceUrl: 'https://www.pararius.nl' + ($(element).find('a').attr('href') || '')
          });
        }
      } catch (error) {
        console.warn('Error parsing Pararius property:', error);
      }
    });

    await delay(1000); // Polite delay between requests
    return properties;
  } catch (error) {
    console.error('Error scraping Pararius:', error);
    return [];
  }
}