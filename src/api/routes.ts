import { ServerRoute } from 'hapi';
import UrlRoutes from './url-routes';

const ApiRoutes = (): ServerRoute[] => [
        ...UrlRoutes
];

export default ApiRoutes;