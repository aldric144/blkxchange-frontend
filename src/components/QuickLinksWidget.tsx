import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp, Users, Calendar, BookOpen } from 'lucide-react';
import SidebarWidget from './SidebarWidget';

function QuickLinksWidget() {
  const links = [
    { name: 'Marketplace', path: '/marketplace', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Professionals', path: '/professionals', icon: <Users className="w-4 h-4" /> },
    { name: 'Community Hub', path: '/blkxchange360/community-hub', icon: <Users className="w-4 h-4" /> },
    { name: 'Events', path: '/blkxchange360/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'News', path: '/news', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <SidebarWidget title="Quick Links" icon={<ExternalLink className="w-5 h-5" />}>
      <div className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center gap-2 text-gray-700 hover:text-brand-gold hover:bg-yellow-50 p-2 rounded transition"
          >
            {link.icon}
            <span className="text-sm font-medium">{link.name}</span>
          </Link>
        ))}
      </div>
    </SidebarWidget>
  );
}

export default QuickLinksWidget;
