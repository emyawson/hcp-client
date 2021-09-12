import {
  GetOrgStockLoaderImpl,
  GetOrgStockTransform,
  GetOrgStockServiceImpl,
} from './get-org-stock.service';
import { mockOrgStock } from './get-org-stock.mock';

const mockLoader = q => Promise.resolve(mockOrgStock);

export const GetOrgStockFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : GetOrgStockLoaderImpl;
  return GetOrgStockServiceImpl(loader, GetOrgStockTransform);
};
