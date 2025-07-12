const fs = require('fs');
const path = require('path');

// Function to parse XML and extract URLs
function parseSitemapXML(xmlContent) {
  const urlMatches = xmlContent.match(/<loc>(.*?)<\/loc>/g);
  if (!urlMatches) return [];

  return urlMatches.map((match) => {
    return match.replace(/<loc>/, '').replace(/<\/loc>/, '');
  });
}

// Function to check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Main verification function
async function verifySitemap() {
  console.log('🔍 Verifying Sitemap Generation...\n');

  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap-0.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');

  // Check if sitemap exists
  if (!fileExists(sitemapPath)) {
    console.error('❌ sitemap-0.xml not found in public directory');
    return;
  }

  // Read and parse sitemap
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urls = parseSitemapXML(sitemapContent);

  console.log(`📊 Found ${urls.length} URLs in sitemap-0.xml:\n`);

  // Expected static pages
  const expectedPages = [
    'https://politravel.lt',
    'https://politravel.lt/kategorijos',
    'https://politravel.lt/keliones',
    'https://politravel.lt/kontaktai',
    'https://politravel.lt/partneriams',
    'https://politravel.lt/straipsniai',
    'https://politravel.lt/sub/apie-mus',
    'https://politravel.lt/sub/duk',
  ];

  // Check each expected page
  console.log('📋 Checking expected static pages:');
  expectedPages.forEach((page) => {
    if (urls.includes(page)) {
      console.log(`✅ ${page}`);
    } else {
      console.log(`❌ ${page} - MISSING`);
    }
  });

  console.log('\n🔗 All URLs in sitemap:');
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });

  // Check robots.txt
  if (fileExists(robotsPath)) {
    console.log('\n🤖 Robots.txt found and should reference sitemaps');
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    if (robotsContent.includes('sitemap')) {
      console.log('✅ Robots.txt contains sitemap references');
    } else {
      console.log('❌ Robots.txt missing sitemap references');
    }
  } else {
    console.log('\n❌ robots.txt not found');
  }

  // Check for dynamic sitemap
  console.log('\n🌐 Dynamic sitemap should be available at:');
  console.log('https://politravel.lt/api/sitemap-dynamic');
  console.log('https://politravel.lt/api/sitemap-index');

  // Summary
  console.log('\n📈 Summary:');
  console.log(`- Static pages indexed: ${urls.length}`);
  console.log(`- Expected pages: ${expectedPages.length}`);
  console.log(
    `- Missing pages: ${
      expectedPages.filter((page) => !urls.includes(page)).length
    }`
  );

  if (urls.length === 0) {
    console.log('\n⚠️  WARNING: No URLs found in sitemap!');
  } else if (expectedPages.filter((page) => !urls.includes(page)).length > 0) {
    console.log('\n⚠️  WARNING: Some expected pages are missing from sitemap!');
  } else {
    console.log('\n✅ All expected static pages are indexed!');
  }

  console.log('\n💡 Tips:');
  console.log('- Run "npm run build" to regenerate sitemaps');
  console.log('- Check dynamic sitemap at /api/sitemap-dynamic');
  console.log('- Verify robots.txt includes all sitemap references');
  console.log('- Submit sitemap to Google Search Console');
}

// Run verification
verifySitemap().catch(console.error);
