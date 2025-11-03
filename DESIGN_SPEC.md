# BlkXchange Visual Restoration - Design Specification

## Color Palette

### Primary Colors
- **Background (Cream)**: `#FFFDF6` - Main page background
- **Gold**: `#D4AF37` - Primary accent, buttons, highlights
- **Black**: `#000000` - Navigation, footer, text
- **Green (CTA)**: `#00894C` - Call-to-action buttons (Book Consultation, etc.)
- **Charcoal**: `#1A1A1A` - Secondary text, dark elements
- **Ivory/Off-white**: `#F8F8F6` - Card backgrounds, light elements

### Category Badge Colors (Professionals)
Based on screenshot analysis:
- `Nonprofits_community`: `#D4AF37` (Gold/Yellow)
- `Media_marketing`: `#003366` (Dark Blue)
- `Arts_culture`: `#1A1A1A` (Black/Charcoal)
- `Black_media`: `#1A1A1A` (Black/Charcoal)
- `Faith_healthcare`: `#1A1A1A` (Black/Charcoal)
- `Coaching_consulting`: `#1A1A1A` (Black/Charcoal)
- `Education_tutoring`: `#004D80` (Medium Blue)
- `Real_estate_wealth`: `#996600` (Brown/Gold)
- `Event_hospitality`: `#884400` (Dark Brown)
- `Transportation_logistics`: `#444444` (Dark Gray)

## Typography

### Fonts
- **Headings**: Inter or Open Sans, Semi-bold (600), 18-22px
- **Body**: Inter or Open Sans, Regular (400), 16px
- **Navigation**: Inter, 16px
- **Buttons**: Inter, Semi-bold (600), 16px

### Font Weights
- Regular: 400
- Semi-bold: 600
- Bold: 700

## Layout Components

### Navigation Bar
- **Position**: Fixed top
- **Background**: `#000000` (Black)
- **Height**: 64px (h-16)
- **Logo**: "BlkXchange™" in gold (`#D4AF37`)
- **Nav Items**: White text with icons, hover → gold underline
- **Right Side**: 
  - "BlkXchange 360™" button (green background)
  - "Become a Vendor" button (gold background)
  - Login/Signup or User dropdown

### Navigation Items (Left to Right)
1. Marketplace (ShoppingBag icon)
2. Professionals (Users icon)
3. Invest (TrendingUp icon)
4. Community (MessageCircle icon)
5. Partner (Handshake icon)
6. News (Newspaper icon)
7. Impact (Heart icon)
8. About (Info icon)
9. BlkXchange 360™ (Building2 icon) - **DROPDOWN**
   - Wealth Hub
   - Community Hub
   - Legacy Wall
   - History Window
   - Groups
10. Become a Vendor (Handshake icon)

### Footer
- **Background**: `#000000` (Black)
- **Text Color**: `#D4AF37` (Gold) for links, `#F8F8F6` (Ivory) for body
- **Content**: 
  - Mission statement centered
  - "85% goes directly to our vendors, 12% sustains platform operations, and 3% supports HBCUs, scholarships, and nonprofit partners"
  - Copyright: "© 2025 BlkXchange™. All rights reserved. Empower. Exchange. Elevate."
  - Links: "Opportunities", "Partner With Us"

## Page-Specific Layouts

### Homepage
- **Hero Section**: Black gradient background, gold "BlkXchange™" heading
- **Community Impact Stats**: Gold background section with 4 metrics
  - Total Donations
  - Active Vendors
  - Professionals
  - Orders Completed
- **Join the Movement**: Cream background with gold border, centered content
- **Footer Note**: "83 visitors this month empowering Black commerce"

### Professionals Page
- **Grid**: 3 columns on desktop (lg:grid-cols-3), 2 on tablet (md:grid-cols-2), 1 on mobile
- **Card Layout**:
  - Circular profile image (80px diameter)
  - Name + Title
  - Category badge (colored, see category colors above)
  - Bio text (3-line clamp)
  - Credentials section
  - Star rating (gold stars) + review count
  - Hourly rate (bold, right-aligned)
  - Phone number with icon
  - Green "Book Consultation" button (full width)
- **Sticky Promo Card**: Right sidebar with "Blavity Inc." promotional content
  - Image
  - Company name
  - Description
  - Stays visible while scrolling

### Marketplace Page
- **Grid**: Product cards with images
- **Filters**: Category dropdown, search bar
- **Cards**: Image, title, price, "Shop Now" button

### BlkXchange360 Pages

#### Wealth Hub
- **Modules Grid**: Cards for different learning modules
- **Access Gating**: "Upgrade to Access" for Premium/Elite content
- **Free Content**: Accessible without login

#### Legacy Wall (NEW PAGE - TO CREATE)
- **Layout**: Grid of tribute cards
- **Content**: Featured tributes to community heroes
- **Cards**: Image, name, role, description

#### History Window (NEW PAGE - TO CREATE)
- **Layout**: Timeline or article-style content
- **Content**: Historical information about Black Wall Street and economic empowerment

#### Community Hub
- **Tabs**: Events, Groups, Forums
- **Content**: Event listings, group cards, forum topics

#### Groups (Standalone)
- **Layout**: Grid of group cards
- **Content**: Group name, description, member count, join button

## UI Elements

### Buttons
- **Primary (Gold)**: `bg-[#D4AF37]` `text-black` `hover:opacity-90`
- **Success (Green)**: `bg-[#00894C]` `text-white` `hover:opacity-90`
- **Secondary (Black)**: `bg-black` `text-[#D4AF37]` `hover:bg-[#1A1A1A]`
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `px-6 py-3` for large, `px-4 py-2` for medium

### Cards
- **Background**: White or `#F8F8F6`
- **Border**: `border border-gray-200`
- **Hover**: `hover:shadow-lg` `hover:border-[#D4AF37]`
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `p-6`

### Badges
- **Border Radius**: `rounded-full` or `rounded-md`
- **Padding**: `px-3 py-1`
- **Font Size**: `text-sm`
- **Font Weight**: `font-semibold`

## Spacing
- **Section Padding**: `py-16` (64px vertical)
- **Container Max Width**: `max-w-7xl`
- **Container Padding**: `px-4 sm:px-6 lg:px-8`
- **Grid Gap**: `gap-6` (24px)

## Responsive Breakpoints
- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

## Loading States
- **Skeleton**: Show skeleton placeholders while fetching
- **Fallback**: Display seeded data if API returns empty/error
- **Live Data**: Replace with live data when available

## API Integration
- **Base URL**: `https://blkxchange-backend-1.onrender.com/api`
- **Environment Variable**: `VITE_API_BASE_URL`
- **Endpoints**:
  - `/api/products` → Marketplace
  - `/api/professionals` → Professionals
  - `/api/articles` → News
  - `/api/impact` → Impact stats
  - `/api/forums/topics` → Community forums
  - `/api/investments` → Investor Impact

## Implementation Priority
1. Global theme tokens (colors, fonts)
2. Navigation bar with dropdown
3. Footer
4. Homepage sections
5. Professionals page (grid, badges, promo card)
6. Marketplace page
7. BlkXchange360 pages (Wealth Hub, Legacy Wall, History Window, Groups)
8. News and Impact pages
9. API refactor (VITE_API_BASE_URL)
10. Loading skeletons + fallback-first pattern
