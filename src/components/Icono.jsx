import {
  Backpack, BadgeCheck, Beaker, BookOpen, Briefcase, Calculator, Car, CarFront,
  ChefHat, Coffee, CupSoda, Droplets, FileStack, FlaskConical, FolderOpen, Gift,
  HardHat, KeyRound, Landmark, LayoutGrid, Layers, NotebookPen, Paperclip, Pencil,
  PencilRuler, PenLine, PenTool, Printer, Scissors, ScrollText, Shirt, ShieldCheck,
  ShoppingBag, Sparkles, SprayCan, Sticker, Store, Tag, Package,
  Target, Handshake, Lightbulb, Zap, Boxes, Palette, Truck, MessageCircle, ArrowDownAZ, ArrowUpZA,
} from 'lucide-react'

const ICONOS = {
  Backpack, BadgeCheck, Beaker, BookOpen, Briefcase, Calculator, Car, CarFront,
  ChefHat, Coffee, CupSoda, Droplets, FileStack, FlaskConical, FolderOpen, Gift,
  HardHat, KeyRound, Landmark, LayoutGrid, Layers, NotebookPen, Paperclip, Pencil,
  PencilRuler, PenLine, PenTool, Printer, Scissors, ScrollText, Shirt, ShieldCheck,
  ShoppingBag, Sparkles, SprayCan, Sticker, Store, Tag,
  Target, Handshake, Lightbulb, Zap, Boxes, Palette, Truck, MessageCircle, ArrowDownAZ, ArrowUpZA,
}

export default function Icono({ nombre, ...props }) {
  const Componente = ICONOS[nombre] || Package
  return <Componente {...props} />
}
