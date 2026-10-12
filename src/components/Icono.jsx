import {
  Backpack, BadgeCheck, Beaker, BookOpen, Briefcase, Calculator, Car, CarFront,
  ChefHat, Coffee, CupSoda, Droplets, FileStack, FlaskConical, FolderOpen, Gift,
  HardHat, KeyRound, Landmark, LayoutGrid, Layers, NotebookPen, Paperclip, Pencil,
  PencilRuler, PenLine, PenTool, Printer, Scissors, ScrollText, Shirt, ShieldCheck,
  ShoppingBag, Sparkles, SprayCan, Sticker, Store, Tag, Package,
} from 'lucide-react'

const ICONOS = {
  Backpack, BadgeCheck, Beaker, BookOpen, Briefcase, Calculator, Car, CarFront,
  ChefHat, Coffee, CupSoda, Droplets, FileStack, FlaskConical, FolderOpen, Gift,
  HardHat, KeyRound, Landmark, LayoutGrid, Layers, NotebookPen, Paperclip, Pencil,
  PencilRuler, PenLine, PenTool, Printer, Scissors, ScrollText, Shirt, ShieldCheck,
  ShoppingBag, Sparkles, SprayCan, Sticker, Store, Tag,
}

export default function Icono({ nombre, ...props }) {
  const Componente = ICONOS[nombre] || Package
  return <Componente {...props} />
}
