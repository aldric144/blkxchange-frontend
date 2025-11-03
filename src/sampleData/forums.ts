export interface ForumTopic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  last_activity: string;
  excerpt: string;
}

export const sampleForumTopics: ForumTopic[] = [
  {
    id: 1,
    title: "Best Practices for Supporting Black-Owned Businesses",
    author: "CommunityBuilder",
    category: "Business",
    replies: 24,
    views: 456,
    last_activity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    excerpt: "Let's discuss effective ways to support and promote Black-owned businesses in our communities..."
  },
  {
    id: 2,
    title: "Upcoming Community Events - November 2025",
    author: "EventCoordinator",
    category: "Events",
    replies: 18,
    views: 312,
    last_activity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    excerpt: "Share and discover community events happening this month. From networking to cultural celebrations..."
  },
  {
    id: 3,
    title: "Financial Literacy Resources for Entrepreneurs",
    author: "WealthBuilder",
    category: "Finance",
    replies: 42,
    views: 789,
    last_activity: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    excerpt: "Sharing valuable resources on financial planning, tax strategies, and building generational wealth..."
  },
  {
    id: 4,
    title: "Success Stories: From Idea to Thriving Business",
    author: "Entrepreneur2025",
    category: "Inspiration",
    replies: 31,
    views: 623,
    last_activity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    excerpt: "Share your entrepreneurial journey and inspire others. What challenges did you overcome?..."
  }
];
