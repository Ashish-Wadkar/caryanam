import { createSvgIcon } from '@material-ui/icons';

const pathData = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.5-11.94L7 13.42 8.41 14.83 12 10.06 15.59 14.83 17 13.42l-5.5-5.5z';

const MyCustomIcon = createSvgIcon(pathData, 'MyCustomIcon');

export default MyCustomIcon;