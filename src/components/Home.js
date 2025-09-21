import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Container,
  SimpleGrid,
  Icon,
  Badge,
  Divider,
  Fade,
  ScaleFade,
  Image,
  Link,
  useBreakpointValue
} from '@chakra-ui/react';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaBolt, 
  FaUsers, 
  FaChartLine, 
  FaGlobe,
  FaArrowRight,
  FaCheckCircle,
  FaWallet,
  FaHandshake,
  FaCoins,
  FaLock
} from 'react-icons/fa';

const Home = ({ onNavigate }) => {
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'rgba(26, 26, 46, 0.9)');
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.2)');
  const heroBg = useColorModeValue('gray.50', 'transparent');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Secure P2P Trading',
      description: 'Blockchain-powered security with smart contracts ensuring safe transactions',
      color: 'green.400'
    },
    {
      icon: FaBolt,
      title: 'Instant Settlements',
      description: 'Fast and efficient order processing with real-time status updates',
      color: 'yellow.400'
    },
    {
      icon: FaUsers,
      title: 'Global Community',
      description: 'Connect with traders worldwide on the Avalanche network',
      color: 'blue.400'
    },
    {
      icon: FaChartLine,
      title: 'Transparent Pricing',
      description: 'Real-time market rates with no hidden fees or middlemen',
      color: 'purple.400'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Connect Wallet',
      description: 'Connect your MetaMask wallet to the Avalanche Fuji testnet',
      icon: FaWallet
    },
    {
      step: '02',
      title: 'Create Order',
      description: 'Create buy or sell orders with your preferred payment method',
      icon: FaHandshake
    },
    {
      step: '03',
      title: 'Trade Securely',
      description: 'Execute trades with built-in escrow and dispute resolution',
      icon: FaLock
    },
    {
      step: '04',
      title: 'Get Paid',
      description: 'Receive your stablecoins instantly upon order completion',
      icon: FaCoins
    }
  ];

  const stats = [
    ];

  return (
    <Box minH="100vh" position="relative">
      {/* Hero Section */}
      <Fade in={true}>
        <Box
          position="relative"
          py={{ base: 20, md: 32 }}
          px={6}
          textAlign="center"
          bg={heroBg}
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%), radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        >
          <Container maxW="6xl">
            <VStack spacing={8}>
              {/* Logo and Brand */}
              <VStack spacing={4}>
                <HStack spacing={3}>
                  <Icon as={FaRocket} boxSize={12} color="brand.400" />
                  <Text
                    fontSize={{ base: '4xl', md: '6xl' }}
                    fontWeight="bold"
                    bgGradient="linear(to-r, brand.300, brand.500, brand.700)"
                    bgClip="text"
                  >
                    PeerFlow
                  </Text>
                </HStack>
                <Badge
                  colorScheme="blue"
                  variant="subtle"
                  borderRadius="lg"
                  px={4}
                  py={2}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  Powered by Avalanche
                </Badge>
              </VStack>

              {/* Main Heading */}
              <VStack spacing={6} maxW="4xl">
                <Text
                  fontSize={{ base: '3xl', md: '5xl' }}
                  fontWeight="bold"
                  color={textColor}
                  lineHeight="shorter"
                >
                  Decentralized P2P
                  <Text
                    as="span"
                    bgGradient="linear(to-r, brand.400, purple.400)"
                    bgClip="text"
                  >
                    {' '}Stablecoin Trading
                  </Text>
                </Text>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color={subTextColor}
                  maxW="2xl"
                  lineHeight="tall"
                >
                  Trade stablecoins peer-to-peer with complete security, transparency, and global reach. 
                  No intermediaries, no hidden fees, just pure decentralized trading.
                </Text>
              </VStack>

              {/* CTA Buttons */}
              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Button
                  size="lg"
                  colorScheme="blue"
                  rightIcon={<Icon as={FaArrowRight} />}
                  borderRadius="lg"
                  px={8}
                  py={6}
                  margin={2}
                  marginTop={4}
                  fontSize="lg"
                  fontWeight="semibold"
                  bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
                  _hover={{
                    bgGradient: "linear(to-r, brand.300, brand.400, brand.500)",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}
                  transition="all 0.2s"
                  onClick={() => onNavigate && onNavigate('buyer')}
                >
                  Start Trading
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderRadius="xl"
                  px={8}
                  py={6}
                  marginTop={10}
                  margin={2}
                  fontSize="lg"
                  fontWeight="semibold"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color={textColor}
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.2s"
                  as="a"
                  href="https://github.com/VanshBhardwaj24/avax-hackathon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </Fade>

      {/* Stats Section */}
      <Fade in={true}>
        <Box py={16} px={6}>
          <Container maxW="6xl">
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
              {stats.map((stat, index) => (
                <ScaleFade key={index} in={true} delay={index * 0.1}>
                  <VStack spacing={2} textAlign="center">
                    <Text
                      fontSize={{ base: '2xl', md: '3xl' }}
                      fontWeight="bold"
                      color={stat.color}
                    >
                      {stat.value}
                    </Text>
                    <Text color={subTextColor} fontSize="sm" fontWeight="medium">
                      {stat.label}
                    </Text>
                  </VStack>
                </ScaleFade>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      </Fade>

      {/* Features Section */}
      <Fade in={true}>
        <Box py={20} px={6} bg="rgba(255, 255, 255, 0.03)">
          <Container maxW="6xl">
            <VStack spacing={16}>
              <VStack spacing={4} textAlign="center" maxW="3xl">
                <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                  Why Choose PeerFlow?
                </Text>
                <Text fontSize="lg" color={subTextColor}>
                  Experience the future of decentralized trading with our cutting-edge platform
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {features.map((feature, index) => (
                  <ScaleFade key={index} in={true} delay={index * 0.1}>
                    <Box
                      bg={cardBg}
                      p={8}
                      borderRadius="2xl"
                      shadow="xl"
                      backdropFilter="blur(20px)"
                      border="1px solid"
                      borderColor={borderColor}
                      _hover={{
                        transform: 'translateY(-4px)',
                        shadow: '2xl'
                      }}
                      transition="all 0.3s"
                    >
                      <VStack spacing={4} align="start">
                        <HStack spacing={4}>
                          <Icon as={feature.icon} boxSize={8} color={feature.color} />
                          <Text fontSize="xl" fontWeight="bold" color={textColor}>
                            {feature.title}
                          </Text>
                        </HStack>
                        <Text color={subTextColor} lineHeight="tall">
                          {feature.description}
                        </Text>
                      </VStack>
                    </Box>
                  </ScaleFade>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      </Fade>

      {/* How It Works Section */}
      <Fade in={true}>
        <Box py={20} px={6}>
          <Container maxW="6xl">
            <VStack spacing={16}>
              <VStack spacing={4} textAlign="center" maxW="3xl">
                <Text fontSize="3xl" fontWeight="bold" color={textColor} as="span"
                    bgGradient="linear(to-r, brand.400, purple.400)"
                    bgClip="text">
                  How It Works
                </Text>
                <Text fontSize="lg" color={subTextColor}>
                  Get started with PeerFlow in just a few simple steps
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                {steps.map((step, index) => (
                  <ScaleFade key={index} in={true} delay={index * 0.1}>
                    <VStack spacing={4} textAlign="center">
                      <Box
                        w={16}
                        h={16}
                        borderRadius="full"
                        bg="linear-gradient(135deg, brand.400, brand.600)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        _before={{
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '100%',
                          width: '100%',
                          height: '2px',
                          bg: 'linear-gradient(90deg, brand.400, transparent)',
                          display: index < steps.length - 1 ? 'block' : 'none',
                          transform: 'translateY(-50%)',
                          zIndex: -1
                        }}
                      >
                        <Text fontSize="lg" fontWeight="bold" color="white">
                          {step.step}
                        </Text>
                      </Box>
                      <VStack spacing={2}>
                        <Icon as={step.icon} boxSize={8} color="brand.400" />
                        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                          {step.title}
                        </Text>
                        <Text fontSize="sm" color={subTextColor} textAlign="center">
                          {step.description}
                        </Text>
                      </VStack>
                    </VStack>
                  </ScaleFade>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      </Fade>

      {/* CTA Section */}
      <Fade in={true}>
        <Box py={20} px={6} bg="rgba(59, 130, 246, 0.08)">
          <Container maxW="4xl">
            <VStack spacing={8} textAlign="center">
              <VStack spacing={4}>
                <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                  Ready to Start Trading coins?
                </Text>
                <Text fontSize="lg" color={subTextColor} maxW="2xl">
                  Join thousands of traders worldwide and experience the future of 
                  decentralized P2P stablecoin trading directly from your wallet.
                </Text>
              </VStack>

              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Button
                  size="lg"
                  colorScheme="blue"
                  rightIcon={<Icon as={FaRocket} />}
                  borderRadius="xl"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                  bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
                  _hover={{
                    bgGradient: "linear(to-r, brand.300, brand.400, brand.500)",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}
                  transition="all 0.2s"
                  onClick={() => onNavigate && onNavigate('buyer')}
                >
                  Launch App
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  leftIcon={<Icon as={FaGlobe} />}
                  borderRadius="xl"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color={textColor}
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.2s"
                  as="a"
                  href="https://github.com/VanshBhardwaj24/avax-hackathon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Documentation
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </Fade>

      {/* Footer */}
      <Fade in={true}>
        <Box py={12} px={6} borderTop="1px solid" borderColor={borderColor}>
          <Container maxW="6xl">
            <VStack spacing={8}>
              <HStack spacing={8} flexWrap="wrap" justify="center">
                <Link 
                  href="https://github.com/VanshBhardwaj24/avax-hackathon" 
                  color={subTextColor} 
                  _hover={{ color: 'brand.400' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
                <Link 
                  href="https://github.com/VanshBhardwaj24/avax-hackathon/issues" 
                  color={subTextColor} 
                  _hover={{ color: 'brand.400' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </Link>
                <Link 
                  href="https://github.com/VanshBhardwaj24/avax-hackathon/blob/main/README.md" 
                  color={subTextColor} 
                  _hover={{ color: 'brand.400' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </Link>
                <Link 
                  href="https://avalanche.network/" 
                  color={subTextColor} 
                  _hover={{ color: 'brand.400' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Avalanche
                </Link>
              </HStack>
              
              <Divider borderColor={borderColor} />
              
              <VStack spacing={2}>
                <HStack spacing={2}>
                  <Icon as={FaRocket} color="brand.400" />
                  <Text fontWeight="bold" color={textColor}>
                    PeerFlow
                  </Text>
                </HStack>
                <Text fontSize="sm" color={subTextColor} textAlign="center">
                  © 2024 PeerFlow. Built on Avalanche. Decentralized P2P Trading Platform.
                </Text>
              </VStack>
            </VStack>
          </Container>
        </Box>
      </Fade>
    </Box>
  );
};

export default Home;
