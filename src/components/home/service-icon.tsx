import {
  Bot,
  Box,
  Building2,
  Camera,
  Globe,
  MapPinned,
  MousePointerClick,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/content/services";

const icons: Record<ServiceIconName, LucideIcon> = {
  map: MapPinned,
  globe: Globe,
  camera: Camera,
  building: Building2,
  pointer: MousePointerClick,
  box: Box,
  sparkles: Sparkles,
  bot: Bot,
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden className={className} />;
}
