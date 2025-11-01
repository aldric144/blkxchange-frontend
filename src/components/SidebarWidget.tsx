import { ReactNode } from 'react';

interface SidebarWidgetProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

function SidebarWidget({ title, icon, children, className = '' }: SidebarWidgetProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        {icon && <div className="text-brand-gold">{icon}</div>}
        <h3 className="text-lg font-bold text-brand-black">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default SidebarWidget;
