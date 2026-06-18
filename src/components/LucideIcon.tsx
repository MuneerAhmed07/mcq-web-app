import { 
  Languages, 
  BookMarked, 
  Globe, 
  Laptop, 
  Percent, 
  FileText, 
  BookOpen, 
  Heart, 
  MessageSquareText, 
  History, 
  Compass, 
  Code, 
  Network, 
  Cpu, 
  Divide, 
  TrendingUp, 
  Dices, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  BookOpenCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Home,
  Check
} from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function LucideIcon({ name, className = "", size = 24 }: LucideIconProps) {
  switch (name) {
    case "Languages":
      return <Languages className={className} size={size} />;
    case "BookMarked":
      return <BookMarked className={className} size={size} />;
    case "Globe":
      return <Globe className={className} size={size} />;
    case "Laptop":
      return <Laptop className={className} size={size} />;
    case "Percent":
      return <Percent className={className} size={size} />;
    case "FileText":
      return <FileText className={className} size={size} />;
    case "BookOpen":
      return <BookOpen className={className} size={size} />;
    case "Heart":
      return <Heart className={className} size={size} />;
    case "MessageSquareText":
      return <MessageSquareText className={className} size={size} />;
    case "History":
      return <History className={className} size={size} />;
    case "Compass":
      return <Compass className={className} size={size} />;
    case "Code":
      return <Code className={className} size={size} />;
    case "Network":
      return <Network className={className} size={size} />;
    case "Cpu":
      return <Cpu className={className} size={size} />;
    case "Divide":
      return <Divide className={className} size={size} />;
    case "TrendingUp":
      return <TrendingUp className={className} size={size} />;
    case "Dices":
      return <Dices className={className} size={size} />;
    case "Search":
      return <Search className={className} size={size} />;
    case "ChevronLeft":
      return <ChevronLeft className={className} size={size} />;
    case "ChevronRight":
      return <ChevronRight className={className} size={size} />;
    case "BookOpenCheck":
      return <BookOpenCheck className={className} size={size} />;
    case "CheckCircle2":
      return <CheckCircle2 className={className} size={size} />;
    case "XCircle":
      return <XCircle className={className} size={size} />;
    case "HelpCircle":
      return <HelpCircle className={className} size={size} />;
    case "Clock":
      return <Clock className={className} size={size} />;
    case "RotateCcw":
      return <RotateCcw className={className} size={size} />;
    case "Sparkles":
      return <Sparkles className={className} size={size} />;
    case "ArrowRight":
      return <ArrowRight className={className} size={size} />;
    case "Home":
      return <Home className={className} size={size} />;
    case "Check":
      return <Check className={className} size={size} />;
    default:
      return <HelpCircle className={className} size={size} />;
  }
}
