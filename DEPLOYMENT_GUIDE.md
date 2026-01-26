# SEO Deployment Guide - Horoo.in

## Pre-Deployment Checklist

### 1. Environment Variables
Ensure these are set in your production environment:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
SITE_URL=https://horoo.in
```

### 2. Verify Files Exist
Run this command to check all SEO files are in place:

```bash
# Windows PowerShell
Get-ChildItem -Path "app" -Recurse -Filter "metadata.js" | Select-Object FullName
```

Expected files:
- ✅ app/layout.js
- ✅ app/sitemap.js
- ✅ app/sitemap.xml/route.js
- ✅ app/robots.js
- ✅ utils/structuredData.js
- ✅ All metadata.js files (20+ files)

### 3. Build Test
Test the build locally:

```bash
cd horoo-client
npm run build
```

Expected output:
- ✅ Build completes without errors
- ✅ No metadata warnings
- ✅ Routes generated successfully

### 4. Local Testing

Start the production build locally:

```bash
npm run start
```

Test these URLs:
1. http://localhost:3000/sitemap.xml
2. http://localhost:3000/robots.txt
3. http://localhost:3000/
4. http://localhost:3000/rooms
5. http://localhost:3000/rooms/[any-slug]

**What to check:**
- ✅ Sitemap.xml returns proper XML
- ✅ Robots.txt shows correct rules
- ✅ View source shows meta tags
- ✅ View source shows JSON-LD scripts
- ✅ No console errors

## Deployment Steps

### Step 1: Deploy to Vercel/Hosting

```bash
# If using Vercel CLI
vercel --prod

# Or push to main branch (if auto-deploy is configured)
git add .
git commit -m "SEO implementation with horoo.in domain"
git push origin main
```

### Step 2: Verify DNS Configuration

Ensure horoo.in points to your hosting:
```bash
nslookup horoo.in
```

### Step 3: SSL Certificate
- ✅ Verify HTTPS is working
- ✅ Check certificate is valid
- ✅ Test http:// redirects to https://

### Step 4: Post-Deployment Verification

Immediately after deployment, check:

1. **Sitemap Accessibility**
   ```
   Visit: https://horoo.in/sitemap.xml
   Should show: XML sitemap with all URLs
   ```

2. **Robots.txt**
   ```
   Visit: https://horoo.in/robots.txt
   Should show: User-agent rules and sitemap URL
   ```

3. **Homepage Metadata**
   ```
   Visit: https://horoo.in
   View Source > Check for:
   - <title> tag
   - <meta name="description"> tag
   - <meta property="og:*"> tags
   - <script type="application/ld+json"> tags
   ```

4. **Property Page Metadata**
   ```
   Visit: https://horoo.in/rooms/[any-property-slug]
   View Source > Check for:
   - Dynamic title with property name
   - Dynamic description with price
   - OpenGraph image from property
   ```

## Google Search Console Setup

### Step 1: Add Property
1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Enter: https://horoo.in
4. Choose verification method

### Step 2: Verify Ownership

**Option A: HTML Tag (Easiest)**
1. Copy verification meta tag from Search Console
2. Add to app/layout.js in the metadata object:
   ```javascript
   export const metadata = {
     // ... existing metadata
     verification: {
       google: 'your-verification-code-here',
     },
   };
   ```
3. Deploy
4. Click "Verify" in Search Console

**Option B: DNS Verification**
1. Add TXT record to your DNS
2. Wait for propagation
3. Click "Verify"

### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Wait for Google to process (may take hours/days)

### Step 4: Monitor
Check these sections daily for the first week:
- ✅ Overview (impressions, clicks)
- ✅ Coverage (indexed pages)
- ✅ Sitemaps (status)
- ✅ Enhancements (structured data issues)

## Bing Webmaster Tools Setup

### Step 1: Add Site
1. Go to https://www.bing.com/webmasters
2. Add site: https://horoo.in

### Step 2: Verify
- Import from Google Search Console (easiest), or
- Use XML file or meta tag verification

### Step 3: Submit Sitemap
1. Navigate to Sitemaps section
2. Submit: https://horoo.in/sitemap.xml

## Google Analytics 4 Setup

### Step 1: Create Property
1. Go to https://analytics.google.com
2. Create new property: "Horoo"
3. Set up data stream for website

### Step 2: Install Tracking Code
Add to app/layout.js:

```javascript
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        {/* ... existing head content */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

### Step 3: Set Up Goals
Create conversion goals for:
- ✅ Contact button clicks
- ✅ Phone number clicks
- ✅ Request form submissions
- ✅ Owner registration
- ✅ Property listing views

## Week 1 Monitoring Checklist

### Daily Tasks
- [ ] Check Search Console for crawl errors
- [ ] Monitor sitemap processing status
- [ ] Check for manual actions/security issues
- [ ] Review top search queries
- [ ] Monitor Core Web Vitals

### One-Time Tasks
- [ ] Submit top 10 pages for indexing
- [ ] Test structured data with Rich Results Test
- [ ] Verify OpenGraph tags with debugger
- [ ] Test Twitter Cards
- [ ] Check mobile usability
- [ ] Run Lighthouse audit
- [ ] Test page speed on key pages

## Troubleshooting

### Sitemap Not Accessible
**Issue:** https://horoo.in/sitemap.xml shows 404

**Solutions:**
1. Check route.js file exists at: `app/sitemap.xml/route.js`
2. Rebuild: `npm run build`
3. Check for build errors
4. Verify deployment succeeded
5. Clear CDN cache if applicable

### Sitemap Empty or Has No Properties
**Issue:** Sitemap shows only static pages, no properties

**Solutions:**
1. Check API_URL environment variable is set
2. Verify API endpoints are accessible
3. Test API call: `curl https://your-api/api/rooms`
4. Check server logs for errors
5. Verify properties have `slug` or `horooId` field

### Metadata Not Showing
**Issue:** View source doesn't show meta tags

**Solutions:**
1. Clear Next.js cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Check metadata.js exports are correct
4. Verify import paths
5. Check browser cache (hard refresh: Ctrl+Shift+R)

### JSON-LD Not Appearing
**Issue:** Structured data missing from pages

**Solutions:**
1. Check structuredData.js utility file exists
2. Verify import in layout.js
3. Check console for JavaScript errors
4. Verify functions are being called
5. Check dangerouslySetInnerHTML is rendering

### Search Console Showing Errors
**Issue:** Coverage errors or excluded pages

**Solutions:**
1. Check robots.txt isn't blocking pages
2. Verify canonical URLs are correct
3. Check for duplicate content
4. Ensure pages return 200 status
5. Fix any redirect chains

### Properties Not Being Indexed
**Issue:** Google not indexing property pages

**Solutions:**
1. Check if in sitemap.xml
2. Verify robots.txt allows crawling
3. Check page loads correctly
4. Verify canonical URL
5. Request indexing in Search Console
6. Check for thin content issues
7. Ensure unique content per property

## Performance Optimization

### If Page Speed Is Slow
1. Optimize images (WebP format, proper sizing)
2. Enable lazy loading for images
3. Minimize JavaScript bundles
4. Use Next.js Image component
5. Enable compression (should be automatic)
6. Check API response times
7. Implement Redis caching for API

### If Core Web Vitals Are Poor
1. **LCP (Largest Contentful Paint):**
   - Optimize hero images
   - Preload critical assets
   - Reduce server response time

2. **FID (First Input Delay):**
   - Reduce JavaScript execution time
   - Break up long tasks
   - Use web workers if needed

3. **CLS (Cumulative Layout Shift):**
   - Set explicit dimensions for images
   - Reserve space for dynamic content
   - Avoid inserting content above existing content

## Success Metrics to Track

### Week 1
- Sitemap submitted: ✅
- Pages indexed: Target 50+
- Crawl errors: 0
- Mobile usability issues: 0
- Structured data errors: 0

### Month 1
- Pages indexed: 80%+ of total pages
- Organic traffic: Baseline established
- Top keywords: Identified (10+)
- Average position: Track for top keywords
- Click-through rate: 2%+

### Month 3
- Organic traffic: 50%+ increase
- Keyword rankings: Top 10 for 20+ keywords
- Indexed pages: 95%+
- Backlinks: 10+ quality links
- Conversion rate: 1%+

## Next Steps After Deployment

### Immediate (This Week)
1. ✅ Verify deployment successful
2. ✅ Submit sitemaps to search engines
3. ✅ Set up Google Analytics
4. ✅ Configure conversion tracking
5. ✅ Test all metadata
6. ✅ Run technical SEO audit

### Short Term (This Month)
1. Create Google My Business listing
2. Set up social media profiles
3. Start content marketing (blog)
4. Build initial backlinks
5. Create city landing pages
6. Optimize based on initial data

### Long Term (3-6 Months)
1. Expand content strategy
2. Build quality backlinks
3. Create video content
4. Implement advanced schema
5. A/B test meta descriptions
6. Create comprehensive guides

## Support Resources

### Documentation
- [SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md) - Complete guide
- [SEO_CHECKLIST.md](./SEO_CHECKLIST.md) - Task checklist
- [SEO_SUMMARY.md](./SEO_SUMMARY.md) - Implementation summary

### Testing Tools
- Google Search Console
- Google PageSpeed Insights
- Rich Results Test
- Mobile-Friendly Test
- OpenGraph Debugger

### Monitoring Tools
- Google Analytics 4
- Google Search Console
- Vercel Analytics
- Bing Webmaster Tools

## Emergency Contacts

If SEO issues arise:
1. Check documentation first
2. Review Search Console for specific errors
3. Check server logs
4. Test locally to reproduce issues
5. Contact development team with specific error details

## Notes

- Keep backups before major SEO changes
- Test in staging before production
- Monitor closely for first 2 weeks
- Document any custom changes
- Review and update quarterly

---

**Deployment Date:** _____________
**Verified By:** _____________
**Status:** _____________

**Checklist:**
- [ ] All files deployed
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] Metadata verified
- [ ] Search Console set up
- [ ] Analytics installed
- [ ] Initial indexing requested
- [ ] Performance verified
- [ ] Mobile tested
- [ ] SSL confirmed

🚀 **Ready to dominate search results!**
