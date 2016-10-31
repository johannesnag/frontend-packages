import { configure } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';
import '../src/index.css';

setOptions({
  name: 'NDLA Styleguide',
  url: 'https://github.com/NDLANO/frontend-packages/tree/master/packages/ndla-ui',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false,
});

configure(() => require('../stories'), module);
