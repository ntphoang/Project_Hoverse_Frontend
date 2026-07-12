import {
  LayoutGrid,
  Coffee,
  UtensilsCrossed,
  Soup,
  Beer,
  Hotel,
  MapPinned,
  Trees,
  Gamepad2,
  ShoppingBag,
  Film,
  Landmark,
  Library,
  Dumbbell,
  MoonStar,
  Church,
  GraduationCap,
  Hospital,
  BriefcaseBusiness,
  Bus,
  MapPin,
} from "lucide-react";

const iconMap = {
  All: LayoutGrid,
  Coffee,
  UtensilsCrossed,
  Soup,
  Beer,
  Hotel,
  MapPinned,
  Trees,
  Gamepad2,
  ShoppingBag,
  Film,
  Landmark,
  Library,
  Dumbbell,
  MoonStar,
  Church,
  GraduationCap,
  Hospital,
  BriefcaseBusiness,
  Bus,
  MapPin,
};

const iconDictionary = ({ iconName, size = 20, className = "" }) => {
  const Icon = iconMap[iconName] || MapPin;
  return <Icon size={size} className={className}></Icon>;
};

export default iconDictionary;
