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
  Camera,
  MicVocal,
  CupSoda,
  CircleDot,
  Palette,
  Mountain,
  Images,
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

  // Hoverse categories
  Camera,
  MicVocal,
  CupSoda,
  CircleDot,
  Palette,
  Mountain,
  Images,
};

const iconDictionary = ({ iconName, size = 20, className = "" }) => {
  const Icon = iconMap[iconName] || MapPin;

  return <Icon size={size} className={className} />;
};

export default iconDictionary;
