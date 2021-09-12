import {
  FirstTimeLoaderImpl,
  FirstTimeTransformImpl,
  FirstTimeService,
} from './first-time.service';

const mockLoader = () =>
  Promise.resolve({
    token: '123456',
  });

export const FirstTimeFactory = ({ devMode }) => {
  const loader = devMode ? mockLoader : FirstTimeLoaderImpl;
  return FirstTimeService(loader, FirstTimeTransformImpl);
};
