import { BookOpen, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HistoricalEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  category: string;
}

const historicalEvents: HistoricalEvent[] = [
  {
    id: 1,
    year: "1921",
    title: "Black Wall Street - Tulsa, Oklahoma",
    description: "The Greenwood District of Tulsa, Oklahoma, known as Black Wall Street, was one of the most prosperous African American communities in the early 20th century. Home to over 300 Black-owned businesses, it represented the pinnacle of Black economic achievement. Despite the tragic Tulsa Race Massacre of 1921, its legacy continues to inspire economic empowerment and entrepreneurship in Black communities today.",
    category: "Economic Empowerment"
  },
  {
    id: 2,
    year: "1888",
    title: "The First Black Bank - Capital Savings Bank",
    description: "Capital Savings Bank of Washington, D.C., founded in 1888, was one of the first Black-owned banks in America. It provided financial services to the Black community when mainstream banks refused. This institution laid the groundwork for Black financial independence and wealth building.",
    category: "Banking & Finance"
  },
  {
    id: 3,
    year: "1900s",
    title: "Madam C.J. Walker - America's First Self-Made Female Millionaire",
    description: "Madam C.J. Walker built a beauty empire that made her America's first self-made female millionaire. She employed thousands of Black women as sales agents, providing economic opportunities and independence. Her success demonstrated the power of Black entrepreneurship and community investment.",
    category: "Entrepreneurship"
  },
  {
    id: 4,
    year: "1865",
    title: "Freedman's Savings Bank",
    description: "Established by Congress in 1865 to help formerly enslaved people build wealth, the Freedman's Savings Bank represented the first major effort to provide banking services to the Black community. Though it eventually failed, it demonstrated the importance of financial institutions serving Black communities.",
    category: "Banking & Finance"
  },
  {
    id: 5,
    year: "1960s",
    title: "Black Power Movement & Economic Self-Determination",
    description: "The Black Power movement of the 1960s emphasized economic self-determination and community control. Leaders like Malcolm X and organizations like the Black Panthers promoted Black-owned businesses, cooperative economics, and community reinvestment as paths to liberation.",
    category: "Civil Rights"
  },
  {
    id: 6,
    year: "2020s",
    title: "Digital Black Wall Street",
    description: "The 21st century has seen a resurgence of Black economic empowerment through digital platforms. Online marketplaces, fintech companies, and e-commerce platforms are creating new opportunities for Black entrepreneurs to build wealth and serve their communities globally.",
    category: "Modern Era"
  }
];

export default function HistoryWindow() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-brand-black to-brand-charcoal text-brand-ivory py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-8 h-8 text-brand-gold" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              History <span className="text-brand-gold">Window</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Explore the rich history of Black economic empowerment, from Black Wall Street to the digital age.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brand-black mb-6">
            The Legacy of Black Economic Excellence
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Throughout history, Black communities have demonstrated remarkable resilience, innovation, and 
            entrepreneurial spirit. From the thriving businesses of Black Wall Street to modern digital 
            enterprises, our ancestors built institutions that created wealth, provided jobs, and strengthened 
            communities.
          </p>
          <p className="text-lg text-gray-700">
            BlkXchange™ continues this legacy by creating a digital marketplace that empowers Black entrepreneurs, 
            professionals, and creators to build sustainable businesses while reinvesting in our communities.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brand-black mb-12 text-center">
            Historical Timeline
          </h2>
          
          <div className="space-y-8">
            {historicalEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden border-l-4 border-brand-gold hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-brand-gold flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-brand-black" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-brand-gold">{event.year}</span>
                        <span className="px-3 py-1 bg-brand-charcoal text-brand-ivory text-xs font-semibold rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-brand-black mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-charcoal text-brand-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-brand-gold mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold mb-4">
            Continue the Legacy
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join BlkXchange™ and be part of the next chapter in Black economic empowerment. 
            Every purchase, every connection, every transaction builds our collective future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/marketplace" className="px-8 py-4 bg-brand-gold text-brand-black font-semibold rounded-lg hover:opacity-90 transition-colors">
              Shop Marketplace
            </a>
            <a href="/vendor-apply" className="px-8 py-4 bg-brand-green text-white font-semibold rounded-lg hover:opacity-90 transition-colors">
              Become a Vendor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
