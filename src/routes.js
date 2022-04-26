import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Nlogs = React.lazy(() => import('./views/nlogs/nlogs'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Balanzas = React.lazy(() => import('./views/etiquetado/balanzas'))
const ReEtiquetado = React.lazy(() => import('./views/etiquetado/reetiquetado'))
const Hornos = React.lazy(() => import('./views/etiquetado/hornos'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Etiquetados = React.lazy(() => import('./views/Etiquetados'))
// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/nlogs', name: 'Nlogs', component: Nlogs },
  { path: '/etiquetado', exact: true, name: 'Etiquetado', component: Etiquetados },
  { path: '/etiquetado/balanzas', name: 'Balanzas', component: Balanzas },
  { path: '/etiquetado/reetiquetado', name: 'ReEtiquetado', component: ReEtiquetado },
  { path: '/etiquetado/hornos', name: 'Hornos', component: Hornos },
  { path: '/charts', name: 'Charts', component: Charts },
]

export default routes
