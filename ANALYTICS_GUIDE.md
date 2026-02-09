# 📊 Analytics Dashboard - Complete Feature Guide

## Overview

The **Analytics Dashboard** provides comprehensive insights into your MrCar operations with:
- Real-time statistics
- Visual charts and graphs
- Per-user performance tracking
- Location-based analytics
- Weekly and monthly trends

---

## Access

**URL:** `/admin/analytics`  
**Requirements:** Admin login (admin@mrcar.cl / admin)

---

## Features

### 1. **Overview Stats Cards**
Quick snapshot of key metrics:
- **Total Tasaciones** - All-time count
- **Esta Semana** - Current week activity
- **Este Mes** - Current month performance
- **Top Usuario** - Best performing user

### 2. **Monthly Trend Chart** (Line Graph)
- Last 6 months of activity
- Visual trend line showing growth
- Month-over-month comparison
- Interactive tooltip with exact counts

### 3. **Location Breakdown** (Pie Chart)
- Tasaciones by sucursal
- Vitacura vs Viña del Mar
- Percentage distribution
- Color-coded visualization

### 4. **Weekly Activity Chart** (Bar Graph)
- Last 12 weeks of data
- Week-by-week comparison
- Identify peak periods
- Spot trends and patterns

### 5. **User Performance Chart** (Horizontal Bar)
- Top 10 performing users
- Total vs This Month comparison
- Side-by-side bars for easy comparison
- Sorted by total count

### 6. **Detailed Performance Table**
Comprehensive user statistics with:
- **Ranking** (Top 3 get medals! 🥇🥈🥉)
- **User name & email**
- **Sucursal** assignment
- **Total** tasaciones
- **Esta Semana** count
- **Este Mes** count
- **Promedio/Mes** (average per month)

---

## Data Insights You Can Get

### By User:
- Who's the top performer?
- Which users are most active this week/month?
- Performance distribution across team
- Individual productivity metrics

### By Location:
- Which sucursal is busier?
- Geographic distribution of work
- Resource allocation insights

### By Time:
- Monthly growth trends
- Weekly activity patterns
- Seasonal variations
- Peak periods

---

## Technical Details

### Charts Library
- **Recharts** - Interactive, responsive charts
- Auto-adjusts to screen size
- Dark mode compatible
- Smooth animations

### Data Sources
All data comes from real database queries:
- `getUserPerformance()` - Per-user stats
- `getWeeklyData()` - 12-week breakdown
- `getLocationStats()` - Sucursal distribution
- `getMonthlyTrends()` - 6-month historical data

### Performance
- Server-side data fetching
- Cached queries
- Optimized database indexes
- Fast page loads

---

## Usage Examples

### Identify Top Performers
1. Check **medal rankings** in table
2. See **Top Usuario** in stats cards
3. Review **User Performance Chart** for visual comparison

### Track Monthly Growth
1. View **Monthly Trend Chart**
2. Compare current vs previous month in **Resumen Mensual**
3. Calculate growth % from stats

### Balance Workload
1. Check **Location Breakdown** pie chart
2. Review **per-user** counts in table
3. Identify who needs support or can handle more

### Plan Resources
1. Analyze **Weekly Activity** patterns
2. Identify slow vs busy periods
3. Schedule staff accordingly

---

## Future Enhancements

Potential additions:
- [ ] Export to Excel/PDF
- [ ] Custom date range filters
- [ ] Email reports (weekly/monthly)
- [ ] Goal setting & tracking
- [ ] Performance alerts
- [ ] Comparison tools (user vs user)
- [ ] Revenue tracking
- [ ] Conversion metrics

---

## Tips

💡 **Best viewed on desktop** for full chart experience  
💡 **Refresh page** to see latest data  
💡 **Hover over charts** for detailed tooltips  
💡 **Look for medals** (🥇🥈🥉) to spot top 3 performers  
💡 **Compare "Este Mes" vs "Total"** to see who's accelerating  

---

## Data Updates

- **Real-time:** Stats update on page refresh
- **Automatic:** No manual sync needed
- **Accurate:** Pulls directly from database
- **Comprehensive:** Includes all historical data

---

## Navigation

From any admin page:
1. Click **"Analíticas"** in top navigation
2. Or visit `/admin/analytics` directly

Back to other sections:
- **Dashboard** - `/admin/dashboard`
- **Usuarios** - `/admin/users`

---

## Screenshot Guide

### What You'll See:
1. **Top row** - 4 stat cards (Total, Week, Month, Top User)
2. **Second row** - 2 charts (Monthly Trend + Location Pie)
3. **Third section** - Weekly bar chart (12 weeks)
4. **Fourth section** - User performance horizontal bars (top 10)
5. **Bottom** - Full detailed table with rankings

### Color Scheme:
- **Blue** - Main metrics, total counts
- **Green** - This week/month (recent activity)
- **Purple** - Monthly data
- **Orange** - Top performer highlights
- **Yellow/Silver/Bronze** - Medal rankings (1st, 2nd, 3rd)

---

**Ready to use!** Visit `/admin/analytics` after deployment to see your data visualized! 📊✨
