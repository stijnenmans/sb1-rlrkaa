import { scrapeKamernet } from './kamernet.js';
import { scrapePararius } from './pararius.js';
import { Property } from '../types/index.js';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function scrapeAll() {
  try {
    console.log('Starting web scraping...');
    
    // Run scrapers sequentially to avoid overwhelming the servers
    const kamernetProperties = await scrapeKamernet();
    console.log(`Found ${kamernetProperties.length} properties on Kamernet`);
    
    const parariusProperties = await scrapePararius();
    console.log(`Found ${parariusProperties.length} properties on Pararius`);

    const allProperties = [...kamernetProperties, ...parariusProperties]
      .filter((p): p is Property => {
        return Boolean(p.id && p.title && p.price && p.city);
      });

    console.log(`Total properties found: ${allProperties.length}`);
    
    const outputPath = join(__dirname, '../../src/data/scrapedProperties.json');
    await writeFile(outputPath, JSON.stringify(allProperties, null, 2));
    
    console.log('Scraping completed successfully');
    console.log(`Data saved to ${outputPath}`);
    
  } catch (error) {
    console.error('Error during scraping:', error);
    process.exit(1);
  }
}

// Run the scraper
scrapeAll();