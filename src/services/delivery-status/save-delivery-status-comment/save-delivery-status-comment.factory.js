import {
  SaveDeliveryStatusCommentServiceImpl,
  SaveDeliveryStatusCommentLoaderImpl,
  SaveDeliveryStatusCommentTransformImpl,
} from './save-delivery-status-comment.service';
import { mockSaveDeliveryStatusCommentResponse } from './save-delivery-status-comment.mock';

const mockLoader = () => Promise.resolve(mockSaveDeliveryStatusCommentResponse);

export const SaveDeliveryStatusCommentFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : SaveDeliveryStatusCommentLoaderImpl;
  return SaveDeliveryStatusCommentServiceImpl(
    loader,
    SaveDeliveryStatusCommentTransformImpl,
  );
};
