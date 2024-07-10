import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { Clients } from './pages/Clients';
import { ClientsNew } from './pages/ClientsNew';
import { Dashboard } from './pages/Dashboard';
import { Properties } from './pages/Properties';
import { PropertiesNew } from './pages/PropertiesNew';
import { Visits } from './pages/Visits';
import { VisitsNew } from './pages/VisitsNew';

function App() {
  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "propriedades",
      element: <Properties />,
    },
    {
      path: "propriedades/novo",
      element: <PropertiesNew />,
    },
    {
      path: "visitas/:propertyId",
      element: <Visits />,
    },
    {
      path: "visitas/:propertyId/novo",
      element: <VisitsNew />,
    },
    {
      path: "clientes",
      element: <Clients />,
    },
    {
      path: "clientes/novo",
      element: <ClientsNew />,
    }
  ]);

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
