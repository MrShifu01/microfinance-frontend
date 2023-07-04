import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

// Component that displays a loading spinner
const LoadingSpinner = () => (
  // Container with flex layout to center the spinner
  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '8rem' }}>
    {/* CircularProgress component from MUI, with color prop set to inherit */}
    <CircularProgress color="inherit" />
  </Box>
);

export default LoadingSpinner;
