import {
  AddOrgStockLoaderImpl,
  AddOrgStockTransform,
  AddOrgStockServiceImpl,
} from './add-org-stock.service';
import { mockOrgStock } from './add-org-stock.mock';

const mockLoader = () => Promise.resolve(mockOrgStock);

export const AddOrgStockFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : AddOrgStockLoaderImpl;
  return AddOrgStockServiceImpl(loader, AddOrgStockTransform);
};
