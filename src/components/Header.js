import React from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Icon
} from '@chakra-ui/react';
import { useWeb3 } from '../contexts/Web3Context';
import { FaWallet, FaUser, FaStore, FaExclamationTriangle, FaBars, FaMoon, FaSun, FaCog, FaHome, FaRocket, FaSignOutAlt, FaUserCircle, FaCopy } from 'react-icons/fa';

const Header = ({ activeView, onViewChange }) => {
  const { 
    account, 
    isConnected, 
    connectWallet, 
    disconnectWallet, 
    networkError, 
    EXPECTED_NETWORK_NAME, 
    CONTRACT_ADDRESS,
    switchToAvalanche,
    isLoading,
    isConnecting
  } = useWeb3();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bg = useColorModeValue('white', 'rgba(26, 26, 46, 0.8)');
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.1)');
  const textColor = useColorModeValue('gray.800', 'white');
  const brandColor = useColorModeValue('brand.500', 'brand.300');

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(account);
      // You could add a toast notification here if needed
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleSwitchToAvalanche = async () => {
    try {
      const success = await switchToAvalanche();
      if (success) {
        // Reload the page to reconnect with the new network
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to switch to Avalanche Fuji testnet:', error);
    }
  };

  return (
    <Box 
      bg={bg} 
      borderBottom="1px" 
      borderColor={borderColor} 
      px={4} 
      py={3}
      backdropFilter="blur(20px)"
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
    >
      {/* Network Error Alert */}
      {networkError && (
        <Alert 
          status="warning" 
          mb={3} 
          borderRadius="xl"
          bg="rgba(255, 193, 7, 0.1)"
          border="1px solid rgba(255, 193, 7, 0.3)"
          backdropFilter="blur(10px)"
        >
          <AlertIcon />
          <Box flex="1">
            <AlertTitle color={textColor}>
              {networkError.includes('Wrong Network') ? 'Wrong Network!' : 'Connection Issue'}
            </AlertTitle>
            <AlertDescription display="block" color={textColor}>
              {networkError}
              {networkError.includes('Wrong Network') && (
                <Button
                  ml={3}
                  size="sm"
                  colorScheme="orange"
                  onClick={handleSwitchToAvalanche}
                  isLoading={isLoading}
                  leftIcon={<FaExclamationTriangle />}
                  borderRadius="lg"
                  _hover={{ transform: 'translateY(-1px)' }}
                >
                  Switch to Fuji Testnet
                </Button>
              )}
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {/* Connection Status Alert */}
      {isConnecting && (
        <Alert 
          status="info" 
          mb={3} 
          borderRadius="xl"
          bg="rgba(59, 130, 246, 0.1)"
          border="1px solid rgba(59, 130, 246, 0.3)"
          backdropFilter="blur(10px)"
        >
          <AlertIcon />
          <Box flex="1">
            <AlertTitle color={textColor}>Connecting to Wallet...</AlertTitle>
            <AlertDescription color={textColor}>
              Please wait while we connect to your wallet and verify the contract.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo and Brand */}
        <HStack spacing={4}>
          <HStack 
            spacing={2}
            marginRight={40}
            cursor="pointer"
            onClick={() => onViewChange('home')}
            _hover={{ transform: 'scale(1.05)' }}
            transition="all 0.2s"
          >
            <Icon as={FaRocket} color={brandColor} boxSize={6} />
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              color={brandColor}
              bgGradient="linear(to-r, brand.300, brand.500, brand.700)"
              bgClip="text"
            >
              PeerFlow
            </Text>
          </HStack>
          
          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            icon={<FaBars />}
            aria-label="Open menu"
            color={textColor}
            _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
          />
        </HStack>

        {/* Desktop Navigation */}
        <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
          {/* Navigation Tabs */}
          <HStack spacing={2}>
            <Button
              size="md"
              variant={activeView === 'home' ? 'solid' : 'ghost'}
              colorScheme={activeView === 'home' ? 'blue' : 'gray'}
              leftIcon={<FaHome />}
              onClick={() => onViewChange('home')}
              borderRadius="xl"
              _hover={{ 
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              transition="all 0.2s"
            >
              Home
            </Button>
            <Button
              size="md"
              variant={activeView === 'buyer' ? 'solid' : 'ghost'}
              colorScheme={activeView === 'buyer' ? 'blue' : 'gray'}
              leftIcon={<FaUser />}
              onClick={() => onViewChange('buyer')}
              borderRadius="xl"
              _hover={{ 
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              transition="all 0.2s"
            >
              Buyer View
            </Button>
            <Button
              size="md"
              variant={activeView === 'merchant' ? 'solid' : 'ghost'}
              colorScheme={activeView === 'merchant' ? 'blue' : 'gray'}
              leftIcon={<FaStore />}
              onClick={() => onViewChange('merchant')}
              borderRadius="xl"
              _hover={{ 
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              transition="all 0.2s"
            >
              Merchant View
            </Button>
          </HStack>
          
          {/* Network Information */}
          <HStack spacing={2}>
            <Tooltip label="Current Network" placement="bottom">
              <Badge 
                colorScheme="green" 
                variant="subtle"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
                fontWeight="semibold"
              >
                {EXPECTED_NETWORK_NAME}
              </Badge>
            </Tooltip>
            {isConnected && (
              <Tooltip label="Contract Address" placement="bottom">
                <Badge 
                  colorScheme="blue" 
                  variant="outline" 
                  fontSize="xs"
                  borderRadius="full"
                  px={3}
                  py={1}
                  borderColor="rgba(59, 130, 246, 0.3)"
                >
                  {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
                </Badge>
              </Tooltip>
            )}
          </HStack>

          {/* Wallet Connection */}
          {isConnected ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                leftIcon={<Avatar size="xs" name={formatAddress(account)} />}
                rightIcon={<FaCog />}
                borderRadius="xl"
                _hover={{ 
                  bg: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)'
                }}
                transition="all 0.2s"
                color={textColor}
              >
                {formatAddress(account)}
              </MenuButton>
              <MenuList 
                bg="rgba(235, 229, 229, 0.95)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                backdropFilter="blur(20px)"
                borderRadius="xl"
                boxShadow="0 8px 32px rgba(195, 189, 189, 0.3)"
                minW="200px"
              >
                <MenuItem 
                  color={textColor}
                  _hover={{ 
                    bg: 'rgba(59, 130, 246, 0.1)',
                    color: 'brand.300'
                  }}
                  icon={<Icon as={FaUserCircle} />}
                  onClick={copyAddress}
                  fontSize="sm"
                >
                  Copy Address
                </MenuItem>
                <MenuItem 
                  color="red.300"
                  _hover={{ 
                    bg: 'rgba(221, 221, 221, 0.1)',
                    color: 'red.200'
                  }}
                  icon={<Icon as={FaSignOutAlt} />}
                  onClick={disconnectWallet}
                  fontSize="md"
                >
                  Disconnect Wallet
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              leftIcon={<FaWallet />}
              colorScheme="blue"
              onClick={connectWallet}
              size="sm"
              isLoading={isLoading || isConnecting}
              loadingText={isConnecting ? "Connecting..." : "Loading..."}
              borderRadius="xl"
              _hover={{ 
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              transition="all 0.2s"
              isDisabled={isConnecting}
            >
              Connect Wallet
            </Button>
          )}
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(4px)" />
        <DrawerContent 
          bg="rgba(26, 26, 46, 0.95)" 
          backdropFilter="blur(20px)"
          borderLeft="1px solid rgba(255, 255, 255, 0.1)"
        >
          <DrawerCloseButton color={textColor} />
          <DrawerHeader color={textColor}>Navigation</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Button
                variant={activeView === 'home' ? 'solid' : 'ghost'}
                colorScheme={activeView === 'home' ? 'blue' : 'gray'}
                leftIcon={<FaHome />}
                onClick={() => {
                  onViewChange('home');
                  onClose();
                }}
                justifyContent="flex-start"
                borderRadius="xl"
              >
                Home
              </Button>
              <Button
                variant={activeView === 'buyer' ? 'solid' : 'ghost'}
                colorScheme={activeView === 'buyer' ? 'blue' : 'gray'}
                leftIcon={<FaUser />}
                onClick={() => {
                  onViewChange('buyer');
                  onClose();
                }}
                justifyContent="flex-start"
                borderRadius="xl"
              >
                Buyer View
              </Button>
              <Button
                variant={activeView === 'merchant' ? 'solid' : 'ghost'}
                colorScheme={activeView === 'merchant' ? 'blue' : 'gray'}
                leftIcon={<FaStore />}
                onClick={() => {
                  onViewChange('merchant');
                  onClose();
                }}
                justifyContent="flex-start"
                borderRadius="xl"
              >
                Merchant View
              </Button>
              
              <Box pt={4} borderTop="1px solid rgba(255, 255, 255, 0.1)">
                {isConnected ? (
                  <VStack spacing={4}>
                    <Box
                      bg="rgba(59, 130, 246, 0.1)"
                      p={4}
                      borderRadius="xl"
                      border="1px solid rgba(59, 130, 246, 0.2)"
                      w="full"
                    >
                      <VStack spacing={2}>
                        <HStack spacing={2}>
                          <Icon as={FaUserCircle} color="brand.400" />
                          <Text color={textColor} fontSize="sm" fontWeight="semibold">
                            Wallet Connected
                          </Text>
                        </HStack>
                        <Text 
                          color="brand.400" 
                          fontSize="xs" 
                          fontFamily="mono"
                          bg="rgba(255, 255, 255, 0.05)"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {formatAddress(account)}
                        </Text>
                      </VStack>
                    </Box>
                    <HStack spacing={2} w="full">
                      <Button
                        leftIcon={<Icon as={FaCopy} />}
                        variant="outline"
                        onClick={copyAddress}
                        size="sm"
                        borderRadius="xl"
                        flex={1}
                        borderColor="rgba(255, 255, 255, 0.2)"
                        color={textColor}
                        _hover={{ 
                          bg: 'rgba(59, 130, 246, 0.1)',
                          borderColor: 'brand.400'
                        }}
                      >
                        Copy
                      </Button>
                      <Button
                        leftIcon={<Icon as={FaSignOutAlt} />}
                        colorScheme="red"
                        variant="outline"
                        onClick={disconnectWallet}
                        size="sm"
                        borderRadius="xl"
                        flex={1}
                        _hover={{ 
                          bg: 'rgba(239, 68, 68, 0.1)',
                          transform: 'translateY(-1px)'
                        }}
                        transition="all 0.2s"
                      >
                        Disconnect
                      </Button>
                    </HStack>
                  </VStack>
                ) : (
                  <Button
                    leftIcon={<FaWallet />}
                    colorScheme="blue"
                    onClick={connectWallet}
                    isLoading={isLoading || isConnecting}
                    loadingText={isConnecting ? "Connecting..." : "Loading..."}
                    borderRadius="xl"
                    width="full"
                    isDisabled={isConnecting}
                  >
                    Connect Wallet
                  </Button>
                )}
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header; 