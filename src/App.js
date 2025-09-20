import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/Header';
import BuyerView from './components/BuyerView';
import MerchantView from './components/MerchantView';

// Custom theme with dark mode as default
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        minHeight: '100vh',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      },
    },
  },
  // Suppress WebSocket connection warnings in development
  components: {
    // This helps suppress console warnings about WebSocket connections
    Box: {
      baseStyle: {
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  colors: {
    brand: {
      50: '#e6f3ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0066cc',
      600: '#0052a3',
      700: '#003d7a',
      800: '#002952',
      900: '#001429',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: 'lg',
        },
      },
    },
    Box: {
      baseStyle: {
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
});

function App() {
  const [activeView, setActiveView] = useState('buyer');

  // Suppress WebSocket connection warnings in development
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('WebSocket connection')) {
        return; // Suppress WebSocket connection warnings
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'buyer':
        return <BuyerView />;
      case 'merchant':
        return <MerchantView />;
      default:
        return <BuyerView />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Web3Provider>
        <Box 
          minH="100vh" 
          bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        >
          <Header activeView={activeView} onViewChange={setActiveView} />
          {renderActiveView()}
        </Box>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default App; 