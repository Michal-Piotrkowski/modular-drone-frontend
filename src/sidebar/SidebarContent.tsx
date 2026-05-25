import { List } from '@mui/material';
import { sidebarElements } from '../constants';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';

interface SidebarContentProps {
  onItemClick?: () => void;
}

export default function SidebarContent({ onItemClick }: SidebarContentProps) {
  return (
    <div>
      <SidebarHeader />
      <List sx={{ px: 2 }}>
        {sidebarElements.map((element) => (
          <SidebarItem
            key={element.name}
            name={element.name}
            icon={element.icon}
            path={element.path}
            onClick={onItemClick}
          />
        ))}
      </List>
    </div>
  );
}
