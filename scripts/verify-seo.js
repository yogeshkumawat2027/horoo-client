/**
 * SEO Verification Script
 * Run this script to verify SEO implementation
 * 
 * Usage: node scripts/verify-seo.js
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  return fs.existsSync(fullPath);
}

function checkDomainInFile(filePath, domain = 'horoo.in') {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) return false;
  
  const content = fs.readFileSync(fullPath, 'utf8');
  return content.includes(domain);
}

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('    HOROO.IN SEO VERIFICATION SCRIPT', 'cyan');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

let passCount = 0;
let failCount = 0;

// Test 1: Core SEO Files
log('📁 Checking Core SEO Files...', 'blue');

const coreFiles = [
  'app/layout.js',
  'app/sitemap.js',
  'app/sitemap.xml/route.js',
  'app/robots.js',
  'utils/structuredData.js',
];

coreFiles.forEach(file => {
  if (checkFileExists(file)) {
    log(`  ✓ ${file}`, 'green');
    passCount++;
  } else {
    log(`  ✗ ${file} - MISSING`, 'red');
    failCount++;
  }
});

// Test 2: Metadata Files
log('\n📄 Checking Metadata Files...', 'blue');

const metadataFiles = [
  'app/rooms/metadata.js',
  'app/flats/metadata.js',
  'app/house/metadata.js',
  'app/hostels/metadata.js',
  'app/hotels/metadata.js',
  'app/commercials/metadata.js',
  'app/about/metadata.js',
  'app/contact/metadata.js',
  'app/how-it-works/metadata.js',
  'app/list-rental/metadata.js',
  'app/privacy/metadata.js',
  'app/terms/metadata.js',
  'app/owner/guidelines/metadata.js',
];

metadataFiles.forEach(file => {
  if (checkFileExists(file)) {
    log(`  ✓ ${file}`, 'green');
    passCount++;
  } else {
    log(`  ✗ ${file} - MISSING`, 'red');
    failCount++;
  }
});

// Test 3: Dynamic Property Metadata
log('\n🏠 Checking Dynamic Property Metadata...', 'blue');

const dynamicMetadata = [
  'app/rooms/[slug]/metadata.js',
  'app/flats/[slug]/metadata.js',
  'app/house/[slug]/metadata.js',
  'app/hostels/[slug]/metadata.js',
  'app/hotels/[slug]/metadata.js',
  'app/commercials/[slug]/metadata.js',
];

dynamicMetadata.forEach(file => {
  if (checkFileExists(file)) {
    log(`  ✓ ${file}`, 'green');
    passCount++;
  } else {
    log(`  ✗ ${file} - MISSING`, 'red');
    failCount++;
  }
});

// Test 4: Domain Configuration
log('\n🌐 Checking Domain Configuration (horoo.in)...', 'blue');

const domainFiles = [
  'app/layout.js',
  'app/sitemap.js',
  'app/sitemap.xml/route.js',
  'app/robots.js',
];

domainFiles.forEach(file => {
  if (checkDomainInFile(file, 'horoo.in')) {
    log(`  ✓ ${file} - Contains horoo.in`, 'green');
    passCount++;
  } else {
    log(`  ✗ ${file} - Missing horoo.in domain`, 'red');
    failCount++;
  }
});

// Test 5: Documentation
log('\n📚 Checking Documentation...', 'blue');

const docFiles = [
  'SEO_IMPLEMENTATION.md',
  'SEO_CHECKLIST.md',
  'SEO_SUMMARY.md',
  'DEPLOYMENT_GUIDE.md',
];

docFiles.forEach(file => {
  if (checkFileExists(file)) {
    log(`  ✓ ${file}`, 'green');
    passCount++;
  } else {
    log(`  ✗ ${file} - MISSING`, 'red');
    failCount++;
  }
});

// Test 6: Environment Variables Check
log('\n⚙️  Environment Variables to Verify...', 'blue');
log('  ⚠️  NEXT_PUBLIC_API_URL - Check manually in .env', 'yellow');
log('  ⚠️  SITE_URL - Check manually in .env', 'yellow');

// Summary
log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('    VERIFICATION SUMMARY', 'cyan');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

const total = passCount + failCount;
const percentage = ((passCount / total) * 100).toFixed(1);

log(`  ✓ Passed: ${passCount}`, 'green');
log(`  ✗ Failed: ${failCount}`, failCount > 0 ? 'red' : 'green');
log(`  📊 Success Rate: ${percentage}%`, percentage >= 95 ? 'green' : 'yellow');

if (failCount === 0) {
  log('\n  🎉 ALL CHECKS PASSED! SEO implementation is complete.', 'green');
  log('  ✅ Ready for deployment!\n', 'green');
} else {
  log('\n  ⚠️  SOME CHECKS FAILED. Please review and fix.', 'yellow');
  log('  📝 Check the failed items above.\n', 'yellow');
}

// Additional Recommendations
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
log('    NEXT STEPS', 'cyan');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

log('  1. Run: npm run build', 'blue');
log('  2. Test locally: npm run start', 'blue');
log('  3. Verify sitemap.xml at http://localhost:3000/sitemap.xml', 'blue');
log('  4. Verify robots.txt at http://localhost:3000/robots.txt', 'blue');
log('  5. Check metadata in view source', 'blue');
log('  6. Deploy to production', 'blue');
log('  7. Submit sitemap to Google Search Console', 'blue');
log('  8. Monitor for first week\n', 'blue');

log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

// Exit with appropriate code
process.exit(failCount > 0 ? 1 : 0);
