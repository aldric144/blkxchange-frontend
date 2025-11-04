/**
 * Category badge color mapping for Professionals page
 * Based on design specification and screenshot analysis
 */

export const categoryColorMap: Record<string, string> = {
  'nonprofits_community': '#D4AF37', // Gold
  'media_marketing': '#003366', // Dark Blue
  'arts_culture': '#1A1A1A', // Black/Charcoal
  'black_media': '#1A1A1A', // Black/Charcoal
  'faith_healthcare': '#1A1A1A', // Black/Charcoal
  'coaching_consulting': '#1A1A1A', // Black/Charcoal
  'education_tutoring': '#004D80', // Medium Blue
  'real_estate_wealth': '#996600', // Brown/Gold
  'event_hospitality': '#884400', // Dark Brown
  'transportation_logistics': '#444444', // Dark Gray
  
  'nonprofits & community': '#D4AF37',
  'media & marketing': '#003366',
  'arts & culture': '#1A1A1A',
  'coaching & consulting': '#1A1A1A',
  'education & tutoring': '#004D80',
  'real estate & wealth': '#996600',
  'event & hospitality': '#884400',
  'transportation & logistics': '#444444',
  
  'health': '#1A1A1A',
  'legal': '#1A1A1A',
  'finance': '#996600',
  'coaching': '#1A1A1A',
  'consulting': '#1A1A1A',
  'education': '#004D80',
};

/**
 * Get badge color for a category
 * Normalizes the category string and returns the appropriate color
 * Falls back to charcoal if category not found
 */
export function getCategoryColor(category: string): string {
  if (!category) return '#1A1A1A'; // Default charcoal
  
  const normalized = category
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
    .replace(/[&]/g, '');
  
  if (categoryColorMap[normalized]) {
    return categoryColorMap[normalized];
  }
  
  const original = category.toLowerCase();
  if (categoryColorMap[original]) {
    return categoryColorMap[original];
  }
  
  return '#1A1A1A';
}

/**
 * Get text color (white or black) based on background color for accessibility
 */
export function getCategoryTextColor(backgroundColor: string): string {
  const lightColors = ['#D4AF37', '#996600'];
  return lightColors.includes(backgroundColor) ? '#000000' : '#FFFFFF';
}
