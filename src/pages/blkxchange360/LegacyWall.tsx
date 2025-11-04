import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Tribute {
  id: number;
  title: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  featured: boolean;
}

const sampleTributes: Tribute[] = [
  {
    id: 1,
    title: "My Grandmother's Strength",
    name: "Rosa Mae Johnson",
    description: "My grandmother Rosa Mae Johnson was born in 1932 in rural Mississippi. Despite facing segregation and limited opportunities, she became a teacher and educated three generations of Black children in our community. She taught us that education is the key to freedom and that our...",
    category: "FAMILY",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "The Midwife Who Delivered Hope",
    name: "Mama Josephine Carter",
    description: "Mama Josephine was a midwife who delivered over 2,000 babies in our community from the 1940s to 1980s. When Black women couldn't access hospitals due to segregation, she was there. She saved countless lives with her skill, wisdom, and compassion. She was a true healer.",
    category: "COMMUNITY",
    imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "The Nurse Who Healed with Love",
    name: "Nurse Betty Jackson",
    description: "Nurse Betty Jackson worked at our community hospital for 45 years. She treated every patient with dignity and compassion, especially during the civil rights era when Black patients faced discrimination. She was an angel in scrubs who healed bodies and souls.",
    category: "COMMUNITY",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 4,
    title: "A Pillar of Our Community",
    name: "Reverend James Washington",
    description: "Reverend Washington founded our church in 1965 and led the civil rights movement in our town. He organized peaceful protests, voter registration drives, and youth mentorship programs. His unwavering faith and commitment to justice changed our community forever. He showed us...",
    category: "COMMUNITY",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 5,
    title: "My Father's Sacrifice",
    name: "William Davis",
    description: "My father William Davis worked three jobs to send all five of his children to college. He never complained, never gave up, and always reminded us that education was the pathway to a better life. Because of his sacrifice, we all graduated and now serve our communities as doctors, teachers, and...",
    category: "FAMILY",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 6,
    title: "The Farmer Who Fed Generations",
    name: "Mr. Henry 'Hank' Green",
    description: "Mr. Hank owned 200 acres of farmland that he inherited from his grandfather, a freed slave. He grew vegetables and raised livestock, providing fresh food to our community for decades. He taught us the value of land ownership and self-sufficiency.",
    category: "BUSINESS",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop",
    featured: true
  }
];

export default function LegacyWall() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-brand-black to-brand-charcoal text-brand-ivory py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-8 h-8 text-brand-green" />
                <h1 className="text-4xl md:text-5xl font-heading font-bold">
                  Legacy <span className="text-brand-gold">Wall</span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl">
                Honor and preserve the stories of our ancestors, family members, and community heroes.
              </p>
            </div>
            <Button className="bg-brand-green text-white hover:opacity-90">
              + Submit Tribute
            </Button>
          </div>
        </div>
      </section>

      {/* Tributes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleTributes.map((tribute) => (
              <Card key={tribute.id} className="overflow-hidden hover:shadow-xl transition-shadow border-2 hover:border-brand-gold">
                <div className="relative h-64">
                  <img
                    src={tribute.imageUrl}
                    alt={tribute.name}
                    className="w-full h-full object-cover"
                  />
                  {tribute.featured && (
                    <Badge className="absolute top-4 left-4 bg-brand-green text-white">
                      <Heart className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6 bg-brand-charcoal text-brand-ivory">
                  <h3 className="text-xl font-bold mb-2">{tribute.title}</h3>
                  <p className="text-brand-gold font-semibold mb-3">{tribute.name}</p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                    {tribute.description}
                  </p>
                  <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                    {tribute.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-charcoal text-brand-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Share Your Family's Legacy
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Every story matters. Honor the ancestors and heroes who paved the way for our community.
          </p>
          <Button className="bg-brand-gold text-brand-black hover:opacity-90 text-lg px-8 py-6">
            Submit a Tribute
          </Button>
        </div>
      </section>
    </div>
  );
}
