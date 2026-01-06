# UniSphere Landing Page

Landing page premium pour UniSphere avec design Shopify/Stripe-like, animations Framer Motion, et globe héro cinématique.

## 🎨 Design

- **Thème**: Shopify/Stripe-like - clean, light, premium, campus-tech
- **Couleurs**:
  - Background: `#F7FAFF`
  - Text: `#0B1220`
  - Muted: `#475569`
  - Primary: `#2563EB`
  - Accent: `#38BDF8`
  - Border: `rgba(15, 23, 42, 0.08)`

## 📁 Structure

### Composants créés

- `UniSphereNavbar.jsx` - Navigation avec blur on scroll
- `UniSphereHero.jsx` - Section héro avec vidéo ou fallback SVG
- `DottedSphereFallback.jsx` - Sphère SVG rotative (fallback si vidéo manquante)
- `SectionHowItWorks.jsx` - Toggle Universities/Students avec 3 étapes
- `SectionAmbassador.jsx` - Programme ambassadeur + mock dashboard
- `SectionAssociations.jsx` - Hub associations + mock board
- `SectionAdminBenefits.jsx` - Métriques B2B pour universités
- `SectionFAQ.jsx` - Accordion FAQ animé
- `UniSphereFooter.jsx` - Footer simple

### Page

- `UniSphereLandingPage.jsx` - Page principale composant tous les composants

## 🎬 Assets Vidéo (optionnel)

Pour utiliser la vidéo héro au lieu du fallback SVG :

1. Placez les fichiers dans `/public/videos/`:
   - `globe.webm`
   - `globe.mp4`
   - `globe-poster.jpg` (dans `/public/images/`)

2. Si les vidéos ne sont pas trouvées, le composant basculera automatiquement sur `DottedSphereFallback`.

## 🚀 Route

La landing page est accessible à la route `/` (HOME).

## ✨ Features

- ✅ Animations Framer Motion sur scroll
- ✅ Micro-interactions sur boutons et cartes
- ✅ Responsive design
- ✅ Fallback SVG si vidéo manquante
- ✅ Smooth scrolling pour les ancres
- ✅ Navbar avec blur on scroll
- ✅ Mock UI components (dashboard, associations board)
- ✅ Accordion FAQ animé
- ✅ Toggle smooth pour Universities/Students

## 🎯 Sections

1. **Hero** - Vidéo/globe + CTAs
2. **How it works** - Toggle Universities/Students
3. **Ambassador Program** - Features + mock dashboard
4. **Associations Hub** - Features + mock board
5. **Admin Benefits** - Métriques B2B
6. **FAQ** - Accordion
7. **Footer** - Simple avec liens

## 📝 Copy

Tous les textes sont définis directement dans les composants selon les spécifications fournies.








